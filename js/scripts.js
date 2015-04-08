//Global map variable
var map;

//Function run on DOM load
function loadMap() {
    
    //Set the map options
    var mapOptions = {

        //Zoom on load
        zoom: 11,

        //Map center
        center: new google.maps.LatLng(40.6413111,-73.77813909),
      
        //Set the map style
        styles: shiftWorkerMapStyle 
    };

    //Get the id of the map container div
    var mapId = document.getElementById('map');

    //Create the map
    map = new google.maps.Map(mapId,mapOptions);

    //Marker creation
    var newMarker = this.addMarker();
        
}

//Add a marker to the map
function addMarker() {
        
    //Create the marker (#MarkerOptions)    
    var marker = new google.maps.Marker({

        
        
        
    });

    return marker;
}

//Load the map
google.maps.event.addDomListener(window, 'load', loadMap());
       



