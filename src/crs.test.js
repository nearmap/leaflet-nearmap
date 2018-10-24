import CRS from './crs';
import leaflet from 'leaflet';

describe('crs()', ()=> {
  const heading = 'HEADING_SOUTH';
  const crs = new CRS(heading);

  it('Set up the heading', ()=> {
    expect(crs.heading).toEqual(heading);
  });

  it('Rotate LatLng', ()=> {
    const rotatedLatlng = crs.rotateLatLng(1, 2);
    expect(rotatedLatlng).toEqual(leaflet.latLng(-1, -2));
  });

  it('Rotate point', ()=> {
    const point = leaflet.point((1, 2));
    const rotatedPoint = crs.rotatePoint(point);
    
    expect(rotatedPoint).toEqual(point);
  });

  it('Generate URL', ()=> {
    const url = 'https://youDomain.com/{contentType}/{z}/{x}/{y}?default=xxx';
    const expectedUrl = 'https://youDomain.com/South/0/0/0?default=xxx';
    const resultedUrl = crs.getTileUrl({heading, url})({x: 0, y: 0, z: 0});
    
    expect(resultedUrl).toEqual(expectedUrl);
  });

  it('project from LatLng To Point', ()=> {
    const latLng = leaflet.latLng(0, 0);
    const rotatedPoint = crs.project(latLng);
    
    expect(rotatedPoint).toHaveProperty('x');
    expect(rotatedPoint).toHaveProperty('y');
  });

  it('Unproject from Point To LatLng', ()=> {
    const point = leaflet.point(0, 0);
    const rotatedLatlng = crs.unproject(point);
    
    expect(rotatedLatlng).toHaveProperty('lat');
    expect(rotatedLatlng).toHaveProperty('lng');
  });

  it('Generate CRS ', ()=> {
    const GeneratedCRS = crs.crs();
    
    expect(GeneratedCRS).toHaveProperty('projection.project');
    expect(GeneratedCRS).toHaveProperty('projection.unproject');
    expect(GeneratedCRS).toHaveProperty('wrapLng', undefined);
  });

});
