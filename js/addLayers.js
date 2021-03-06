$(document).ready(function(){
  require([
    "esri/layers/ArcGISDynamicMapServiceLayer",
    "esri/layers/DynamicLayerInfo", "esri/layers/LayerDataSource",
    "esri/layers/LayerDrawingOptions", "esri/layers/TableDataSource",
    "esri/Color", "esri/renderers/SimpleRenderer",
    "esri/symbols/SimpleFillSymbol", "esri/symbols/SimpleLineSymbol",
    "esri/map", "esri/dijit/Search", "dojo/dom", "dojo/dom-construct", "dojo/dom-style",
    "dojo/query", "dojo/on",
    "dojo/parser", "dojo/_base/array", "dojo/dnd/Source", "dijit/registry",
    "dijit/form/Button", "dojo/domReady!"
  ], function (
       ArcGISDynamicMapServiceLayer,
       DynamicLayerInfo, LayerDataSource,
       LayerDrawingOptions, TableDataSource,
       Color, SimpleRenderer,
       SimpleFillSymbol, SimpleLineSymbol,Map,Search,
       dom, domConstruct, domStyle,
       query, on,
       parser, arrayUtils, Source, registry
    ) {

      alert(table.length);
           map.addLayers(table);

           //Set the sources above to the search widget
           search.startup();

           }
  )



});


function reverseArr(input) {
  var ret = new Array;
  for(var i = input.length-1; i >= 0; i--) {
ret.push(input[i]);
}
return ret;
}
