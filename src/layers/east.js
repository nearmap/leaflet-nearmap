import {TileLayer, Util, Point} from 'leaflet';
import {TILESIZE} from '../constants';

const {east: {width, height}} = TILESIZE;

/**
  * Wraping TileLayer with custom getTileUrl of east heading
  *
  **/
export default function east(url) {
  const LayerClass = TileLayer.extend({
    getTileUrl(coords) {
      const numTiles = 1 << coords.z; // 2^zoom
      const x = numTiles - (coords.y + 1);
      const y = coords.x;
      return Util.template(url, {
        contentType: 'East',
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
