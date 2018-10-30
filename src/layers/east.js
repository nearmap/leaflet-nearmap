import leaflet from 'leaflet';

const tileWidth = 256;
const tileHeight = 256;

/**
  * Wraping TileLayer with custom getTileUrl of east heading
  *
  **/
export default function east(url) {
  const LayerClass = leaflet.TileLayer.extend({
    getTileUrl: function(coords) {
      const numTiles = 1 << coords.z; // 2^zoom
      const x = numTiles - (coords.y + 1);
      const y = coords.x;
      return leaflet.Util.template(url, {
        contentType: 'East',
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
