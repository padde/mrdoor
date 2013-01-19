easydate_options = {
  locale: { 
    "future_format": "%s %t", 
    "past_format": "%s %t", 
    "second": "Sekunde", 
    "seconds": "Sekunden", 
    "minute": "Minute", 
    "minutes": "Minuten", 
    "hour": "Stunde", 
    "hours": "Stunden", 
    "day": "Tag", 
    "days": "Tage", 
    "week": "Woche", 
    "weeks": "Wochen", 
    "month": "Monat", 
    "months": "Monate", 
    "year": "Jahr", 
    "years": "Jahre", 
    "yesterday": "Gestern", 
    "tomorrow": "Morgen", 
    "now": "Gerade eben", 
    "ago": "Vor", 
    "in": "In" 
  }
}

spinner_options = {
  lines: 8, // The number of lines to draw
  length: 4, // The length of each line
  width: 4, // The line thickness
  radius: 5, // The radius of the inner circle
  corners: 1, // Corner roundness (0..1)
  rotate: 0, // The rotation offset
  color: '#000', // #rgb or #rrggbb
  speed: 1, // Rounds per second
  trail: 55, // Afterglow percentage
  shadow: false, // Whether to render a shadow
  hwaccel: false, // Whether to use hardware acceleration
  className: 'spinner', // The CSS class to assign to the spinner
  zIndex: 2e9, // The z-index (defaults to 2000000000)
  top: 'auto', // Top position relative to parent in px
  left: 'auto' // Left position relative to parent in px
};

show_error = function( error_message ) {
  $('#error').html(error_message);
}

set_status = function( status_message ) {
  $('#status').html(status_message)
}

set_color = function( color ) {
  $('body').animate({ backgroundColor: color }, 500)
}

set_time = function( time ) {
  $('#checked .easydate').attr('title', time.toUTCString())
  $('.easydate').easydate(easydate_options)
}

update_status = function( room ) {
  if ( room.open ) {
    set_status('<i class="icon-ok-sign icon-large icon-green"></i> offen')
    set_color('#F1FFEA')
  } else {
    set_status('<i class="icon-remove-sign icon-large icon-red"></i> geschlossen')
    set_color('#FEDCDD')
  }
  show_error('&nbsp;')
  set_time( new Date )
}

update = function(){
  set_status('<div id="spinner"></div>')
  var target = document.getElementById('spinner');
  var spinner = new Spinner(spinner_options).spin(target);

  set_color('#f5f5f5')

  jQuery.ajax({
    type:     'GET',
    dataType: 'json',
    timeout:  1000,
    url:      'http://mrdoor.paddd.de/status.json',
    success:  function(res){ update_status(res) },
    error:    function(res){ show_error('Keine Verbindung') }
  })
}

$(document).ready(function(){
  $('body').on('touchmove', false)

  update()
  setInterval(update, 5*60*1000)

  $('#update-button').click(update)
});
