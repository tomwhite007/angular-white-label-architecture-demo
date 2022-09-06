# ui-output-bus

Experiment into using merged @Inputs and @Output as a bus to reduce template footprint.

## Latest News

On reflection, I believe that while the concept of an Output Bus is sound, my implementation using a lib to do it is probably overkill. I intend to rewrite this solution into a simple lightweight function so as to reduce learning required, and hopefully negate the need for an npm lib at all.

## NPM library link

This library is also available as an NPM lib: [ngx-ui-output-bus](https://www.npmjs.com/package/@gyrus/ngx-ui-output-bus)

## Watch it go

1. `ng serve`
2. Open the console so you can see the logged events
3. Start clicking

## Background

When creating feature UI / Presenter / Dumb (or Atomic Organism) components that get used in many places, i.e. apps that use common features, having many @Inputs and @Outputs makes the containing templates bloated and hard to read. On top of that, repeated revisions of the UI component might include changes or additions to @Inputs and @Outputs that need to be updated in every template (and underlying local state) where the component is used. Some of these can easily be missed by the compiler (e.g. if the UI component doesn't throw an error for missing @Inputs), meaning that all implementations have to be updated manually. This maintenance increases to potentially unmanageable levels at scale.

This repo experiment builds on the concept used my many developers to group @Inputs into one or two big ones for easier maintenance. [See this repo by Tim Deschryver for a similar approach](https://github.com/timdeschryver/ngrx-family-grocery-list/blob/master/src/app/groceries/pages/grocery-family-member-page.component.ts) and [this article by Brandon Roberts](https://dev.to/brandontroberts/maximizing-and-simplifying-component-views-with-ngrx-selectors-286j). The next step to me seems to find the easiest way to group @Outputs together into one. [See the books-manager app in this repo for how I've achieved that](apps/books-manager/src/app/book-manager/book-manager.component.html).

If you can think of a better way to address any of these concerns, I'd like to hear it. Please do comment.

## Todo

- Create marbles tests on Component Store repo
- Add unit tests to lib

## Extra Possible Ideas

- Output Bus Emitter
  - [ ] Extend EventEmitter, rather than use pure function (outBusEmit) to simplify emit syntax?
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
