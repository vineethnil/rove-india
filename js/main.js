$(document).ready(function() {
  
  // make the top container paralex scroll
  $('#rove_header_cntr').css('height', $(window).height());
  $('#rove_top_slide .slider-item').css('height', $(window).height());
  var slht=$('#rove_top_slide .slider-item').height();
  $('#rove_top_slide .text-content').css('padding-top', slht/3);
  $(window).scroll(function() {
       var scrollTop = $(window).scrollTop();
       var widow=$(window).height();
       if(scrollTop<250){
        var newHeight=widow-scrollTop;
      $('#rove_header_cntr').css('height', newHeight);
      $('#rove_top_slide  .slider-item').css('height', newHeight);
      slht=$('#rove_top_slide .slider-item').height();
      $('#rove_top_slide .text-content').css('padding-top', slht/3);
       }    
  });



  // animate the description on slider change
  $('#rove_mobile_slider').on('slid.bs.carousel', function() {
    var currentIndex = $('#rove_mobile_slider div.active').index() + 1;
    if(currentIndex===1){
      $('.slide_sesc_one').show(750);
      $('.slide_sesc_two').hide();
      $('.slide_sesc_three').hide();
    }else if(currentIndex===2){
      $('.slide_sesc_one').hide();
      $('.slide_sesc_two').show(750);
      $('.slide_sesc_three').hide();
    }else if(currentIndex===3){
      $('.slide_sesc_one').hide();
      $('.slide_sesc_two').hide();
      $('.slide_sesc_three').show(750);
    }
  });
});

// change the header background color and logo on scroll
$(window).on("scroll", function() {
    var scrollTop     = $(window).scrollTop(),
    elementOffset = $('#rove_mobile_slider_cntr').offset().top,
    distance      = (elementOffset - scrollTop);
    if(distance < 130) {
        $("header").addClass("change");
        $('.navbar-brand img').attr("src","images/rove_logo_dark.png");
    } else {
       $("header").removeClass("change");
       $('.navbar-brand img').attr("src","images/rove_logo.png");
    }
});

// typewrite animation on the top container
var TxtType = function(el, toRotate, period) {
    this.toRotate = toRotate;
    this.el = el;
    this.loopNum = 0;
    this.period = parseInt(period, 10) || 2000;
    this.txt = '';
    this.tick();
    this.isDeleting = false;
};

TxtType.prototype.tick = function() {
  var i = this.loopNum % this.toRotate.length;
  var fullTxt = this.toRotate[i];

  if (this.isDeleting) {
  this.txt = fullTxt.substring(0, this.txt.length - 1);
  } else {
  this.txt = fullTxt.substring(0, this.txt.length + 1);
  }

  this.el.innerHTML = '<span class="wrap">'+this.txt+'</span>';

  var that = this;
  var delta = 200 - Math.random() * 100;

  if (this.isDeleting) { delta /= 2; }

  if (!this.isDeleting && this.txt === fullTxt) {
  delta = this.period;
  this.isDeleting = true;
  } else if (this.isDeleting && this.txt === '') {
  this.isDeleting = false;
  this.loopNum++;
  delta = 500;
  }

  setTimeout(function() {
  that.tick();
  }, delta);
};

window.onload = function() {
    var elements = document.getElementsByClassName('typewrite');
    for (var i=0; i<elements.length; i++) {
        var toRotate = elements[i].getAttribute('data-type');
        var period = elements[i].getAttribute('data-period');
        if (toRotate) {
          new TxtType(elements[i], JSON.parse(toRotate), period);
        }
    }
    // INJECT CSS
    var css = document.createElement("style");
    css.type = "text/css";
    css.innerHTML = ".typewrite > .wrap { border-right: 0.08em solid #000000}";
    document.body.appendChild(css);
};
