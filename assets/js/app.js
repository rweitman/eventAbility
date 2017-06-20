
$(document).ready(function(){
    
/*********************************
MATERIALIZE & SLICK FUNCTION CALLS
*********************************/

$('select').material_select();
$('.datepicker').pickadate();
$('.slickHolder').slick({
    dots: true,
    infinite: true
});

/*********************************
FIREBASE
*********************************/   

    var config = {
    apiKey: "AIzaSyDp5uLcLT626edyPAnj3wNW-H4ZS1m3JZc",
    authDomain: "eventability-4e0eb.firebaseapp.com",
    databaseURL: "https://eventability-4e0eb.firebaseio.com/",
    projectId: "eventability-4e0eb",
    storageBucket: "eventability-4e0eb.appspot.com",
    messagingSenderId: "52655380758"
    };
    
    firebase.initializeApp(config);

    var database = firebase.database();

    $("#submit").on("click", function(event) {
        event.preventDefault();

        zip = $("#zip").val().trim();
        email = $("#email").val().trim();
        interest = $("#category").val();

        database.ref().push({
            zip: zip,
            email: email,
            interest: interest
        });
    });

    database.ref().on("value", function(snapshot) {

        if (snapshot === undefined) {

            database.ref().push({
                zip: zip,
                email: email,
                interest: interest
            });
        }
        else {
            var sv = snapshot.val();
            var svArr = Object.keys(sv);
            var lastIndex = svArr.length - 1;
            var lastKey = svArr[lastIndex];
            var lastObj = sv[lastKey];

            console.log(lastObj.zip);
            console.log(lastObj.email);
            console.log(lastObj.interest);

            console.log(snapshot.val());
        }
    }, function(errorObject) {
        console.log("Errors handled: " + errorObject.code);
    });





// End code for firebase

// console.log(interest);

// var pics = ['../img/concert.jpg', '../img/hang_out3.jpg', '../img/rock_climbing.jpg']

/*************************
MAIN HEADLINE SLIDESHOW
*************************/

var form = $('#formHolder');
var backgrounds = ['url("assets/img/concert.jpg") 0 0 no-repeat', 'url("assets/img/hang_out3.jpg") 0 0 no-repeat', 'url("assets/img/rock_climbing.jpg") 0 0 no-repeat'];
var current = 0;

function nextBackground() {
    form.css({
        'background': backgrounds[current = ++current % backgrounds.length],
        'background-size': '100%'

    });

    setTimeout(nextBackground, 10000);
}

setTimeout(nextBackground, 10000);
form.css({
    'background': backgrounds[0],
    'background-size': '100%'

});

// window.onresize = function() {

//     var width = window.outerWidth;
//     console.log(width);

//     if (width < 720) {

//         $('#formHolder').css({
//                 'background': 'none'

//         });
//     } else if (width >= 720) {

//         setTimeout(nextBackground, 10000);        
//     }
// };
     
    
/*************************
EVENTFUL API
*************************/

// $('#submit').on('click', function (e) {
//     e.preventDefault();

//     var zip = $('#zip').val().trim();
//     var email = $('#email').val().trim();
//     var distance = $('#distance').val().trim();
//     var category = $('#category').val();
//     var startDate = moment().format('YYYYMMDD') + "00";
//     var endDate = moment($('#date').val()).format('YYYYMMDD') + "00";
//     var dateRange = startDate + "-" + endDate;

//     console.log('Zip: ' + zip);
//     console.log('Email: ' + email);
//     console.log('Distance: ' + distance);
//     console.log('Category: ' + category);
//     console.log('Start Date: ' + startDate);
//     console.log('Date: ' + endDate);
//     console.log('Date Range: ' + dateRange);

//     var url = "http://api.eventful.com/json/events/search"
//     var apiKey = "xLMZHfCtVBSsLdqj";

//     url += '?' + $.param ({
//         'app_key': apiKey,
//         'q': category,
//         'location': zip,
//         'within': distance,
//         'date': dateRange,
//         'page_size': 10,
//         'sort_order': "relevance"

//     });

//     console.log(url);

//     $.ajax({
//         url: url,
//         method: 'GET',
//         dataType: 'jsonp'
//     }).done(function (data) {

//         console.log(data);

//         var events = data.events;

//         for (var i = 0; i < events.event.length; i++) {
            
//                 var $title = $('<h1>');
//                 $title.append(events.event[i].title);

//                 var $location = $('<p>');
//                 $location.append(events.event[i].venue_name);
//                 $location.append(events.event[i].venue_address);

//                 var $event = $('<div>');
//                 $event.append($title, $location);

//                 $('.slickHolder').slick('slickAdd', $event);

//         }

//     }); // END AJAX DONE


// }); // END SUBMIT CLICK LISTENER



/*******************************
EVENTBRITE API & GOOGLE MAPS API
*******************************/

// EVENTBRITE API

$('#submit').on('click', function (e) {
    e.preventDefault();

    var token = 'NHGJJNM3WETFRYYCXJ6H';
    var url = "https://www.eventbriteapi.com/v3/events/search/?token=" + token + "&expand=venue&";

    var zip = $('#zip').val().trim();
    var email = $('#email').val().trim();
    var distance = $('#distance').val().trim();
    // distance = distance + "mi";
    var category = $('#category').val();
    category = category.toString();
    var startDate = moment().format('YYYY-MM-DDThh:mm:ss');
    var endDate = moment($('#date').val()).format('YYYY-MM-DDThh:mm:ss');
    var dateRange = startDate + "-" + endDate;

    console.log('Zip: ' + zip);
    console.log('Email: ' + email);
    console.log('Distance: ' + distance);
    console.log(typeof distance);
    console.log('Category: ' + category);
    console.log(typeof category);
    console.log('Start Date: ' + startDate);
    console.log('Date: ' + endDate);
    console.log('Date Range: ' + dateRange);

    url += $.param({
        'q': category,
        'location.within': distance + "mi",
        'location.address': zip,
        'start_date.range_start': startDate,
        'start_date.range_end': endDate


    });

    $.ajax({
    method: "GET",
    url: url
    }).done(function(res) {
    console.log(res);
    
        function randomEvent() {

            var randomizer = Math.floor((Math.random() * 50));


    // var lat = parseFloat(res.events[0].venue.address.latitude);
    // var long = parseFloat(res.events[0].venue.address.longitude);

    // console.log(lat);
    // console.log(long);

    // function initMap() {
    //     var uluru = {lat: lat, lng: long};
    //     var map = new google.maps.Map(document.getElementById('map'), {
    //       zoom: 4,
    //       center: uluru
    //     });
    //     var marker = new google.maps.Marker({
    //       position: uluru,
    //       map: map
    //     });
    //   }

    // initMap();

    var eName = res.events[0].venue.name;
    var city = res.events[0].venue.address.city;
    var state = res.events[0].venue.address.region;

    console.log(eName);
    console.log(city); 
    console.log(state);

    var mapURL = "https://www.google.com/maps/embed/v1/place?key=AIzaSyDZO4fsXLv5ODYYBldfEUCCF63RmouiFWU&q=" 
    + eName + "," + city + "+" + state;

    $("#mapps").attr("src", mapURL);
=======
            console.log(randomizer);

            var title = res.events[randomizer].name.text;
            var description = res.events[randomizer].description.text;
            var date = res.events[randomizer].start.local;

            var $eventDiv = $('<div>');
            var $eventTitle = $('<h1>');
            var $eventImg = $('<img>');
            var $eventDes = $('<p>');
            var $eventDate = $('<p>');

            $eventTitle.append(title);
            $eventImg.attr('src', res.events[randomizer].logo.original.url);
            $eventDes.append(description);
            $eventDate.append(date);

            $eventDiv.append($eventTitle, $eventImg, $eventDes, $eventDate);

            $('#eventHolder').append($eventDiv);

            var randomizerButton = $('<button>');
        randomizerButton.addClass('randomizer btn').append('New Event');

            $('#eventHolder').prepend(randomizerButton);

            // GOOGLE MAPS API

            var lat = parseFloat(res.events[randomizer].venue.address.latitude);
            var long = parseFloat(res.events[randomizer].venue.address.longitude);

            console.log(lat);
            console.log(long);

            function initMap() {
                var uluru = {lat: lat, lng: long};
                var map = new google.maps.Map(document.getElementById('map'), {
                  zoom: 4,
                  center: uluru
                });
                var marker = new google.maps.Marker({
                  position: uluru,
                  map: map
                });
              }

            initMap();

        } // END randomEvent FUNCTION

        randomEvent();

        
        $(document).on('click', '.randomizer', function () {

            $('#eventHolder').empty();

            randomEvent();

        });

    // Google Maps API 
    //  function initMap() {
    //     var uluru = {lat: 33.121, lng: 131.044};
    //     var map = new google.maps.Map(document.getElementById('map'), {
    //       zoom: 4,
    //       center: uluru
    //     });
    //     var marker = new google.maps.Marker({
    //       position: uluru,
    //       map: map
    //     });
    //   }


    // initMap();

    

    }); // END API DONE


}); // END CLICK ON SUBMIT





}); // END READY