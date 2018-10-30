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
  project: function({lat, lng}) {
    const rotatedLatLng = leaflet.latLng(-lat, -lng);
    return leaflet.Projection.SphericalMercator.project(rotatedLatLng);
  },

  /**
  * Translate a location given as point in world coordinates to lat, lng.
  *
  * The implementation is re-using leaflet SphericalMercator
  * The given point and the resulting lat,lon are rotated depending
  * on the heading.
  **/
  unproject: function(point) {
    const {lat, lng} = leaflet.Projection.SphericalMercator
      .unproject(point);
    return leaflet.latLng(-lat, -lng);
  }
});


export default leaflet.extend({}, EPSG3857, {
  code: 'nm:south',
  projection
});
