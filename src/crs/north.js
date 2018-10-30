import leaflet from 'leaflet';


const {SphericalMercator} = leaflet.Projection;
const {EPSG3857} = leaflet.CRS;


const projection = leaflet.extend({}, SphericalMercator, {
  /**
  * Translate a location given as a LatLng to a point in world coordinates.
  *
  * The implementation is a simple mercator projection
  * with leaflet SphericalMercator
  * Lat,lon and the resulting point are rotated depending on the
  * heading.
  **/
  project: function(latlng) {
    return leaflet.Projection.SphericalMercator.project(latlng);
  },

  /**
  * Translate a location given as point in world coordinates to lat, lng.
  *
  * The implementation is re-using leaflet SphericalMercator
  * The given point and the resulting lat,lon are rotated depending
  * on the heading.
  **/
  unproject: function(point) {
    return leaflet.Projection.SphericalMercator.unproject(point);
  }
});


export default leaflet.extend({}, EPSG3857, {
  code: 'nm:north',
  projection
});


