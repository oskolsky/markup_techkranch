window.ContactMapKeeper = (function() {
  this.__map = null;
  var self = this
  return {
    map: function( map ) {
      if ( undefined !== map ) {
        self.__map = map;
      } else {
        return self.__map;
      }
    }
  }
})();


$(function() {
  var pos = new google.maps.LatLng(55.742119, 37.609524),
  init_scale = 15,
  opts = {
    scrollwheel: false,
    zoom: init_scale,
    center: pos,
    mapTypeId: google.maps.MapTypeId.SATELLITE
  },
  map = new google.maps.Map(document.getElementById("map"), opts),

  bounds = new google.maps.LatLngBounds(
    new google.maps.LatLng(55.73876, 37.6024),
    new google.maps.LatLng(55.74631, 37.61510)
  ),
  overlays = {},
  overlay_images = {
    19: 'http://digitaloctober.ru/system/map/map19.png',
    17: 'http://digitaloctober.ru/system/map/map17.png',
    15: 'http://digitaloctober.ru/system/map/map15.png'
  },
  overlays_map = {
    22: 19,
    21: 19,
    20: 19,
    19: 19,
    18: 17,
    17: 17,
    16: 15,
    15: 15,
    14: 15,
    13: 15
  },
  map_zoom = function(zoom) { return (overlays_map[zoom] !== undefined)? overlays_map[zoom] : null },
  markerIcon = new google.maps.MarkerImage(
    'http://digitaloctober.ru/system/map/map19-marker.png',
    new google.maps.Size(160, 120),
    new google.maps.Point(0, 0),
    new google.maps.Point(160, 60)
  ),
  marker = new google.maps.Marker({
    icon: markerIcon,
    position: new google.maps.LatLng(55.740804, 37.60925),
    map: map
  });

  ContactMapKeeper.map( map );

  for (var k in overlay_images) {
    if (overlay_images.hasOwnProperty(k)) {
      img = new Image();
      img.src = overlay_images[k];
    }
  }
  
  overlays[init_scale] = new USGSOverlay(bounds, overlay_images[init_scale], map);
  
  google.maps.event.addListener(map, 'zoom_changed', function() {
    var z = parseInt(map.getZoom());
    z = map_zoom(z);
    if (z !== null) {
      if (overlays[z] === undefined)
        if (overlay_images[z] !== undefined)
          overlays[z] = new USGSOverlay(bounds, overlay_images[z], map);
    }
    
    for (var key in overlays)
      if (overlays.hasOwnProperty(key)) {
        if (key == z) {
          overlays[key].show()
        } else {
          overlays[key].hide()
        }
      }
  });
})

// google tutorial code starts here

function USGSOverlay(bounds, image, map) {

  // Now initialize all properties.
  this.bounds_ = bounds;
  this.image_ = image;
  this.map_ = map;

  // We define a property to hold the image's
  // div. We'll actually create this div
  // upon receipt of the add() method so we'll
  // leave it null for now.
  this.div_ = null;

  // Explicitly call setMap() on this overlay
  this.setMap(map);
}

USGSOverlay.prototype = new google.maps.OverlayView();

USGSOverlay.prototype.onAdd = function() {

  // Note: an overlay's receipt of onAdd() indicates that
  // the map's panes are now available for attaching
  // the overlay to the map via the DOM.

  // Create the DIV and set some basic attributes.
  var div = document.createElement('DIV');
  div.style.border = "none";
  div.style.borderWidth = "0px";
  div.style.position = "absolute";

  // Create an IMG element and attach it to the DIV.
  var img = document.createElement("img");
  img.src = this.image_;
  img.style.width = "100%";
  img.style.height = "100%";
  div.appendChild(img);

  // Set the overlay's div_ property to this DIV
  this.div_ = div;

  // We add an overlay to a map via one of the map's panes.
  // We'll add this overlay to the overlayImage pane.
  var panes = this.getPanes();
  panes.overlayLayer.appendChild(div);
}

USGSOverlay.prototype.draw = function() {

  // Size and position the overlay. We use a southwest and northeast
  // position of the overlay to peg it to the correct position and size.
  // We need to retrieve the projection from this overlay to do this.
  var overlayProjection = this.getProjection();

  // Retrieve the southwest and northeast coordinates of this overlay
  // in latlngs and convert them to pixels coordinates.
  // We'll use these coordinates to resize the DIV.
  var sw = overlayProjection.fromLatLngToDivPixel(this.bounds_.getSouthWest());
  var ne = overlayProjection.fromLatLngToDivPixel(this.bounds_.getNorthEast());

  // Resize the image's DIV to fit the indicated dimensions.
  var div = this.div_;
  div.style.left = sw.x + 'px';
  div.style.top = ne.y + 'px';
  div.style.width = (ne.x - sw.x) + 'px';
  div.style.height = (sw.y - ne.y) + 'px';
}

USGSOverlay.prototype.onRemove = function() {
  this.div_.parentNode.removeChild(this.div_);
  this.div_ = null;
}

// the next 3 methods are fixed: visibility:hidden doesn't 
// affects the browser rendering speed, so we should use display:none here

USGSOverlay.prototype.hide = function() {
  if (this.div_) {
    this.div_.style.display = "none";
  }
}

USGSOverlay.prototype.show = function() {
  if (this.div_) {
    this.div_.style.display = "block";
  }
}

USGSOverlay.prototype.toggle = function() {
  if (this.div_) {
    if (this.div_.style.display == "none") {
      this.show();
    } else {
      this.hide();
    }
  }
}

USGSOverlay.prototype.toggleDOM = function() {
  if (this.getMap()) {
    this.setMap(null);
  } else {
    this.setMap(this.map_);
  }
}
