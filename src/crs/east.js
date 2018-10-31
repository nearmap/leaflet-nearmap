import {transformation, extend, CRS, Point} from 'leaflet';
import {project, unproject} from './projection';
import {TILESIZE} from '../constants';

const {east: {width, height}} = TILESIZE;


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
  code: 'nm:east',
  projection,
  transformation: transformation(1, 1/2, -(height/width), (height/width)/2),
  infinite: true
});
