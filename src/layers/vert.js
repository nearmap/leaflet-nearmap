import leaflet from 'leaflet';

const tileWidth = 256;
const tileHeight = 256;
/**
  * Wraping TileLayer with custom getTileUrl of vertical heading
  *
  **/
export default function vert(url) {
  const LayerClass = leaflet.TileLayer.extend({
    getTileUrl: function(coords) {
      return (
        url
          .replace('{contentType}', 'Vert')
          .replace('{x}', coords.x)
          .replace('{y}', coords.y)
          .replace('{z}', coords.z)
      );
    }
  });

  return (new LayerClass({
    tileSize: leaflet.point(tileWidth, tileHeight)
  }));
}
