var animation = $("#animation");
var anim = $("#anim");
var table = $("#table");
var container_table = $("#container_table");
var legendTitle = $("#legendTitle");
var symbology = $("#symbology");

var tab1=$("#tab1").clone();
var tab2=$("#tab2").clone();
var tab3=$("#tab3").clone();

$("#tab2").hide();
$("#tab3").hide();



$("#slideOne11").on("click",function()
{
  var layer = map.getLayer("Parcelles");
  if($("#slideOne11").is(':checked'))
        {
          layer.setShowLabels(true);
        }
        else {
            layer.setShowLabels(false);
        }
  });

  $("#slideOne22").on("click",function()
  {
    var layer = map.getLayer("Maisons1439");
    if($("#slideOne22").is(':checked'))
          {
            layer.setShowLabels(true);
          }
          else {
              layer.setShowLabels(false);
          }
    });

  $("#slideOne33").on("click",function()
  {
    var layer = map.getLayer("Maisons1492");
    if($("#slideOne33").is(':checked'))
          {
            layer.setShowLabels(true);
          }
          else {
              layer.setShowLabels(false);
          }
    });

//Récupération de toutes les inputs des raster
var a =$("#info5 input");
for (var i=0;i<a.length;i++)
{
  a[i].onclick=function(e){switchLayer(e)};
}


$("#mur").on("click",function()
    {
      var layer = map.getLayer("Murs Anciens Recales");
      if($("#mur").is(':checked'))
      {
        layer.show();
      }
      else {
        layer.hide();
      }
    });


$("#parcel").on("click",function()
{
  var layer = map.getLayer("Parcelles");
  if(anim.hasClass("glyphicon glyphicon-triangle-top"))
  {
        if($("#parcel").is(':checked'))
        {
          $("#pasCouche").css("visibility","hidden");
          $("#tab1").show();
          layer.show();
        }
        else {
            $("#tab1").hide();
            $("#tab2").hide();
            $("#tab3").hide();
            $("#pasCouche").css("visibility","hidden");
            layer.hide();
        }
  }

  else {
        if($("#parcel").is(':checked'))
        {
          $("#pasCouche").css("visibility","hidden");
          $("#tab1").show();
          layer.show();
        }
        else {
            $("#tab1").hide();
            $("#tab2").hide();
            $("#tab3").hide();
            $("#pasCouche").css("visibility","visible");
            layer.hide();
        }
  }

});

$("#maison1439").on("click",function()
{
  var layer = map.getLayer("Maisons1439");
  if(anim.hasClass("glyphicon glyphicon-triangle-top"))
    {
      if($("#maison1439").is(':checked'))
      {
        $("#pasCouche").css("visibility","hidden");
        $("#tab2").show();
        layer.show();
       }
      else {
        $("#tab1").hide();
        $("#tab2").hide();
        $("#tab3").hide();
        $("#pasCouche").css("visibility","hidden");
        layer.hide();
      }
    }

    else {
      if($("#maison1439").is(':checked'))
      {
        $("#pasCouche").css("visibility","hidden");
        $("#tab2").show();
        layer.show();
       }
      else {
        $("#tab1").hide();
        $("#tab2").hide();
        $("#tab3").hide();
        $("#pasCouche").css("visibility","visible");
        layer.hide();
      }
    }

});

