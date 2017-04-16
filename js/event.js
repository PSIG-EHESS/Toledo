var animation = $("#animation");
var anim = $("#anim");
var table = $("#table");
var container_table = $("#container_table");
var legendTitle = $("#legendTitle");
var symbology = $("#symbology");


//Gestion de l'affichage des couches
$("div .shadow").slideUp(0);
$("#maisons").on("mouseover",function() {$("#feedback").slideToggle(2e2);});
$("#parcelles").on("mouseover",function() {$("#feedback2").slideToggle(2e2);});
$("#rues").on("mouseover",function() {$("#feedback3").slideToggle(2e2);});
$("#topographie").on("mouseover",function() {$("#feedback4").slideToggle(2e2);});
$("#rasters").on("mouseover",function() {$("#feedback5").slideToggle(2e2);});
$("#rightPane").css("visibility","visible");$("#rightPane").slideUp(0);
$( function() {  $("#rightPane").draggable();});
$("#chevron").on("click",function(){$("#rightPane").slideToggle(2e2);})
//FIN


$("#symbologyContainer").css("visibility","visible");$("#symbologyContainer").slideToggle(1e0);

$( function() {  $("#symbologyContainer").draggable();});

$("#chevron2").on("click",function(){$("#symbologyContainer").slideUp(2e2);})
//Gestion de la transition des tables attributaires
$("#parce").on("click",function(){  $("#tab2").hide();$("#tab3").hide();$("#tab1").show();})
$("#mais1").on("click",function(){  $("#tab1").hide();$("#tab3").hide();$("#tab2").show();})
$("#mais2").on("click",function(){  $("#tab1").hide();$("#tab2").hide();$("#tab3").show();})
//FIN


legendTitle.on("click",function(){$("#rightPane").slideToggle(2e2);})
legendTitle.on("mouseover",function(){  legendTitle.css("width","130px");  legendTitle.text(" Couches");})

legendTitle.on("mouseout",function(){  legendTitle.css("width","85px"); legendTitle.text("");})
anim.on("click",masquer_afficher);

symbology.on("mouseover",function(){symbology.css("width","150px");symbology.text(" Symbologie");})
symbology.on("mouseout",function(){  symbology.css("width","85px"); symbology.text("");})
symbology.on("click",function() {$("#symbologyContainer").slideToggle(2e2); });

function masquer_afficher()
{
  if(anim.hasClass("glyphicon glyphicon-triangle-bottom"))
  {
    container_table.css("top","98%");
    anim.removeClass("glyphicon glyphicon-triangle-bottom");
    anim.addClass("glyphicon glyphicon-triangle-top");
  }

  else
  {
    container_table.css("top","45%");
    anim.removeClass("glyphicon glyphicon-triangle-top");
    anim.addClass("glyphicon glyphicon-triangle-bottom");
  }
}
