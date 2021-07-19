# ui-output-bus

Helper functions to merge Angular Component @Outputs into a bus to reduce template footprint.

## Background

When creating components that get used in many places, (i.e. apps that use common features), having many @Inputs and @Outputs makes the container templates bloated and hard to read. On top of that, repeated revisions of the UI component might include changes or additions to @Inputs and @Outputs that need to be updated in every template (and underlying local state) where the component is used. Some of these can easily be missed by the compiler (e.g. if the UI component doesn't throw an error for missing @Inputs or unused @Outputs), meaning that all implementations have to be updated manually.

## About

This library provides helper functions to create Output Events of different types that emit on a single bussed @Output. It has the extra benefits of optional logging, and optional error throw if an unexpected event type comes through the bus - helping you to develop and debug your bus.

Whilst this is a published library, my intention is not necessarily that you consume this in it's published form only. Please feel welcome to clone the Github repo and migrate the lib into your code (just leave me a Github star to make me happy), and then you can tweak the Output Event Bus interface object to suit your needs. It's simple enough to not require changes against future Angular versions.

## Usage

Emitting Output Bus Events inside the child UI component:

```javascript
  @Output() outBus: EventEmitter<AddBookFormSubmitEvent> = new EventEmitter();

  submit() {
    outBusEmit<AddBookFormSubmitEvent>(
      this.outBus,
      OutputEventNames.AddBookFormSubmit,
      this.formGroup.getValue()
    );
  }
```

Listening for Output Bus Events in the container template:

```html
<app-add-book-form
  [data]="vm.addBookFormData"
  (outBus)="outHandler($event)"
></app-add-book-form>
```

Handling Output Bus Events in the container component class:

```javascript
  outHandler(event: OutputEvents) {
    environment.production || this.outLog.logOutputEvent(event);

    outputEventHandler(event, {
      [OutputEventNames.AddBookFormSubmit]: this.upsertBook,
      [OutputEventNames.BookListSelectBook]: this.selectBook,
      [OutputEventNames.BookListClearSelectedBook]: this.clearSelectedBook,
      [OutputEventNames.ShowFormCheckboxChange]: this.toggleShowForm,
      [OutputEventNames.TabsSelectTab]: this.selectTab,
    });
  }
```
