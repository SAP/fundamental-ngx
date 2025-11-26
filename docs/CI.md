# Fundamental-ngx - Continuous Integration

At fundamental-ngx we have two main CI workflows:

- Create Release - Responsible for creating stable releases, and publishing them to npm, as well as creating
  RC and hotfix releases and publishing them to npm.
- Pull Request Checks - Responsible for running all the checks on pull requests,
  such as linting, unit tests, and e2e tests.
  Both of them use [Nx Distributed task execution](https://nx.dev/core-features/distribute-task-execution) to run
  the tasks in parallel, and to cache the results of the tasks.

## Create Release

Create release is triggered when a new commit is pushed to the `main` branch or `tmp_hotfix_branch` branch.
Commit message is very important, because on it might depend on the versioning of the release.
In General, we use [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) to determine the versioning
of the release, and pipeline determines what should be the next version, but manually defining the version
through CLI is also possible.
For more information about the versioning, see [Versioning](README.md#versioning).

For detailed information about the usage of the pipeline, see [Create Release](README.md#creation-of-the-release).

Create release workflow consists of multiple jobs:

- Nx Cloud Agents fire up - Runs always
- Nx Cloud Run initialization - Runs always
- Release Creation - Runs always
- Github Pages Deployment - Runs only when the release is meant to be `latest`
- Nx Cloud Run finalization - Runs always, even if something fails somewhere or if the pipeline is canceled.

For explanation, we will be explaining `Release Creation` and `Github Pages Deployment` jobs, about the
other jobs, you can read in the [Nx Cloud documentation](https://nx.dev/nx-cloud/intro/what-is-nx-cloud).

### Release Creation

So, `Release Creation` job consists of multiple tasks:

- Checkout - Checks out the code from the repository.
- Setup - Sets up the environment for the pipeline, such as installing dependencies, and setting up the cache.
- Version bump - Determines the version of the release, based on the release type and the commit message.
  It is triggered conditionally, only if the commit message is not `chore(release): publish`, in which case,
  the version is not bumped, and the release is published with the current version. This is done to support
  manual releases, which are sometimes necessary. Bump outputs `newVersion`(the semantic version),
  `isPrerelease`(boolean, whether the release is prerelease or not), and `releaseTag`(the tag which should be used
  for the npm, it is one of `latest`, `prerelease`, `hotfix` or `ng*`, where `*` is the major version of the Angular
  which is supported by the build).
- Get Release Tags - Depending on the `releaseTag` from the previous step, it gets the tags which should be used
  for the npm and github releases. For example
    - if the `releaseTag` is `latest`, then the tags will be `@latest` for npm and `isPrerelease` for github will be false, since it is not a prerelease.
    - If the `releaseTag` is `hotfix`
        - if the given version is higher than the one on `main` branch, then the tags will be `@latest` for the npm and
          `isPrerelease` for github will be false, since it is not a prerelease.
        - if the given version is lower than latest release, then the tags will be `@hotfix` for the npm and `isPrerelease`
          for github will be false, since the release is a hotfix and technically it is a release, but not the latest one,
          just the downport to the release, which is before the `latest`, but after the last build of the previous Angular build.
    - if the `releaseTag` is `prerelease`, then the tags will be `@prerelease` for the npm and `isPrerelease` for github will be true, since the release is a
      prerelease.
    - if the `releaseTag` is `ng*`, then the tags will be `@ng*` for the npm and `isPrerelease` for github will be false, since the release is not a prerelease.
- Update using NX Release - If commit message does not contain the `chore(release): publish` message, then the version
  is not bumped yet on the repository, and it is done in this step. It uses [NX Release](https://nx.dev/features/manage-releases) to update
  the version of the packages, and to update the dependencies between the packages. It also updates the changelog
  of the packages. It uses the `newVersion` from the `Version bump` step.
- Lint and Build - Task has two jobs, one is to lint the code, and the other is to build the code. It is done in
  parallel, and the results are cached, so that the next time the pipeline is run, it will not have to run the tasks
  again, but will use the cached results. It uses [Nx Distributed task execution](https://nx.dev/core-features/distribute-task-execution)
  to run the tasks in parallel, and to cache the results of the tasks.
- Pack - Packs the packages into the tarballs, which will be published to npm. It also does the `typedoc` extractions
  and replaces placeholders in the output packages, as well as the `README.md` files. This step also compiles the
  schematics from ts to js and copies them to the output packages.
- Publish - Publishes the packages to npm. It uses the `npm` output from the `Get Release Tags` step for the tags.
- Push changes - Pushes the changes to the repository, if the update happened on the CI and not on the user's machine,
  before the pipeline was triggered.
- Generate Release Body - Generates the release body, which will be used for the github release. It uses the
  [Conventional-changelog](https://www.npmjs.com/package/conventional-changelog) to generate the release body.
  What this action does is that from the last release tag(`vX.Y.Z`), it gets the first previous release, which is
  the same type of the release and generates the changelog from the commits between the two releases. This means that
  if the last release tag was `v0.40.0-rc-9`, it will find the first previous release, which is also a prerelease,
  which would be `v0.40.0-rc-8`, and will generate the changelog from the commits between the two releases. If the
  last release tag was `v0.40.0`, it will find the first previous release, which is not a prerelease, which would be
  `v0.39.*`, and will generate the changelog from the commits between the two releases. This ensures that when the
  `stable` release is released, release notes contain all the changes from the previous `prereleases`, and when the
  `prerelease` is released, it contains only the things that went into the `prerelease`.
- Create Release - Creates the github release. It uses the `gh` output from the `Get Release Tags` step for determining
  if the release is a prerelease or not, and for the tag which should be used for the github release. The release body
  will be taken from the `Generate Release Body` step.

### Github Pages Deployment

`Github Pages Deployment` job is triggered only when the release is meant to be `latest`, it just checks out the code
which will be deployed to the github pages, and deploys it to the github pages.

## Pull Request checks

Pull request checks are run on every pull request, and they are run on the `pull_request` event. They ensure that the
introduced changes are valid, and that they do not break anything. Just like `Create Release` workflow, they run using
the Nx Cloud Agents. It has two main jobs:

- Run affected Build, Lint and test commands
- Run affected E2E commands

### Run affected Build, Lint and test commands

During this job, the following tasks are run:

- Commit lint - Lints the commit message, to ensure that the commit messages follow conventional commit format.
- Build, Lint and test commands - Runs the build, lint and test commands on the affected projects. It uses the
  [Nx Affected commands](https://nx.dev/packages/nx/documents/affected#affected) to determine which projects are affected by the changes
  in the pull request, and then runs the commands on the affected projects. It also caches the results of the commands,
  so that the next time the pipeline is run, it will not have to run the tasks again, but will use the cached results.
  It uses [Nx Distributed task execution](https://nx.dev/core-features/distribute-task-execution) to run the tasks in
  parallel, and to cache the results of the tasks.
- Format check - Checks if the code is formatted correctly. Internally it uses many different static code linters, but
  main thing is that it uses [`nx format:check`](https://nx.dev/packages/nx/documents/format-check) to check only the
  files which are affected by the changes in the pull request.

### Run affected E2E commands

During this job, the following tasks are run:

- Firebase preview - Deploys PR version of the documentation to the firebase, so that it can be previewed.
- E2E tests on firebase - If firebase preview deployment was successful, and we have a URL, which we could test
  in headless chrome, then we run the e2e tests on the firebase preview deployment. This gives us ability to use multiple
  agents to run our tests in truly parallel way, and to have a clean environment for each test run.
- E2E tests on local - If firebase preview deployment was not successful, then we run the e2e tests on the local
  headless chrome. This task is not preferred since it is not run in parallel.