$("#maison1492").on("click",function()
{
  var layer = map.getLayer("Maisons1492");
  if(anim.hasClass("glyphicon glyphicon-triangle-top"))
    {
      if($("#maison1492").is(':checked'))
      {
        $("#pasCouche").css("visibility","hidden");
        $("#tab3").show();
        layer.show();
        }
      else {
        $("#tab1").hide();
        $("#tab2").hide();
        $("#tab3").hide();
        $("#pasCouche").css("visibility","hidden");
        layer.hide();
      }
    }
    else {
      if($("#maison1492").is(':checked'))
      {
        $("#pasCouche").css("visibility","hidden");
        $("#tab3").show();
        layer.show();
        }
      else {
        $("#tab1").hide();
        $("#tab2").hide();
        $("#tab3").hide();
        $("#pasCouche").css("visibility","visible");
        layer.hide();
      }
    }

});
//Gestion de l'affichage des couches
$("div .shadow").slideUp(0);
$("#maisons").on("click",function(e) {$("#feedback").slideToggle(2e2);plus_moins(e);});
$("#parcelles").on("click",function(e) {$("#feedback2").slideToggle(2e2);plus_moins(e);});
$("#rues").on("click",function(e) {$("#feedback3").slideToggle(2e2);plus_moins(e);});
$("#topographie").on("click",function(e) {$("#feedback4").slideToggle(2e2);plus_moins(e);});
$("#rasters").on("click",function(e) {$("#feedback5").slideToggle(2e2);plus_moins(e);});
$("#rightPane").css("visibility","visible");$("#rightPane").slideUp(0);
$( function() {  $("#rightPane").draggable();});
$("#chevron").on("click",function(){$("#rightPane").slideToggle(2e2);})
//FIN

$("#map").on("click",function(){  $("div .titlePane").css("height","30px");});
$("#map").on("click",function(){  $("div .esriPopupWrapper").css("border-radius","8px");});
//$("#map").on("click",function(){  $("div .contentPane").css("background-color","white");});
//$("#map").on("click",function(){  $("div .actionsPane").css("background-color","white");});
$("#map").on("click",function(){  $("div .contentPane").css("color","white");});
$("#map").on("click",function(){  $("div .contentPane").css("background-color","#905f5f");});
$("#map").on("click",function(){  $("div .actionsPane").css("background-color","#ba3337");});
$("#map").on("click",function(){  $("div .titlePane").css("background-color","#ba3337");});
$("#symbologyContainer").css("visibility","visible");$("#symbologyContainer").slideToggle(0);


$( function() {  $("#symbologyContainer").draggable();});
$( function() {  $("div .esriPopupWrapper").draggable();});

$("#chevron2").on("click",function(){$("#symbologyContainer").slideUp(2e2);})

//Gestion de la transition des tables attributaires
$("#parce").on("click",function(){
      $("#tab2").hide();$("#tab3").hide();

    if($("#parcel").is(":checked"))
    {
        $("#pasCouche").css("visibility","hidden");
        $("#tab1").show();
    }
    else {
      $("#pasCouche").css("visibility","visible");
      $("#tab1").hide();
    }
  });

$("#mais1").on("click",function(){
        $("#tab1").hide();$("#tab3").hide();
        if($("#maison1439").is(":checked"))
        {
            $("#pasCouche").css("visibility","hidden");
            $("#tab2").show();
        }
        else {
            $("#pasCouche").css("visibility","visible");
            $("#tab2").hide();
        }
    });

$("#mais2").on("click",function(){
      $("#tab1").hide();$("#tab2").hide();
        if($("#maison1492").is(":checked"))
                {
                    $("#pasCouche").css("visibility","hidden");
                    $("#tab3").show();
                }
                else {
                    $("#pasCouche").css("visibility","visible");
                    $("#tab3").hide();
                }
          });
//FIN





legendTitle.on("click",function(){ $("#rightPane").slideToggle(2e2);})
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
    $("#pasCouche").hide();
    container_table.css("top","98%");
    anim.removeClass("glyphicon glyphicon-triangle-bottom");
    anim.addClass("glyphicon glyphicon-triangle-top");
  }

  else
  {
    container_table.css("top","45%");
    anim.removeClass("glyphicon glyphicon-triangle-top");
    anim.addClass("glyphicon glyphicon-triangle-bottom");
    $("#pasCouche").fadeIn(2e3);
  }
}

function plus_moins(event)
{
  if($(event.currentTarget).hasClass("glyphicon glyphicon-plus"))
  {
    $(event.currentTarget).removeClass("glyphicon glyphicon-plus");
    $(event.currentTarget).addClass("glyphicon glyphicon-minus");
  }

  else
  {
    $(event.currentTarget).removeClass("glyphicon glyphicon-minus");
    $(event.currentTarget).addClass("glyphicon glyphicon-plus");
  }
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
