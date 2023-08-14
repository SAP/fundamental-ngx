# Versioning in fundamental-ngx

fundamental-ngx consists of multiple sub-packages and the versions for all of them
are managed by the root lerna.json file. This is done to ensure that all the packages
are in sync with each other. The versioning of the packages is done using
[Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) and [Semantic Versioning](https://semver.org/).

All the information about the versioning is given in the links above
but TL;DR is that before we reach version 1, every fix, feature or chore is resulting in the patch version change,
if those changes do not break the API, and if they do, then the minor version is changed.

After version 1, the patch version is the result of the bug fixes, minor version is the result of the new features,
and major version is the result of the breaking changes.

After every merge into the main, `rc` version is released automatically with the changes it includes,
this ensures fast feedback loop for the users of the library, and allows us to test the changes in the real world.

We try to avoid releasing hotfixes and downports, but from time to time it is necessary to do so, for those cases
we have a separate workflow. We try to support only the latest version of the library and the latest build, which
was released using the previous Angular version. For example, is the latest Angular version is 16, then the latest
Angular 15 compatible build will be supported, but not the Angular 14 compatible build. For ease of use,
Angular 15 compatible build will be tagged in npm as `@ng15`, but the latest build will be tagged as `@latest`,
until the next Angular version is released and we follow them with our latest build, in which case the `@latest`
tag will be moved to the new build and the `@ng16` tag will be added to the latest Angular 16 compatible build.
