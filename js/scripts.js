//Global map variable
var map;

//Function run on DOM load
function loadMap() {
    
    //Set the map options
    var mapOptions = {

        //Zoom on load
        zoom: 11,

        //Map center
        center: new google.maps.LatLng(40.748817,-73.985428),
      
        //Set the map style
        styles: shiftWorkerMapStyle, 
    };

    //Get the id of the map container div
    var mapid = document.getElementById('map');

    //Create the map
    map = new google.maps.Map(mapid,mapOptions);

    //Marker creation
    var newMarker = this.addMarker();
    
    //Adds the infowindow
    addInfoWindow(newMarker);
    
    //Trigger marker infowindow
    
    
}

//Add a marker to the map
function addMarker() {
        
    //Create the marker (#MarkerOptions)    
    var marker = new google.maps.Marker({
        position: new google.maps.LatLng(40.748817,-73.985428),
        map: map,                
        icon: {
            
            //URL of the image
            url: 'img/custom_icon.png',
            
            //Sets the image size
            size: new google.maps.Size(32,32),
            
            //Sets the origin of the image (top left)
            origin: new google.maps.Point(0,0),
            
            //Sets the anchor (middle, bottom)
            anchor: new google.maps.Point(16,32),
            
            //Scales the image
            scaledSize: new google.maps.Size(32,32)
        },
        
        //Set the animation (BOUNCE or DROP)
        animation: google.maps.Animation.DROP,
        
        //Sets whether marker is clickable
        clickable: true,
        
        //Drag marker
        draggable: true,
        
        //Sets the opacity
        opacity: 1.0,
        
        //Sets the title when mouse hovers
        title: 'Tooltip title',
        
        //Set visiblility
        visible: true,
        
        //Sets the zIndex if multiple markers are displayed
        zIndex: 1
                
    });

    return marker;
}


function addInfoWindow(marker) {
   
    //Add embedded image and text with link _blank    
    var contentString = '<div class="infowindowcontent">'+
        '<h1>My Marker Content</h1>'+
        '<div class="infowindowaddress">Address</div>'+        
        '</div>';

    var infowindow = new google.maps.InfoWindow({
        
        //Set the content of the infowindow
        content: contentString,
        
        //Pan the map if infowindow extends offscreen
        disableAutoPan: false,
        
        //Set the max width
        maxWidth: 400,
        
        //Set the zIndex when overlaying
        zIndex: 1
        
    });

    google.maps.event.addListener(marker, 'click', function() {
        infowindow.open(map,marker);
    });
}

//Load the map
google.maps.event.addDomListener(window, 'load', loadMap());
       




