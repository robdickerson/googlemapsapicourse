//Global map variable
var map;

//Create a single infowindow
var infoWindow = new google.maps.InfoWindow();

//Function run on DOM load
function loadMap() {
    
    //Set the map options
    var mapOptions = {

        //Zoom on load
        zoom: 5,

        //Map center
        center: new google.maps.LatLng(39.828127,-98.579404),
      
        //Set the map style
        styles: shiftWorkerMapStyle 
    };

    //Get the id of the map container div
    var mapId = document.getElementById('map');

    //Create the map
    map = new google.maps.Map(mapId,mapOptions);

    //Update the URL with the current location
    updateUrlLocation(map.getCenter(), map.getZoom());
    
    //Add the event listeners
    mapEventListeners();
    
    //Loop through the airport data
    for (var i=0;i<airportData.length;i++) {
     
        var airport = airportData[i];
        
        //Avg percentage
        airport.totalper = (airport.aper + airport.dper)/2;
        
        //Total flights
        airport.totalflights = (airport.aop + airport.dop);
        
        //Scale        
        if(airport.totalflights > 10000) {
            airport.iconsize = new google.maps.Size(48,48);
        }
        else if((1000 < airport.totalflights) && (airport.totalflights <= 10000)) {
            airport.iconsize = new google.maps.Size(32,32);
        }
        else if(airport.totalflights <= 1000) {
            airport.iconsize = new google.maps.Size(16,16);
        }
        else {
            airport.scaleicon = 1;
        }
        
        //Set the icon
        if(airport.totalper >= 80) {
            airport.icon = 'green';            
        } 
        else if((70 <= airport.totalper) && (airport.totalper < 80)) {
            airport.icon = 'yellow';            
        } 
        else if((60 <= airport.totalper) && (airport.totalper < 70)) {
            airport.icon = 'orange';
        }
        else {
            airport.icon = 'red';
        }
        
        //Add the marker to the map
        newMarker = addMarker(airport);
        
        //Append the data to the marker
        newMarker.airport = airport;
        
        //Adds the infowindow
        addInfoWindow(newMarker);
        
    }
      
}

//Add a marker to the map
function addMarker(obj) {
    
    //Create the marker (#MarkerOptions)    
    var marker = new google.maps.Marker({
        
        //Position of marker
        position: new google.maps.LatLng(obj.lat,obj.lng),
        
        //Map
        map: map,                
        
        //Icon details
        icon: {
            
            //URL of the image
            url: 'img/airplane-'+obj.icon+'.png',
            
            //Sets the image size
            size: obj.iconsize,
            
            //Sets the origin of the image (top left)
            origin: new google.maps.Point(0,0),
            
            //Sets the anchor (middle, bottom)
            anchor: new google.maps.Point(16,32),
            
            //Scales the image
            scaledSize: obj.iconsize
        },
                
        //Sets the title when mouse hovers
        title: obj.airport       
                
    });
    
    return marker;
}


//Associate an infowindow with the marker
function addInfoWindow(marker) {
        
    var details = marker.airport;
    
    //Content string 
    var contentString = '<div class="infowindowcontent">'+
        '<div class="row">' +
        '<p class="total '+details.icon+'bk">'+Math.round(details.totalper*10)/10+'%</p>'+
        '<p class="location">'+details.airport.split("(")[0].substring(0,19)+'</p>'+
        '<p class="code">'+details.code+'</p>'+
        '</div>'+
        '<div class="data">'+
        '<p class="tagbelow">Avg On-Time</p>'+
        '<p class="label">Arrivals</p>'+
        '<p class="details">'+details.aper+'% ('+numberWithCommas(details.aop)+')</p>' +
        '<p class="label">Departures</p>'+
        '<p class="details">'+details.dper+'% ('+numberWithCommas(details.dop)+')</p>' +        
        '<p class="coords">'+details.lat+' , '+details.lng+'</p>' +
        '</div>'+
        '</div>';

    //Add click event listener
    google.maps.event.addListener(marker, 'click', function() {
        
        //Close any open infowindows
        infoWindow.close();
        
        //Set the new content
        infoWindow.setContent(contentString);        
        
        //Open the infowindow
        infoWindow.open(map,marker);
        
    });
}

// Add the map event listeners
function mapEventListeners() {
   
    //Drag End
    var listenerDragEnd = google.maps.event.addListener(map, 'dragend', 
        function() {
            updateUrlLocation(map.getCenter(), map.getZoom());
        }
    );

    //Zoom changed
    var listenerZoomChanged = google.maps.event.addListener(map, 'zoom_changed',
        function() {
            updateUrlLocation(map.getCenter(), map.getZoom());
        }
    );
    
}

//Update the URL with the map center and zoom
function updateUrlLocation(center, zoom) {
    
    var url = '?lat='+center.lat()+'&lon='+center.lng()+'&zoom='+zoom;   
    
    //Set the url
    window.history.pushState({center: center, zoom: zoom }, 'map center', url);  
}

//Add Commas to number
function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

//Load the map
google.maps.event.addDomListener(window, 'load', loadMap());
       



