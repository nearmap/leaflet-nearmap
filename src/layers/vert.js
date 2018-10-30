import leaflet from 'leaflet';

const tileWidth = 256;
const tileHeight = 256;
/**
  * Wraping TileLayer with custom getTileUrl of vertical heading
  *
  **/
export default function vert(url) {
  const LayerClass = leaflet.TileLayer.extend({
    getTileUrl: function({x, y, z}) {
      return leaflet.Util.template(url, {
        contentType: 'Vert',
        x,
        y,
        z
      });
    }
  });

  return (new LayerClass('', {
    tileSize: leaflet.point(tileWidth, tileHeight)
  }));
}
