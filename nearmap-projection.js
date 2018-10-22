function degreesToRadians(x) {
    return x / 180 * Math.PI;
}

function radiansToDegrees(x) {
    return x / Math.PI * 180;
}

var NearmapCRS = function (heading = "HEADING_NORTH") {

    function rotateLatLng(lat, lng){
        switch(heading){
            case "HEADING_NORTH":
                break;
            case "HEADING_EAST":
                lng = -lng;
                break;
            case "HEADING_SOUTH":
                lat = -lat;
                lng = -lng;
                break;
            case "HEADING_WEST":
                lat = -lat;
                break;
        }
        return L.latLng(lat, lng);
    }

    function rotatePoint(point){
        if(heading === "HEADING_NORTH" || heading === "HEADING_SOUTH"){
            return L.point(point.x, point.y);
        }else{
            return L.point(point.y, point.x);
        }
    }

    var nearmapMercatorProjection = Object.assign({}, L.Projection.SphericalMercator, {
        project: function(latlng) {
            var superFunc = L.Projection.SphericalMercator.project.bind(this);
            var rotatedLatLng = rotateLatLng(latlng.lat, latlng.lng);
            return superFunc(rotatedLatLng);
        },
        unproject: function(point) {
            var superFunc = L.Projection.SphericalMercator.unproject.bind(this);
            var rotatedPoint = rotatePoint(point);
            return superFunc(rotatedPoint);
        }
    });

    return Object.assign({}, L.CRS.EPSG3857, {projection: nearmapMercatorProjection});
}