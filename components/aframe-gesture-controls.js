/* global AFRAME */

/**
 * Component that listens to an event, fades out an entity, swaps the texture, and fades it
 * back in.
 */
AFRAME.registerComponent('gesture', {
  schema: {
  },

  init: function () {
    this.vrDisplay = null;
    this.state = 'open';
    this.foundHands = false;
  },

  tick: function (t, dt) {
    function GestureEvent (type, side) {
      this.type = type;
      this.side = side;
    };

    if (this.vrDisplay && this.vrDisplay.getHandPositions) {
      var hands = this.vrDisplay.getHandPositions();

      if (this.foundHands === false && hands.length > 0) {
        this.foundHands = true;
        this.emit(new GestureEvent('handsfound'));
        console.log('emit handsfound');
      } else if (this.foundHands === true && hands.length === 0) {
        this.foundHands = false;
        this.emit(new GestureEvent('handsnotfound'));
        console.log('emit handsnotfound');
      }

      for (var i = 0; i < hands.length; ++i) {
        var hand = hands[i];

        if (hand.closing && this.state === 'open') {
          this.emit(new GestureEvent('gestureclosing', hand.side));
          this.state = 'closed';
          console.log('emit gestureclosing');
        }
        if (hand.opening && this.state === 'closed') {
          this.emit(new GestureEvent('gestureopening', hand.side));
          console.log('emit gestureopening');
          this.state = 'open';
        }
      }
    } else {
      if (this.el.sceneEl.effect && this.el.sceneEl.effect.getVRDisplay()) {
        this.vrDisplay = this.el.sceneEl.effect.getVRDisplay();
      }
    }
  },
  emit: function (event) {
    // Emit original event.
    this.el.emit(event.type, event);
  },
});
