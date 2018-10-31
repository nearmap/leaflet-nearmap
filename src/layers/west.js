import {TileLayer, Util, Point} from 'leaflet';
import {TILESIZE} from '../constants';

const {west: {width, height}} = TILESIZE;
/**
  * Wraping TileLayer with custom getTileUrl of west heading
  *
  **/
export default function west(url) {
  const LayerClass = TileLayer.extend({
    getTileUrl(coords) {
      const numTiles = 1 << coords.z; // 2^zoom
      const x = coords.y;
      const y = numTiles - (coords.x + 1);
      return Util.template(url, {
        contentType: 'West',
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
