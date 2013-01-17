var easydate_options = {
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
};

update = function(){
  $('body').animate({backgroundColor:'#f5f5f5'}, 500);

  jQuery.ajax({
    type: 'GET',
    dataType: 'json',
    timeout: 1000,
    url: 'http://api.maschinenraum.tk/status.json',
    success: function(room) {
      var now  = new Date;

      console.log(room);
      if ( room.open ) {
        $('#status').html('offen');
        $('body').animate({backgroundColor:'#E7F5BC'}, 500);
      } else {
        $('#status').html('geschlossen');
        $('body').animate({backgroundColor:'#F5A9A9'}, 500);
      }
      $('#error').html('&nbsp;');
      $('#checked .easydate').attr('title', now.toUTCString());
      $('.easydate').easydate(easydate_options);
    },
    error: function(tweets) {
      $('#error').html('(keine Verbindung)');
    }
  });

  return false;
}

$(document).ready(function(){
  setTimeout(update, 200);
  setInterval(update, 5*60*1000);

  $('#update-button').click(update);
});
