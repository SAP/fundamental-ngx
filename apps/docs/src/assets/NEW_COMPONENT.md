# Implementing a new component for Fundamental NGX

In this guide, we'll explore the library and documentation code base and create a new component of our own.

### Code Base Structure

This repository contains two separate projects - the component library and the documentation application.  Different build tasks are used, depending on which project we're building.  However, the documentation app consumes the library source directly, so there's no need to compile the library to test changes you're making to a component - simply running the documentation app locally will serve changes to the library immediately.

The documentation code base lies in the `docs` directory and the library source is in the `library` directory.

## Create a new module in the Library

First, let's generate an empty module in the library.  Each library component gets its own module, so end users can import only the modules for specific components they intend to use, if they don't want to import the entire library.

The library's source lies in the `library` directory.  From the root of the repo, cd into the library source:

`cd library`

We're going to be building a component called 'Poster' that displays images.  Generate a new 'poster' module in the `src/lib` directory.

`ng generate module src/lib/poster`

Then, generate a 'poster' component in the new module:

`ng generate component src/lib/poster --module=src/lib/poster/poster.module`

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

The Fundamental NGX library uses 'fd' as the component and directive prefix.  Open `poster.component.ts` and change the component's 'app' prefix to 'fd', like so:

```TypeScript
  selector: 'fd-poster',
```

The documentation application is importing every component in the fundamental-ngx library module.  Open `fundamental-ngx.module.ts` and add `import { PosterModule } from './poster/poster.module';` to the list of imports at the top of the file, then add `PosterModule` to the array of exports.

We must also add `export * from './lib/poster/poster.module';` to the `fundamental-ngx/src/public_api.ts` file.  The <fd-poster> component will be an exported member of the fundamental-ngx module as well as the poster module.


## Generating a new component in the Documentation

Now let's create a new documentation component so we can see our new Poster component in action.  Change directories back to the root of the repository, then change into the 'component-docs' directory:

`cd docs/app/documentation/component-docs`

The directory structure for the documentation is different than the standard structure Angular apps typically use, so we won't utilize the Angular CLI to generate documentation modules.

Next let's create a directory for our poster docs.

`mkdir poster`

Create two new files in the `poster` directory, `poster-docs.component.ts` and `poster-docs.component.html`. Then create the directory `examples` as well.  The components we create in this directory will not only be rendered on their example page, but the raw source from these files will be used for the code examples.

In `examples`, create the file `poster-example.component.ts`.  Copy/paste the code here:

```TypeScript
import { Component } from '@angular/core';

@Component({
    selector: 'fd-poster-example',
    template: '<fd-poster></fd-poster>'
})
export class PosterExampleComponent {}
```

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

Note that we're using raw-loader to import the poster example code as raw text.  This text will be rendered as the example source.

In `poster-docs.component.html`, we'll provide a brief explanation of the poster component, and we'll add the poster component itself, along with the code example.

```HTML
<h2>Poster</h2>
<description>
    The Poster component displays a photograph taken from an image placeholder site.
</description>
<component-example [name]="'ex1'">
    <app-poster-example></app-poster-example>
</component-example>
<code-example [code]="posterHtml" [language]="'HTML'"></code-example>
```

## Adding the new documentation module and route

Now that we've got our documentation files for the poster, add them to the documentation module declarations array in `documentation.module.ts`.

```TypeScript
    declarations: [
        PosterDocsComponent,
        PosterExampleComponent,
```

Be sure to import these at the top of the file as well.

We use TypeDoc to automatically generate TypeScript documentation for explanations of inputs, outputs, etc.  We won't go in to details on TypeDoc in this tutorial, but know that all files we wish to have TypeDocs for must be referenced in `docs/app/documentation/utilities/api-files.ts`.  Open the file and add the following to the `API_FILES` object: 

```TypeScript
poster: [
    'PosterComponent'
],
```

Let's add a poster route, and put a link for the new docs in the 'Components' side bar.

Open `documentation.routes.ts` and add the following to the `children` in the `ROUTES` array:

```TypeScript
{ path: 'poster', component: PosterComponent, children: [
        { path: '', component: PosterDocsComponent},
        { path: 'api', component: ApiComponent, data: {content: API_FILES.poster}}
    ]
},
```
You will need to import `PosterComponent` and `PosterDocsComponent` in this file as well.

Next, open `documentation.component.ts` and add the following to the `components` array:

```TypeScript
{ url: 'poster', name: 'Poster' }
```

You should see 'Poster' appear in the side navigation under 'Components'.  Clicking the link will load a page that says `poster works!`


## Add an image to the Poster component template

In the library source, open `poster.component.html`, remove the default code and add an image with a placeholder.

```HTML
<img src="https://placeimg.com/400/600/nature'"/>
```

Now, when you navigate to the Poster docs through the side navigation, you'll see our new Poster component!

Refer to other component's documentation source to see how docs-related info is presented.
