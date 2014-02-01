$(function() {

  var directionsService = new google.maps.DirectionsService();
  var directionsDisplay = new google.maps.DirectionsRenderer({
      'map': ContactMapKeeper.map(),
      'preserveViewport': true,
      'draggable': true
  });

  var points = {
    walking: [
      new google.maps.LatLng( 55.745984, 37.605515 ),
      new google.maps.LatLng( 55.745326, 37.604281 ),
      new google.maps.LatLng( 55.745008, 37.604914 ),
      new google.maps.LatLng( 55.744514, 37.604536 ),
      new google.maps.LatLng( 55.744054, 37.605663 ),
      new google.maps.LatLng( 55.743981, 37.607057 ),
      new google.maps.LatLng( 55.743111, 37.609289 ),
      new google.maps.LatLng( 55.740811, 37.608538 )
    ],

    driving2: [
      new google.maps.LatLng( 55.749156, 37.608615 ),
      new google.maps.LatLng( 55.74862, 37.610493 ),
      new google.maps.LatLng( 55.743151, 37.614921 ),
      new google.maps.LatLng( 55.742443, 37.61343 ),
      new google.maps.LatLng( 55.740482, 37.611156 ),
      new google.maps.LatLng( 55.741563, 37.608945 )
    ],

    driving1: [
      new google.maps.LatLng( 55.739465, 37.616245 ),
      new google.maps.LatLng( 55.740542, 37.616749 ),
      new google.maps.LatLng( 55.743242, 37.615151 ),
      new google.maps.LatLng( 55.743859, 37.615365 ),
      new google.maps.LatLng( 55.746414, 37.613239 ),
      new google.maps.LatLng( 55.745709, 37.61178 ),
      new google.maps.LatLng( 55.743128, 37.614894 ),
      new google.maps.LatLng( 55.742443, 37.61343 ),
      new google.maps.LatLng( 55.740482, 37.611156 ),
      new google.maps.LatLng( 55.741563, 37.608945 )
    ],

    walkingPol: [
      new google.maps.LatLng( 55.736755, 37.618687 ),
      new google.maps.LatLng( 55.736835, 37.619160 ),
      new google.maps.LatLng( 55.737530, 37.618752 ),
      new google.maps.LatLng( 55.737053, 37.617218 ),
      new google.maps.LatLng( 55.737000, 37.616810 ),
      new google.maps.LatLng( 55.738262, 37.615471 ),
      new google.maps.LatLng( 55.738358, 37.615040 ),
      new google.maps.LatLng( 55.738766, 37.615353 ),
      new google.maps.LatLng( 55.739758, 37.614857 ),
      new google.maps.LatLng( 55.741264, 37.613670 ),
      new google.maps.LatLng( 55.741306, 37.613258 ),
      new google.maps.LatLng( 55.741718, 37.612350 ),
      new google.maps.LatLng( 55.740532, 37.611076 ),
      new google.maps.LatLng( 55.741364, 37.609322 ),
      new google.maps.LatLng( 55.741089, 37.609104 )
    ],  

    walkingTr:[
      new google.maps.LatLng( 55.740776, 37.625591 ),
      new google.maps.LatLng( 55.740913, 37.625591 ),
      new google.maps.LatLng( 55.741013, 37.623631 ),
      new google.maps.LatLng( 55.740963, 37.622917 ),
      new google.maps.LatLng( 55.740677, 37.621674 ),
      new google.maps.LatLng( 55.743469, 37.619694 ),
      new google.maps.LatLng( 55.743996, 37.619095 ),
      new google.maps.LatLng( 55.744701, 37.618038 ),
      new google.maps.LatLng( 55.743561, 37.615387 ),
      new google.maps.LatLng( 55.743156, 37.615185 ),
      new google.maps.LatLng( 55.742710, 37.613815 ),
      new google.maps.LatLng( 55.742180, 37.612900 ),
      new google.maps.LatLng( 55.740524, 37.611080 ),
      new google.maps.LatLng( 55.741356, 37.609325 ),
      new google.maps.LatLng( 55.741142, 37.609077 )
    ]
  }

  var path;

  $(".contact-tab").click( function( e ) {
    e.preventDefault();
    $(".underneath").hide();
    $(".contact-tab").removeClass("active");
    $(this).addClass("active")
    if ( undefined !== path ) {
      path.setMap( null );
      delete path;
    }
  } );

  $(".walking").click(function() {
    $("#walking").show()
    $('ul.contacts.underneath').show()

    if ( undefined !== path ) {
      path.setMap( null );
      delete path;
    }

    path = new google.maps.Polyline( {
      path: points.walking,
      strokeColor: "#0000FF",
      strokeOpacity: 0.5,
      strokeWeight: 5
    } );
    path.setMap( ContactMapKeeper.map() );
    // body_h();
  });

  $(".driving1").click(function() {
    $("#driving1").show()

    path = new google.maps.Polyline( {
      path: points.driving1,
      strokeColor: "#0000FF",
      strokeOpacity: 0.5,
      strokeWeight: 5
    } );
    path.setMap( ContactMapKeeper.map() );
    // body_h();
  });

  $(".driving2").click(function() {
    $("#driving2").show()

    path = new google.maps.Polyline( {
      path: points.driving2,
      strokeColor: "#0000FF",
      strokeOpacity: 0.5,
      strokeWeight: 5
    } );
    path.setMap( ContactMapKeeper.map() );
    // body_h();
  });

  $("#kropotkinskaya").click(function() {
    $("#walking").show()
    if ( undefined !== path ) {
      path.setMap( null );
      delete path;
    }

    path = new google.maps.Polyline( {
      path: points.walking,
      strokeColor: "#0000FF",
      strokeOpacity: 0.5,
      strokeWeight: 5
    } );
    path.setMap( ContactMapKeeper.map() );
    // body_h();
  });

  $("#polyanka").click(function() {
    $("#walkingPol").show()
    if ( undefined !== path ) {
      path.setMap( null );
      delete path;
    }

    path = new google.maps.Polyline( {
      path: points.walkingPol,
      strokeColor: "#0000FF",
      strokeOpacity: 0.5,
      strokeWeight: 5
    } );
    path.setMap( ContactMapKeeper.map() );
    // body_h();
  });  
  $("#tretyakovskaya").click(function() {
    $("#walkingTr").show()
    if ( undefined !== path ) {
      path.setMap( null );
      delete path;
    }

    path = new google.maps.Polyline( {
      path: points.walkingTr,
      strokeColor: "#0000FF",
      strokeOpacity: 0.5,
      strokeWeight: 5
    } );
    path.setMap( ContactMapKeeper.map() );
    // body_h();
  });  


  $(".contact-tab").eq(0).trigger("click")
  
  
  $('ul.contacts.underneath li').click( function (){
    if ($(this).children('a').length > 0) {
      $('ul.contacts.underneath li').each(function(){
        $(this).html('<a href="#">'+$(this).text()+'</a>')
      })
      $('#walking').children().not('.title_sm').hide()
      $(this).html($(this).text())
      $('.'+$(this).attr('id')).show()
    }
  } )
  $('ul.contacts.underneath #kropotkinskaya').trigger('click')
  
})