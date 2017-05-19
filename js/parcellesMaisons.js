window.onload= function()
{
require([
      "esri/dijit/Popup",
      "esri/dijit/PopupTemplate",
      "esri/layers/FeatureLayer",
      "esri/dijit/FeatureTable",
      "esri/symbols/SimpleFillSymbol",
      "esri/geometry/Extent",
      "esri/symbols/SimpleMarkerSymbol",
      "esri/symbols/SimpleLineSymbol",
      "esri/Color",
      "dojo/dom-class",
      "esri/InfoTemplate",
      "esri/map",
      "dojo/dom-construct",
      "dojo/dom",
      "dojo/number",
      "dojo/parser",
      "dojo/ready",
      "dojo/dom-construct",
      "dojo/on",
      "dojo/_base/lang",
      "dijit/registry",
      "dijit/form/Button",
      "dijit/layout/ContentPane",
      "dijit/layout/BorderContainer",
      "dojox/charting/themes/Dollar",
      "dijit/form/TextBox",

    ], function (
      Popup, PopupTemplate,FeatureLayer,FeatureTable,SimpleFillSymbol, Extent, SimpleMarkerSymbol, SimpleLineSymbol, Color,domClass,InfoTemplate, Map,
      domConstruct, dom, dojoNum, parser, ready, on,lang,
      registry, Button, ContentPane, BorderContainer, TextBox,theme
    ) {
      ready(function(){
        var tab=[] ;
        loadTable("http://repos.sig.huma-num.fr/arcgis/rest/services/medievalgis/parcelles_maisons/MapServer/1","Parcelles","tab1","FID_parcel","Id de la parcelle",false,true);
        loadTable("http://repos.sig.huma-num.fr/arcgis/rest/services/medievalgis/parcelles_maisons/MapServer/3","Maisons1492","tab3","CODIGO","CODIGO de la maison",false,false);
        loadTable("http://repos.sig.huma-num.fr/arcgis/rest/services/medievalgis/parcelles_maisons/MapServer/2","Maisons1439","tab2","CODIGO","CODIGO de la maison",false,false);

        map.addLayers(tab);
        $("#tab2").hide();
        $("#tab3").hide();

        var myFeatureLayer2 = new FeatureLayer("http://repos.sig.huma-num.fr/arcgis/rest/services/medievalgis/parcelles_maisons/MapServer/0",{
             mode: FeatureLayer.MODE_ONDEMAND,
             visible: false,
             id: "Murs Anciens Recales"
           });
           map.addLayer(myFeatureLayer2);

        function loadTable(layer_url,layerName,tabId,searchField,placeholde,affichageLabel,visibilite){
          var url = layer_url;
          var monjson=null;
          var content="";
          var infoTemplate = new PopupTemplate(layerName);
                    infoTemplate.title=layerName;
                    switch (layerName) {
                      case "Parcelles":
                        content+="<b>ID Parcelle:</b>${FID_parcel}<br><a href=${ruta_web} target='_blank'>Voir plus</a></br>";
                        infoTemplate.setContent(content);

                        break;

                        case "Maisons1439":
                        content+="<b>CODIGO : ${CODIGO}<br>HABITACULO : ${HABITACULO}</b><br><img style='height:100%;width:100%' src='${PHOTO}' alt='Image non Trouvée'>";
                          infoTemplate.setContent(content);
                          break;
                          case "Maisons1492":
                          content+="<b>CODIGO : ${CODIGO}<br>HABITACULO : ${HABITACULO}</b><br><img style='height:100%;width:100%' src='${PHOTO}'alt='Image non Trouvée'>";
                            infoTemplate.setContent(content);
                            break;
                      default:

                    }

                       var myFeatureLayer = new FeatureLayer(url,{
                          mode: FeatureLayer.MODE_ONDEMAND,
                          infoTemplate: infoTemplate,
                          outFields: ["*"],
                          showLabels:affichageLabel,
                          visible: visibilite,
                          id: layerName
                        });


          // set a selection symbol for the featurelayer
        var selectionSymbol =  new SimpleMarkerSymbol(SimpleMarkerSymbol.STYLE_SQUARE, 12,
            new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID, new Color([0, 255, 197, 1])));
          myFeatureLayer.setSelectionSymbol(selectionSymbol);


        //map.addLayer(myFeatureLayer);
        tab.push(myFeatureLayer);
          // create new FeatureTable and set its properties
          var myFeatureTable = new FeatureTable({
            featureLayer : myFeatureLayer,
            map : map,
            showAttachments: true,
            // only allows selection from the table to the map
            syncSelection: false,
            zoomToSelection: true,
            gridOptions: {allowSelectAll: true, allowTextSelection: true},
            outFields: ["*"],
          }, tabId);

          sources.push({
            featureLayer: myFeatureLayer,
            searchFields: [searchField],
            displayField: searchField,
            exactMatch: false,
            outFields: ["*"],
            name: layerName,
            placeholder: placeholde,
            enableSuggestions: true,
            maxResults: 6,
            maxSuggestions: 6,
            minCharacters:0,
            infoTemplate:infoTemplate

         });
         search.set("sources", sources);

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
