const assert = require('assert')
const Event = require('./../src/event')
const Events = require('./../src/events')

describe('lambda-event', () => {
  it('should return Event object with properties transferred', () => {
    const object = { hello: true, myname: 'test' }
    const parsed = Events.create(object)

    assert(parsed instanceof Event)
    assert.equal(parsed.hello, object.hello)
    assert.equal(parsed.myname, object.myname)
  });
});