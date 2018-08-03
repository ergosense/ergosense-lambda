const assert = require('assert')
const KinesisEvent = require('./../src/kinesis-event')
const Events = require('./../src/events')

describe('kinesis-event', () => {
  it('should return KinesisEvent object if event type is "kinesis"', () => {
    const object = { kinesis: { hello: true }, myname: 'test' }
    const parsed = Events.create(object)

    assert(parsed instanceof KinesisEvent)
    assert.deepEqual(parsed.kinesis, object.kinesis)
    assert.equal(parsed.myname, object.myname)
  });
});