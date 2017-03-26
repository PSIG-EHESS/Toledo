var animation = $("#animation");
var anim = $("#anim");
var table = $("#table");
var container_table = $("#container_table");
var baseMapShow = $("#iconMapGallery"); //Icone qui permet d'afficher/cacher les fonds de cartes
var legendTitle = $("#legendTitle");
$("#maisons").on("mouseover",function() {$("#feedback").slideToggle(2e2);});
$("#parcelles").on("mouseover",function() {$("#feedback2").slideToggle(2e2);});
$("#rues").on("mouseover",function() {$("#feedback3").slideToggle(2e2);});
$("#topographie").on("mouseover",function() {$("#feedback4").slideToggle(2e2);});

legendTitle.on("click",showLegend);//button qui permet d'afficher/cacher les fonds de cartes
anim.on("click",masquer_afficher);
baseMapShow.on("click",showBaseMaps);

var map;
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

function masquer_afficher()
{
  if(anim.hasClass("glyphicon glyphicon-triangle-bottom"))
  {
    container_table.css("top","98%");
    anim.removeClass("glyphicon glyphicon-triangle-bottom");
    anim.addClass("glyphicon glyphicon-triangle-top");
  }

  else {
    container_table.css("top","45%");
    anim.removeClass("glyphicon glyphicon-triangle-top");
    anim.addClass("glyphicon glyphicon-triangle-bottom");
  }
}


/* Masquer le panneau des fonds de cartes */
function showBaseMaps()
{
  $("#baseMaps").css("visibility","visible");
  $("#baseMaps").slideToggle(2e2);
}

/* Masquer le panneau de la légende */
function showLegend()
{
  $("#rightPane").css("visibility","visible");
  $("#rightPane").slideToggle(2e2);
}
