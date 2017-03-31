require([
  "esri/layers/ArcGISDynamicMapServiceLayer",
  "esri/layers/DynamicLayerInfo", "esri/layers/LayerDataSource",
  "esri/layers/LayerDrawingOptions", "esri/layers/TableDataSource",
  "esri/Color", "esri/renderers/SimpleRenderer",
  "esri/symbols/SimpleFillSymbol", "esri/symbols/SimpleLineSymbol",
  "esri/map", "dojo/dom", "dojo/dom-construct", "dojo/dom-style",
  "dojo/query", "dojo/on",
  "dojo/parser", "dojo/_base/array", "dojo/dnd/Source", "dijit/registry",
  "dijit/form/Button", "dojo/domReady!"
], function (
     ArcGISDynamicMapServiceLayer,
     DynamicLayerInfo, LayerDataSource,
     LayerDrawingOptions, TableDataSource,
     Color, SimpleRenderer,
     SimpleFillSymbol, SimpleLineSymbol,Map,
     dom, domConstruct, domStyle,
     query, on,
     parser, arrayUtils, Source, registry
  ) {
map.addLayers(table);
});