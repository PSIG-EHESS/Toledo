require([
          "esri/map","esri/layers/FeatureLayer", "esri/dijit/BasemapGallery", "esri/arcgis/utils","dojo/_base/array",
          "esri/layers/ArcGISImageServiceLayer",
          "esri/layers/ImageServiceParameters",
          "dojo/parser",
          "dijit/layout/BorderContainer", "dijit/layout/ContentPane", "dijit/TitlePane",  "dijit/layout/AccordionContainer",
          "dojo/domReady!"
        ],
        function( Map,FeatureLayer, BasemapGallery, arcgisUtils,arrayUtils, ArcGISImageServiceLayer,
        ImageServiceParameters,  parser)
         {
           ajoutRaster("http://repos.sig.huma-num.fr/arcgis/rest/services/medievalgis/Ign_Anitguo_1879/ImageServer","Ign_Anitguo_1879")
           ajoutRaster("http://repos.sig.huma-num.fr/arcgis/rest/services/medievalgis/Ortho_Toledo_BN_1945/ImageServer","Ortho_Toledo_BN_1945")
           ajoutRaster("http://repos.sig.huma-num.fr/arcgis/rest/services/medievalgis/Orto_Toledo_BN_1997/ImageServer","Orto_Toledo_BN_1997")
           ajoutRaster("http://repos.sig.huma-num.fr/arcgis/rest/services/medievalgis/Orto_Toledo_colorR_2006/ImageServer","Orto_Toledo_colorR_2006")
           ajoutRaster("http://repos.sig.huma-num.fr/arcgis/rest/services/medievalgis/Orto_Toledo_ColorR_Sigpa_C2003/ImageServer","Orto_Toledo_colorR_Sigpa_C2003")
           ajoutRaster("http://repos.sig.huma-num.fr/arcgis/rest/services/medievalgis/Plan_Coello_1858/ImageServer","Plan_Coello_1858")
           ajoutRaster("http://repos.sig.huma-num.fr/arcgis/rest/services/medievalgis/Plan_Greco/ImageServer","Plan_Greco")
           ajoutRaster("http://repos.sig.huma-num.fr/arcgis/rest/services/medievalgis/Plan_Reinoso_1882/ImageServer","Plan_Reinoso_1882")
           ajoutRaster("http://repos.sig.huma-num.fr/arcgis/rest/services/medievalgis/Plan_ReyPastor_1926/ImageServer","Plan_ReyPastor_1926")
           ajoutRaster("http://repos.sig.huma-num.fr/arcgis/rest/services/medievalgis/planoantiguo_rectif/ImageServer","planoantiguo_rectif")
http://repos.sig.huma-num.fr/arcgis/rest/services/medievalgis/Orto_Toledo_colorR_2006/ImageServer
           function ajoutRaster(url, idRaster)
           {
                var params = new ImageServiceParameters();
                params.noData = 0;
               var imageServiceLayer = new ArcGISImageServiceLayer(url, {
                 imageServiceParameters: params,
                visible:false,
                 id:idRaster
               });
             map.addLayer(imageServiceLayer);
           }

    });

jQuery.loadScript = function (url, callback) {
    jQuery.ajax({
        url: url,
        dataType: 'script',
        success: callback
    });
}

 $.loadScript('./js/parcellesMaisons.js', function(){});
 $.loadScript('./js/topo.js', function(){});
 $.loadScript('./js/orderrues.js', function(){});
 $.loadScript('./js/orderRaster.js', function(){});
 $.loadScript('./js/symbology.js', function(){});
 $.loadScript('./js/event.js', function(){});
