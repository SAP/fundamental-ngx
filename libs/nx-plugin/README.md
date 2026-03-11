# Fundamental-ngx NX plugin

This is a [Nx](https://nx.dev) plugin for internal use for the Fundamental-ngx project.
This plugin is used to generate new components for the project, migrate existing component libraries
to the new project structure or to run the project's specific tasks.

Plugin contains the following generators:

- `sap-component` - Scaffolds a new Angular component with full setup including the component file, documentation page, usage examples, and e2e tests. Creates a component within core (fd-), platform (fdp-), cx (fdx-), cdk (fdk-), or btp (fdb-) library.
- `sync-versions` - Synchronizes version placeholders in build output files with actual version numbers for library publishing. See [sync-versions README](src/generators/sync-versions/README.md) for details.

Plugin also contains the following executors:

- `compile-typedoc` - compiles typedoc documentation for the library.
- `e2e-test` - Custom WebdriverIO executor for running e2e tests in Nx environment.
- `e2e-test-app` - Custom WebdriverIO executor for running e2e tests in Nx environment for the entire applications.
- `i18n-manage` - CLI for managing translation keys across all language files. See [i18n-manage README](src/executors/i18n-manage/README.md) for details.
- `transform-translations` - Converts .properties translation files to TypeScript modules. Called automatically by i18n-manage commands.
