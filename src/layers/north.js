import leaflet from 'leaflet';

const tileWidth = 256;
const tileHeight = 192;
/**
  * Wraping TileLayer with custom getTileUrl of north heading
  *
  **/
export default function north(url) {
  const LayerClass = leaflet.TileLayer.extend({
    getTileUrl: function(coords) {
      return (
        url
          .replace('{contentType}', 'North')
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
