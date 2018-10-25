import leaflet from 'leaflet';

const CRS = leaflet.Class.extend({
  /**
   * Leaflet constructor
   */
  initialize: function(heading) {
    // HEADING_VERT behaves as same as HEADING_NORTH
    this.heading = heading === 'HEADING_VERT' ? 'HEADING_NORTH' : heading;
  },

  /**
    * Rotate the lat, lng depending on the projection's heading.
    * This helper method is used by the projection methods.
    *
    * @returns a LatLng() object.
  **/
  rotateLatLng: function({lat, lng}) {
    switch (this.heading) {
      case 'HEADING_NORTH':
        break;
      case 'HEADING_EAST':
        lng = -lng;
        break;
      case 'HEADING_SOUTH':
        lat = -lat;
        lng = -lng;
        break;
      case 'HEADING_WEST':
        lat = -lat;
        break;
    }
    return leaflet.latLng(lat, lng);
  },

  /**
  * Switch x,y to y,x depending on the projection's heading.
  * This helper method is used by the projection methods.
  *
  * @returns a new Point() object.
  **/
  rotatePoint: function(point) {
    if (this.heading === 'HEADING_NORTH' || this.heading === 'HEADING_SOUTH') {
      return leaflet.point(point.x, point.y);
    }
    return leaflet.point(point.y, point.x);
  },

  /**
  * Invert lat, lng to -lat, lng when heading east or west
  * This helper method is used by the projection methods.
  *
  * @returns a new Point() object.
  **/
  invertedLatLng: function(lat, lng) {
    if (this.heading === 'HEADING_NORTH' || this.heading === 'HEADING_SOUTH') {
      return {lat, lng};
    }
    return {lat: -lat, lng: -lng};
  },

  /**
  * Generate URL with the projection's heading
  * and cooresponding x, y and zoomLevel.
  * This helper method is used by TileLayer extends function
  *
  * @returns url string.
  **/
  getTileUrl: function({url, heading}) {
    return function(coords) {
      let x = coords.x;
      let y = coords.y;
      let contentType = 'Vert';
      const numTiles = 1 << coords.z; // 2^zoom

      switch (heading) {
        case 'HEADING_EAST':
          x = numTiles - (coords.y + 1);
          y = coords.x;
          contentType = 'East';
          break;
        case 'HEADING_SOUTH':
          x = numTiles - (coords.x + 1);
          y = numTiles - (coords.y + 1);
          contentType = 'South';
          break;
        case 'HEADING_WEST':
          x = coords.y;
          y = numTiles - (coords.x + 1);
          contentType = 'West';
          break;
        case 'HEADING_NORTH':
          x = coords.x;
          y = coords.y;
          contentType = 'North';
          break;
        case 'Vert':
        default:
          x = coords.x;
          y = coords.y;
          contentType = 'Vert';
      }

      return (
        url
          .replace('{contentType}', contentType)
          .replace('{x}', x)
          .replace('{y}', y)
          .replace('{z}', coords.z)
      );
    };
  },

  /**
  * Translate a location given as a LatLng to a point in world coordinates.
  *
  * The implementation is a simple mercator projection
  * with leaflet SphericalMercator
  * Lat,lon and the resulting point are rotated depending on the
  * heading.
  **/
  project: function(latlng) {
    const invertedLatLng = this.invertedLatLng(latlng.lat, latlng.lng);
    const rotatedLatLng = this.rotateLatLng(invertedLatLng);
    const point = leaflet.Projection.SphericalMercator.project(rotatedLatLng);
    return this.rotatePoint(point);
  },

  /**
  * Translate a location given as point in world coordinates to lat, lng.
  *
  * The implementation is re-using leaflet SphericalMercator
  * The given point and the resulting lat,lon are rotated depending
  * on the heading.
  **/
  unproject: function(point) {
    const rotatedPoint = this.rotatePoint(point);
    const latLng = leaflet.Projection.SphericalMercator.unproject(rotatedPoint);
    return this.rotateLatLng(this.invertedLatLng(latLng.lat, latLng.lng));
  },

  /**
  * Generate Leaflet Spherical Mercator projection coordinate system(EPSG3857)
  * with rewriting project and unproject methods
  * in order to fitting in Nearmap panorama
  *
  * TODO: wrapLng default to (-180, 180),
  * it converts x,y to be negative when fetching tiles
  * Setting to 'undefine' means no extra calculation on coords
  **/
  crs: function() {
    const project = this.project.bind(this);
    const unproject = this.unproject.bind(this);
    const projection = leaflet.extend({},
      leaflet.Projection.SphericalMercator,
      {
        project,
        unproject
      }
    );

    return leaflet.extend({}, leaflet.CRS.EPSG3857, {
      projection,
      wrapLng: undefined
    });
  }

});

export default CRS;
