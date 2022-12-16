# Angular-white-label-architecture-demo

Experiment into using various combined patterns to maximise reusable code in a white label monorepo.

This repo contains two apps: 'books-manager' the base app, and 'acme-books-manager', which reuses most of books-manager's code but has its own Container Component template to re-compose the UI into a different layout, theme, config, api and UX.

## Built with Nrwl Nx

This is an Angular project containing 2 apps that runs on Nrwl Nx. To serve either of them from the command line:

```
npx nx serve books-manager

npx nx serve acme-books-manager
```

There are other scripts available in `package.json`

## White Label Patterns Used

- [Enterprise Angular Monorepo Patterns](https://go.nrwl.io/angular-enterprise-monorepo-patterns-new-book) - to maximise code reuse.
- Public Container Services - to allow Container Class methods to be reused.
- UI Components Merged Inputs and Output Bus - to reduce @Input and @Output maintenance in templates.
- Shared Base Styles lib with CSS Variables for theme values.
- Lazy loaded SVG Sprite Sheets - for svg theming, and reduced initial bundle.
- Config Service to provide Environment Variables to agnostic libs.
- Common Environment Variables interface for consistency.
- Common Environment Variables function to reuse common values across environments.

### Enterprise Angular Monorepo Patterns

The libraries in this repo are built using the Enterprise Angular Monorepo Patterns architecture. Each lib can only be one of four types; `data-access`, `feature`, `ui`, or `util` (note the prefix on the folder names of each lib).

There are strict rules about what each lib can do, and which type can import from another type (See: [Slide Deck showing the benefits and a quick introduction to Enterprise Angular Monorepo Patterns](https://docs.google.com/presentation/d/1onEJciG3Yxb5PoOxl9ZyYCcdc-FykPEoDl4utx4k7WU/edit?usp=sharing) for a 5 minute overview). This forces the app's architecture into a tree-like structure of modular libs that are shareable at the point that is the most useful to other apps.

Enterprise Angular Monorepo Patterns are a tried and tested way of separating code into reusable chunks. Manfred Steyer has an alternative pattern that is equally good for this: [Tactical Domain-Driven Design](https://www.angulararchitects.io/en/aktuelles/tactical-domain-driven-design-with-monorepos/).

But if you don't like the volume of libs either of these create, you could just split into libraries at the feature/container level, and then at the UI (presenter) level. But you'd have to be careful about not creating circular dependencies that way.

## Public Container Services

Methods that would normally appear in a Container Component class are moved into a service provided by the same component. The Container Service is then injected into the constructor of the Container Component using the `public` Access Modifier. Now all the public service methods can be used directly in the template, and so reused by other templates that want to reuse the same state and logic - but with a different template layout.

Thanks to [Aristeidis Bampakos](https://twitter.com/abampakos) for this concept.

## UI Components Merged Inputs and Output Bus

This pattern is designed to reduce template maintenance from revisions to UI components which can be time-consuming and bug prone at scale.

The Inputs are reduced to either one or two inputs for each component; `@Input() data` for the view model, and `@Input() config` for unchanging input values.

The Outputs are bused together into labelled event packets with typed payloads, and then de-bussed via an object map of inline functions. This has the benefit of having a single point to log component activity.

The Output Bus library is also available as an NPM lib: [ngx-ui-output-bus](https://www.npmjs.com/package/@gyrus/ngx-ui-output-bus). But copying the simple library code instead means your team can customise it to suit your requirements.
