
require([
  "esri/layers/FeatureLayer",
  "esri/dijit/Legend",
  "esri/dijit/FeatureTable",
  "esri/geometry/Extent",
  "esri/symbols/SimpleFillSymbol",
   "esri/symbols/SimpleLineSymbol",
   "esri/Color",
   "esri/dijit/Popup",
    "esri/dijit/PopupTemplate",
  "esri/graphicsUtils",
  "esri/tasks/query",
  "esri/symbols/PictureMarkerSymbol",
  "esri/InfoTemplate",
  "esri/map",
  "dojo/dom",
  "dojo/parser",
  "dojo/ready",
  "dojo/on",
  "dijit/layout/ContentPane",
  "dijit/layout/BorderContainer"
], function (
  FeatureLayer,Legend, FeatureTable, Extent, SimpleFillSymbol, SimpleLineSymbol, Color,Popup, PopupTemplate, graphicsUtils, Query, PictureMarkerSymbol,InfoTemplate, Map,
  dom, parser, ready, on, ContentPane, BorderContainer
) {
    ready(function(){
      //Load a FeatureTable to the application once map loads
      var url = "http://repos.sig.huma-num.fr/arcgis/rest/services/medievalgis/parcelles/MapServer/0";
      var monjson=null;
      //AJAX
      var ajax = new XMLHttpRequest();ajax.open('GET',url+"?f=pjson", true);ajax.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
      ajax.addEventListener('readystatechange',  function(e) {if(ajax.readyState == 4 && ajax.status == 200){
                  monjson =JSON.parse(ajax.responseText);
                  var i=0;
                  var content="";
                  for(i=0;i<monjson.fields.length;i++)
                  {
                     content+= "<b>"+monjson.fields[i].name+"</b>: ${"+monjson.fields[i].name+"}<br>";
                  }

                    var infoTemplate = new InfoTemplate("Parcelle", content);


        // editable FeatureLayer
        var myFeatureLayer = new FeatureLayer(url, {
          mode: FeatureLayer.MODE_ONDEMAND,
          infoTemplate: infoTemplate,
          outFields: ["*"],
          visible: true,
          id: "fLayer2"
        });



        // listen to featurelayer click event to handle selection
        // from layer to the table.
        // when user clicks on a feature on the map, the corresponding
        // record will be selected in the table.
        //add the legend

        //add the legend


        myFeatureLayer.on("click", function(evt) {
          var idProperty = myFeatureLayer.objectIdField,
            feature,
            featureId,
            query;

          if (evt.graphic && evt.graphic.attributes && evt.graphic.attributes[idProperty]) {
            feature = evt.graphic,
            featureId = feature.attributes[idProperty];

            query = new Query();
            query.returnGeometry = false;
            query.objectIds = [featureId];
            query.where = "1=1";

            myFeatureLayer.selectFeatures(query, FeatureLayer.SELECTION_NEW);
          }
        });


        // apply the selection symbol for the layer
          var selectionSymbol = new SimpleFillSymbol(SimpleFillSymbol.STYLE_SOLID,
            new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID,
              new Color([255, 0, 0, 0.6]), 1),
            new Color([255, 0, 0, 0.6]));
          myFeatureLayer.setSelectionSymbol(selectionSymbol);
        // record will be selected in the table.
          myFeatureLayer.on("click", function(evt) {
           var idProperty = myFeatureLayer.objectIdField;
           var feature, featureId, query;

           if (evt.graphic && evt.graphic.attributes && evt.graphic.attributes[idProperty]) {
               feature = evt.graphic,
               featureId = feature.attributes[idProperty];

               query = new Query();
               query.returnGeometry = false;
               query.objectIds = [featureId];
               query.where = "1=1";

               myFeatureLayer.selectFeatures(query, FeatureLayer.SELECTION_NEW);
           }
         });

        // Redlands police vehicle locations layer
        // this layer is an editable layer
        //map.addLayer(myFeatureLayer);
      table.push(myFeatureLayer)
        //create new FeatureTable and set its properties
        var myFeatureTable = new FeatureTable({
          featureLayer : myFeatureLayer,
          map : map,
          editable: true,
          showRelatedRecords: true,
          zoomToSelection:true,
          syncSelection: true,
          showAttachments: true,

          // use fieldInfos object to change field's label (column header),
          // change the editability of the field, and to format how field values are displayed
          // you will not be able to edit callnumber field in this example.

        }, 'myTableNode');


        myFeatureTable.startup();

        // listen to refresh event
        myFeatureTable.on("refresh", function(evt){
          console.log("refresh event - ", evt);
        });
}
    });
  ajax.send();
});



  });
