# Contributing to Fundamental NGX

We're excited that you're interested in contributing to Fundamental NGX! Through collaboration we can make this library even better.  We have a few guidelines regarding contributions:
 * [Issues and Bugs](#issues-and-bugs)
 * [Feature Requests](#feature-requests)
 * [Contribute Code](#contribute-code)

## Issues and Bugs

If you find a bug or some other issue with any part of the library, please [submit an issue](https://github.com/SAP/fundamental-ngx/issues) to our GitHub repository.  Before doing so we ask that you make sure your issue meets the following criteria:

* This is not a duplicate issue
* The bug has not been fixed in a newer release of the library
* The bug is reproducible
* Your explanation is clear and thorough
* Example code and/or screenshots recommended

After meeting the above criteria you can file issues with our [GitHub issue tracker](https://github.com/SAP/fundamental-ngx/issues/new).  Please use [labels](#usage-of-labels) to categorize your issue.

## Feature Requests

If you'd like to requests a new feature or enhancement, you can do so through the issue tracker as well.  If you'd like to implement the feature yourself, we would still like for you to submit an issue detailing your proposal first, so that we may discuss it with you and the community before moving forward.  Please use [labels](#usage-of-labels) when creating feature requests.

### Usage of Labels

GitHub offers labels to categorize issues. We have defined the following labels so far:

Labels for issue categories:
 * bug: this issue is a bug in the code
 * documentation: this issue is about wrong documentation
 * enhancement: this is not a bug report, but an enhancement request

Status of open issues:
 * unconfirmed: this report needs confirmation whether it is really a bug/future enhancement (no label; this is the default status)
 * approved: this issue is confirmed to be a bug to be fixed or enhancement to be developed
 * author action: the issue's author is required to provide additional information
 * contribution welcome: this fix/enhancement is approved and you are invited to contribute to it

Status/resolution of closed issues:
 * fixed: a fix for the issue was provided
 * duplicate: the issue is also reported in a different ticket and is handled there
 * invalid: for some reason or another this issue report will not be handled further (maybe lack of information or issue does not apply anymore)
 * works: the issue is not reproducible, or the feature is working as expected
 * wontfix: while acknowledged to be an issue, a fix cannot or will not be provided

## Contribute Code

You are welcome to contribute code to Fundamental NGX in order to fix bugs or to implement new features.

There are three important things to know:

1.  You must be aware of the Apache License (which describes contributions) and **agree to the Contributors License Agreement**. This is common practice in all major Open Source projects. To make this process as simple as possible, we are using *[CLA assistant](https://cla-assistant.io/)* for individual contributions. CLA assistant is an open source tool that integrates with GitHub very well and enables a one-click-experience for accepting the CLA. For company contributors, special rules apply. See the respective section below for details.
2.  There are **several requirements regarding code style, quality, and product standards** which need to be met (we also have to follow them). The respective section below gives more details on the coding guidelines.

### Contributor License Agreement

When you contribute (code, documentation, or anything else), you have to be aware that your contribution is covered by the same [Apache 2.0 License](http://www.apache.org/licenses/LICENSE-2.0) that is applied to Fundamental NGX itself.
In particular you need to agree to the Individual Contributor License Agreement,
which can be [found here](https://gist.github.com/CLAassistant/bd1ea8ec8aa0357414e8).
(This applies to all contributors, including those contributing on behalf of a company). If you agree to its content, you simply have to click on the link posted by the CLA assistant as a comment to the pull request. Click it to check the CLA, then accept it on the following screen if you agree to it. CLA assistant will save this decision for upcoming contributions and will notify you if there is any change to the CLA in the meantime.

#### Company Contributors

If employees of a company contribute code, in **addition** to the individual agreement above, there needs to be one company agreement submitted. This is mainly for the protection of the contributing employees.

A company representative authorized to do so needs to download, fill, and print
the [Corporate Contributor License Agreement](/docs/SAP%20Corporate%20Contributor%20License%20Agreement.pdf) form. Then either:

-   Scan it and e-mail it to [opensource@sap.com](mailto:opensource@sap.com) and [openui5@sap.com](mailto:openui5@sap.com)
-   Fax it to: +49 6227 78-45813
-   Send it by traditional letter to: *Industry Standards & Open Source Team, Dietmar-Hopp-Allee 16, 69190 Walldorf, Germany*

The form contains a list of employees who are authorized to contribute on behalf of your company. When this list changes, please let us know.

### Contribution Content Guidelines

We ask that you adhere to our coding style as best you can when submitting code.  Take note of naming conventions, separation of concerns, etc, as well as our formatting rules.  We use the code formatter [Prettier](https://prettier.io/) to handle some of this for us automatically.  In the root of our repository is the [Prettier configuration file](https://github.com/SAP/fundamental-ngx/blob/master/.prettierrc) that defines some simple formatting rules.

### How to contribute - the Process

1.  Make sure the issue you've filed on our [issue tracker] has the label "contribution welcome" - otherwise, it is not ready to be worked on
2.  Fork the Fundamental NGX repository to your GitHub account
3.  Create a branch for your issue or feature and commit/push your changes on that branch
4.  Please adhere to the [Angular commit message guidelines](https://github.com/angular/angular/blob/master/CONTRIBUTING.md#commit)
5.  Create a Pull Request from your forked repository to github.com/SAP/fundamental-ngx.  In the subject of the pull request, briefly describe the bug fix or enhancement you're contributing.  In the pull request description, please provide a link to the issue from our issue tracker
6.  Follow the link posted by the CLA assistant to your pull request and accept it, as described in detail above.
7.  Wait for our code review and approval.  We may ask you for additional commits, or make changes to your pull request ourselves
    -   Note that the Fundamental NGX developers also have their regular duties, so depending on the required effort for reviewing, testing and clarification this may take a while
8.  Once the change has been approved we will inform you in a comment
9.  Your pull request cannot be merged directly into the branch (internal SAP processes), but will be merged internally and immediately appear in the public repository as well.
10.  We will close the pull request, feel free to delete the now obsolete branch
