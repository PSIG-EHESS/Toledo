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

     var rue, infos = {};
     var dynamicLayerInfos;
     var urlCouche="http://repos.sig.huma-num.fr/arcgis/rest/services/medievalgis/routes/MapServer";
     rue = new ArcGISDynamicMapServiceLayer(urlCouche, {
         "id": "rue"
     });

 rue.on("load",buildLayerList);
 //table.push(rue);
map.addLayer(rue);
 function buildLayerList() {
           var items = arrayUtils.map(rue.layerInfos, function(info, index) {
            info.defaultVisibility=false;
             return "<input type='checkbox' class='list_item3'" + (info.defaultVisibility ? "checked=checked" : "") + "' id='rue" + info.id + "'' /><label for='rue" + info.id + "'>" + info.name + "</label><br>";
           });
           var ll = dom.byId("layerList3");
           ll.innerHTML = items.join(' ');
           rue.setVisibleLayers(visible);
           on(ll, "click", updateLayerVisibility);
         }

         function updateLayerVisibility() {
           var inputs = query(".list_item3");
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
           rue.setVisibleLayers(visible);
         }


  });
