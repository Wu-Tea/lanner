"""Execute the exact current pure Java distance method in an isolated wrapper.

This checks one numeric behavior, not the HTTP service or a proposed fix.
The spherical reference radius is an explicit test assumption (6,371,000 m).
"""
from pathlib import Path
import hashlib
import json
import math
import subprocess
import tempfile

ROOT = Path(r'E:\work\yxyw\yxyw-safe-check')
OUT = Path(__file__).resolve().parent
SOURCE = ROOT/'src/main/java/com/ecidi/dam/modules/util/shortpath/DistanceMatrixUtil.java'
text = SOURCE.read_text(encoding='utf-8')
start = text.index('    private static final BigDecimal EQUATOR_RADIUS')
constants = text[start:text.index('    // 将角度转换', start)]
start = text.index('    public static BigDecimal calculateDistance(BigDecimal lat1, BigDecimal lon1, BigDecimal lat2, BigDecimal lon2)')
brace = text.index('{', start)
depth, end = 1, brace + 1
while depth:
    depth += (text[end] == '{') - (text[end] == '}')
    end += 1
method = text[start:end]
wrapper = 'import java.math.*;\npublic class DistanceProbe {\n' + constants + method + '''
 public static void main(String[] args) {
  BigDecimal a = new BigDecimal(args[0]), b = new BigDecimal(args[1]);
  BigDecimal c = new BigDecimal(args[2]), d = new BigDecimal(args[3]);
  System.out.println(calculateDistance(a,b,c,d).toPlainString());
 }
}
'''
samples = []
with tempfile.TemporaryDirectory(prefix='yxyw-distance-probe-') as tmp:
    source = Path(tmp)/'DistanceProbe.java'
    source.write_text(wrapper, encoding='utf-8')
    subprocess.run(['javac', '-encoding', 'UTF-8', str(source)], check=True)
    for coords in [(0,0,0,1),(30,120,30,121),(0,0,0,0)]:
        result = float(subprocess.check_output(['java','-cp',tmp,'DistanceProbe',*map(str,coords)], text=True))
        lat1, lon1, lat2, lon2 = map(math.radians, coords)
        a = math.sin((lat2-lat1)/2)**2 + math.cos(lat1)*math.cos(lat2)*math.sin((lon2-lon1)/2)**2
        reference = 6371000 * 2 * math.asin(math.sqrt(a))
        samples.append(dict(input_lat_lon_degrees=coords, actual_java=result, reference_sphere_m=reference))
report = dict(source=str(SOURCE), sha256=hashlib.sha256(SOURCE.read_bytes()).hexdigest(),
              revision=subprocess.check_output(['git','-C',str(ROOT),'rev-parse','HEAD'], text=True).strip(),
              java_compiler=subprocess.check_output(['javac','-version'], text=True).strip(),
              scope='Exact extracted constants and four-BigDecimal method; no Spring, DB, Feign or route invocation',
              reference_assumption='Input is latitude/longitude in degrees; sphere radius 6371000 m; no ellipsoid accuracy claim',
              samples=samples, observed_disagreement=abs(samples[0]['actual_java']-samples[0]['reference_sphere_m'])>1000)
assert report['observed_disagreement'] and samples[2]['actual_java']==0
(OUT/'distance-probe.json').write_text(json.dumps(report, ensure_ascii=False, indent=2)+'\n', encoding='utf-8')
print(json.dumps(report, ensure_ascii=False))
