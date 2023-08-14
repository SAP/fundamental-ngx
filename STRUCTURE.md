# Fundamental-ngx repository structure

The repository mainly contains three parts of this project:

-   Documentation webpage
-   Angular libraries, which are used for npm packages
-   Nx custom plugins

The general structure of the project is fairly standard `Nx` workspace, with some customizations. The default
folder for applications is `apps` and for the libraries is `libs`. The documentation webpage is located in the `apps/docs`.

## Libraries

The libraries are located in the `libs` folder. The libraries are divided into the three categories we mentioned above,
but they are not strictly three folders. `libs/${cdk|core|cx|i18n|platform|moment-adapter|datetime-adapter}` contains the libraries which are used
for the npm packages, `libs/docs/${cdk|core|cx|i18n|platform}` contains the libraries which are used for the documentation
and `libs/nx-plugin` contains the custom Nx plugins.

The libraries `core`, `platform`, `cdk` and `cx` contain sub-libraries, which are buildable, but they do not end up in npm as a separate package,
they are more of a secondary entrypoints to their respective libraries. For example `core` library contains `core-button` library, which is
located at `libs/core/src/lib/button`. This is done like this because we want to have an [Angular Package Format](https://angular.io/guide/angular-package-format)
and also have a granular control over the tasks. For example, if something changes in `core-button`, only `core-button` and it's dependents(and dependants of its dependants)
will be built, tested and linted. This also allows us to have a more granular control over the testing of the documentation pages in e2e tests.

The documentation sub-pages, for every library and their components that we have are located in the
`libs/docs/${cdk|core|cx|platform}/${component-name}` folders. All the components which we have, have their counterpart
documentation library, which contains the parts of the documentation and examples which are specific to that component.
This setup allows us to test only the documentation pages for the component which might have been affected by any given
change, and not the whole documentation webpage. The documentation libraries have same naming structure,
which is `docs-${cdk|core|cx|i18n|platform|moment-adapter|datetime-adapter}-${component-name}`.

## Documentation webpage

The documentation webpage is located in the `apps/docs` folder. The documentation webpage is a standard Angular application,
which uses the libraries from the `libs/docs` folder. It only contains the startup pages for the host libraries and the routing
for the documentation pages. The documentation pages are located in the `libs/docs` folders, as well as the examples for the
components.

Example codes are being loaded with the HTTP request to the `docs` folder, which contains the example codes for the components.
Every major library has a provider for the name of it. For example when `@fundamental-ngx/core` library docs are being loaded,
[CURRENT_LIB](libs/docs/shared/src/lib/utilities/libraries.ts) is set to `core`. This is used in the
[getAssetFromModuleAssets](libs/docs/shared/src/lib/getAsset.ts) function, which is used to load the example codes.
Documentation Application has assets configured in the [project.json](apps/docs/project.json) file like this:

```json
{
    "glob": "**/examples/**/*",
    "input": "libs/docs/${libraryName}",
    "output": "./docs/${libraryName}"
}
```

As a result, when the documentation application is built, the example codes are copied to the `docs` folder, which is
served by the documentation application. When example code renderer calls for the example code, HTTP request is
made to the `/docs/${libraryName}/examples/${exampleName}` endpoint, which returns the example code. This approach
helps us to have the example codes in the same repository as the documentation, but also have them served by the
documentation application in a lazy manner.
