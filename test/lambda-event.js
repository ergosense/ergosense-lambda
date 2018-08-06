const assert = require('assert')
const Event = require('./../src/events/event')
const lambda = require('./../src/lambda')

describe('lambda-event', () => {
  it('should return Event object with properties transferred', () => {
    const object = { hello: true, myname: 'test' }
    const parsed = lambda.createEvents(object)

    assert(parsed instanceof Event)
    assert.equal(parsed.hello, object.hello)
    assert.equal(parsed.myname, object.myname)
  });
});