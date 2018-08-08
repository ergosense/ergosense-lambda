'use strict'
const Event = require('./event')

class KinesisEvent extends Event {
  constructor (record) {
    super(record)

    const raw = record.kinesis.data

    // Parse if it's valid JSON, otherwise attach it to the "data" attribute
    // as a string.
    try {
      this.data = JSON.parse(raw)
    } catch (e) {
      // Swallow this error, invalid JSON
      this.data = raw
    }
  }
}

KinesisEvent.fromRecord = (record) => {
  if (record.kinesis) {
    return new KinesisEvent(record)
  }

  return false
}

module.exports = KinesisEvent
