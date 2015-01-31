//Global map variable
var map;

var mapevents = {
    
    //Init function
    init: function() {        
        
        //Load the map on load
        google.maps.event.addDomListener(window, 'load', this.loadMap());
        
        //Add the event listeners
        this.mapEventListeners();
       
    },
    
    //Function run on DOM load
    loadMap: function() {
         
        //Get the location to display the coordinates
        this.lat = document.getElementById("latcoords");
        this.lng = document.getElementById("loncoords");
        
        //Set the map options
        var mapOptions = {

            //Zoom on load
            zoom: 11,

            //Map center
            center: new google.maps.LatLng(40.748817,-73.985428),

            //Limit min/max zoom
    //        minZoom: 2,
    //        maxZoom: 18,
    //        
    //        mapTypeControl: true,
    //        mapTypeControlOptions: {
    //            style: google.maps.MapTypeControlStyle.DROPDOWN_MENU,
    //            mapTypeIds: [google.maps.MapTypeId.ROADMAP,
    //                         google.maps.MapTypeId.SATELLITE,
    //                         google.maps.MapTypeId.HYBRID,     
    //                         google.maps.MapTypeId.TERRAIN]                   
    //        },
    //        mapTypeId: google.maps.MapTypeId.ROADMAP,       

            //0 to 45deg, only valid for satellite and terrain
    //        tilt: 0,

    //        zoomControl: true,
    //        zoomControlOptions: {
    //            style: google.maps.ZoomControlStyle.SMALL,
    //            position: google.maps.ControlPosition.RIGHT_TOP
    //        },
    //        
    //        panControl: true,
    //        streetViewControl: true

            //Overview map
            overviewMapControl: true,
            overviewMapControlOptions: {
                opened: true
            },

            //Set the map style
            styles: mapStyle,

        };

        //Get the id of the map container div
        var mapid = document.getElementById('map');

        //Create the map
        map = new google.maps.Map(mapid,mapOptions);

        //Examples
        var newMarker = this.addMarker();
        this.addInfoWindow(newMarker);
        
        //Update the lat/lng on load of the map center
        this.updateCurrentLatLng(map.getCenter());

    },

    addMarker: function() {

        //Create the marker (#MarkerOptions)    
        var marker = new google.maps.Marker({
            position: new google.maps.LatLng(40.748817,-73.985428),
            map: map,        
            title: 'Tooltip Title',
    //        icon : new google.maps.MarkerImage(icon,
    //                    new google.maps.Size(32,32),
    //                    new google.maps.Point(0,0),
    //                    new google.maps.Point(0,32),
    //                    new google.maps.Size(24,24)) 
            //zIndex
            //visible
        });

        //Marker events (#MarkerEvents)
    //    marker.setMap(map);
    //    marker.setVisible(false);
        marker.setOptions({draggable: true });

        return marker;
    },
    
    addInfoWindow: function(marker) {

        var contentString = '<div class="infowindowcontent">'+
            '<h1>Title</h1>'+
            '<div class="infowindowaddress">Address</div>'+
            '</div>';

        var infowindow = new google.maps.InfoWindow({
            content: contentString
        });

        google.maps.event.addListener(marker, 'click', function() {
            infowindow.open(map,marker);
        });
    },
    
//    geoCodeAddress: function(address) {
//        
//        geocoder.geocode( { 'address': address}, function(results, status) {
//          if (status == google.maps.GeocoderStatus.OK) {
//            map.setCenter(results[0].geometry.location);
//            var marker = new google.maps.Marker({
//                map: map,
//                position: results[0].geometry.location
//            });
//          } else {
//            alert("Geocode was not successful for the following reason: " + status);
//          }
//        });
//    },
    
    mapEventListeners: function() {
        
        var that = this;
        
        //Wait for map to load
//        var listenerIdle = google.maps.event.addListenerOnce(map, 'idle',
//            function() {
//                //TODO
//            }
//        );
//        
//        var listenerDragEnd = google.maps.event.addListener(map, 'dragend', 
//            function() {
//                //TODO
//            }
//        );
//
//        var listenerZoomChanged = google.maps.event.addListener(map, 'zoom_changed',
//            function() {
//                //TODO
//            }
//        );
        
        
        
        /* Mouse move updates the coordinates */
        var mouseMoveChanged = google.maps.event.addListener(map, 'mousemove',
            function(event) {            
                
                //Update the coordinates
                that.updateCurrentLatLng(event.latLng);
                    
            }
        );
        
    },
    
    updateCurrentLatLng: function(latLng) {
        
        //Update the coordinates
        this.lat.innerHTML = latLng.lat();
        this.lng.innerHTML = latLng.lng();
    }
    
};

//Intialize the map
mapevents.init();



//Trigger an event
//google.maps.event.trigger(marker, 'click');