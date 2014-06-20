show_error = function( error_message ) {
  $('#error').html(error_message);
};

set_status = function( status_message ) {
  $('#status').html(status_message);
};

set_time = function( selector, time ) {
  $(selector).attr('title', time.toUTCString());
  $(selector).easydate();
}

update_status = function( room ) {
  if ( room.open ) {
    set_status('<i class="icon-ok-sign icon-green"></i> open');
  } else {
    set_status('<i class="icon-remove-sign icon-red"></i> closed');
  }

  set_time('#checked .easydate', new Date);
  set_time('#since .easydate', new Date(room.lastchange * 1000));
};

update_button_interval = null;
update_button_animation_should_stop = false;

animate_update_button = function() {
  $('#update-button i').addClass('icon-spin');
  update_button_interval = setInterval(function(){
    if (update_button_animation_should_stop) {
      $('#update-button i').removeClass('icon-spin');
      update_button_animation_should_stop = false;
      clearInterval(update_button_interval);
    }
  }, 1000);
};

stop_animating_update_button = function() {
  update_button_animation_should_stop = true;
};

update = function() {
  animate_update_button();

  jQuery.ajax({
    type:       'GET',
    dataType:   'json',
    timeout:    1000,
    retryCount: 0,
    retryLimit: 5,
    url:        'http://api.maschinenraum.tk/status.json',
    success: function(res){
      show_error('&nbsp;');
      update_status(res);
      stop_animating_update_button();
    },
    error: function(xhr, textStatus, errorThrown){
      this.retryCount++;
      this.timeout *= 2;
      if (this.retryCount <= this.retryLimit) {
        show_error('Retrying… '+this.retryCount+'/'+this.retryLimit);
        var ajax_callback = this;
        setTimeout(function(){
          $.ajax(ajax_callback);
        }, 500);
      } else {
        if (xhr.status === 500) {
          show_error('API down');
        } else {
          show_error('No connection');
        }
        stop_animating_update_button();
      }
    }
  })
}

$(document).ready(function(){
  // disable scrolling
  $(document).on('touchmove', false);

  update();
  setInterval(update, 5*60*1000);

  $('#update-button').click(update);
});
