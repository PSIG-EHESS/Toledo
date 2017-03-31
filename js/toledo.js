require([
          "esri/map","esri/layers/FeatureLayer", "esri/dijit/BasemapGallery", "esri/arcgis/utils","dojo/_base/array",
          "esri/layers/ArcGISImageServiceLayer",
          "esri/layers/ImageServiceParameters",
          "dojo/parser",
          "dijit/layout/BorderContainer", "dijit/layout/ContentPane", "dijit/TitlePane",  "dijit/layout/AccordionContainer",
          "dojo/domReady!"
        ],
        function(  Map,FeatureLayer, BasemapGallery, arcgisUtils,arrayUtils, ArcGISImageServiceLayer,
        ImageServiceParameters,  parser)
         {

            parser.parse();
            map = new Map("map", {
                        basemap:"satellite",
                        center: [-4.023569,39.857331],
                        zoom: 16
                      });

            //add the basemap gallery, in this case we'll display maps from ArcGIS.com including bing maps


            var params = new ImageServiceParameters();
            params.noData = 0;
            var imageServiceLayer = new ArcGISImageServiceLayer("http://repos.sig.huma-num.fr/arcgis/rest/services/medievalgis/Orto_Toledo_colorR_2006/ImageServer", {
              imageServiceParameters: params,
              opacity: 0.75
            });
            map.addLayer(imageServiceLayer);
    });

/* fonds de cartes */
