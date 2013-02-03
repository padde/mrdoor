show_error = function( error_message ) {
  $('#error').html(error_message);
  $('#update-button i').removeClass('icon-spin')
}

set_status = function( status_message ) {
  $('#status').html(status_message)
}

set_time = function( selector, time ) {
  $(selector).attr('title', time.toUTCString())
  $(selector).easydate()
}

update_status = function( room ) {
  if ( room.open ) {
    set_status('<i class="icon-ok-sign icon-green"></i> open')
  } else {
    set_status('<i class="icon-remove-sign icon-red"></i> closed')
  }

  show_error('&nbsp;')
  set_time('#checked .easydate', new Date )
  set_time('#since .easydate', new Date( room.lastchange * 1000 ) )
}

update = function() {
  $('#update-button i').addClass('icon-spin')

  jQuery.ajax({
    type:     'GET',
    dataType: 'json',
    timeout:  1000,
    url:      'http://api.maschinenraum.tk/status.json',
    success:  function(res){ update_status(res) },
    error:    function(res){ show_error('No connection') }
  })
}

$(document).ready(function(){
  // disable scrolling
  $(document).on('touchmove', false)

  update()
  setInterval(update, 5*60*1000)

  $('#update-button').click(update)
});
