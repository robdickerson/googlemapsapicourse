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
    addInfoWindow(newMarker);
    
}

//Add a marker to the map
function addMarker() {
     
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
        //keep multiple pop-ups open
    });

    marker.myid = "myuniquemarker";
    
        //Marker events (#MarkerEvents)
    //    marker.setMap(map);
    //    marker.setVisible(false);
    //marker.setOptions({draggable: true });

    return marker;
}

function addInfoWindow(marker) {
   
    //Add embedded image and text with link _blank
    //Add javascript 
    var contentString = '<div class="infowindowcontent">'+
        '<h1>Title</h1>'+
        '<div class="infowindowaddress">Address</div>'+
        '<input type="button" value="Submit" onclick="submitHandler()">' +
        '</div>';

    var infowindow = new google.maps.InfoWindow({
        content: contentString
    });

    google.maps.event.addListener(marker, 'click', function() {
        infowindow.open(map,marker);
    });
}

function submitHandler() {
    alert('Form Submitted for Marker');
}

//Load the map
google.maps.event.addDomListener(window, 'load', loadMap());
       



