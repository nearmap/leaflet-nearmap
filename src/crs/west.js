import leaflet from 'leaflet';

const projection = leaflet.extend({}, leaflet.Projection.SphericalMercator, {
  /**
  * Translate a location given as a LatLng to a point in world coordinates.
  *
  * The implementation is a simple mercator projection
  * with leaflet SphericalMercator
  * Lat,lon and the resulting point are rotated depending on the
  * heading.
  **/
  project: function(latlng) {
    const rotatedLatLng = leaflet.latLng(latlng.lat, -latlng.lng);
    const point = leaflet.Projection.SphericalMercator.project(rotatedLatLng);
    return leaflet.point(point.y, point.x);
  },

  /**
  * Translate a location given as point in world coordinates to lat, lng.
  *
  * The implementation is re-using leaflet SphericalMercator
  * The given point and the resulting lat,lon are rotated depending
  * on the heading.
  **/
  unproject: function(point) {
    const rotatedPoint = leaflet.point(point.y, point.x);
    const latlng = leaflet.Projection.SphericalMercator
      .unproject(rotatedPoint);
    return leaflet.latLng(latlng.lat, -latlng.lng);
  }
});

export default leaflet.extend({}, leaflet.CRS.EPSG3857, {
  code: 'nm:west',
  projection,
  wrapLng: undefined
});


