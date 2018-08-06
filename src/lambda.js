'use strict'
const Event = require('./events/event')
const KinesisEvent = require('./events/kinesis-event')

/**
 * Private variable to keep supported type array
 */
const types = [
  KinesisEvent,
  Event
];

/**
 * Lambda plugins
 */
const plugins = []

/**
 * Lambda proxy. Hides some AWS complexity with a wrapper function.
 */
function lambda (opts, fn) {
  // Check if the callback argument expects an array. If yes, then
  // we will try and pass a bulk operation to it. This is used for when
  // the input could contain multiple requests, like a Kinesis stream.
  const fnString = fn.toString()
  const bulk = fnString.match(/^.*\(\.\.\..+\)/)

  return (event, context, callback) => {
    const events = lambda.createEvents(event, bulk)
    const promises = []

    // Forward call to controller
    let promise = fn.apply(fn, events)

    // Run plugins
    plugins.forEach(e => {
      promise = e(event, promise)
    })

    promise
      .then(res => {
        callback(null, res)
      }).
      catch(err => {
        callback(err)
      })
  }
}

/**
 * Register a plugin
 */
lambda.plugin = (p) => {
  plugins.push(p)
}

lambda.addEventType = (type) => {
  types.push(type)
}

/**
 * Create usable event objects from the
 * raw data we receive from AWS
 *
 */
lambda.createEvents = (raw, multiple = false) => {
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

module.exports = lambda