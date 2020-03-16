# Contributing to Fundamental Library for Angular

We're excited that you're interested in contributing to Fundamental Library for Angular! Your contribution can make this library even better. 
As a contributor, here are the guidelines we would like you to follow:

 - [Issues and Bugs](#issues-and-bugs)
 - [Feature Requests](#feature-requests)
 - [Contribute Code](#contribute-code)
 - [Submission Guidelines](#submit)
 - [Commit Message Guidelines](#commit)
 - [Create PR Title Guidelines](#pr)
 - [Submitting a Pull Request ](#submit-pr)
 - [CI PipeLine Description](#ci-pipeline)
 - [Coding Rules](#rules)
 - [Signing the CLA](#cla)




## Issues and Bugs

If you find a bug or some other issue with any part of the library, please [submit an issue](https://github.com/SAP/fundamental-ngx/issues). Before doing so, please make sure that:

-   The issue is not a duplicate issue.
-   The issue has not been fixed in a newer release of the library.
-   The issue is reproducible.
-   Your explanation is clear and complete.
-   You provide example code and/or screenshots (recommended).

If you meet the above criteria, you can submit issues with our [GitHub issue tracker](https://github.com/SAP/fundamental-ngx/issues/new). Please use [labels](#usage-of-labels) to categorize your issue.

## Feature Requests

You can also use the issue tracker to request a new feature or enhancement. Even if you want to implement the feature yourself, please first submit an issue detailing your proposal so that we may discuss it with you and the community before moving forward. Please use [labels](#usage-of-labels) when creating feature requests.

### Usage of Labels

GitHub offers labels to categorize issues. You can use the following labels:

Labels for issue categories:

-   bug: Issues in the code.
-   documentation: Issues with the documentation.
-   enhancement: Enhancement requests.

Status of open issues:

-   (no label): The default status.
-   unconfirmed: The issue needs to be confirmed as being a bug or future enhancement.
-   approved: The issue is confirmed as being a bug to be fixed or enhancement to be developed.
-   author action: The issue's creator needs to provide additional information.
-   contribution welcome: The fix or enhancement is approved and you are invited to contribute to it.

Status of closed issues:

-   fixed: A fix for the issue was provided.
-   duplicate: The issue is also reported in a different ticket and is being managed there.
-   invalid: The reported issue will not be addressed.
-   works: The issue cannot be reproduced, or the feature is working as expected.
-   wontfix: The issue will not be fixed.

## <a name="contribute-code"></a> Contribute Code

You are welcome to contribute code to Fundamental Library for Angular in order to fix issues or to add new features.

There are two important things to consider:

1.  You must be aware of the Apache License (which describes contributions) and **agree to the Contributors License Agreement**. This is common practice in all major Open Source projects. If you are an individual contributor, use _[CLA assistant](https://cla-assistant.io/)_. CLA assistant is an open source tool that integrates with GitHub and enables a one-click-experience for accepting the CLA. If you are contributing on behalf of a company, see the [Company Contributors](#company-contributors) section below for details.
2.  You must follow **code style, quality, and product standards requirements**. You can find more information on the coding guidelines below.

### Contributor License Agreement

When you contribute (code, documentation, or anything else), you must be aware that your contribution is covered by the same [Apache 2.0 License](http://www.apache.org/licenses/LICENSE-2.0) that is applied to Fundamental Library for Angular itself.
In particular, you need to agree to the Individual Contributor License Agreement,
which can be [found here](https://gist.github.com/CLAassistant/bd1ea8ec8aa0357414e8).
(This applies to all contributors, including those contributing on behalf of a company). If you agree to its content, you simply have to click on the link posted by the CLA assistant as a comment to the pull request. Click it to check the CLA and, if you agree to it, accept it on the following screen. CLA assistant saves this decision for upcoming contributions and notifies you if there is any change to the CLA in the meantime.

#### Company Contributors

If employees of a company contribute code, in **addition** to the individual agreement above, there needs to be one company agreement submitted. This is mainly for the protection of the contributing employees.

A company representative authorized to do so needs to download, fill out, and print
the [Corporate Contributor License Agreement](/docs/SAP%20Corporate%20Contributor%20License%20Agreement.pdf) form. Then either:

-   Scan it and e-mail it to [opensource@sap.com](mailto:opensource@sap.com),
-   Fax it to: +49 6227 78-45813,
-   Send it by mail to: _Industry Standards & Open Source Team, Dietmar-Hopp-Allee 16, 69190 Walldorf, Germany_.

The form lists all employees who are authorized to contribute on behalf of your company. When this list changes, please let us know.


## <a name="submit"></a> Submission Guidelines
## <a name="commit"></a> Commit Message Guidelines

We have very precise rules over how our git commit messages can be formatted.  This leads to **more
readable messages** that are easy to follow when looking through the **project history**. 

### Commit Message Format
Each commit message consists of a **header**, a **body** and a **footer**.  The header has a special
format that includes a **type**, a **scope** and a **subject**:

```
<type>(<scope>): <subject>
<BLANK LINE>
<body>
<BLANK LINE>
<footer>
```

The **header** is mandatory and the **scope** of the header is optional.

Any line of the commit message cannot be longer than 100 characters! This ensures that the message 
is easy to read in GitHub and in other git tools.

The footer should contain a [closing reference to an issue](https://help.github.com/articles/closing-issues-via-commit-messages/) if any.

Samples: 

```
docs(core): update changelog to beta.5
```
```
fix(platform): need to depend on latest rxjs and zone.js

The version in our package.json gets copied to the one we publish, and users need the latest of these.
```


```
fix(platform): Actionbar as component

```


### Revert
If the commit reverts a previous commit, it should begin with `revert: `, followed by the header of the reverted commit. In the body it should say: `This reverts commit <hash>.`, where the hash is the SHA of the commit being reverted.

### Type
Must be one of the following:

* **build**: Changes that affect the build system or external dependencies (example scopes: gulp, broccoli, npm)
* **ci**: Changes to our CI configuration files and scripts (example scopes: Circle, BrowserStack, SauceLabs)
* **docs**: Documentation only changes
* **feat**: A new feature
* **fix**: A bug fix
* **refactor**: A code change that neither fixes a bug nor adds a feature
* **style**: Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc)
* **test**: Adding missing tests or correcting existing tests

### Scope
The scope should be the name of the npm package affected (as perceived by the person reading the changelog 
generated from commit messages).

The following is the list of supported scopes:

* **core**
* **platform**
* **doc-app**

There are currently a few exceptions to the "use package name" rule:

* **changelog**: used for updating the release notes in CHANGELOG.md
* **doc-app**: used for docs-app (angular.io) related changes within the /aio directory of the
  repo
* none/empty string: useful for `style`, `test` and `refactor` changes that are done across all
  packages (e.g. `style: add missing semicolons`) and for docs changes that are not related to a
  specific package (e.g. `docs: fix typo in tutorial`).

### Subject
The subject contains a succinct description of the change:

* use the imperative, present tense: "change" not "changed" nor "changes"
* don't capitalize the first letter
* no dot (.) at the end

### Body
Just as in the **subject**, use the imperative, present tense: "change" not "changed" nor "changes".
The body should include the motivation for the change and contrast this with previous behavior.

### Footer
The footer should contain any information about **Breaking Changes** and should reference the GitHub 
issues that this commit **Closes**.


**Breaking Changes** should start with the word `BREAKING CHANGE:` with a space or two newlines. 
The rest of the commit message is then used for this.

A detailed explanation can be found in this [document][commit-message-format].

## <a name="pr"></a> Create PR Guidelines

If you look at the format of our npm packages you will see:

`0.11.0-rc.10` which should be read as `MAJOR` . `MINOR` . `PATCH PR-BUILD`.
  
The number of the **PR Title (not commit message)** will be chosen automatically as part of the CI 
process.

### PR Title Format

The PR title must follow this format:


```
<type>: <subject>
```

Samples:

```
feat: My adding new binding to button component
```


```
chore: Updated package.json
```

##### Type

Type can have following values: `WIP|feat|chore|test|docs|fix`.

The `WIP` represent work in progress and it will not be merged, so please make sure to use one of 
the specific format such as `feat|chore|test|doc|fix` if your PR needs to be merged with master 



Here are following rules behind the PR title message:

* Bump up PATCH version -` fix:` or  `feat:` 
    * Here goes all the features and fixes commits
* To bump up the MINOR version (the feature):
   * We run script to change the middle number. 
* To bump the MAJOR
   * Run script as well. The process was adjusted to work only with Patch and Minor versions at the moment


## <a name="submit-issue"></a> Submitting an Issue

Before you submit an issue, please search the issue tracker, maybe an issue for your problem already exists and the discussion might inform you of workarounds readily available.

A minimal reproduction allows us to quickly confirm a bug (or point out a coding problem) as well as confirm that we are fixing the right problem.

We will be insisting on a minimal reproduction scenario in order to save maintainers time and ultimately be able to fix more bugs. Interestingly, from our experience users often find coding problems themselves while preparing a minimal reproduction. We understand that sometimes it might be hard to extract essential bits of code from a larger code-base but we really need to isolate the problem before we can fix it.

Unfortunately, we are not able to investigate / fix bugs without a minimal reproduction, so if we don't hear back from you we are going to close an issue that doesn't have enough info to be reproduced.


### <a name="submit-pr"></a> Submitting a Pull Request (PR)
Before you submit your Pull Request (PR) consider the following guidelines:

1. Search [GitHub](https://github.com/SAP/fundamental-ngx/pulls) for an open or closed PR
  that relates to your submission. You don't want to duplicate effort.
1. Be sure that an issue describes the problem you're fixing, or documents the design for the feature you'd like to add.
  Discussing the design up front helps to ensure that we're ready to accept your work.
1. Fork the fundamental-ngx repo.
1. Make your changes in a new git branch:

     ```shell
     git checkout -b my-fix-branch master
     ```

1. Create your patch, **including appropriate test cases**.
1. Follow our [Coding Rules](#rules). // Todo: Link to other document guidelines
1. Run the full test suite and ensure that all tests pass.
1. Run the full lint suite and ensure that all checks pass.
1. Commit your changes using a descriptive commit message that follows our
  [commit message conventions](#commit). Adherence to these conventions
  is necessary because release notes are automatically generated from these messages.

     ```shell
     git commit -a
     ```
    Note: the optional commit `-a` command line option will automatically "add" and "rm" edited files.

1. Push your branch to GitHub:

    ```shell
    git push origin my-fix-branch
    ```

**Make sure you rebase before you push - to guaranteee your branch is not outdated!**
 
 
 _There should not be any Merge commits. When they are you haven't properly rebased_!


1. In GitHub, Create Pull Request.

* If we suggest changes then:
  * Make the required updates.
  * Re-run the test suites to ensure tests are still passing.
  * Rebase your branch and force push to your GitHub repository (this will update your Pull Request):

    ```shell
    git rebase master -i
    git push -f
    ```

That's it! Thank you for your contribution!




#### After your pull request is merged

After your pull request is merged, you can safely delete your branch and pull the changes
from the main (upstream) repository:

* Delete the remote branch on GitHub either through the GitHub web UI or your local shell as follows:

    ```shell
    git push origin --delete my-fix-branch
    ```

* Check out the master branch:

    ```shell
    git checkout master -f
    ```

* Delete the local branch:

    ```shell
    git branch -D my-fix-branch
    ```

* Update your master with the latest upstream version:

    ```shell
    git pull --ff upstream master
    ```
    
## <a name="ci-pipeline"></a> CI PipeLine
Full description of current CI PipeLine can be found [here](https://github.com/SAP/fundamental-ngx/wiki/Deploy-(Release-and-Pre-Release)-pipe-line-description).

## <a name="rules"></a> Coding Rules
To ensure consistency throughout the source code, keep these rules in mind as you are working:

* All features or bug fixes **must be tested** by one or more specs (unit-tests).
* All public API methods **must be documented**. (Details TBC).
* We follow [Google's JavaScript Style Guide][js-style-guide], but wrap all code at
  **100 characters**. An automated formatter is available, see
  [DEVELOPER.md](docs/DEVELOPER.md#clang-format).


## <a name="cla"></a> Signing the CLA

Please sign our Contributor License Agreement (CLA) before sending pull requests. For any code
changes to be accepted, the CLA must be signed. It's a quick process, we promise!

* For individuals we have a [simple click-through form][individual-cla].
* For corporations we'll need you to
  [print, sign and one of scan+email, fax or mail the form][corporate-cla].

<hr>

  If you have more than one Git identity, you must make sure that you sign the CLA using the primary email address associated with the ID that has been granted access to the Angular repository. Git identities can be associated with more than one email address, and only one is primary. Here are some links to help you sort out multiple Git identities and email addresses:

  * https://help.github.com/articles/setting-your-commit-email-address-in-git/
  * https://stackoverflow.com/questions/37245303/what-does-usera-committed-with-userb-13-days-ago-on-github-mean
  * https://help.github.com/articles/about-commit-email-addresses/
  * https://help.github.com/articles/blocking-command-line-pushes-that-expose-your-personal-email-address/

  Note that if you have more than one Git identity, it is important to verify that you are logged in with the same ID with which you signed the CLA, before you commit changes. If not, your PR will fail the CLA check.

<hr>

[commit-message-format]: https://docs.google.com/document/d/1QrDFcIiPjSLDn3EL15IJygNPiHORgU1_OOAqWjiDU5Y/preview

