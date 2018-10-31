import {TileLayer, Point} from 'leaflet';
import {TILESIZE} from '../constants';

const {west: {width, height}} = TILESIZE;


export const West = TileLayer.extend({
  getTileUrl({x, y, z}) {
    const numTiles = 1 << z; // 2^zoom
    [x, y] = [y, numTiles - (x + 1)];
    // eslint-disable-next-line prefer-reflect
    return TileLayer.prototype.getTileUrl.call(this, {x, y, z});
  }
});


export default function west(url) {
  return new West(url, {
    layer: 'West',
    tileSize: new Point(width, height)
  });
}
