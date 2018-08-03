const assert = require('assert')
const KinesisEvent = require('./../src/kinesis-event')
const Events = require('./../src/events')
const fs = require('fs')
const path = require('path')

describe('kinesis-event', () => {
  let sample

  beforeEach(() => {
    sample = JSON.parse(fs.readFileSync(path.join(__dirname, '/data/kinesis.json'), 'utf8'))
  })

  it('should return KinesisEvent object if event type is "kinesis"', () => {
    const object = { kinesis: { data: Buffer.from("hello").toString("base64") }, myname: 'test' }
    const parsed = Events.create(object)

    assert(parsed instanceof KinesisEvent)
    assert.deepEqual(parsed.kinesis, object.kinesis)
    assert.equal(parsed.myname, object.myname)
  });

  it('should extract the base64 encoded data', () => {
    const parsed = Events.create(sample)

    assert.equal("Hello, this is a test 123.", parsed.data)
  })
});