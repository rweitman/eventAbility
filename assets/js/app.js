
$(document).ready(function(){
      // $('.carousel.carousel-slider').carousel({fullWidth: true});
    $('select').material_select();
    $('.datepicker').pickadate();

    $('.slickHolder').slick({
    	dots: true,
        infinite: true
      });

    var form = $('#formHolder');
    var backgrounds = ['url("assets/img/concert.jpg") 0 0 no-repeat', 'url("assets/img/hang_out3.jpg") 0 0 no-repeat', 'url("assets/img/rock_climbing.jpg") 0 0 no-repeat'];
    var current = 0;


    var zip;
    var email;
    var distance;
    var interest;
    var date;

    // Beginning code for firebase
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

        console.log(interest);

    // var pics = ['../img/concert.jpg', '../img/hang_out3.jpg', '../img/rock_climbing.jpg']

    $('#submit').on('click', function (e) {
    	e.preventDefault();

    	$('#formHolder').slideUp(3000);

    });

     // Google Maps API 
     function initMap() {
        var uluru = {lat: -25.363, lng: 131.044};
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
    

    function nextBackground() {
    	

        form.css({
            'background': backgrounds[current = ++current % backgrounds.length],
            'background-size': '100%'

    });

        setTimeout(nextBackground, 10000);
    }

    
    setTimeout(nextBackground, 10000);
    form.css('background', backgrounds[0]);

   

}); // END READY