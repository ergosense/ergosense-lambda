const assert = require('assert')
const KinesisEvent = require('./../src/events/kinesis-event')
const lambda = require('./../src/lambda')
const fs = require('fs')
const path = require('path')

describe('kinesis-event', () => {
  let sample

  beforeEach(() => {
    sample = JSON.parse(fs.readFileSync(path.join(__dirname, '/data/kinesis.json'), 'utf8'))
  })

  it('should return KinesisEvent object if event type is "kinesis"', () => {
    const object = { kinesis: { data: Buffer.from('hello').toString('base64') }, myname: 'test' }
    const parsed = lambda.createEvents(object)

    assert(parsed instanceof KinesisEvent)
    assert.deepEqual(parsed.kinesis, object.kinesis)
    assert.equal(parsed.myname, object.myname)
  })

  it('should extract the base64 encoded data', () => {
    const parsed = lambda.createEvents(sample)

    assert.equal('SGVsbG8sIHRoaXMgaXMgYSB0ZXN0IDEyMy4=', parsed.data)
  })
})
