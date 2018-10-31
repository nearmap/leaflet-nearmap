import {transformation, extend, CRS} from 'leaflet';
import {project, unproject} from './projection';
import {TILESIZE} from '../constants';

const {south: {width, height}} = TILESIZE;


const projection = {
  project,
  unproject
};


export default extend({}, CRS, {
  code: 'nm:south',
  projection,
  transformation: transformation(-1, 1/2, -(height/width), (height/width)/2),
  infinite: true
});
