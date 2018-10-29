import north from '../crs/north';
import south from '../crs/south';
import east from '../crs/east';
import west from '../crs/west';
import {
  HEADING_VERT,
  HEADING_NORTH,
  HEADING_SOUTH,
  HEADING_EAST,
  HEADING_WEST
} from '../constants';

/**
  * Serving cooresponding CRS based on heading
  *
  * This method is helper function done on behalf of users
  **/
export function getCRSByHeading(heading) {
  switch (heading) {
    case HEADING_EAST:
      return east;
    case HEADING_SOUTH:
      return south;
    case HEADING_WEST:
      return west;
    case HEADING_VERT:
    case HEADING_NORTH:
    default:
      return north;
  }
}
