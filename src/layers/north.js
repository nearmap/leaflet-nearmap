import leaflet from 'leaflet';

const tileWidth = 256;
const tileHeight = 256;
/**
  * Wraping TileLayer with custom getTileUrl of north heading
  *
  **/
export default function north(url) {
  const LayerClass = leaflet.TileLayer.extend({
    getTileUrl: function({x, y, z}) {
      return leaflet.Util.template(url, {
        contentType: 'North',
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
