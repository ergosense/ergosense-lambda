'use strict'

class Event {
  constructor (record) {
    Object.assign(this, record)
  }
}

Event.fromRecord = (record) => {
  return new Event(record)
}

module.exports = Event