var map;
var table=[];
require(["esri/map", "dojo/domReady!"], function(Map) {
  map = new Map("map", {
              basemap:"satellite",
              center: [-4.023569,39.857331],
              zoom: 16
            });
});
