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
    
/*************************
EVENTFUL API
*************************/

$('#submit').on('click', function (e) {
    e.preventDefault();

    var zip = $('#zip').val().trim();
    var email = $('#email').val().trim();
    var distance = $('#distance').val().trim();
    var category = $('#category').val();
    var date = $('#date').val();

    console.log('Zip: ' + zip);
    console.log('Email: ' + email);
    console.log('Distance: ' + distance);
    console.log('Category: ' + category);
    console.log('Date: ' + date);

    var url = "http://api.eventful.com/json/events/search"
    var apiKey = "xLMZHfCtVBSsLdqj";

    url += '?' + $.param ({
        'app_key': apiKey,
        'q': 'music',
        'location': 75205,
        'date': "2013061000-2017062000",
        'page_size': 10,
        'sort_order': "popularity"

    });

    console.log(url);

    $.ajax({
        url: url,
        method: 'GET',
        dataType: 'jsonp'
    }).done(function (data) {

        console.log(data);



    }); // END AJAX DONE





}); // END SUBMIT CLICK LISTENER


}); // END READY