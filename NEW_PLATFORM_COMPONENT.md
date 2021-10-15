# Implementing a new component for Fundamental Library for Angular-Platform

In this guide, we'll explore the library and documentation code base and create a new component of our own.

### Code Base Structure

This repository contains two separate projects - the component library and the documentation application. Different build tasks are used, depending on which project we're building. However, the documentation app consumes the library source directly, so there's no need to compile the library to test changes you're making to a component - simply running the documentation app locally will serve changes to the library immediately.

The documentation code base lies in the `docs` directory and the library source is in the `libs` directory.

## Create a new module in the Library

First, let's generate an empty module in the library. Each library component gets its own module, so end users can import only the modules for specific components they intend to use, if they don't want to import the entire library.

## Step1: Cd libs

The library's source lies in the `libs` directory. From the root of the repo, cd into the library source:

`cd libs`

## Step2: Build module & component within libs directory

We're going to be building a component called 'Poster' . Generate a new 'poster' module in the `src/lib` directory.

`ng generate module platform/src/lib/components/poster --project platform`

You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module --project platform`.

> Note: Don't forget to add `--project platform` or else it will be added to the default project in your `angular.json` file.

Then, generate a 'poster' component in the new module:

`ng generate component /platform/src/lib/components/poster --module=platform/src/lib/components/poster/poster.module`

You can also use `ng generate component component-name --project platform` to generate a new component.

## Step3: Create an exports array

Create an `exports` array in the poster module and add the poster component, like so:

```TypeScript
   import { NgModule } from '@angular/core';
   import { CommonModule } from '@angular/common';
   import { PosterComponent } from './poster.component';

   @NgModule({
     declarations: [PosterComponent],
     imports: [
       CommonModule
     ],
     exports: [
         PosterComponent
     ]
   })
   export class PosterModule { }
```

## Step4: Change selector to fdp prefix

The Fundamental Library for Angular Platform library uses 'fdp' as the component and directive prefix. Open `poster.component.ts` and change the component's 'app' prefix to 'fdp', like so:

```TypeScript
  selector: 'fdp-poster',
```

## Step5: Add poster module to list of imports (can be in FundamentalNgxPlatform)

The documentation application is importing every component in the Fundamental Library for Angular module. Open `fundamental-ngx.module.ts` and add `import { PosterModule } from './poster/poster.module';` to the list of imports at the top of the file, then add `PosterModule` to the array of exports.

We must also add `export * from './lib/components/poster/poster.module';` to the `fundamental-ngx/src/public_api.ts` file. The <fdp-poster> component will be an exported member of the fundamental-ngx module as well as the poster module.

## Step6: Build

Run `ng build platform` to build the project. The build artifacts will be stored in the `dist/` directory.

## Step7: Publishing

After building your library with `ng build platform`, go to the dist folder `cd dist/platform` and run `npm publish`.

## Step8: Running unit tests

Run `ng test platform` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Step9: Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

## Step10: Generating necessary files in documentation folder

Now let's create a new documentation component so we can see our new Poster component in action. Change directories back to the root of the repository, then change into the 'component-docs' directory:

`cd app/docs/src/app/platform/component-docs`

The directory structure for the documentation is different than the standard structure Angular apps typically use, so we won't utilize the Angular CLI to generate documentation modules.

Next let's create a directory for our poster docs.

`mkdir poster`

Create two new files in the `poster` directory, `poster-docs.component.ts` and `poster-docs.component.html`. Then create the directory `examples` as well. Create the component `poster-header`.

`ng g c poster-header`

The components we create in this directory will not only be rendered on their example page, but the raw source from these files will be used for the code examples.

## Step11: Change the poster-header.component.html file

In poster-header.component.html Copy/paste the code here:

```Typescript
<header>Poster</header>
<description>
    <p>The poster shows an image</p>
</description>
<import module="PosterModule"></import>

<fd-header-tabs></fd-header-tabs>
<router-outlet></router-outlet>
```

## Step12: Change poster-example.ts file

In `examples`, create the file `poster-example.component.ts`. Copy/paste the code here:

```TypeScript
import { Component } from '@angular/core';

@Component({
    selector: 'fdp-poster-example',
    template: '<fdp-poster></fdp-poster>'
})
export class PosterExampleComponent {}
```

## Step13: Change poster-docs.ts file

Then copy/paste this block to `poster-docs.component.ts`:

```TypeScript
import { Component } from '@angular/core';

import * as posterHtml from '!raw-loader!./examples/poster-example/poster-example.component.ts';

@Component({
    selector: 'app-poster',
    templateUrl: './poster-docs.component.html'
})
export class PosterDocsComponent {

    posterHtml = posterHtml;

}
```

Note that we're using raw-loader to import the poster example code as raw text. This text will be rendered as the example source.

## Step14: Change poster--docs.component.html file

In `poster-docs.component.html`, we'll provide a brief explanation of the poster component, and we'll add the poster component itself, along with the code example.

```HTML
<h2>Poster</h2>
<description>
    The Poster component displays a photograph taken from an image placeholder site.
</description>
<component-example>
    <app-poster-example></app-poster-example>
</component-example>
<code-example [code]="posterHtml" [language]="'HTML'"></code-example>
```

## Step15: Adding the new documentation module and route

Now that we've got our documentation files for the poster, add them to the documentation module declarations array in `documentation.module.ts`.

```TypeScript
    declarations: [
        PosterDocsComponent,
        PosterHeaderComponent
        PosterExampleComponent,
```

Be sure to import these at the top of the file as well.

## Step16: Adding the new documentation module and route

We use TypeDoc to automatically generate TypeScript documentation for explanations of inputs, outputs, etc. We won't go in to details on TypeDoc in this tutorial, but know that all files we wish to have TypeDocs for must be referenced in `apps/docs/src/app/platform/api-files.ts`. Open the file and add the following to the `API_FILES` object:

```TypeScript
poster: [
    'PosterComponent'
],
```

Let's add a poster route, and put a link for the new docs in the 'Components' side bar.

## Step17: Add the route configuration for poster

Open `documentation.routes.ts` and add the following to the `children` in the `ROUTES` array:

```TypeScript
{ path: 'poster', component: PosterHeaderComponent, children: [
        { path: '', component: PosterDocsComponent},
        { path: 'api', component: ApiComponent, data: {content: API_FILES.poster}}
    ]
},
```

You will need to import `PosterHeaderComponent` and `PosterDocsComponent` in this file as well.

## Step18: Add poster url

Next, open `documentation.component.ts` and add the following to the `components` array:

```TypeScript
{ url: 'poster', name: 'Poster' }
```

You should see 'Poster' appear in the side navigation under 'Components'. Clicking the link will load a page that says `poster works!`

## Step19: Add an image to the Poster component template

In the library source, open `poster.component.html`, remove the default code and add an image with a placeholder.

```HTML
<img src="http://lorempixel.com/400/600/nature/"/>
```

Now, when you navigate to the Poster docs through the side navigation, you'll see our new Poster component!

Refer to other component's documentation source to see how docs-related info is presented.
