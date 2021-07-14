# ui-io-bus

Experiment into using merged @Inputs and @Output as a bus to reduce template footprint and make state composable

## Todo

Add readme comments
Create marbles tests on Component Store repo
Add unit tests to lib

## Extra Possible Ideas

- Output Bus handler
  - [ ] update observable as separate helper
- Logger
  - [ ] Log filter at module or container component level
  - [ ] Highlight log events instead of filter
  - [ ] logging on by default in non-prod mode
- RxJs operators
  - [ ] filter events
  - [ ] stream logger
- Loopback helper
  - [ ] convert specified Output events to typed Inputs stream
