# Implementing a new component for Fundamental Library for Angular

In this guide, we'll explore the library and documentation code base and create a new component of our own.

### Code Base Structure

This repository contains two separate projects - the component library and the documentation application. Different build tasks are used, depending on which project we're building. However, the documentation app consumes the library source directly, so there's no need to compile the library to test changes you're making to a component - simply running the documentation app locally will serve changes to the library immediately.

## Generating new component

Creating a new component is pretty straightforward. If you have the `NX Console` plugin, simply open it and run the `sap-component` schematic. This can also be done manually using the command line.

So in order to generate component named, let's say, "Poster Editor" in "core" package, use `name = poster-editor` `project = core`.
Using the command line: `npx nx workspace-generator sap-component --name=poster-editor --project=core`.

Running this will scaffold the initial structure for the new component:

-   new library under the provided project (core/platform/fn)
-   docs section with the default example

Serve the app using `yarn start`, and navigate to http://localhost:4200/fundamental-ngx#/core/poster-editor to start working with the component.

Component will be located at `libs/core/src/lib/poster-editor` and example code will be in `libs/docs/core/poster-editor`.

At this point, you can start coding: apply changes in the library component and test them in docs right away.

## Updating documentation

### Documentation header

Once you're done with coding in the library, you also have to create comprehensive documentation for anyone who will be using the component.
First, navigate to `libs/docs/core/poster-editor/poster-editor-header/poster-editor-header.component.html` and provide a brief explanation of the poster component in the "description" section.

Refer to documentation source of other components to see how docs-related info is presented.

### Additional examples

We recommend adding several examples in addition to the default one, which is already there.
This should be done manually by following the given steps:

1. Create a new component in the examples folder. If you want to add an example named "complex", you have to stick to the following structure

```
libs/docs/core/poster-editor/examples/
        /default
            ....
        /complex
            poster-editor-complex-example.component.html
            poster-editor-complex-example.component.ts
```

2. Add a new section in `libs/docs/core/poster-editor/poster-editor-docs.component.html`

```html
<separator></separator>

<fd-docs-section-title id="complex" componentName="PosterEditor"> Example name </fd-docs-section-title>
<description> Description </description>
<component-example>
    <fundamental-ngx-poster-editor-complex-example></fundamental-ngx-poster-editor-complex-example>
</component-example>
<code-example [exampleFiles]="posterEditorComplexExample"></code-example>
```

3. Along with this, it's required to add data for `exampleFiles` binding.
   These files are the actual files of newly added example imported as raw text. This text will be rendered as the example source.
   To add them open `poster-editor-docs.component.ts` and make the following changes

```typescript
// add imports on top
// note that raw imports require special path syntax
import posterEditorComplexExampleHtml from '!./examples/complex/poster-editor-complex-example.component.html?raw';
import posterEditorComplexExampleTs from '!./examples/complex/poster-editor-complex-example.component.ts?raw';

...
export class PosterEditorDocsComponent {
    ...
    // add the binding
    posterEditorComplexExample: ExampleFile[] = [
        getExampleFile('complex/poster-editor-complex-example.component.html'),
        getExampleFile('complex/poster-editor-complex-example.component.ts')
    ];

}
```

4. Ensure examples work with stackblitz

After adding new examples, try clicking the "Show Code" and then "StackBlitz" button in the newly added example and ensure it opens correctly.

You may follow the instructions at https://github.com/SAP/fundamental-ngx/wiki/Stackblitz-support-instructions if you have any questions.

## Testing

To test the new component, run `nx test core-poster-editor` to execute the unit tests via [Karma](https://karma-runner.github.io).

### Publishing and testing in external applications

Before proceeding with creating a PR run `yarn run build` and test your changes in an external application. This will build the application and run `yarn pack`. After it's done you can install this version of the library in any external application using `yarn link` command. More details [here](https://docs.npmjs.com/cli/v8/commands/npm-link)
