//Global map variable
var map;
var geocoder;

//Create a single infowindow
var infowindow = new google.maps.InfoWindow();

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
        position: new google.maps.LatLng(obj.lat,obj.lng),
        map: map,                
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
        title: obj.airport,        
                
    });
    
    return marker;
}


//Add the infowindow
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
        '</div>';
        '</div>';

    //Add the info window
    google.maps.event.addListener(marker, 'click', function() {
        
        infowindow.close();
        infowindow.setContent(contentString);        
        infowindow.open(map,marker);
        
    });

}

function extractAirportCodes() {

    var regExp = /\(([^)]+)\)/;
    
    for (var i=0; i< airportdata.length; i++) {        
        
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

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

//Load the map
google.maps.event.addDomListener(window, 'load', loadMap());
       



