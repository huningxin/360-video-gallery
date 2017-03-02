AFRAME.registerComponent('home-page', {
  schema: {
    on: {type: 'string', default: 'on'},
    off: {type: 'string', default: 'off'}
  },
  init: function () {
    var self = this;
    this.status = 'on';
    var data = this.data;
    var el = this.el;
    var line1 = document.querySelector('#line1');
    var line2 = document.querySelector('#line2');
    var line3 = document.querySelector('#line3');
    el.addEventListener(data.on, function(){
      if (self.status !== 'off')
        return;
      console.log('on');
      el.appendChild(line1);
      el.appendChild(line2);
      el.appendChild(line3);
      self.status = 'on';
    });
    el.addEventListener(data.off, function(){
      if (self.status !== 'on')
        return;
      console.log('off');
      el.removeChild(line1);
      el.removeChild(line2);
      el.removeChild(line3);
      self.status = 'off';
    });

    function backToHome() {
      var controls = document.querySelector('#controls');
        controls.setAttribute("visible", false);
        document.getElementById('video').src = 'videos/background.mp4';
        setTimeout(function() {
          el.emit('on');
        }, 500);
    }

    document.onkeypress = function(event) {
      if (event.key === 'Backspace') {
        backToHome();
      }
    }

    document.querySelector('#vive-controls').addEventListener('trackpaddown', backToHome);
  } 
});