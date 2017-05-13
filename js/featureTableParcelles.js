require([
      "esri/layers/FeatureLayer",
      "esri/dijit/FeatureTable",
      "esri/geometry/Extent",
      "esri/symbols/SimpleMarkerSymbol",
      "esri/symbols/SimpleLineSymbol",
      "esri/InfoTemplate",
      "esri/map",
      "esri/dijit/Search",
      "esri/symbols/SimpleFillSymbol",
      "esri/symbols/TextSymbol",
        "esri/renderers/SimpleRenderer",
        "esri/layers/LabelClass",
        "esri/Color",

      "dojo/dom-construct",
      "dojo/dom",
      "dojo/number",
      "dojo/parser",
      "dojo/ready",
      "dojo/on",
      "dojo/query",
      "dojo/_base/lang",
      "dijit/registry",
      "dijit/form/Button",
      "dijit/layout/ContentPane",
      "dijit/layout/BorderContainer",
      "dijit/form/TextBox"
    ], function (
      FeatureLayer, FeatureTable, Extent, SimpleMarkerSymbol, SimpleLineSymbol, InfoTemplate, Map,Search,
       SimpleFillSymbol,TextSymbol, SimpleRenderer, LabelClass,Color,domConstruct, dom, dojoNum, parser, ready, on,Query,lang,
      registry, Button, ContentPane, BorderContainer, TextBox
    ) {

      ready(function(){

        loadTable();

        function loadTable(){
          var url = "http://repos.sig.huma-num.fr/arcgis/rest/services/medievalgis/parcelles_maisons/MapServer/1";
          var monjson=null;
          var content="";

          // create a renderer for the states layer to override default symbology
        var statesColor = new Color("#666");

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

                     var infoTemplate = new InfoTemplate("Parcelles", content);

                       var myFeatureLayer = new FeatureLayer(url,{
                          mode: FeatureLayer.MODE_ONDEMAND,
                          showLabels:false,
                          infoTemplate: infoTemplate,
                          outFields: ["*"],
                          visible: true,
                          id: "fLayer1"
                        });

                      // myFeatureLayer.setRenderer(statesRenderer);
                    // create a text symbol to define the style of labels


          // set a selection symbol for the featurelayer
         var selectionSymbol =  new SimpleMarkerSymbol(SimpleMarkerSymbol.STYLE_SQUARE, 12,
        new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID, new Color([0, 255, 197, 1])));


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
          }, 'tab1');

          sources.push({
            featureLayer: myFeatureLayer,
            searchFields: ["FID_parcel"],
            displayField: "FID_parcel",
            exactMatch: false,
            outFields: ["*"],
            name: "Parcelles",
            placeholder: "Id de la parcelle",
            enableSuggestions: true,
            maxResults: 6,
            maxSuggestions: 6,
            minCharacters:0,
            infoTemplate:infoTemplate

         });
         search.set("sources", sources);

          myFeatureTable.startup();

          map.on("click", function (e) {
            var query = new Query();
            query.geometry = e.mapPoint;
            var deferred = myFeatureLayer.selectFeatures(query, FeatureLayer.SELECTION_NEW, function (selection) {
              //update the url param if a parcel was located
              if (selection.length > 0) {
                var parcelid = selection[0].attributes["FID_parcel"];
                //Refresh the URL with the currently selected parcel
                if (typeof history.pushState !== "undefined") {
                  window.history.pushState(null, null, "?parcelid=" + selection[0].attributes.FID_parcel);
                }
              }
            });
            map.infoWindow.setFeatures([deferred]);
            map.infoWindow.show(e.mapPoint);
          });

          // listen to show-attachments event
          myFeatureTable.on("show-attachments", function(evt){
            console.log("show-attachments event - ", evt);
          });
        }
      });
    }
  );
