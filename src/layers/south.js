import {TileLayer, Util, Point} from 'leaflet';
import {TILESIZE} from '../constants';

const {south: {width, height}} = TILESIZE;
/**
  * Wraping TileLayer with custom getTileUrl of south heading
  *
  **/
export default function south(url) {
  const LayerClass = TileLayer.extend({
    getTileUrl(coords) {
      const numTiles = 1 << coords.z; // 2^zoom
      const x = numTiles - (coords.x + 1);
      const y = numTiles - (coords.y + 1);
      return Util.template(url, {
        contentType: 'South',
        x,
        y,
        z: coords.z
      });
    }
  });

  return (new LayerClass('', {
    tileSize: new Point(width, height)
  }));
}
