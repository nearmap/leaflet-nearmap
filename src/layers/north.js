import {TileLayer, Util, Point} from 'leaflet';
import {TILESIZE} from '../constants';

const {north: {width, height}} = TILESIZE;
/**
  * Wraping TileLayer with custom getTileUrl of north heading
  *
  **/
export default function north(url) {
  const LayerClass = TileLayer.extend({
    getTileUrl: function({x, y, z}) {
      return Util.template(url, {
        contentType: 'North',
        x,
        y,
        z
      });
    }
  });

  return (new LayerClass('', {
    tileSize: new Point(width, height)
  }));
}
