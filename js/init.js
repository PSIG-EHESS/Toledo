var map;
var table=[];
var sources=[];
var search;

require(["esri/map", "esri/dijit/Search","esri/dijit/Popup", "esri/dijit/PopupTemplate",
          "esri/symbols/SimpleFillSymbol", "esri/Color",
          "dojo/dom-class", "dojo/dom-construct", "dojo/on",
          "dojox/charting/Chart", "dojox/charting/themes/Dollar",
          "dojo/domReady!"],
          function(Map,Search,Popup, PopupTemplate,
          SimpleFillSymbol, Color,
          domClass, domConstruct, on,
          Chart, theme) {

            var fill = new SimpleFillSymbol("solid", null, new Color([127,15,11]));
             var popup = new Popup({
               fillSymbol: fill,
               titleInBody: false
               }, domConstruct.create("div"));
             domClass.add(popup.domNode, "dark");

          map = new Map("map", {
                      basemap:"satellite",
                      showLabels:true,
                      center: [-4.023569,39.857331],
                      zoom: 16,
                      infoWindow:popup
                    });

             search = new Search({
             enableButtonMode: true, //this enables the search widget to display as a single button
             enableLabel: false,
             enableInfoWindow: true,
             showInfoWindowOnSelect: false,
             map: map
          }, "search");
          sources = search.get("sources");

});
/*
"esri/map",
        "esri/dijit/Popup", "esri/dijit/PopupTemplate",
        "esri/layers/FeatureLayer",
        "esri/symbols/SimpleFillSymbol", "esri/Color",
        "dojo/dom-class", "dojo/dom-construct", "dojo/on",
        "dojox/charting/Chart", "dojox/charting/themes/Dollar",
        "dojo/domReady!"


        Map,
                Popup, PopupTemplate,
                FeatureLayer,
                SimpleFillSymbol, Color,
                domClass, domConstruct, on,
                Chart, theme*/
