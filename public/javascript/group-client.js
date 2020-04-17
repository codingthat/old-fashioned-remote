(function () {
  function form_submit(event) {
    var request = new XMLHttpRequest();
    request.open('POST', window.location.pathname + window.location.search, true);
    request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
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
