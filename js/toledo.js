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


/////////////////*************************** AJOUT D'UNE COUCHE VECTEUR******************************************************//////////////////////////////////////
//
// Lien du service : c'est le lien rest obtenu après la publication du service dans arcgis server
// idvecteur : c'est l'id d'identification dans la carte; chaque couche doit avoir un id
// NomAfficher : c'est le nom visible du vecteur, à afficher juste après le input
//groupe :
//        -info2 : pour l'ajouter dans le groupe des parcelle et maisons
//        -info3 : pour l'ajouter dans le groupe des rues
//        -info4 : pour l'ajouter dans le groupe de topographie
//        -newLay : pour l'ajouter dans un nouveau groupe
//Pour ajouter un nouveau vecteur décommenter la ligne suivante en remplissant les paramètres de la fonction
//       ajoutvecteur("lien du service","idvecteur","NomAfficher","groupe");
//EXemple:            ajoutvecteur("http://repos.sig.huma-num.fr/arcgis/rest/services/medievalgis/parcelles_maisons/MapServer/1","parcelle2","parcelle2","info2");



////////***********************************************************************************************************//////////////////////////////////////////

        function ajoutvecteur(url, idvecteur,layerName,groupe)
        {
          var myFeatureLayer = new FeatureLayer(url,{
               mode: FeatureLayer.MODE_ONDEMAND,
               visible: true,
               id: idvecteur
             });
            var input = document.createElement("input");
            input.type="checkbox";
            input.id=idvecteur;
            input.checked=true;
            input.onclick=function(e){switchLayer(e)};
            var par = document.createElement("par");
            var br = document.createElement("br");
            par.innerText=layerName;
            document.getElementById(groupe).appendChild(br);
            document.getElementById(groupe).appendChild(input);
            document.getElementById(groupe).appendChild(par);
            document.getElementById(groupe).appendChild(br);

            if(groupe=="newLay")
            {
              $("#nouvCouche").css("visibility","visible");
              $("#nouvCouche").show();
            }

            map.addLayer(myFeatureLayer);

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
 $.loadScript('./js/rasters.js', function(){});
 $.loadScript('./js/symbology.js', function(){});
 $.loadScript('./js/event.js', function(){});
