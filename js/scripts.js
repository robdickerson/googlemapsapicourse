//Global map variable
var map;
var geocoder;

//Function run on DOM load
function loadMap() {
    
    //Set the map options
    var mapOptions = {

        //Zoom on load
        zoom: 5,

        //Map center
        center: new google.maps.LatLng(39.828127,-98.579404),
      
        //Set the map style
        styles: shiftWorkerMapStyle, 
    };

    //Get the id of the map container div
    var mapid = document.getElementById('map');

    //Create the map
    map = new google.maps.Map(mapid,mapOptions);

    for (var i=0;i<airportdata.length;i++) {
     
        var airport = airportdata[i];
        
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
            airport.icon = 'img/airplane-green.png';
        } 
        else if((70 <= airport.totalper) && (airport.totalper < 80)) {
            airport.icon = 'img/airplane-yellow.png';
        } 
        else if((60 <= airport.totalper) && (airport.totalper < 70)) {
            airport.icon = 'img/airplane-orange.png';
        }
        else {
            airport.icon = 'img/airplane-red.png';
        }
        
        //Add the marker to the map
        newMarker = addMarker(airport);
        
        //Append the data to the marker
        newMarker.airport = airport;
        
        //Adds the infowindow
        addInfoWindow(newMarker);
        
    }
    
//    //Marker creation
//    var newMarker = this.addMarker();
//    
//    //Adds the infowindow
//    addInfoWindow(newMarker);
//    
//    //Trigger marker infowindow
//    geocoder = new google.maps.Geocoder();
  
}

//Add a marker to the map
function addMarker(obj) {
    
    
    
    //Create the marker (#MarkerOptions)    
    var marker = new google.maps.Marker({
        position: new google.maps.LatLng(obj.lat,obj.lng),
        map: map,                
        icon: {
            
            //URL of the image
            url: obj.icon,
            
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
        title: obj.airport,        
                
    });

    
    
    return marker;
}


function addInfoWindow(marker) {
   
    var details = marker.airport;
    
    //Add embedded image and text with link _blank    
    var contentString = '<div class="infowindowcontent">'+
        '<h1>'+details.airport+'</h1>'+
        '<span>Coordinates: '+details.lat+','+details.lng+'</span>' +
        '<div>Ontime Arrivals: '+details.aper+'%</div>' +
        '<div>Ontime Departures: '+details.dper+'%</div>' +        
        '</div>';

    var infowindow = new google.maps.InfoWindow({
        
        //Set the content of the infowindow
        content: contentString,
        
        //Set the max width
        maxWidth: 400,        
        
    });

    google.maps.event.addListener(marker, 'click', function() {
        infowindow.open(map,marker);
    });
}



function extractAirportCodes() {

    var regExp = /\(([^)]+)\)/;
    
    for (var i=0; i< airportdata.length; i++) {
        //console.log(airportdata[i].airport);
        
        var matches = regExp.exec(airportdata[i].airport);
        airportdata[i].code = matches[1];
    
    }

    console.log(JSON.stringify(airportdata));
}

function geoCodeAddress(address) {

    geocoder.geocode( { 'address': address}, function(results, status) {
      if (status == google.maps.GeocoderStatus.OK) {
        map.setCenter(results[0].geometry.location);
        var marker = new google.maps.Marker({
            map: map,
            position: results[0].geometry.location
        });
      } else {
        alert("Geocode was not successful for the following reason: " + status);
      }
    });
}

//Load the map
google.maps.event.addDomListener(window, 'load', loadMap());
       



