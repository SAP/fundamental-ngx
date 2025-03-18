## Related Issue(s)

<!-- If this PR fixes multiple issues, please use the full syntax(`closes #issue-number`) for each issue so that each issue gets automatically closed on PR merge; for example: `closes #0001, closes #0002`, and so on. -->

closes

## Description

<!-- Enter short description of the change -->

## Screenshots

<!-- If you've made any style changes, please provide appropriate screenshots (before and after) to help reviewers. -->

### Before:

### After:

#### Please check whether the PR fulfills the following requirements

##### During Implementation

1. Visual Testing:

- [ ] visual misalignments/updates
- [ ] check Light/Dark/HCB/HCW themes
- [ ] RTL/LTR - proper rendering and labeling
- [ ] responsiveness(resize)
- [ ] Content Density (Cozy/Compact/(Condensed))
- [ ] States - hover/disabled/focused/active/on click/selected/selected hover/press state
- [ ] Interaction/Animation - open/close, expand/collapse, add/remove, check/uncheck
- [ ] Mouse vs. Keyboard support
- [ ] Text Truncation

2. API and functional correctness

- [ ] check for console logs (warnings, errors)
- [ ] API boundary values
- [ ] different combinations of components - free style
- [ ] change the API values during testing

3. Documentation and Example validations

- [ ] missing API documentation or it is not understandable
- [ ] poor examples
- [ ] Stackblitz works for all examples

4. Accessibility testing
5. Browser Testing - Edge, Safari, Chrome, Firefox

##### PR Quality

- [ ] the commit message(s) follows the guideline:
      https://github.com/SAP/fundamental-ngx/blob/main/CONTRIBUTING.md
- [ ] tests for the changes that have been done
- [ ] all items on the PR Review Checklist are addressed :
      https://github.com/SAP/fundamental-ngx/wiki/PR-Review-Checklist
- [ ] Run npm run build-pack-library and test in external application
- [ ] update `README.md`
- [ ] [Breaking Changes Wiki](https://github.com/SAP/fundamental-ngx/wiki/Breaking-Changes)
