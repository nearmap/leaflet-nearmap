function Nearmap(nearMapConfig) {
  this.nearMapConfig = nearMapConfig;
  this.init = function() {
    var nearMapConfig = this.nearMapConfig;
    var mapOption = {
      crs: (new CRS(nearMapConfig.heading, L)).crs(),
      // minZoom: 1, // optional
      // maxZoom: 24, // optional
      // noWrap: true, // optional
      // continuousWorld: true, // optional
    };

    var nearMapView = L.map('mapid', mapOption).setView(nearMapConfig.center, nearMapConfig.zoom);

    var extLayer = L.TileLayer.extend({ getTileUrl: this.getTileUrl(nearMapConfig) })

    var nearMapLayer = new extLayer({ tileSize: nearMapConfig.tileSize });

    nearMapLayer.addTo(nearMapView);

    this.coordsHandler(nearMapView);
  }

  this.getTileUrl = function ({ url, heading }) {
    return function (coords) {
      var x, y, contentType, numTiles = 1 << coords.z; // 2^zoom

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
    }
  }

  this.coordsHandler = function (nearMapView) {
    // Handler Coordinates popup
    nearMapView.on('click', function (e) {
      L.popup()
        .setLatLng(e.latlng)
        .setContent("You clicked the map at " + e.latlng.toString())
        .openOn(nearMapView);
    });
  }
}