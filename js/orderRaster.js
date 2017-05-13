var visible = [];
require([
  "esri/layers/ArcGISDynamicMapServiceLayer","esri/layers/ImageParameters",
  "esri/layers/DynamicLayerInfo", "esri/layers/LayerDataSource",
  "esri/layers/LayerDrawingOptions", "esri/layers/TableDataSource",
  "esri/Color", "esri/renderers/SimpleRenderer",
  "esri/symbols/SimpleFillSymbol", "esri/symbols/SimpleLineSymbol",
  "esri/map", "dojo/dom", "dojo/dom-construct", "dojo/dom-style",
  "dojo/query", "dojo/on",
  "dojo/parser", "dojo/_base/array", "dojo/dnd/Source", "dijit/registry",
  "dijit/form/Button", "dojo/domReady!"
], function (
     ArcGISDynamicMapServiceLayer,ImageParameters,
     DynamicLayerInfo, LayerDataSource,
     LayerDrawingOptions, TableDataSource,
     Color, SimpleRenderer,
     SimpleFillSymbol, SimpleLineSymbol,Map,
     dom, domConstruct, domStyle,
     query, on,
     parser, arrayUtils, Source, registry
  ) {

     var raster, infos = {};
     var dynamicLayerInfos;
    var urlCouche="http://repos.sig.huma-num.fr/arcgis/rest/services/medievalgis/Rasters/MapServer";
     raster = new ArcGISDynamicMapServiceLayer(urlCouche, {
         "id": "raster"
     });

 raster.on("load",buildLayerList);
 map.addLayer(raster);
 function buildLayerList() {
           var items = arrayUtils.map(raster.layerInfos, function(info, index) {
            info.defaultVisibility=false;
             return "<input type='checkbox' class='list_item5'" + (info.defaultVisibility ? "checked=checked" : "") + "' id='raster" + info.id + "'' /><label for='raster" + info.id + "'>" + info.name + "</label><br>";
           });
           var ll = dom.byId("layerList5");
           ll.innerHTML = items.join(' ');
           raster.setVisibleLayers(visible);
           on(ll, "click", updateLayerVisibility);
         }

         function updateLayerVisibility() {
           var inputs = query(".list_item5");
           var input;
           visible = [];

           arrayUtils.forEach(inputs, function(input) {
             if (input.checked) {
               visible.push(input.id);
             }
           });
           //if there aren't any layers visible set the array to be -1
           if (visible.length === 0) {
             visible.push(-1);
           }
           raster.setVisibleLayers(visible);
         }


  });
