# Prepare library

Executor that prepares the library for publishing. After running the ordinary build with `@nx/angular:package` executor,
there are still steps left for the library to be ready for publishing. This executor helps to automate those steps.
It will compile the schematics of it and update the version placeholders in build output files to match preconfigured versions.
At the end of the compilation and version update, it will create a tarball of the build output.

## Usage

In the project.json of the target library add new target with the following configuration:

```json
{
    "//": "...other project.json properties",
    "targets": {
        "//": "...other targets",
        "prepare": {
            "executor": "@fundamental-ngx/nx-plugin:prepare-library",
            "options": {
                "schematics": {
                    "collection": "path/to/schematics/folder/relative/to/project.json/file",
                    "tsConfig": "path/to/schematics/tsconfig/relative/to/project.json/file"
                },
                "distPath": "path/to/dist/folder/of/the/library/build/relative/to/project/workspace/root",
                "versionOverrides": {
                    "projectVersion": "version_of_the_project"
                }
            }
        }
    }
}
```

`versionOverrides.projectVersion` is optional. If not provided, the version will be read from the `lerna.json`
of the project from root of the workspace.

You can call the executor with `nx run` command:

```bash
nx run <project>:prepare
```

It is recommended to describe in your `nx.json`, that the `prepare` target should be run after the `build` target.
