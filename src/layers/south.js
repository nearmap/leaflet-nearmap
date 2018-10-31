import {TileLayer, Point} from 'leaflet';
import {TILESIZE} from '../constants';

const {south: {width, height}} = TILESIZE;


export const South = TileLayer.extend({
  getTileUrl({x, y, z}) {
    const numTiles = 1 << z; // 2^zoom
    x = numTiles - (x + 1);
    y = numTiles - (y + 1);
    // eslint-disable-next-line prefer-reflect
    return TileLayer.prototype.getTileUrl.call(this, {x, y, z});
  }
});


export default function south(url) {
  return new South(url, {
    layer: 'South',
    tileSize: new Point(width, height)
  });
}
