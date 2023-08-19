# Creation of the release

In `fundamental-ngx` are multiple methods for creating a release. In general there are few release types:

-   stable release
-   prerelease
-   hotfix release

## Stable releases

`Stable` releases can be triggered either via github workflow `Create Release`, or via CLI. The scripts will take the
latest commit from the `main` branch, and create a release from it. The release from the CLI allows the user to specify the version of the release, if needed.

The command to trigger the next release automatically:

```bash
npx lerna version --conventional-graduate
```

The command for specific version release is:

```bash
npx lerna version ${version}
```

## Prereleases

`Prerelease`, a.k.a. `rc` releases are created automatically after every merge into the `main` branch. The version of the release is determined using the conventional commits.

While we are under `v1` stage, BREAKING CHANGES are incrementing the minor version, and the rest of the changes
are incrementing the patch version. After we reach `v1`, BREAKING CHANGES will increment the major version, and
the rest of the changes will increment the minor version or the patch, depending on the type of the change.

Let's say the latest release was `0.40.0`, and you merged a PR with the `fix` commit type. In this case, the next
version will be `0.40.1-rc.0` and ever subsequent merge will increment the `rc` version, until the next `Stable`
release is created, after which the version without the `rc` will be created. If you merge a PR with the `BREAKING CHANGE`,
then the next version will be `0.41.0-rc.0`, and the subsequent merges will increment the `rc` version, even if the PRs
contain `BREAKING CHANGE` again.

## Hotfix releases

`Hotfix` releases are created for older versions.

Steps(hotfix for the latest version of `0.40.x`):

1. `git checkout v0.40.3` - let's assume `0.40.3` is the latest version of `0.40`
2. introduce the change either with `git cherry-pick <commit-hash>` or make changes manually
3. build, run, pack, and test the libraries, ask for peer-review
4. `npm run hotfix-release` - this will trigger the hotfix release from the workflows

Background:
After this, lerna determines that the next version should be `0.40.1`, and CI will create a release from the HEAD.
CI also finds out that the `0.40.1` is newer than the latest RC release, which is `0.40.1-rc.*`, and updates the main
branch version to `0.40.1`. Also it must be noted that the npm will mark this release as the `latest`.

Now, let's imagine that the latest RC version was `0.41.0-rc.0`, and you want to create a hotfix for `0.40.0` release.
In this case, you do the same exact steps, but the outcome is a little bit different. After the `npm run hotfix-release`
command, lerna determines that the next version should be `0.40.1`, but since the `0.40.1` is lower than the latest RC,
which is `0.41.0-rc.0`, the main branch version will not be updated, and the hotfix will be marked as `hotfix` on npm.

Now, lets imagine that you want to downport functionality to `v0.39.8`, then you need to checkout the `v0.39.8` tag,
and do all the changes you want to do. After that you need to type in `npm run hotfix-release` and the release
process will start and will behave exactly as in previous scenario, with a small difference. When it bumps and gets
`v0.39.9`, it will not update the main branch version, since it is older than the main branch version and
for the npm it will use `hotfix` tag if Angular version is the same as in main. If the Angular versions are different,
then it will use `ng${version}` tag, where `${version}` is the Angular version of the build.

To create a `hotfix`, there are few requirements, which need to be met:

-   The version from which you are creating a hotfix should not be a `prerelease` version
-   The git tree should be clean
-   The changes which go into the source of the hotfix should not contain breaking changes, otherwise it's not a hotfix
