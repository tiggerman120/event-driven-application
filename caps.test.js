'use strict';

require('./roles/vendor/vendor-handlers');
require('./roles/driver/driver');
require('./caps');
const events = require('./events');

describe('caps events', () => {
  let consoleSpy;

  beforeEach(() => {
    consoleSpy = jest.spyOn(console, 'log').mockImplementation();
  });
  
  afterEach(() => {
    consoleSpy.mockRestore();
  });

  it('pickup', () => {
    events.emit('pickup', { orderId: 1 });
    jest.useFakeTimers();
    expect(consoleSpy).toBeCalled();
  });

  it('Delivered', () => {
    events.emit('delivered', { orderId: 1 });
    expect(consoleSpy).toBeCalled();
  });

  it('in-transit', () => {
    events.emit('in-transit', { orderId: 1 });
    expect(consoleSpy).toBeCalled();
  });
});
