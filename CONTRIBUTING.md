# Contributing to Fundamental NGX

We're excited that you're interested in contributing to Fundamental NGX! Your contribution can make this library even better. Please read the guidelines regarding contributions:

-   [Issues and Bugs](#issues-and-bugs)
-   [Feature Requests](#feature-requests)
-   [Contribute Code](#contribute-code)

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

## Contribute Code

You are welcome to contribute code to Fundamental NGX in order to fix issues or to add new features.

There are three important things to consider:

1.  You must be aware of the Apache License (which describes contributions) and **agree to the Contributors License Agreement**. This is common practice in all major Open Source projects. If you are an individual contributor, use _[CLA assistant](https://cla-assistant.io/)_. CLA assistant is an open source tool that integrates with GitHub and enables a one-click-experience for accepting the CLA. If you are contributing on behalf of a company, see the [Company Contributors](#company-contributors) section below for details.
2.  You must follow **code style, quality, and product standards requirements**. You can find more information on the coding guidelines below.

### Contributor License Agreement

When you contribute (code, documentation, or anything else), you must be aware that your contribution is covered by the same [Apache 2.0 License](http://www.apache.org/licenses/LICENSE-2.0) that is applied to Fundamental NGX itself.
In particular, you need to agree to the Individual Contributor License Agreement,
which can be [found here](https://gist.github.com/CLAassistant/bd1ea8ec8aa0357414e8).
(This applies to all contributors, including those contributing on behalf of a company). If you agree to its content, you simply have to click on the link posted by the CLA assistant as a comment to the pull request. Click it to check the CLA and, if you agree to it, accept it on the following screen. CLA assistant saves this decision for upcoming contributions and notifies you if there is any change to the CLA in the meantime.

#### Company Contributors

If employees of a company contribute code, in **addition** to the individual agreement above, there needs to be one company agreement submitted. This is mainly for the protection of the contributing employees.

A company representative authorized to do so needs to download, fill out, and print
the [Corporate Contributor License Agreement](/docs/SAP%20Corporate%20Contributor%20License%20Agreement.pdf) form. Then either:

-   Scan it and e-mail it to [opensource@sap.com](mailto:opensource@sap.com) and [openui5@sap.com](mailto:openui5@sap.com),
-   Fax it to: +49 6227 78-45813,
-   Send it by mail to: _Industry Standards & Open Source Team, Dietmar-Hopp-Allee 16, 69190 Walldorf, Germany_.

The form lists all employees who are authorized to contribute on behalf of your company. When this list changes, please let us know.

### Contribution Content Guidelines

You must follow the coding style as best you can when submitting code. Take note of naming conventions, separation of concerns, and formatting rules. You can use the code formatter [Prettier](https://prettier.io/) to handle some of this for you automatically. You can find the [Prettier configuration file](https://github.com/SAP/fundamental-ngx/blob/master/.prettierrc), which defines some simple formatting rules, in the root repository.

### How to contribute - the Process

1.  Make sure the issue you've filed in the [issue tracker] has the label "contribution welcome" - otherwise, it is not ready to be worked on.
2.  Fork the Fundamental NGX repository to your GitHub account.
3.  Create a branch for your issue or feature, and commit or push your changes on that branch.
4.  Follow the [Angular commit message guidelines](https://github.com/angular/angular/blob/master/CONTRIBUTING.md#commit).
5.  Create a Pull Request from your forked repository to github.com/SAP/fundamental-ngx. In the subject of the pull request, briefly describe the bug fix or enhancement you're contributing. In the pull request description, please provide a link to the issue in the issue tracker.
6.  Follow the link posted by the CLA assistant to your pull request and accept it, as described above.
7.  Wait for our code review and approval. We may ask you for additional commits, or make changes to your pull request ourselves.
    -   Note that the Fundamental NGX developers also have their regular duties so, depending on the required effort for reviewing, testing, and clarification, this may take a while.
8.  Once the change has been approved, we inform you in a comment.
9.  Your pull request cannot be merged directly into the branch (internal SAP processes), but is merged internally and immediately appears in the public repository as well.
10. We close the pull request. You can then delete the now obsolete branch.
