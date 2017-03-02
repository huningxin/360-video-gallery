/* global AFRAME */

/**
 * Component that listens to an event, fades out an entity, swaps the texture, and fades it
 * back in.
 */
AFRAME.registerComponent('set-video', {
  schema: {
    on: {type: 'string'},
    target: {type: 'selector'},
    src: {type: 'string'},
    dur: {type: 'number', default: 300}
  },

  init: function () {
    var data = this.data;
    var el = this.el;
    var sceneEl = el.sceneEl;
    var controls = document.querySelector('#controls');
    var home = document.querySelector('#home-page');

    el.addEventListener(data.on, function () {
        document.getElementById('video').src = data.src;
        home.emit('off');
        setTimeout(function() {
          controls.setAttribute("visible", true);
        }, 500);
    });
  }
});
