# Ergosense Lambda Events

## Overview

One great benefit of lambda is that it should not care about the calling service. It's a "function as a service", it should be able to handle direct calls...web server calls...event calls...etc.

The problem is that there are many different event sources and they don't all act the same way. Here you can find a list of some of the event sources for a lambda function.

https://docs.aws.amazon.com/lambda/latest/dg/eventsources.html

This library aims to abstract away the "glue code" we need to take these event payloads and convert them into usable data. So instead of...

```
let data = {}

if (eventType == 'kinesis') {
  data = ...
} else if (eventType == 'lambda') {
  data = ...
} else if (eventType == 'http') {
  data = ...
} else if ...

```

We only need this...

```
const data = Events.create(event)

// Data now contains the payload information we desire, as well as extra attributes
// depending on it's event source.
```