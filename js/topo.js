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

     var topo, infos = {};
     var dynamicLayerInfos;
    var urlCouche="http://repos.sig.huma-num.fr/arcgis/rest/services/medievalgis/topographie/MapServer";
     topo = new ArcGISDynamicMapServiceLayer(urlCouche, {
         "id": "topo"
     });

 topo.on("load",buildLayerList);
 //table.push(topo);
 map.addLayer(topo);
 function buildLayerList() {
           var items = arrayUtils.map(topo.layerInfos, function(info, index) {
            info.defaultVisibility=false;
             return "<input type='checkbox' class='list_item4'" + (info.defaultVisibility ? "checked=checked" : "") + "' id='" + info.id + "'' /><label for='" + info.id + "'>" + info.name + "</label><br>";
           });
           var ll = dom.byId("layerList4");
           ll.innerHTML = items.join(' ');
           topo.setVisibleLayers(visible);
           on(ll, "click", updateLayerVisibility);
         }

         function updateLayerVisibility() {
           var inputs = query(".list_item4");
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
           topo.setVisibleLayers(visible);
         }


  });
