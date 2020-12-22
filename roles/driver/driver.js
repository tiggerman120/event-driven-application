'use strict';

const events = require('../../events');
require('../vendor/vendor-handlers');

events.on('pickup', pickUphandler);

function pickUphandler(payload) {
  setTimeout(() => {
    console.log(`DRIVER: PICKED UP ${payload.orderId}`);
    events.emit('in-transit', payload);
  }, 1000);
  setTimeout(() => {
    console.log('delivered');
    events.emit('delivered', payload);
  }, 3000);
}

