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

     var topographie, infos = {};
     var dynamicLayerInfos;

     var dndSource = new Source("layerList4");
     dndSource.on("DndDrop", reorderLayers);

     topographie = new ArcGISDynamicMapServiceLayer("http://repos.sig.huma-num.fr/arcgis/rest/services/medievalgis/topographie/MapServer", {
        "id": "topographie"
     });
     topographie.on("load", function (e) {
        dynamicLayerInfos = e.target.createDynamicLayerInfosFromLayerInfos();
        arrayUtils.forEach(dynamicLayerInfos, function (info) {
           var i = {
              id: info.id,
              name: info.name,
              position: info.id
           };
           if (arrayUtils.indexOf(topographie.visibleLayers, info.id) > -1) {
              i.visible = true;
           } else {
              i.visible = false;
           }
           infos[info.id] = i;
        });
        infos.total = dynamicLayerInfos.length;
        e.target.setDynamicLayerInfos(dynamicLayerInfos, true);
     });
     // only create the layer list the first time update-end fires
     on.once(topographie, "update-end", buildLayerList);
  //   map.addLayer(topographie);
table.push(topographie);

       function buildLayerList() {
        dndSource.clearItems();
        domConstruct.empty(dom.byId("layerList4"));

        var layerNames = [];
        for (var info in infos) {
           if (!infos[info].hasOwnProperty("id")) {
              continue;
           }
           // only want the layer's name, don't need the db name and owner name
           var nameParts = infos[info].name.split(".");
           var layerName = nameParts[nameParts.length - 1];
           var layerDiv = createToggle(layerName, infos[info].visible);
           layerNames[infos[info].position] = layerDiv;
        }

        dndSource.insertNodes(false, layerNames);
     }

     function toggleLayer(e) {
        for (var info in infos) {
           var i = infos[info];
           if (i.name === e.target.name) {
              i.visible = !i.visible;
           }
        }
        var visible = getVisibleLayers();
        if (visible.length === 0) {
           topographie.setVisibleLayers([-1]);
        } else {
           topographie.setDynamicLayerInfos(visible);
        }
     }

     function reorderLayers() {
        var newOrder = getVisibleLayers();
        topographie.setDynamicLayerInfos(newOrder);
     }

     function getVisibleLayers() {
        // get layer name nodes, build an array corresponding to new layer order
        var layerOrder = [];
        query("#layerList4 .dojoDndItem label").forEach(function (n, idx) {
           for (var info in infos) {
              var i = infos[info];
              if (i.name === n.innerHTML) {
                 layerOrder[idx] = i.id;
                 // keep track of a layer's position in the layer list
                 i.position = idx;
                 break;
              }
           }
        });
        // find the layer IDs for visible layer
        var ids = arrayUtils.filter(layerOrder, function (l) {
           return infos[l].visible;
        });
        // get the dynamicLayerInfos for visible layers
        var visible = arrayUtils.map(ids, function (id) {
           return dynamicLayerInfos[id];
        });
        return visible;
     }

     function createToggle(name, visible) {
        var div = domConstruct.create("div");
        var layerVis = domConstruct.create("input", {
           checked: visible,
           id: name,
           name: name,
           type: "checkbox"
        }, div);
        on(layerVis, "click", toggleLayer);
        var layerSpan = domConstruct.create("label", {
           for: name,
           innerHTML: name
        }, div);
        return div;
     }
  });
