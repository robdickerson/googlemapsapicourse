//Global map variable
var map;

//Get the location to display the coordinates
var lat = document.getElementById("latcoords");
var lng = document.getElementById("loncoords");

//Function run on DOM load
function loadMap() {
    
    //Set the map options
    var mapOptions = {

        //Zoom on load
        zoom: 11,

        //Map center
        center: new google.maps.LatLng(40.748817,-73.985428),
        
        //Limit min/max zoom
        minZoom: 2,
        maxZoom: 18,

        mapTypeControl: true,
        mapTypeControlOptions: {
            style: google.maps.MapTypeControlStyle.DROPDOWN_MENU,
            mapTypeIds: [google.maps.MapTypeId.ROADMAP,
                         google.maps.MapTypeId.SATELLITE,
                         google.maps.MapTypeId.HYBRID,     
                         google.maps.MapTypeId.TERRAIN]                   
        },
        mapTypeId: google.maps.MapTypeId.TERRAIN,       

        //0 to 45deg, only valid for satellite and terrain
        tilt: 0,

        zoomControl: true,
        zoomControlOptions: {
            style: google.maps.ZoomControlStyle.SMALL,
            position: google.maps.ControlPosition.RIGHT_TOP
        },

        panControl: true,
        streetViewControl: true,

        //Overview map
        overviewMapControl: true,
        overviewMapControlOptions: {
            opened: true
        },

        //Set the map style
        styles: shiftWorkerMapStyle, 
    };

    //Get the id of the map container div
    var mapid = document.getElementById('map');

    //Create the map
    map = new google.maps.Map(mapid,mapOptions);
    
    //Update the lat/lng on load of the map center
    updateCurrentLatLng(map.getCenter());
          
    //Add the event listeners
    mapEventListeners();
       

}

// Add the map event listeners
function mapEventListeners() {
    
    // Mouse move updates the coordinates 
    var mouseMoveChanged = google.maps.event.addListener(map, 'mousemove',
        function(event) {            
        
            //Update the coordinates
            updateCurrentLatLng(event.latLng);
            
        }
    );
    
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
    
}

// Update the position of the mouse in latitude and longitude
function updateCurrentLatLng(latLng) {

    //Update the coordinates
    lat.innerHTML = latLng.lat();
    lng.innerHTML = latLng.lng();
    
}

//Load the map
google.maps.event.addDomListener(window, 'load', loadMap());
       



