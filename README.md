# ui-io-bus

Experiment into using @Input and @Output as a bus to reduce template footprint and make state composable

## Todo

1. Add readme comments
2. Create marbles tests on Component Store repo

## Ideas

- Event Object - Class or Interface
  - Event defs like actions?
  - How else to strongly type?
- Unpacker for
  - inputsBus$
  - inputsBus - no stream
  - throw if no callback
- outputsBus handler
  - callback array
  - update observable
  - throw if no callback unless update observable is set
- inputBus handler
  - Cache input events until all required ones arrive and then call their handlers in a specific order
  - Allow unlisted events to bypass cache and call handler or throw no handler error immediately
- Logger
  - Styled console logs
  - Log filter at module or container component level
  - Highlight log events instead of filter
  - logging on by default in non-prod mode
- RxJs operators
  - filter events
  - stream logger
- Filter in container
- Filter in presenter component
- Loopback helper
  - convert specified Output events to typed Inputs stream
