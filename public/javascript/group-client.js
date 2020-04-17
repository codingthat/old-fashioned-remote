(function () {
  var timers = {};
  function form_submit(event) {
    event.target.classList.remove('error');
    event.target.classList.remove('success');
    if (timers[event.target.value]) {
      window.clearTimeout(timers[event.target.value]);
      delete timers[event.target];
    }
    event.target.classList.add('loading');
    var request = new XMLHttpRequest();
    request.open('POST', window.location.pathname + window.location.search, true);
    request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

    request.onerror = function() {
      event.target.classList.remove('loading');
      event.target.classList.add('error');
      timers[event.target.value] = window.setTimeout(function(){
        event.target.classList.remove('error');
      }, 5000);
    };
    request.onload = function() {
      if (request.status !== 200) {
        request.onerror();
        return;
      }
      event.target.classList.remove('loading');
      event.target.classList.add('success');
      timers[event.target.value] = window.setTimeout(function(){
        event.target.classList.remove('success');
      }, 1000);
    };

    request.send('keystroke_name=' + encodeURIComponent(event.target.value));
    event.preventDefault();
  }
  window.addEventListener("DOMContentLoaded", function() {
    var inputs = document.querySelectorAll("input");
    for (var i = 0; i < inputs.length; i++) {
      inputs[i].addEventListener("click", form_submit);
    }    
  });
})();