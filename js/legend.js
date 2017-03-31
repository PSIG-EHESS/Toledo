require([
     "esri/map", "esri/layers/FeatureLayer", "esri/dijit/Legend",
     "dojo/_base/array", "dojo/parser",
     "dijit/layout/BorderContainer", "dijit/layout/ContentPane",
     "dijit/layout/AccordionContainer", "dojo/domReady!"
   ], function(
     Map, FeatureLayer, Legend,
     arrayUtils, parser
   ) {

     //add the legend
     map.on("layers-add-result", function (evt) {
       var layerInfo = arrayUtils.map(evt.layers, function (layer, index) {
         return {layer:layer.layer, title:layer.layer.name};
       });
       if (layerInfo.length > 0) {
         var legendDijit = new Legend({
           map: map,
           layerInfos: layerInfo
         }, "legendDiv2");
         legendDijit.startup();
       }
     });
   });
