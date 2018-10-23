function CRS(heading) {
  this.heading = heading;
  this.rotateLatLng = function (lat, lng) {
    switch (heading) {
      case "HEADING_NORTH":
        break;
      case "HEADING_EAST":
        lng = -lng;
        break;
      case "HEADING_SOUTH":
        lat = -lat;
        lng = -lng;
        break;
      case "HEADING_WEST":
        lat = -lat;
        break;
    }
    return L.latLng(lat, lng);
  }

  this.rotatePoint = function (point) {
    if (this.heading === 'HEADING_NORTH' || this.heading === 'HEADING_SOUTH') {
      return L.point(point.x, point.y);
    } else {
      return L.point(point.y, point.x);
    }
  }

  this.project = function (latlng) {
    var rotatedLatLng = this.rotateLatLng(latlng.lat, latlng.lng);
    var point = L.Projection.SphericalMercator.project(rotatedLatLng);
    return this.rotatePoint(point);
  }

  this.unproject = function (point) {
    var rotatedPoint = this.rotatePoint(point);
    var latLng = L.Projection.SphericalMercator.unproject(rotatedPoint);
    return this.rotateLatLng(latLng.lat, latLng.lng);
  }

  this.crs = function () {
    var project = this.project.bind(this);
    var unproject = this.unproject.bind(this);
    var projection = L.extend({}, L.Projection.SphericalMercator, {
      project,
      unproject,
    });

    return L.extend({}, L.CRS.EPSG3857, {
      projection,
      wrapLng: undefined
    });
  }
}