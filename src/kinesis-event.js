'use strict'
const Event = require('./event')

class KinesisEvent extends Event {
  constructor (record) {
    super(record)
  }
}

KinesisEvent.fromRecord = (record) => {
  if (record.kinesis)
  {
    return new KinesisEvent(record)
  }

  return false;
}

module.exports = KinesisEvent