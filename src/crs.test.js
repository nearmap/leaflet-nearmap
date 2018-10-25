import CRS from './crs';
import leaflet from 'leaflet';

describe('CRS', ()=> {
  const heading = 'HEADING_SOUTH';
  const crs = new CRS(heading);

  it('Set up the heading', ()=> {
    expect(crs.heading).toEqual(heading);
  });

  it('project from LatLng To Point', ()=> {
    const latLng = leaflet.latLng(1, 1);
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

describe('Rotate latlng', ()=> {
  it('Rotate North latlng ', ()=> {
    const heading = 'HEADING_NORTH';
    const crs = new CRS(heading);
    const rotatedLatLng = crs.rotateLatLng({lat: 33.123134, lng: 151.123134});
    expect(rotatedLatLng).toEqual(leaflet.latLng(33.123134, 151.123134));
  });

  it('Rotate South latlng', ()=> {
    const heading = 'HEADING_SOUTH';
    const crs = new CRS(heading);
    const rotatedLatLng = crs.rotateLatLng({lat: 33.123134, lng: 151.123134});
    expect(rotatedLatLng).toEqual(leaflet.latLng(-33.123134, -151.123134));
  });

  it('Rotate East latlng', ()=> {
    const heading = 'HEADING_EAST';
    const crs = new CRS(heading);
    const rotatedLatLng = crs.rotateLatLng({lat: 33.123134, lng: 151.123134});
    expect(rotatedLatLng).toEqual(leaflet.latLng(33.123134, -151.123134));
  });

  it('Rotate West latlng', ()=> {
    const heading = 'HEADING_WEST';
    const crs = new CRS(heading);
    const rotatedLatLng = crs.rotateLatLng({lat: 33.123134, lng: 151.123134});
    expect(rotatedLatLng).toEqual(leaflet.latLng(-33.123134, 151.123134));
  });
});


describe('Rotate point', ()=> {
  it('Rotate North point ', ()=> {
    const heading = 'HEADING_NORTH';
    const crs = new CRS(heading);
    const point = leaflet.point(1, 2);
    const rotatedPoint = crs.rotatePoint(point);

    expect(rotatedPoint).toEqual(point);
  });

  it('Rotate South point', ()=> {
    const heading = 'HEADING_SOUTH';
    const crs = new CRS(heading);
    const point = leaflet.point(1, 2);
    const rotatedPoint = crs.rotatePoint(point);

    expect(rotatedPoint).toEqual(point);
  });

  it('Rotate East point', ()=> {
    const heading = 'HEADING_EAST';
    const crs = new CRS(heading);
    const point = leaflet.point(1, 2);
    const rotatedPoint = crs.rotatePoint(point);

    expect(rotatedPoint).toEqual(leaflet.point(2, 1));
  });

  it('Rotate West point', ()=> {
    const heading = 'HEADING_WEST';
    const crs = new CRS(heading);
    const point = leaflet.point(1, 2);
    const rotatedPoint = crs.rotatePoint(point);

    expect(rotatedPoint).toEqual(leaflet.point(2, 1));
  });
});

describe('Generate URL', ()=> {
  it('North', ()=> {
    const heading = 'HEADING_NORTH';
    const crs = new CRS(heading);
    const url = 'https://youDomain.com/{contentType}/{z}/{x}/{y}?default=xxx';
    const expectedUrl = 'https://youDomain.com/North/0/0/0?default=xxx';
    const resultedUrl = crs.getTileUrl({heading, url})({x: 0, y: 0, z: 0});
    expect(resultedUrl).toEqual(expectedUrl);
  });
  it('South', ()=> {
    const heading = 'HEADING_SOUTH';
    const crs = new CRS(heading);
    const url = 'https://youDomain.com/{contentType}/{z}/{x}/{y}?default=xxx';
    const expectedUrl = 'https://youDomain.com/South/1/0/0?default=xxx';
    const resultedUrl = crs.getTileUrl({heading, url})({x: 1, y: 1, z: 1});
    expect(resultedUrl).toEqual(expectedUrl);
  });
  it('East', ()=> {
    const heading = 'HEADING_EAST';
    const crs = new CRS(heading);
    const url = 'https://youDomain.com/{contentType}/{z}/{x}/{y}?default=xxx';
    const expectedUrl = 'https://youDomain.com/East/2/1/2?default=xxx';
    const resultedUrl = crs.getTileUrl({heading, url})({x: 2, y: 2, z: 2});
    expect(resultedUrl).toEqual(expectedUrl);
  });
  it('West', ()=> {
    const heading = 'HEADING_WEST';
    const crs = new CRS(heading);
    const url = 'https://youDomain.com/{contentType}/{z}/{x}/{y}?default=xxx';
    const expectedUrl = 'https://youDomain.com/West/3/3/4?default=xxx';
    const resultedUrl = crs.getTileUrl({heading, url})({x: 3, y: 3, z: 3});
    expect(resultedUrl).toEqual(expectedUrl);
  });

});

describe('Invert latlng', ()=> {
  it('Invert North latlng ', ()=> {
    const heading = 'HEADING_NORTH';
    const crs = new CRS(heading);
    const rotatedLatLng = crs.invertedLatLng(33.123134, 151.123134);
    expect(rotatedLatLng).toEqual(
      leaflet.latLng({lat: 33.123134, lng: 151.123134})
    );
  });

  it('Invert South latlng', ()=> {
    const heading = 'HEADING_SOUTH';
    const crs = new CRS(heading);
    const rotatedLatLng = crs.invertedLatLng(33.123134, 151.123134);
    expect(rotatedLatLng).toEqual(
      leaflet.latLng({lat: 33.123134, lng: 151.123134})
    );
  });

  it('Invert East latlng', ()=> {
    const heading = 'HEADING_EAST';
    const crs = new CRS(heading);
    const rotatedLatLng = crs.invertedLatLng(33.123134, 151.123134);
    expect(rotatedLatLng).toEqual(
      leaflet.latLng({lat: -33.123134, lng: -151.123134})
    );
  });

  it('Invert West latlng', ()=> {
    const heading = 'HEADING_WEST';
    const crs = new CRS(heading);
    const rotatedLatLng = crs.invertedLatLng(33.123134, 151.123134);
    expect(rotatedLatLng).toEqual(
      leaflet.latLng({lat: -33.123134, lng: -151.123134})
    );
  });
});
