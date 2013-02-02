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

set_time = function( time ) {
  $('#checked .easydate').attr('title', time.toUTCString())
  $('.easydate').easydate(easydate_options)
}

update_status = function( room ) {
  if ( room.open ) {
    set_status('<i class="icon-ok-sign icon-green"></i> offen')
  } else {
    set_status('<i class="icon-remove-sign icon-red"></i> geschlossen')
  }
  $('#update-button i').removeClass('icon-spin')
  show_error('&nbsp;')
  set_time( new Date )
}

update = function(){
  set_status('…')
  $('#update-button i').addClass('icon-spin')

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
  $('body').on('touchmove', false)

  update()
  setInterval(update, 5*60*1000)

  $('#update-button').click(update)
});
