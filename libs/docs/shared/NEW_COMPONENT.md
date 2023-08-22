# Implementing A New Component For Fundamental Library For Angular

## Content

-   [1. Code Structure](#1)
-   [2.Prerequisites ](#2)
-   [3. Generating A New Component](#3)
-   [4. Component Example](#4)
-   [5. Updating Documentation](#5)
-   [6. Publishing](#6)

## <a name="1"></a>1. Code Structure

The fundamental-ngx repository is split into two projects

-   the component library: a centralized modular repository made from components. It allow users to easily insert/reuse a large part of the code improving the quality and time required for their application.
-   the documentation app: used to catalog the various different components, as well as present use cases for them.

In the following guide we will look at how to create a component from scratch, test it, update the relevant part of the documentation, and publish our work.

## <a name="2"></a>2. Prerequisites

Before we begin coding our component, make sure you have successfully cloned the [ngx repository](https://github.com/SAP/fundamental-ngx.git).

If you are having issues cloning the repository or if you have never forked a repository before you can look at the [fork-a-repo documentation](https://docs.github.com/en/get-started/quickstart/fork-a-repo).

Additionally, if intend to contribute, read the followind [document](https://github.com/SAP/fundamental-ngx/blob/main/CONTRIBUTING.md), as it covers how to properly commit your work.

## <a name="3"></a>3. Generating a new component

### Description

To generate a new component first you need to navigate to the location of the repository from the terminal. Once there you need to use the following command:
`npx nx generate sap-component -–name=[component name] –-project=[package name]`

The following command takes two inputs; the first one is the name of the new component, and is located after “name=”. Any name can be chosen, however it is recommended that the name used, is relevant to the functionality of the component. Additionally, the name needs to be in kebab-case/dash-case, if you intend to contribute to the ngx library. The second input relates to which component library the newly generated component will belong to. Currently, there are four, present, in fundamental-ngx, which are: “core”, “platform”, “CX”, “CDK”. To select your preferred library, you just need to add its name in lowercase after “project=”. For example, to access “core” you need to use “core”. For “platform”, you can use “platform”; the rest of the libraries follow the same logic. If you are new to ngx, or are unsure which library is best suited for your needs, it is recommended that you use “core”.

To better understand how the component generation works, we will build a simple component called “my-component” in “core”, using the following command:
`npx nx generate sap-component -–name=my-component –-project=core `

Once finished the following error might appear:

<img width="804" alt="Screenshot 2023-08-08 at 9 24 58 AM" src="https://github.com/SAP/fundamental-ngx/assets/132930816/5a8cc828-98d5-4da9-9bde-ef0e43e98330">

You can ignore this error, as all the required code will be generated regardless.

Now, you can open your project with your IDE. There you will see multiple files created, these files contain everything required for us to start building our project; the files we will focus on are the ones that allows us to create our own component, and document it properly. Those files files should begin with the given name from the terminal, followed by their respective extensions.

The component files can be found at `libs/[library name]/src/lib`, where the library name is the one chosen during generation, in our case it is `core`. In this folder you will notice different component folders, however the one we are interested is the one that has the same name we gave it, in our case `my-component`.

<img width="408" alt="Screenshot 2023-08-09 at 9 31 27 AM" src="https://github.com/SAP/fundamental-ngx/assets/132930816/2485945e-5c04-4fd2-af22-8ce37ca2ba65">

This folder contains all the required files for you to start work on your component.For beginners, it is recommended to only modify the files starting with their components name, for information about the rest of the files check the [angular project file structure docs](https://angular.io/guide/file-structure).

The documentation folder can be found in the following directory `libs/docs/[library name]`, in our case the library name is `core`, and just like the component folder this folder will have the same name.

<img width="395" alt="Screenshot 2023-08-09 at 9 31 54 AM" src="https://github.com/SAP/fundamental-ngx/assets/132930816/5f02b21b-1033-489d-8dff-d7f46a357921">

Once you have created your component, you will need to document it here so that other users are able know what it does. It is recommended to have multiple examples for the component especially when they are more complex.

To check if the everything was generated correctly, we can check the default example for our component. To do this we need to first run `yarn install` to install all the needed packages, once that is done, we will run `yarn start`, to start the documentation app. If the everything is builds correctly, you just need to go to `localhost:4200`. Once the documentation is loaded use the search bar to find your component.

<img width="1764" alt="Screenshot 2023-08-08 at 10 37 59 AM" src="https://github.com/SAP/fundamental-ngx/assets/132930816/806e1595-9f10-4b61-a0b1-75becb0c69f6">

## <a name="4"></a>4. Component Example

In the following section of the report, we will build a simple button component, that informs the user when it has been pressed; to better understand how the process works. To begin coding we will first navigate to `libs/core/src/lib/my-component`.

In our class declaration we will just add a single Boolean value that will use to check whether the button has been pressed.

```typescript
import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'fd-my-component',
    templateUrl: './my-component.component.html',
    styleUrls: ['./my-component.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MyComponentComponent {
    buttonPressed = false;
}
```

We will now declare the button, as well as the text that will appear once it has been pressed.

```html
<div>
    <button class="my-button" (click)="buttonPressed=true;">PRESS ME</button>
    <div *ngIf="buttonPressed">You pressed me</div>
</div>
```

We will also add some styling to make the button more appealing.

```scss
.my-button {
    width: 100px;
    height: 50px;
    background-color: rgb(44, 183, 221);
    font-size: 16px;
    margin-bottom: 20px;
}
```

If you start the documentation app now, you should see the following result in `My Component`:

<img width="1640" alt="Screenshot 2023-08-09 at 9 11 02 AM (2)" src="https://github.com/SAP/fundamental-ngx/assets/132930816/5596c431-cff6-4237-b46d-2dc45ae73f34">

## <a name="5"></a>5. Updating Documentation

In the following section of the report, we will see how to update the documentation app, regarding our newly created component.All the required files can be found at `libs/docs/core`.

The html for the component page is split into two parts. The header which contains a brief decrepitation of component, and the example section which contains some relevant use cases for the component.
The header section can be found in the file `[component name]-header`.

While the folder contains a component declaration, you will mainly be working with only the html file. In it it should have the following code :

```html
<fd-doc-page>
    <header>My Component</header>

    <description>
        <!-- TODO: description -->
    </description>

    <import module="MyComponentModule" subPackage="my-component"></import>

    <fd-header-tabs></fd-header-tabs>
</fd-doc-page>
```

Any general information should be writen between the `description` declaration.

```html
<fd-doc-page>
    <header>My Component</header>

    <description> This is my first component. When you press it will inform you. </description>

    <import module="MyComponentModule" subPackage="my-component"></import>

    <fd-header-tabs></fd-header-tabs>
</fd-doc-page>
```

We will now look at the example folder,`examples`, which is used to contain all the created examples for the functionality of the component. You will notice that the folder is not empty, as a default example was created when generating the component. To demonstrate how to add more examples, we will create a new one, that will contain two copies of the button created previously. Firstly, we will create a folder that has a relevant name to the example. The most utilized naming conventions here are `[component name]-[example name]-example`, and `[example-name]-example`, where all the words are separated by a dashed line. As for the "example name", the most discriptive, and short one, should be used, to illustrate, since our example will contain two instances of our button component, we can just call it `double-button`, so that it is clearly communcated to other users, what it is demonstrating. For the naming conventions, while both are equally popular, a common rule of thumb is to use the former for components with shorter names, while the latter for components with longer or more complex names.

Inside the files all the relevant code regarding our component should be present. At minimum a single typescript file should be present that contains all the logic for very simple components, however in general it is recommended for the html, to be in a separate file. For more complex examples you might have multiple ts and html files, however always keep in mind that the docs should only be used to demonstrate the functionality of your component, and not add additional features to it. These files should start with the folder's name, followed by `.component.[file extension]`, if the folder name does not contain the component name, the component name should be prefixed to file name. For example due to the simple nature of our component we will create a single typescrit file called: `my-component-double-button-example.component.ts `.

And to achieve the functionaliy that we want we will use the following code:

```typescript
import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
    selector: 'fundamental-ngx-my-component-double-button-example',
    template: `<fd-my-component></fd-my-component>
        <br />
        <fd-my-component></fd-my-component>`,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MyComponentDoubleButtonExampleComponent {}
```

Notice that just like the file, the "selector" should have the same, prefixed with `fundamental-ngx`. Similarly the class declaration should have the same name as the file in `Pascal Case`, suffixed by Component.

However, to see our example we need to declare it first and to add it to our html file. For the declaration, it is recommended that you add it directly to the module file : `my-component-docs.module.ts`.

Now to add our example to the html, we wikk start by declaring a class element in `my-component-docs.component.ts` , that will allow us to show the raw code of our example to our user. To do this will add the following code:

```html
const doubleButtonExamplTs = `double-button-example/my-component-double-button-example.component.ts`
```

This is placed directly after the imports, and it is used to hold the location of the files shown, in a simple and clear way. The syntax for these variables is the name of the example, followed by a suffix that the type of file; for "ts" it is "Ts", for "html" it is "Html", and so on. All files that need to be show need to have a declaration like this, and they should be be in `camel Case`.

In the class you should add the following code:

```typescript
myComponentDoubleButtonExample: ExampleFile[] = [

        {
            language: 'typescript',
            code: getAssetFromModuleAssets(doubleButtonExampleTs),
            fileName: 'my-component-double-button-example',
            component: 'MyComponentDoubleButtonExampleComponent',
            name: 'TypeScript',
        }
    ];
```

The name of this array should be again the same as the component example in `camel Case`. In this array atleast one instance of the document object needs to present with the following properties:

-   `language` it holds the information of the type of file; typescript, html, scss.
-   `code` it contains the the location of the code to be shown.
-   `fileName` it should be the same as the file, without the extensions.
-   `name` reference name give when the user looks at the raw code. It should be as simple and clear as possible.
-   `component` the component class declration, it needs to be present only for typescript files.

When you have multiple files, they all need to be declared in the same array as separate objects. For more information read the following [file](https://github.com/SAP/fundamental-ngx/wiki/Stackblitz-support-instructions).

The last thing we need is to add the following code in the html file:

```html
<separator></separator>

<fd-docs-section-title id="example name" componentName="Component Name"> Example name </fd-docs-section-title>
<description> Description </description>
<component-example>
    <[example selector></[example selector]>
</component-example>
<code-example [exampleFiles]="raw code array name"></code-example>
```

-   `<separator></separator>` is used to separate the different examples, it needs to be present for each example after the first one
-   "id" for each instance should be the name of the example without any modifications; for our example this would be `double-button`
-   "Component name" should be the same name as the one as the actuall component. That would be "My Component" in our case. This should be the same for all the  
    examples present in the file.
-   "Example Name" should be short and descriptive, telling the user what the following example is.
-   "Description" is used to describe the example in more detail and/or add more detail.
-   `<[example selector></[example selector]>`, is an instance of our example component, it should be replaced with
    `<fundamental-ngx-my-component-double-button-example></fundamental-ngx-my-component-double-button-example>` in our case.
    Generally, there should be only one such instance for each example.
-   "[exampleFiles]="raw code array name" should be replaced with the class variable that contains all the raw code that should be showed. For our example component that would be `myComponentDoubleButtonExample`.

In our case this code should look something like this:

```html
<separator></separator>

<fd-docs-section-title id="double-button" componentName="MyComponent">
    My Component Double Button
</fd-docs-section-title>
<description> Adds a second button </description>
<component-example>
    <fundamental-ngx-my-component-double-button-example></fundamental-ngx-my-component-double-button-example>
</component-example>
<code-example [exampleFiles]="myComponentDoubleButtonExample"></code-example>
```

Once the the code above is compiled we get the following result:

<img width="1216" alt="Screenshot 2023-08-10 at 9 37 11 AM" src="https://github.com/SAP/fundamental-ngx/assets/132930816/66bbff9c-aeb2-4804-a234-5abb4c117b3e">

## <a name="6"></a>6. Publishing

### Testing

Before publishing your work you need to test it. That is done by using the following command `yarn nx run [library name]-[component name]:test --skip-nx-cache`. In our case the command will look at this `yarn nx run core-my-component:test --skip-nx-cache`. Once the command has completed succesfully you need to run `yarn build` so that the files are bundled. Additionally, you need to run `yarn pack` to compress the files in zip, followed by `yarn link` to allow other projects to be linked. For more information click [here](https://docs.npmjs.com/cli/v8/commands/npm-link).

### Contributing

Before opening you PR, please look at the following [guidelines](https://github.com/SAP/fundamental-ngx/blob/main/CONTRIBUTING.md) for contributing.

Happy Coding!
