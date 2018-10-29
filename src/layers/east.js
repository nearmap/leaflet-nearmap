import leaflet from 'leaflet';

/**
  * Wraping TileLayer with custom getTileUrl of east heading
  *
  **/
export default function east(url) {
  return leaflet.TileLayer.extend({
    getTileUrl: function(coords) {
      const numTiles = 1 << coords.z; // 2^zoom
      const x = numTiles - (coords.y + 1);
      const y = coords.x;
      return (
        url
          .replace('{contentType}', 'East')
          .replace('{x}', x)
          .replace('{y}', y)
          .replace('{z}', coords.z)
      );
    }
  });
}
