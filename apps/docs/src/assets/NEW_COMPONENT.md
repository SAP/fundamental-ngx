# Implementing a new component for Fundamental Library for Angular

In this guide, we'll explore the library and documentation code base and create a new component of our own. [How to create a new Fundamental Library for Angular component](https://www.youtube.com/watch?v=uN9WlsdspHg)

### Code Base Structure

This repository contains two separate projects - the component library and the documentation application. Different build tasks are used, depending on which project we're building. However, the documentation app consumes the library source directly, so there's no need to compile the library to test changes you're making to a component - simply running the documentation app locally will serve changes to the library immediately.

The documentation code base lies in the `docs` directory and the library source is in the `libs` directory.

## Create a new module in the Library

First, let's generate an empty module in the library. Each library component gets its own module, so end users can import only the modules for specific components they intend to use, if they don't want to import the entire library.

## Step1: Cd libs

The library's source lies in the `libs` directory. From the root of the repo, cd into the library source:

`cd libs`

## Step2: Build module & component within libs directory

We're going to be building a component called 'Poster' that displays images. Generate a new 'poster' module in the `src/lib` directory.

`ng generate module core/src/lib/poster`

Then, generate a 'poster' component in the new module:

`ng generate component /core/src/lib/poster --module=core/src/lib/poster/poster.module`

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

## Step4: Add poster module export

Add a new file in the poster lib called `public_api.ts` and add the following:

`export * from './poster.module'; export * from './poster.component';`

## Step5: Add export to index.ts

Open `libs/core/src/index.ts` and add `export * from './lib/poster/public_api';`

## Step6: Generating necessary files in documentation folder

Now let's create a new documentation component so we can see our new Poster component in action. Change directories back to the root of the repository, then change into the 'component-docs' directory:

`cd apps/docs/src/app/core/component-docs`

The directory structure for the documentation is different than the standard structure Angular apps typically use, so we won't utilize the Angular CLI to generate documentation modules.

Next let's create a directory for our poster docs.

`mkdir poster`

Create two new files in the `poster` directory, `poster-docs.component.ts` and `poster-docs.component.html`. Then create the directory `examples` as well.

Next, from the documentation poster directory, create the component `poster-header`.

`ng g c poster-header`

The components we create in this directory will not only be rendered on their example page, but the raw source from these files will be used for the code examples.

## Step7: Change the poster-header.component.html file

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

## Step8: Edit the poster-example.component.ts file

In `examples`, create the file `poster-example.component.ts`. Copy/paste the code here:

```TypeScript
import { Component } from '@angular/core';

@Component({
    selector: 'fd-poster-example',
    template: '<fd-poster></fd-poster>'
})
export class PosterExampleComponent {}
```

## Step9: Edit the poster-docs.component.ts file

Then copy/paste this block to `poster-docs.component.ts`:

```TypeScript
import { Component } from '@angular/core';

import * as posterHtml from '!raw-loader!./examples/poster-example.component.ts';

@Component({
    selector: 'app-poster',
    templateUrl: './poster-docs.component.html'
})
export class PosterDocsComponent {

    posterHtml = posterHtml;

}
```

Note that we're using raw-loader to import the poster example code as raw text. This text will be rendered as the example source.

## Step10: Edit the poster-docs.component.html file

In `poster-docs.component.html`, we'll provide a brief explanation of the poster component, and we'll add the poster component itself, along with the code example.

```HTML
<h2>Poster</h2>
<description>
    The Poster component displays a photograph taken from an image placeholder site.
</description>
<component-example>
    <fd-poster-example></fd-poster-example>
</component-example>
<code-example [exampleFiles]="posterHtml"></code-example>
```

## Step11: Add poster-docs.module.ts

Create a new file called `poster-docs.module.ts` in the poster documentation directory and copy/paste the following:

```TypeScript
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApiComponent } from '../../../documentation/core-helpers/api/api.component';
import { API_FILES } from '../../api-files';
import { SharedDocumentationModule } from '../../../documentation/shared-documentation.module';
import { PosterDocsComponent } from './poster-docs.component';
import { PosterExampleComponent } from './examples/poster-example.component';
import { PosterHeaderComponent } from './poster-header/poster-header.component';
import { PosterModule } from '@fundamental-ngx/core/poster';

const routes: Routes = [
    {
        path: '',
        component: PosterHeaderComponent,
        children: [
            { path: '', component: PosterDocsComponent },
            { path: 'api', component: ApiComponent, data: { content: API_FILES.poster } }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes), SharedDocumentationModule, PosterModule],
    exports: [RouterModule],
    declarations: [
        PosterHeaderComponent,
        PosterDocsComponent,
        PosterExampleComponent
    ]
})
export class PosterDocsModule {}
```

## Step12: Add the route configuration for poster and the API information

Open `apps/docs/src/app/core/api-files.ts` and add the following to the `API_FILES` array:

```
    poster: ['PosterComponent']
```

In the same directory, open `core-documentation.routes.ts` and add the following to the `children` in the `ROUTES` array:

```TypeScript
    {
        path: 'poster',
        loadChildren: () =>
            import('./component-docs/poster/poster-docs.module').then(
                (m) => m.PosterDocsModule
            )
    },
```

PosterHeaderComponent may have been added automatically to `core-documentation.module.ts`, so we'll need to remove that.

Then from this directory, navigate to the `documentation` directory and open `core-documentation.component.ts` and add:

```
    { url: 'core/poster', name: 'Poster' }
```

You should see 'Poster' appear in the side navigation under 'Components'. Clicking the link will load a page that says `poster works!`

## Step13: Add an image to the Poster component template

In the library source, open `poster.component.html`, remove the default code and add an image with a placeholder.

```HTML
<img src="http://lorempixel.com/400/600/nature/"/>

```

## Step14: Making stackblitz work

Follow the instructions at https://github.com/SAP/fundamental-ngx/wiki/Stackblitz-support-instructions

Now, when you navigate to the Poster docs through the side navigation, you'll see our new Poster component!

Refer to other component's documentation source to see how docs-related info is presented.
