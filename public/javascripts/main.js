show_error = function( error_message ) {
  $('#error').html(error_message);
  $('#update-button i').removeClass('icon-spin')
}

set_status = function( status_message ) {
  $('#status').html(status_message)
}

set_checked = function( time ) {
  $('#checked .easydate').attr('title', time.toUTCString())
  $('#checked .easydate').easydate()
}

set_since = function( time ) {
  $('#since .easydate').attr('title', time.toUTCString())
  $('#since .easydate').easydate()
}

update_status = function( room ) {
  if ( room.open ) {
    set_status('<i class="icon-ok-sign icon-green"></i> open')
  } else {
    set_status('<i class="icon-remove-sign icon-red"></i> closed')
  }

  show_error('&nbsp;')
  set_checked( new Date )
  set_since( new Date( room.lastchange * 1000 ) )
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

lock_portrait = function(e) {
  var portrait = (window.orientation % 180 == 0)
  $("body > div").css("-webkit-transform", !portrait ? "rotate(-90deg)" : "")
}

$(document).ready(function(){
  // disable scrolling
  $('body').on('touchmove', false)
  
  // lock to portrait mode
  $(window).on('orientationchange', lock_portrait)
  $(window).setTimeout(lock_portrait, 0);

  update()
  setInterval(update, 5*60*1000)
});
