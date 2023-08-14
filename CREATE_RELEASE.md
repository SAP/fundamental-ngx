# Creation of the release

In `fundamental-ngx` are multiple methods for creating a release. In general there are few release types:

-   stable release
-   prerelease
-   hotfix release

## 1. Stable releases

`Stable` releases can be created via github workflow manual dispatch. In this case, scripts will take the
latest commit from the `main` branch, and create a release from it. This is a fully automatic process.
`Stable` releases also can be triggered from the CLI, and in this case, the user can specify the version of the release,
if needed. This is a semi-automatic process, since the user can specify the version of the release, but the rest
of the process is fully automatic.
The command for the release with the specified version is:

```bash
npx lerna version ${version}
```

Or if you want to use the conventional commits to determine next version automatically, then you can use:

```bash
npx lerna version --conventional-graduate
```

## 2. Prereleases

`Prerelease`, aka `rc` releases are created automatically after every merge into the `main` branch. This is a fully
automatic process, and the version of the release is determined using the conventional commits.

## 3. Hotfix releases

`Hotfix` releases are also created automatically, but the difference from `Stable` is the source of the release.
When you want to create a `Hotfix`, you need to checkout the tag, which will be enriched with the hotfix content.
For example if your latest version is `v0.40.1` and after that release there have been numerous releases with the
`v0.40.2-rc.*` tags, and you want to create a hotfix, which fixes `v0.40.1` with additional commit, but you do not
want to include all the changes from `v0.40.2-rc.*` releases, then you need to checkout the `v0.40.1` tag, and
cherry-pick a commit with the hotfix. Then you need to type in `npm run hotfix-release` and the release process will
start. This is a fully automatic process, and the version of the release is determined using the conventional commits.
In this situation, the version of the release will be `v0.40.2` and since the `v0.40.2` is newer than the main branch
version, `v0.40.2-rc.*`, the main branch will be updated to `v0.40.2` as well, but only with the version indicator,
not the change itself. This ensures that after the next rc release on main, the versions will not collide. Also,
this given `hotfix` will be marked as `latest` on npm.

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
