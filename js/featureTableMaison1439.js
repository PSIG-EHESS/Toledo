window.onload= function()
{
require([
      "esri/layers/FeatureLayer",
      "esri/dijit/FeatureTable",
      "esri/geometry/Extent",
      "esri/symbols/SimpleMarkerSymbol",
      "esri/symbols/SimpleLineSymbol",
      "esri/Color",
      "esri/InfoTemplate",
      "esri/map",
      "dojo/dom-construct",
      "dojo/dom",
      "dojo/number",
      "dojo/parser",
      "dojo/ready",
      "dojo/on",
      "dojo/_base/lang",
      "dijit/registry",
      "dijit/form/Button",
      "dijit/layout/ContentPane",
      "dijit/layout/BorderContainer",
      "dijit/form/TextBox"
    ], function (
      FeatureLayer, FeatureTable, Extent, SimpleMarkerSymbol, SimpleLineSymbol, Color,InfoTemplate, Map,
      domConstruct, dom, dojoNum, parser, ready, on,lang,
      registry, Button, ContentPane, BorderContainer, TextBox
    ) {

      ready(function(){

        loadTable("http://repos.sig.huma-num.fr/arcgis/rest/services/medievalgis/parcelles_maisons/MapServer/2","Maisons1492","tab2");
        loadTable("http://repos.sig.huma-num.fr/arcgis/rest/services/medievalgis/parcelles_maisons/MapServer/3","Maisons1492","tab3");

        function loadTable(layer_url,layerName,tabId){
          var url = layer_url;
          var monjson=null;
          var content="";
          //AJAX
          var ajax = new XMLHttpRequest();ajax.open('GET',url+"?f=pjson", true);ajax.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
          ajax.addEventListener('readystatechange',  function(e)
          {
            if(ajax.readyState == 4 && ajax.status == 200)
            {
                      monjson =JSON.parse(ajax.responseText);
                      var i=0;

                  for(i=0;i<monjson.fields.length;i++)
                      {
                         content+= "<b>"+monjson.fields[i].name+"</b>: ${"+monjson.fields[i].name+"}<br>";
                      }
            }
           });
           ajax.send();

               var infoTemplate = new InfoTemplate(layerName, content);

                       var myFeatureLayer = new FeatureLayer(url,{
                          mode: FeatureLayer.MODE_ONDEMAND,
                          infoTemplate: infoTemplate,
                          outFields: ["*"],
                          showLabels:true,
                          visible: true,
                          id: "fLayer3"
                        });

          // set a selection symbol for the featurelayer
          var selectionSymbol =  new SimpleMarkerSymbol(SimpleMarkerSymbol.STYLE_SQUARE, 12,
            new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID, new Color([0, 255, 197, 1])));
          myFeatureLayer.setSelectionSymbol(selectionSymbol);

          map.addLayer(myFeatureLayer);

          // create new FeatureTable and set its properties
          var myFeatureTable = new FeatureTable({
            featureLayer : myFeatureLayer,
            map : map,
            showAttachments: true,
            // only allows selection from the table to the map
            syncSelection: true,
            zoomToSelection: true,
            gridOptions: {allowSelectAll: true, allowTextSelection: true},
            outFields: ["*"],
          }, tabId);

          myFeatureTable.startup();

          // listen to show-attachments event
          myFeatureTable.on("show-attachments", function(evt){
            console.log("show-attachments event - ", evt);
          });
        }
      });
    }
  );
}
