import {transformation, extend, CRS, Point} from 'leaflet';
import {project, unproject} from './projection';
import {TILESIZE} from '../constants';

const {west: {width, height}} = TILESIZE;


const projection = {
  project(latlng) {
    const {x, y} = project(latlng);
    return new Point(y, x);
  },

  unproject({x, y}) {
    return unproject(new Point(y, x));
  }
};


export default extend({}, CRS, {
  code: 'nm:west',
  projection,
  transformation: transformation(-1, 1/2, height/width, (height/width)/2),
  infinite: true
});
