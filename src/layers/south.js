import leaflet from 'leaflet';

const tileWidth = 256;
const tileHeight = 192;
/**
  * Wraping TileLayer with custom getTileUrl of south heading
  *
  **/
export default function south(url) {
  const LayerClass = leaflet.TileLayer.extend({
    getTileUrl: function(coords) {
      const numTiles = 1 << coords.z; // 2^zoom
      const x = numTiles - (coords.x + 1);
      const y = numTiles - (coords.y + 1);
      return (
        url
          .replace('{contentType}', 'South')
          .replace('{x}', x)
          .replace('{y}', y)
          .replace('{z}', coords.z)
      );
    }
  });

  return (new LayerClass({
    tileSize: leaflet.point(tileWidth, tileHeight)
  }));
}
