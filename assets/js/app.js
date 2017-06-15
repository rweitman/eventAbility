$(document).ready(function(){
      // $('.carousel.carousel-slider').carousel({fullWidth: true});
    $('select').material_select();
    $('.datepicker').pickadate();

    $('.slickHolder').slick({
    	dots: true,
        infinite: true
      });


    var zip;
    var email;
    var distance;
    var interest;
    var date;

    // var pics = ['../img/concert.jpg', '../img/hang_out3.jpg', '../img/rock_climbing.jpg']

    $('#submit').on('click', function (e) {
    	e.preventDefault();

    	$('#formHolder').slideUp(3000);

    });

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
    form.css('background', backgrounds[0]);






}); // END READY