
$(document).ready(function(){
    
/*********************************
MATERIALIZE & LOAD FORMATING
*********************************/

$('select').material_select();
$('.datepicker').pickadate();
$('#eventHolder').hide();


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

/*************************************************
EVENTBRITE API, GOOGLE MAPS API, SMARTYSTREETS API
*************************************************/



$('#submit').on('click', function (e) {
    e.preventDefault();

    var zip = $('#zip').val().trim();
    var email = $('#email').val().trim();
    var distance = $('#distance').val().trim();
    var category = $('#category').val();
    category = category.toString();
    var startDate = moment().format('YYYY-MM-DDThh:mm:ss');
    var endDate = moment($('#date').val()).format('YYYY-MM-DDThh:mm:ss');
    var dateRange = startDate + "-" + endDate;

// SMARTYSTREETS API

    var smartToken = 'nCkB0jk3NcAOlKBPbnOF';
    var smartAuth = '7040a637-7f2a-c512-85b2-a09906fa6824';
    var smartURL = 'https://us-zipcode.api.smartystreets.com/lookup?';
    smartURL += $.param({
        'auth-id': smartAuth,
        'auth-token': smartToken,
        'zipcode': zip
    });

    $.ajax({
        method: 'GET', 
        url: smartURL
    }).done(function (smart) {
        console.log(smart);
        console.log('Smart Valid: ' + smart[0].status);

        if(smart[0].status == "invalid_zipcode") {
            console.log('Enter Valid Zip Code');
        } else {
            console.log('Thats a good zip');
        }


    }); // END SMARTYSTREET AJAX DONE

// EVENTBRITE API

    var token = 'NHGJJNM3WETFRYYCXJ6H';
    var url = "https://www.eventbriteapi.com/v3/events/search/?token=" + token + "&expand=venue&";
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

            var randomizer = Math.floor((Math.random() * res.events.length));
            var eAddr = res.events[randomizer].venue.address.address_1;
            if (eAddr != null) {
                eAddr = eAddr.replace(/&/g, "and");
            }
            var eName = res.events[randomizer].venue.name;
            var city = res.events[randomizer].venue.address.city;
            var state = res.events[randomizer].venue.address.region;
            var title = res.events[randomizer].name.text;
            var description = res.events[randomizer].description.text;
            var date = res.events[randomizer].start.local;
            var formatDate = moment(date).format('MMMM Do YYYY, h:mm a')
            var address = res.events[randomizer].venue.address.address_1 + " " + res.events[randomizer].venue.address.address_2;
            var postal = res.events[randomizer].venue.address.postal_code;
            var $eventTitle = $('<h1>');
            var $eventImg = $('<img>');
            var $eventDes = $('<p>');
            var $eventDate = $('<p>');
            var $locName = $('<p>');
            var $locAddr = $('<p>');
            var $locRegion = $('<p>');
            var randomizerButton = $('<button>');
            var $buttonHolder = $('<div>');
            
            console.log("Randomizer: " + randomizer);

            $eventTitle.append(title).addClass('title');
            $eventImg.attr('src', res.events[randomizer].logo.original.url);
            $eventDes.append(description).addClass('description');
            $eventDate.append(formatDate).addClass('date');
            $('#eventDesc').append($eventTitle, $eventDate, $eventImg, $eventDes);

            $locName.append(eName).addClass('locName');
            $locAddr.append(address);
            $locRegion.append(city + ", " + state + " " + postal);
            $('#eventLocDetails').prepend($locName, $locAddr, $locRegion);
           
            randomizerButton.addClass('randomizer btn').append('New Event');
            $buttonHolder.append(randomizerButton).addClass('buttonHolder');

            $('#eventHolder').prepend($buttonHolder);
            $('#eventHolder').show();

        // GOOGLE MAPS API
            var mapURL = "https://www.google.com/maps/embed/v1/place?key=AIzaSyDZO4fsXLv5ODYYBldfEUCCF63RmouiFWU&q=" + eAddr + "," + city + "+" + state;

            $("#mapps").attr("src", mapURL);

            
        }; // END randomEvent FUNCTION

        randomEvent();
      
        $(document).on('click', '.randomizer', function () {

            $('#eventDesc, #eventLocDetails').empty();
            $('.buttonHolder').remove();

            randomEvent();

        }); // END CLICK ON RANDOMIZER BUTTON

       

    }); // END EVENTBRITE AJAX DONE


    $('#zip').val('');
    $('#email').val('');
    $('#category').val('');
    $('#date').val('');
    $('#eventDesc, #eventLocDetails, .buttonHolder').empty();

}); // END CLICK ON SUBMIT





}); // END READY