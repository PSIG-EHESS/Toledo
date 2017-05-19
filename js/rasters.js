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
           ajoutRaster("http://repos.sig.huma-num.fr/arcgis/rest/services/medievalgis/Ign_Anitguo_1879/ImageServer","Ign_Anitguo_1879"," Ign Anitguo 1879");
           ajoutRaster("http://repos.sig.huma-num.fr/arcgis/rest/services/medievalgis/Ortho_Toledo_BN_1945/ImageServer","Ortho_Toledo_BN_1945"," Ortho Toledo BN 1945");
           ajoutRaster("http://repos.sig.huma-num.fr/arcgis/rest/services/medievalgis/Orto_Toledo_BN_1997/ImageServer","Orto_Toledo_BN_1997"," Orto Toledo BN 1997");
           ajoutRaster("http://repos.sig.huma-num.fr/arcgis/rest/services/medievalgis/Orto_Toledo_colorR_2006/ImageServer","Orto_Toledo_colorR_2006"," Orto Toledo ColorR 2006");
           ajoutRaster("http://repos.sig.huma-num.fr/arcgis/rest/services/medievalgis/Orto_Toledo_ColorR_Sigpa_C2003/ImageServer","Orto_Toledo_colorR_Sigpa_C2003"," Orto Toledo colorR Sigpa C2003");
           ajoutRaster("http://repos.sig.huma-num.fr/arcgis/rest/services/medievalgis/Plan_Coello_1858/ImageServer","Plan_Coello_1858"," Plan Coello 1858");
           ajoutRaster("http://repos.sig.huma-num.fr/arcgis/rest/services/medievalgis/Plan_Greco/ImageServer","Plan_Greco"," Plan Greco");
           ajoutRaster("http://repos.sig.huma-num.fr/arcgis/rest/services/medievalgis/Plan_Reinoso_1882/ImageServer","Plan_Reinoso_1882"," Plan Reinoso 1882");
           ajoutRaster("http://repos.sig.huma-num.fr/arcgis/rest/services/medievalgis/Plan_ReyPastor_1926/ImageServer","Plan_ReyPastor_1926"," Plan ReyPastor 1926");
           ajoutRaster("http://repos.sig.huma-num.fr/arcgis/rest/services/medievalgis/planoantiguo_rectif/ImageServer","planoantiguo_rectif"," Plano Antiguo Rectif");

/////////////////*************************** AJOUT D'UN RASTER******************************************************//////////////////////////////////////
//
// Lien du service : c'est le lien rest obtenu après la publication du service dans arcgis server
// idRaster : c'est l'id d'identification dans la carte; chaque couche doit avoir un id
// NomAfficher : c'est le nom visible du raster, à afficher juste après le input
//Pour ajouter un nouveau raster décommenter la ligne suivante en remplissant les paramètres de la fonction

             //  ajoutRaster("lien du service","idRaster","NomAfficer");


////////***********************************************************************************************************//////////////////////////////////////////
          function ajoutRaster(url, idRaster,layerName)
          {
               var params = new ImageServiceParameters();
               params.noData = 0;
              var imageServiceLayer = new ArcGISImageServiceLayer(url, {
                imageServiceParameters: params,
               visible:false,
                id:idRaster
              });
              var input = document.createElement("input");
              input.type="checkbox";
              input.id=idRaster;
              input.onclick=function(e){switchLayer(e)};
              var par = document.createElement("par");
              var br = document.createElement("br");
              par.innerText=layerName;
              document.getElementById("info5").appendChild(input);
              document.getElementById("info5").appendChild(par);
              document.getElementById("info5").appendChild(br);
              map.addLayer(imageServiceLayer);
             }

              function switchLayer(event)
              {
                 var layer = map.getLayer(event.target.id);
                 if(event.target.checked)
                 {
                   layer.show();
                 }
                 else {
                   layer.hide();
                 }

              }
        });
