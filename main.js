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
    set_status('offen')
    set_color('#e7f5bc')
  } else {
    set_status('geschlossen')
    set_color('#f5a9a9')
  }
  show_error('&nbsp;')
  set_time( new Date )
}

update = function(){
  set_status('&hellip;')
  set_color('#f5f5f5')

  jQuery.ajax({
    type:     'GET',
    dataType: 'json',
    timeout:  1000,
    url:      'http://api.maschinenraum.tk/status.json',
    success:  function(res){ update_status(res) },
    error:    function(res){ show_error('Keine Verbindung') }
  })
}

$(document).ready(function(){
  setTimeout(update, 200)
  setInterval(update, 5*60*1000)

  $('#update-button').click(update)
});
