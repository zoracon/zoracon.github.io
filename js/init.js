(function($){
  if (SVG.supported) {
    var draw = SVG('drawing').size(300, 150);
    var circle = draw.circle(100).animate(2000, '>', 1000).fill('#fff');

    var drawich = SVG('drawing').size(300, 150);
    var circleich = drawich.circle(100).animate(2000, '>', 1000).fill('#fff');
  } else {
    alert('SVG not supported');
  }
})(jQuery); // end of jQuery name space