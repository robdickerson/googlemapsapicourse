//Global map variable
var map;

//Style elements
var mapStyle = [
    {
        "stylers":[
            {"saturation":-100},
            {"gamma":1}
        ]
    },
    {
        "elementType":"labels.text.stroke",
        "stylers":[
            {"visibility":"off"}
        ]
    },
    {
        "featureType":"road",
        "elementType":"geometry",
        "stylers":[
            {"visibility":"simplified"}
        ]
    },
    {
        "featureType":"water",
        "stylers":[
            {"visibility":"on"},
            {"saturation":50},
            {"gamma":0},
            {"hue":"#50a5d1"}
        ]
    },
    {
        "featureType":"landscape",
        "elementType":"all",
        "stylers":[
            {"color":"#e2e2e2"}
        ]
    }
];
    

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
        styles: mapStyle, 
    };

    //Get the id of the map container div
    var mapid = document.getElementById('map');

    //Create the map
    map = new google.maps.Map(mapid,mapOptions);

}
  
//Load the map
google.maps.event.addDomListener(window, 'load', loadMap());
       



