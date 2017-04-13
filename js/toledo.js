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
            var params = new ImageServiceParameters();
            params.noData = 0;
            var imageServiceLayer = new ArcGISImageServiceLayer("http://repos.sig.huma-num.fr/arcgis/rest/services/medievalgis/Orto_Toledo_colorR_2006/ImageServer", {
              imageServiceParameters: params,
              opacity: 0.75
            });
            //map.addLayer(imageServiceLayer);
            table.push(imageServiceLayer);
    });

jQuery.loadScript = function (url, callback) {
    jQuery.ajax({
        url: url,
        dataType: 'script',
        success: callback,
        async: true
    });
}

    $.loadScript('./js/featureTable.js', function(){});
    $.loadScript('./js/orderRaster.js', function(){});
    $.loadScript('./js/ordermaisons.js', function(){});
    $.loadScript('./js/orderparcelles.js', function(){});
    $.loadScript('./js/orderrues.js', function(){});
    $.loadScript('./js/ordertopo.js', function(){});
    $.loadScript('./js/addLayers.js', function(){});
    $.loadScript('./js/legend.js', function(){});
    $.loadScript('./js/event.js', function(){});
