# Fundamental-ngx NX plugin

This is a [Nx](https://nx.dev) plugin for internal use for the Fundamental-ngx project.
This plugin is used to generate new components for the project, migrate existing component libraries
to the new project structure or to run the project's specific tasks.

Plugin contains the following generators:

- `sap-component` - Generates a new library, which will be a sub-library of the main Fundamental-ngx libraries(core, platform, cdk or cx).
- `migrate-to-jest` - migrates existing component library to Jest from Karma.

Plugin also contains the following executors:

- `compile-typedoc` - compiles typedoc documentation for the library.
- `e2e-test` - Custom WebdriverIO executor for running e2e tests in Nx environment.
- `e2e-test-app` - Custom WebdriverIO executor for running e2e tests in Nx environment for the entire applications.
- `prepare-library` - Post-build executor for preparing the library for publishing. Includes schematic builds, version syncs and packing the library.
