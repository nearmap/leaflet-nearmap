import leaflet from 'leaflet';

const tileWidth = 256;
const tileHeight = 256;
/**
  * Wraping TileLayer with custom getTileUrl of west heading
  *
  **/
export default function west(url) {
  const LayerClass = leaflet.TileLayer.extend({
    getTileUrl: function(coords) {
      const numTiles = 1 << coords.z; // 2^zoom
      const x = coords.y;
      const y = numTiles - (coords.x + 1);
      return leaflet.Util.template(url, {
        contentType: 'West',
        x,
        y,
        z: coords.z
      });
    }
  });

  return (new LayerClass('', {
    tileSize: leaflet.point(tileWidth, tileHeight)
  }));
}