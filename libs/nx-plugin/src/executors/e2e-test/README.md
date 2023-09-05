# E2E Test

Fundamental-ngx uses WebdriverIO to run e2e tests. This executor helps to run the e2e tests in a Nx powered workspace.
It supports running tests against the application dev server, or against a static build of the application.

## Usage

In the project.json of the target library add new target with the following configuration:

```json
{
    "//": "...other project.json properties",
    "targets": {
        "//": "...other targets",
        "e2e": {
            "executor": "@fundamental-ngx/nx-plugin:e2e-test",
            "options": {
                "e2eFiles": ["micromatch/glob/patterns/from/the/root/of/the/workspace"],
                "devServerTarget": "target-project-name:serve",
                "baseUrl": "http://localhost:4200"
            },
            "outputs": ["{workspaceRoot}/allure-results/project-name"]
        }
    }
}
```

and run it with `nx run <project-name>:e2e`.

If there is a `devServerTarget`, then the executor first will launch the dev server, and then it will wait for it's readiness before running the tests.
If there is no `devServerTarget`, then the executor will assume that the application is already built and it will run the tests against the `baseUrl`.

`e2eFiles` is a list of glob patterns that will be used to find the e2e test files. The executor will run all the tests that match the patterns.
