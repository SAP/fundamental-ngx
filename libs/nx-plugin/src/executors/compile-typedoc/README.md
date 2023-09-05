# Compile typedoc

Fundamental-ngx uses typedocs to describe the API of the libraries.
The typedocs are generated from the source code of the libraries. This executor helps to generate the typedocs in a Nx powered workspace.

## Usage

In the project.json of the target library add new target with the following configuration:

```json
{
    "//": "...other project.json properties",
    "targets": {
        "//": "...other targets",
        "compile-typedoc": {
            "executor": "@fundamental-ngx/nx-plugin:compile-typedoc",
            "options": {
                "outputPath": "path/to/output/folder/from/the/root/of/the/workspace"
            },
            "outputs": ["{options.outputPath}"]
        }
    }
}
```

and run it with `nx run <project-name>:compile-typedoc`.

Executor will take every ts file in that project's root directory and generate a documentation for them, it will
use the default theme for them, which is located at `libs/nx-plugin/src/executors/compile-typedoc/theme`.

Preferably the `compile-typedoc` target should be cacheable operation, so that it gets re-created only when the source files change.
