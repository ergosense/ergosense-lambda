'use strict'

const KinesisEvent = require('./kinesis-event')
const Event = require('./event')

/**
 * Private variable to keep supported type array
 */
const types = [
  KinesisEvent,
  Event
];

module.exports = {
  /**
   * By exporting this, we allow other people to add custom
   * event types.
   */
  Event: Event,
  /**
   *
   */
  addType: (type) => {
    types.push(type)
    return this
  },
  /**
   *
   */
  create: (raw, multiple = false) => {
    const res = []
    let key, type, extracted

    raw = raw.Records ? raw.Records : [ raw ]

    raw.forEach(record => {
      for (key in types) {
        type = types[key]

        if (extracted = type.fromRecord(record)) {
          res.push(extracted)
        }
      }
    })

    return multiple ? res : res.shift()
  }
}