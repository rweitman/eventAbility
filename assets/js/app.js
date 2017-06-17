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
    var startDate = moment().format('YYYYMMDD') + "00";
    var endDate = moment($('#date').val()).format('YYYYMMDD') + "00";
    var dateRange = startDate + "-" + endDate;

    console.log('Zip: ' + zip);
    console.log('Email: ' + email);
    console.log('Distance: ' + distance);
    console.log('Category: ' + category);
    console.log('Start Date: ' + startDate);
    console.log('Date: ' + endDate);
    console.log('Date Range: ' + dateRange);

    var url = "http://api.eventful.com/json/events/search"
    var apiKey = "xLMZHfCtVBSsLdqj";

    url += '?' + $.param ({
        'app_key': apiKey,
        'q': category,
        'location': zip,
        'within': distance,
        'date': dateRange,
        'page_size': 10,
        'sort_order': "relevance"

    });

    console.log(url);

    $.ajax({
        url: url,
        method: 'GET',
        dataType: 'jsonp'
    }).done(function (data) {

        console.log(data);

        var events = data.events;

        for (var i = 0; i < events.event.length; i++) {
            
                var $title = $('<h1>');
                $title.append(events.event[i].title);

                var $location = $('<p>');
                $location.append(events.event[i].venue_name);
                $location.append(events.event[i].venue_address);

                var $event = $('<div>');
                $event.append($title, $location);

                $('.slickHolder').slick('slickAdd', $event);

        }

    }); // END AJAX DONE


}); // END SUBMIT CLICK LISTENER



/*************************
EVENTBRITE API
*************************/

// SAMPLE REQUEST:
// $.ajax({
// method: "GET",
// url: "https://www.eventbriteapi.c..." + token + "&q=fitness&location.address=San Diego&page=3",
// }).done(function(res) {
// console.log(res);

}); // END READY