'use strict';

const vendor = require('./vendor/vendor-handlers');

const events = require('./events');

describe('caps events', () => {
  let consoleSpy;
  let x = jest.fn();

  beforeEach(() => {
    consoleSpy = jest.spyOn(console, 'log').mockImplementation();
  });
  
  afterEach(() => {
    consoleSpy.mockRestore();
  });

  it('hears event pickup', () => {
    
    expect(consoleSpy).toHaveBeenCalledWith();

  });
});
