# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [0.45.0](https://github.com/SAP/fundamental-ngx/compare/v0.45.0-rc.0...v0.45.0) (2023-08-11)

**Note:** Version bump only for package fundamental-ngx





# [0.45.0-rc.0](https://github.com/SAP/fundamental-ngx/compare/v0.44.1-rc.3...v0.45.0-rc.0) (2023-08-11)


### chore

* **docs, platform, core, cdk:** removed deprecated selectors, components, properties and classes ([#10303](https://github.com/SAP/fundamental-ngx/issues/10303)) ([fd1a397](https://github.com/SAP/fundamental-ngx/commit/fd1a397be7f3403ffbab155162b9a4af9dcf7bc8))


### BREAKING CHANGES

* **docs, platform, core, cdk:** `[fdTruncate]` and `[fd-truncate]` selectors are removed, use `[fdkTruncate]` instead
`[fdTemplate]` selector is removed, use `[fdkTemplate]` instead
`[fdResize]` and `[fd-resize]` selectors are removed, use `[fdkResize]` instead
`[fdResizeHandle]` and `[fd-resize-handle]` selectors are removed, use `[fdkResizeHandle]` instead
`[fdRepeat]` selector is removed, use `[fdkRepeat]` instead
`[fnReadonly]` selector is removed, use `[fdkReadonly]` instead
`[fdOverflowListItem]` and `[fd-overflow-list-item]` selectors are removed, use `[fdkOverflowListItem]` instead
`[fdOverflowList]` and `[fd-overflow-list]` selectors are removed, use `[fdkOverflowList]` instead
`[fdOnlyDigits]` and `[fd-only-digits]` selectors are removed, use `[fdkOnlyDigits]` instead
`[fdLineClampTarget]` and `[fd-lineclamp-target]` selectors are removed, use `[fdkLineClampTarget]` instead
`[fdLineClamp]` and `[fd-lineclamp]` selectors are removed, use `[fdkLineClamp]` instead
`[fdInitialFocus]` and `[fd-initial-focus]` selectors are removed, use `[fdkInitialFocus]` instead
`[fdIgnoreClickOnSelection]` selector is removed, use `[fdkIgnoreClickOnSelection]` instead

`[fnFocusableList]` selector is removed, use `[fdkFocusableList]` instead

`[fnFocusableItem]` selector is removed, use `[fdkFocusableItem]` instead

`[fd-focus-key-manager-list]` and `[fdFocusKeyManagerList]` selectors are removed, use `[fdkFocusKeyManagerList]` instead

`[fd-focus-key-manager-item]` and `[fdFocusKeyManagerItem]` selectors are removed, use `[fdkFocusKeyManagerItem]` instead

`[fnDisabled]` selector is removed, use `[fdkDisabled]` instead

`[fnClicked]` selector is removed, use `[fdkClicked]` instead

`[fdAutoComplete]` and `[fd-auto-complete]` selectors are removed, use `[fdkAutoComplete]` instead

* chore(core): table condensed input removed
* **docs, platform, core, cdk:** `table[fd-table][condensed]` selector is removed, use `[fdCondensed]` instead

* chore: removed unused file

* chore(core): removed deprecated input from slider
* **docs, platform, core, cdk:** `fd-slider[cozy]` input removed, use `[fdCozy]` directive instead

* chore(core): removed deprecated input from bar
* **docs, platform, core, cdk:** `[fd-bar][cozy]` input removed, use `[fdCozy]` directive instead

* chore: removed unused base cozy directive

* chore: normalized selectors

* chore(core): remove deprecated compact input from action-sheet
* **docs, platform, core, cdk:** fd-action-sheet[compact], fd-action-sheet-body[compact], [fd-action-sheet-item][compact] selectors are removed, use [fdCompact] directive instead

* chore(core): remove deprecated compact input from bar
* **docs, platform, core, cdk:** fd-button-bar[compact] selector is removed, use [fdCompact] directive instead

* chore(core): remove deprecated compact input from breadcrumb
* **docs, platform, core, cdk:** fd-breadcrumb[compact] selector is removed, use [fdCompact] directive instead

* chore(core): remove deprecated compact input from button
* **docs, platform, core, cdk:** [fd-button][compact] selector is removed, use [fdCompact] directive instead

* chore(core): remove deprecated compact input from calendar
* **docs, platform, core, cdk:** fd-calendar[compact] selector is removed, use [fdCompact] directive instead

* chore(core): remove deprecated compact input from card
* **docs, platform, core, cdk:** fd-card[compact] selector is removed, use [fdCompact] directive instead

* chore(core): remove deprecated compact input from checkbox
* **docs, platform, core, cdk:** fd-checkbox[compact] selector is removed, use [fdCompact] directive instead

* chore(core): remove deprecated compact input from combobox
* **docs, platform, core, cdk:** fd-combobox[compact] selector is removed, use [fdCompact] directive instead

* chore(core): remove deprecated compact input from date-picker
* **docs, platform, core, cdk:** fd-date-picker[compact] selector is removed, use [fdCompact] directive instead

* chore(core): remove deprecated compact input from datetime-picker
* **docs, platform, core, cdk:** fd-datetime-picker[compact] selector is removed, use [fdCompact] directive instead

* chore(core): remove deprecated compact input from dynamic-page
* **docs, platform, core, cdk:** fd-dynamic-page-title-content[compact] selector is removed, use [fdCompact] directive instead

* chore(core): remove deprecated compact input from file-uploader
* **docs, platform, core, cdk:** fd-file-uploader[compact] selector is removed, use [fdCompact] directive instead

* chore(core): remove deprecated compact input from input-group
* **docs, platform, core, cdk:** fd-input-group[compact], [fd-input-group-addon][compact], [fd-input-group-input][compact] selectors are removed, use [fdCompact] directive instead

* chore(core): remove deprecated compact input from list
* **docs, platform, core, cdk:** [fd-list][compact], [fdList][compact] selectors are removed, use [fdCompact] directive instead

* chore(core): remove deprecated compact input from menu
* **docs, platform, core, cdk:** fd-menu[compact] selector is removed, use [fdCompact] directive instead

* chore(core): remove deprecated compact input from micro-process-flow
* **docs, platform, core, cdk:** fd-micro-process-flow[compact] selector is removed, use [fdCompact] directive instead

* chore(core): remove deprecated compact input from multi-input
* **docs, platform, core, cdk:** fd-multi-input[compact] selector is removed, use [fdCompact] directive instead

* chore(core): remove deprecated compact input from pagination
* **docs, platform, core, cdk:** fd-pagination[compact] selector is removed, use [fdCompact] directive instead

* chore(core): remove deprecated compact input from panel
* **docs, platform, core, cdk:** fd-panel[compact] selector is removed, use [fdCompact] directive instead

* chore(core): remove deprecated compact input from radio
* **docs, platform, core, cdk:** fd-radio-button[compact] selector is removed, use [fdCompact] directive instead

* chore(core): remove deprecated compact input from select
* **docs, platform, core, cdk:** fd-select[compact] selector is removed, use [fdCompact] directive instead

* chore(core): remove deprecated compact input from shellbar
* **docs, platform, core, cdk:** fd-shellbar-user-menu[compact] selector is removed, use [fdCompact] directive instead

* chore(core): remove deprecated compact input from split-button
* **docs, platform, core, cdk:** fd-split-button[compact] selector is removed, use [fdCompact] directive instead

* chore(core): remove deprecated compact input from step-input
* **docs, platform, core, cdk:** fd-step-input[compact] selector is removed, use [fdCompact] directive instead

* chore(core): remove deprecated compact input from switch
* **docs, platform, core, cdk:** fd-switch[compact] selector is removed, use [fdCompact] directive instead

* chore(core): remove deprecated compact input from table
* **docs, platform, core, cdk:** table[fd-table][compact] selector is removed, use [fdCompact] directive instead

* chore(core): remove deprecated compact input from tabs
* **docs, platform, core, cdk:** [fd-tab-nav][compact], fd-tab-list[compact] selectors are removed, use [fdCompact] directive instead

* chore(core): remove deprecated compact input from time
* **docs, platform, core, cdk:** fd-time-column[compact], fd-time[compact] selectors are removed, use [fdCompact] directive instead

* chore(core): remove deprecated compact input from time-picker
* **docs, platform, core, cdk:** fd-time-picker[compact] selector is removed, use [fdCompact] directive instead

* chore(core): remove deprecated compact input from token
* **docs, platform, core, cdk:** fd-tokenizer[compact], fd-token[compact] selectors are removed, use [fdCompact] directive instead

* chore(core): remove deprecated compact input from wizard
* **docs, platform, core, cdk:** fd-wizard-step-indicator[compact] selector is removed, use [fdCompact] directive instead

* chore: formatting

* chore(core): removed deprecated input from form controls
* **docs, platform, core, cdk:** input[fd-form-control][compact], textarea[fd-form-control][compact] selectors are removed, use [fdCompact] directive instead

* chore(core): removed deprecated input nested list
* **docs, platform, core, cdk:** [fdNestedList][compact], [fd-nested-list][compact] selectors are removed, use [fdCompact] directive instead

* chore(platform): removed deprecated input nested list
* **docs, platform, core, cdk:** fdp-form-group[compact] selector is removed, use [fdCompact] directive instead

* chore(platform): removed deprecated input table filter rule
* **docs, platform, core, cdk:** fdp-table-filter-rule[compact] selector is removed, use [fdCompact] directive instead

* chore(docs): removed deleted input usages

* chore(platform): removed usage of the density deprecation provider

* chore(platform): remove deprecations provider from libs/docs/platform/action-bar/platform-action-bar.module.ts

* chore(platform): remove deprecations provider from libs/docs/platform/button/platform-button.module.ts

* chore(platform): remove deprecations provider from libs/docs/platform/checkbox/platform-checkbox-docs.module.ts

* chore(platform): remove deprecations provider from libs/docs/platform/checkbox-group/platform-checkbox-group-docs.module.ts

* chore(platform): remove deprecations provider from libs/docs/platform/combobox/platform-combobox-docs.module.ts

* chore(platform): remove deprecations provider from libs/docs/platform/date-picker/platform-date-picker-docs.module.ts

* chore(platform): remove deprecations provider from libs/docs/platform/datetime-picker/platform-datetime-picker-docs.module.ts

* chore(platform): remove deprecations provider from libs/docs/platform/file-uploader/platform-file-uploader-docs.module.ts

* chore(platform): remove deprecations provider from libs/docs/platform/input/platform-input-docs.module.ts

* chore(platform): remove deprecations provider from libs/docs/platform/input-group/platform-input-group-docs.module.ts

* chore(platform): remove deprecations provider from libs/docs/platform/list/platform-list-docs.module.ts

* chore(platform): remove deprecations provider from libs/docs/platform/menu/platform-menu.module.ts

* chore(platform): remove deprecations provider from libs/docs/platform/menu-button/platform-menu-button.module.ts

* chore(platform): remove deprecations provider from libs/docs/platform/multi-combobox/platform-multi-combobox-docs.module.ts

* chore(platform): remove deprecations provider from libs/docs/platform/object-list-item/platform-object-list-item-docs.module.ts

* chore(platform): remove deprecations provider from libs/docs/platform/panel/platform-panel.module.ts

* chore(platform): remove deprecations provider from libs/docs/platform/radio-group/platform-radio-group.module.ts

* chore(platform): remove deprecations provider from libs/docs/platform/search-field/platform-search-field.module.ts

* chore(platform): remove deprecations provider from libs/docs/platform/select/platform-select-docs.module.ts

* chore(platform): remove deprecations provider from libs/docs/platform/slider/slider-docs.module.ts

* chore(platform): remove deprecations provider from libs/docs/platform/split-menu-button/platform-split-menu-button.module.ts

* chore(platform): remove deprecations provider from libs/docs/platform/standard-list-item/platform-standard-list-item-docs.module.ts

* chore(platform): remove deprecations provider from libs/docs/platform/step-input/platform-step-input.module.ts

* chore(platform): remove deprecations provider from libs/docs/platform/switch/platform-switch-docs.module.ts

* chore(platform): remove deprecations provider from libs/docs/platform/table/platform-table.module.ts

* chore(platform): remove deprecations provider from libs/docs/platform/textarea/platform-textarea-docs.module.ts

* chore(platform): remove deprecations provider from libs/docs/platform/time-picker/platform-time-picker-docs.module.ts

* chore(platform): remove deprecations provider from libs/docs/platform/upload-collection/platform-upload-collection-docs.module.ts

* chore(platform): remove deprecations provider from libs/docs/platform/vhd/platform-vhd-docs.module.ts

* chore(platform): removed all the contentDensity input shims
* **docs, platform, core, cdk:**         fdp-action-bar[contentDensity],
        fdp-button[contentDensity],
        fdp-object-list-item[contentDensity],
        fdp-standard-list-item[contentDensity],
        fdp-menu[contentDensity],
        fdp-menu-button[contentDensity],
        fdp-panel[contentDensity],
        fdp-search-field[contentDensity],
        fdp-split-menu-button[contentDensity],
        fdp-file-uploader[contentDensity],
        fdp-upload-collection[contentDensity],
        fdp-table[contentDensity],
        fdp-multi-input[contentDensity],
        fdp-list[contentDensity],
        fdp-slider[contentDensity],
        fdp-time-picker[contentDensity],
        fdp-textarea[contentDensity],
        fdp-switch[contentDensity],
        fdp-number-step-input[contentDensity],
        fdp-select[contentDensity],
        fdp-date-picker[contentDensity],
        fdp-checkbox[contentDensity],
        fdp-checkbox-group[contentDensity],
        fdp-combobox[contentDensity],
        fdp-datetime-picker[contentDensity],
        fdp-input[contentDensity],
        fdp-radio-group[contentDensity],
        fdp-radio-button[contentDensity],
        fdp-multi-combobox[contentDensity],
        fdp-input-group-addon-body[contentDensity],
        fdp-input-group[contentDensity],
        fdp-value-help-dialog[contentDensity],
        fdp-filter-single-select[contentDensity],
        fdp-filter-multi-select[contentDensity],
        fdp-filter-custom[contentDensity]
        selectors are removed, use [fdContentDensity] directive instead

* chore(docs): removed old content density documentation module and refs

* chore(core): removed unused bases

* chore(core): removed alert module
* **docs, platform, core, cdk:** fd-alert is no longer available, use `message strip alerts` instead

* chore(core): removed deprecated inputs
* **docs, platform, core, cdk:** fd-carousel no longer has leftNavigationBtnLabel and rightNavigationBtnLabel inputs, use 'coreCarousel.leftNavigationBtnLabel' and 'coreCarousel.rightNavigationBtnLabel' keys of i18n

* chore(core): removed deprecated inputs
* **docs, platform, core, cdk:** fd-date-picker removal of the deprecated inputs, use capabilities of the i18n

* chore(core): removed deprecated inputs
* **docs, platform, core, cdk:** fd-datetime-picker removal of the deprecated inputs, use capabilities of the i18n

* chore(platform): removed deprecated inputs
* **docs, platform, core, cdk:** fdp-upload-collection removal of the deprecated inputs, use capabilities of the i18n

* chore(core): removed deprecated inputs
* **docs, platform, core, cdk:** - fd-pagination removal of the deprecated inputs, use capabilities of the i18n
- fd-pagination removal of the deprecated method `getPaginationObject`, use `paginationObject` getter instead

* chore(core): removed deprecated inputs
* **docs, platform, core, cdk:** - fd-pagination removal of the deprecated inputs, use capabilities of the i18n
- fd-pagination removal of the deprecated method `getPaginationObject`, use `paginationObject` getter instead

* chore(platform): removed deprecated inputs
* **docs, platform, core, cdk:** fdp-date-picker removal of the deprecated inputs, use i18n coreDatePicker keys instead

* chore(platform): removed deprecated inputs
* **docs, platform, core, cdk:** removed fdp-date-picker `datepickerState` input, use `state` instead

* chore(platform,docs): removed deprecated inputs
* **docs, platform, core, cdk:** fdp-smart-filter-bar removal of the deprecated inputs, use i18n platformSmartFilterBar keys instead

* chore(docs): removed usage of the deprecated input

* chore(cdk): fixed tests

* chore(core): removed deprecated inputs
* **docs, platform, core, cdk:** removed `moreLabel` and `moreLabel` inputs, use i18n capabilities instead

* chore(core): removed deprecated inputs and migrated to standalone
* **docs, platform, core, cdk:** removed deprecated inputs, use i18n coreUploadCollection keys instead

* chore(platform): removed deprecated inputs
* **docs, platform, core, cdk:** removed deprecated inputs, use i18n platformSearchField keys instead

* chore(core): removed deprecated input and modified initial value for FD_LANGUAGE
* **docs, platform, core, cdk:** removed deprecated `dismissLabel` input from the message strip, use `coreMessageStrip.dismissLabel` i18n key instead

* chore(core): removed deprecated input from inline help
* **docs, platform, core, cdk:** removed deprecated `fd-inline-help-template` input from the inline help, use `fd-inline-help` instead

* chore(core): removed deprecated input from form label
* **docs, platform, core, cdk:** removed deprecated `inlineHelpTitle` from form-label, use inlineHelpContent instead

* chore(platform): removed deprecated input from form field
* **docs, platform, core, cdk:** removed deprecated `labelLayout` input property. Use labelColumnLayout, fieldColumnLayout and gapColumnLayout properties instead

* chore(core): removed deprecated inputs from shellbar
* **docs, platform, core, cdk:** removed `collapsedItemMenuLabel`, use `coreShellbar.collapsedItemMenuLabel` i18n key instead

* fix(docs): fixed removed input usage

* chore(core): removed deprecated input
* **docs, platform, core, cdk:** removed deprecated `backgroundImage` input, use `image` instead

* chore(core): removed deprecated selector for link
* **docs, platform, core, cdk:** removed deprecated `[fd-breadcrumb-link]` selector from the link, use `[fdLink]` or `[fd-link]` instead

* chore(platform): removed deprecated input from list-group-header.component
* **docs, platform, core, cdk:** removed `grpheaderTitle` input, use `groupHeaderTitle` instead

* chore(cdk): removed deprecated method base toast service
* **docs, platform, core, cdk:** removed `dismissAll` method, use `hideAll` instead

* chore(core): removed deprecated input from product-switch
* **docs, platform, core, cdk:** removed `ariaLabel` input, use `coreProductSwitch.ariaLabel` i18n key instead

* chore(core): removed deprecated list item inputs and removed unused inputs
* **docs, platform, core, cdk:** removed `ariaDescribedBy` input, use native `aria-describedby` attribute instead

* chore(core): removed deprecated input from input-group
* **docs, platform, core, cdk:** removed `inputTemplate` input, use `fd-input-group-input` directive instead

* chore(core): removed deprecated properties
* **docs, platform, core, cdk:** `options`, `addContainerClass`, `additionalClasses` are no longer there

* chore(platform): removed deprecated properties and classes
* **docs, platform, core, cdk:** - `emptyTableMessage` is removed from `fdp-select-tab`, use `platformVHD.searchTableEmptyMessage` i18n key instead
- `selectTabTitle` is removed from `fdp-value-help-dialog`, use `platformVHD.selectTabTitle` i18n key instead
- `searchTableEmptyMessage` is removed, use `platformVHD.searchTableEmptyMessage` i18n key instead
- `defineTabTitle` is removed, use `platformVHD.defineTabTitle` i18n key instead
- `VhdSearchComponent` is removed, use i18n capabilities instead

* chore(platform): removed dead inputs from `fdp-define-tab`

* chore(platform): removed deprecated property
* **docs, platform, core, cdk:** removed `defineStrategyLabels` from smart filter bar, use i18n capabilities instead

* chore(cdk): removed deprecated property
* **docs, platform, core, cdk:** removed `replaceMode` from dnd directive, use `dropMode` instead, 'group' for true and 'shift' for false

* chore(cdk): removed dead property 'containerElement' from breadcrumb

* chore(core): removed deprecated property
* **docs, platform, core, cdk:** removed `fullScreen` property from dialog-config.class, use `mobile` instead

* chore(core): removed dead properties `checkbox` and `radio` from `[fd-form-label]`

* chore(core): removed deprecated interface
* **docs, platform, core, cdk:** type `MessageStates` is not exported from `core` anymore, use `FormStates` from `cdk` instead

* chore(core): removed deprecated directive
* **docs, platform, core, cdk:** directive `[fd-message-box-decisive-button]` has been removed, use `[fd-button-bar]` instead

* chore(core): removed deprecated directive
* **docs, platform, core, cdk:** directive `fd-message-box-footer-button` has been removed, use `[fd-button-bar]` instead

* chore(core): removed deprecated property
* **docs, platform, core, cdk:** property `directiveRef` is no more there in `PopoverComponent`

* chore(core): removed deprecated method
* **docs, platform, core, cdk:** method `updatePopover` is no more there in `PopoverComponent`, use `refreshPosition` instead

* chore(core): removed deprecated property
* **docs, platform, core, cdk:** interface `ProductSwitchItem` no more contains `image` property, use `icon` instead

* chore(core): removed deprecated type
* **docs, platform, core, cdk:** type `SelectControlState` is replaced with `FormStates` from `@fundamental-ngx/cdk/forms`

* chore(core): removed dead inputs

* chore(core): removed deprecated input
* **docs, platform, core, cdk:** input `expandButtonAriaLabel` has been removed from split button, use `coreSplitButton.expandButtonAriaLabel` i18n key instead

* chore(core): removed deprecated input
* **docs, platform, core, cdk:** input `paginationItemAriaLabel` has been removed from splitter, use `coreSplitter.paginationItemAriaLabel` i18n key instead

* chore(core): removed deprecated inputs
* **docs, platform, core, cdk:** inputs `decrementButtonTitle` and `incrementButtonTitle` are removed from `fd-step-input`, use `coreSplitter.decrementButtonTitle` and `coreSplitter.decrementButtonTitle` i18n keys instead

* chore(platform): removed deprecated input
* **docs, platform, core, cdk:** input `selectState` is removed from `fdp-select`, use `state` instead

* chore(platform): removed deprecated input
* **docs, platform, core, cdk:** input `stateType` is removed from `fdp-textarea`, use `state` instead

* chore(platform): removed deprecated input
* **docs, platform, core, cdk:** input `labelLayout` is removed from `fdp-textarea`, use `labelColumnLayout`, `fieldColumnLayout` and `gapColumnLayout` properties instead

* chore(platform): removed deprecated type
* **docs, platform, core, cdk:** type `ControlState` is removed from `platform`, use `FormStates` from `cdk/forms`

* chore(platform,docs): removed deprecated input and interface properties
* **docs, platform, core, cdk:** - removed `hintPlacement` input, use `hint.placement` instead
- removed `hint.text`, use `hint.content` instead

* chore(cdk,docs): removed deprecated `ThemesService`
* **docs, platform, core, cdk:** - removed `ThemesService`, use new `ThemingService` from `@fundamental-ngx/core/theming`

* chore(core): removed deprecated input
* **docs, platform, core, cdk:** removed `isTitle` input from `fd-bar-element`

* chore(core): removed deprecated components
* **docs, platform, core, cdk:** removed `fd-dialog-footer-button` component and `[fd-dialog-decisive-button]` directive from core-dialog, use `fd-button-bar` instead

* chore(core): removed deprecated property from interface
* **docs, platform, core, cdk:** removed `of` property from `CurrentShowing` interface in `pagination`, use `totalCount` instead

* chore(core): removed deprecated input
* **docs, platform, core, cdk:** removed `mainActionTitle` input, it is still there, just not as an input, use `MenuItemComponent`'s title component text content instead

* chore(core): removed deprecated inputs
* **docs, platform, core, cdk:** removed `semanticAcceptLabel` and `semanticDeclineLabel` inputs from `fd-switch`, use `coreSwitch.semanticAcceptLabel` and `coreSwitch.semanticDeclineLabel` i18n keys instead

* chore(core): removed deprecated input
* **docs, platform, core, cdk:** removed `ariaLabelledby` input from `fd-switch`, use `ariaLabelledBy` input instead

* chore(core): removed deprecated inputs
* **docs, platform, core, cdk:** removed `expandOverflowText` input from `fd-tab-list` and `fd-item-expand`, use `coreTabs.tabListExpandButtonText` i18n key instead

* feat: updated patch language provider type and added ability to receive the mapper

* chore(core): removed deprecated inputs
* **docs, platform, core, cdk:** removed deprecated `moreLabel` and `lessLabel` inputs, use `coreText.moreLabel` and `coreText.lessLabel` i18n keys instead

* chore(core): removed deprecated class
* **docs, platform, core, cdk:** removed deprecated `TimeI18n` class, use `coreTime` i18n keys instead

* chore(core): removed deprecated input
* **docs, platform, core, cdk:** removed deprecated `hasTitle` input from `fd-toolbar`, it is determined automatically now depending on the children or input,
if there is a `[fd-title]` in content children or it has a `title` input, it will behave as explicitly said `hasTitle` would
do before

* chore(platform): removed deprecated input
* **docs, platform, core, cdk:** removed deprecated `backButtonLabel` input from `fdp-action-bar`, use i18n's `platformActionBar.backButtonLabel` key instead

* chore(platform): removed deprecated output
* **docs, platform, core, cdk:** removed deprecated `collapseChange` output from `fdp-dynamic-page-header`, use `collapsedChange` instead

* chore(platform): removed deprecated input
* **docs, platform, core, cdk:** removed deprecated `userTitle` input from `fdp-feed-input`, use `platformFeedInput.userTitle` i18n key instead

* chore(platform): removed orphaned private properties

* chore(platform): removed deprecated outputs
* **docs, platform, core, cdk:** removed  `change` and `indeterminateChange` outputs, use `checkedChange` value instead

* chore(platform): removed deprecated inputs
* **docs, platform, core, cdk:** - removed `isBinary` input from `fdp-checkbox`, use `tristate` input if you need indeterminate instead
- removed `value` input, use `values` instead

* chore(platform): removed deprecated input and output
* **docs, platform, core, cdk:** - removed `checked` input from `fdp-checkbox-group`, use `value` input instead
- removed `checkedChange` output, use `valueChange` output instead

* chore(platform): removed deprecated input
* **docs, platform, core, cdk:** removed `labelLayout` input from `fdp-form-generator`, use `labelColumnLayout`, `fieldColumnLayout` and `gapColumnLayout` instead

* chore(platform): removed deprecated property
* **docs, platform, core, cdk:** removed `layout` property from `DynamicFormItemGuiOptions`, use `labelColumnLayout`, `fieldColumnLayout` and `gapColumnLayout` instead

* chore(platform): removed deprecated input
* **docs, platform, core, cdk:** removed `stateType` input from `fdp-file-uploader`, use `state` instead

* chore(platform): removed deprecated input
* **docs, platform, core, cdk:** removed `stateType` input from `fdp-radio-button`, use `state` instead

* chore(platform): removed deprecated inputs
* **docs, platform, core, cdk:** - removed `avatarSrc` and `avatarTitle` inputs from `BaseListItem`, which is parent for `ActionListItemComponent`, `DisplayListItemComponent`,
`FreeContentListItemComponent`, `ListGroupHeaderComponent`, `ObjectListItemComponent` and `StandardListItemComponent`, use `avatar` instead
- removed `titleIcon` input from `BaseListItem`, which is parent for `ActionListItemComponent`, `DisplayListItemComponent`,
`FreeContentListItemComponent`, `ListGroupHeaderComponent`, `ObjectListItemComponent` and `StandardListItemComponent`, use `icon` instead

* chore(core): removed deprecated inputs
* **docs, platform, core, cdk:** removed `deleteButtonLabel` and `ariaRoleDescription` inputs from `fd-token`, use `coreToken` i18n keys instead

* chore: nx format-write

* fix(platform): fixed acceptance of undefined

* fix(docs): fixed incorrect property usage

* fix: fixed e2e tests and some incorrect examples





## [0.44.1-rc.3](https://github.com/SAP/fundamental-ngx/compare/v0.44.1-rc.2...v0.44.1-rc.3) (2023-08-09)

**Note:** Version bump only for package fundamental-ngx





## [0.44.1-rc.2](https://github.com/SAP/fundamental-ngx/compare/v0.44.1-rc.1...v0.44.1-rc.2) (2023-08-07)

**Note:** Version bump only for package fundamental-ngx





## [0.44.1-rc.1](https://github.com/SAP/fundamental-ngx/compare/v0.44.1-rc.0...v0.44.1-rc.1) (2023-08-04)


### Bug Fixes

* project generator using wrong path for fn and platform ([#10301](https://github.com/SAP/fundamental-ngx/issues/10301)) ([0622175](https://github.com/SAP/fundamental-ngx/commit/0622175f68c3504c63e8ea76d357b7a44598b90e))





## [0.44.1-rc.0](https://github.com/SAP/fundamental-ngx/compare/v0.44.0...v0.44.1-rc.0) (2023-08-04)


### Features

* **cdk:** focusable item interface ([#10282](https://github.com/SAP/fundamental-ngx/issues/10282)) ([622d826](https://github.com/SAP/fundamental-ngx/commit/622d826418699533595abced5ea5b5774a9ac392))





# [0.44.0](https://github.com/SAP/fundamental-ngx/compare/v0.44.0-rc.7...v0.44.0) (2023-08-04)

**Note:** Version bump only for package fundamental-ngx





# [0.44.0-rc.7](https://github.com/SAP/fundamental-ngx/compare/v0.44.0-rc.6...v0.44.0-rc.7) (2023-08-04)

**Note:** Version bump only for package fundamental-ngx





# [0.44.0-rc.6](https://github.com/SAP/fundamental-ngx/compare/v0.44.0-rc.5...v0.44.0-rc.6) (2023-08-04)


### Bug Fixes

* removed `deprecated-decorator` ([#10294](https://github.com/SAP/fundamental-ngx/issues/10294)) ([c970974](https://github.com/SAP/fundamental-ngx/commit/c9709746ef2acb5a3daec7c197365952743ab1a1))





# [0.44.0-rc.5](https://github.com/SAP/fundamental-ngx/compare/v0.44.0-rc.4...v0.44.0-rc.5) (2023-08-03)

**Note:** Version bump only for package fundamental-ngx





# [0.44.0-rc.4](https://github.com/SAP/fundamental-ngx/compare/v0.44.0-rc.3...v0.44.0-rc.4) (2023-08-03)

**Note:** Version bump only for package fundamental-ngx





# [0.44.0-rc.3](https://github.com/SAP/fundamental-ngx/compare/v0.44.0-rc.2...v0.44.0-rc.3) (2023-08-01)

**Note:** Version bump only for package fundamental-ngx





# [0.44.0-rc.2](https://github.com/SAP/fundamental-ngx/compare/v0.44.0-rc.1...v0.44.0-rc.2) (2023-08-01)

**Note:** Version bump only for package fundamental-ngx





# [0.44.0-rc.1](https://github.com/SAP/fundamental-ngx/compare/v0.44.0-rc.0...v0.44.0-rc.1) (2023-07-31)


### Features

* **core,platform:** partial jest migration ([#10238](https://github.com/SAP/fundamental-ngx/issues/10238)) ([75130aa](https://github.com/SAP/fundamental-ngx/commit/75130aa85724060a515d99d675eb672b6d6eef6a))





# [0.44.0-rc.0](https://github.com/SAP/fundamental-ngx/compare/v0.43.2-rc.0...v0.44.0-rc.0) (2023-07-31)


### chore

* angular 16 migration ([#10093](https://github.com/SAP/fundamental-ngx/issues/10093)) ([2303ad9](https://github.com/SAP/fundamental-ngx/commit/2303ad9d07e7745c66f7c0b438e90384e3b6a14b))


### BREAKING CHANGES

* Angular v. 16.1 and Typescript v. 5.1 support





## [0.43.2-rc.0](https://github.com/SAP/fundamental-ngx/compare/v0.43.1-rc.0...v0.43.2-rc.0) (2023-07-28)

**Note:** Version bump only for package fundamental-ngx





## [0.43.1-rc.0](https://github.com/SAP/fundamental-ngx/compare/v0.43.0...v0.43.1-rc.0) (2023-07-28)

**Note:** Version bump only for package fundamental-ngx





# [0.43.0](https://github.com/SAP/fundamental-ngx/compare/v0.43.0-rc.30...v0.43.0) (2023-07-28)

**Note:** Version bump only for package fundamental-ngx





# [0.43.0-rc.30](https://github.com/SAP/fundamental-ngx/compare/v0.43.0-rc.29...v0.43.0-rc.30) (2023-07-28)


### Bug Fixes

* **platform:** add new strings for platform table single selection cells ([#10235](https://github.com/SAP/fundamental-ngx/issues/10235)) ([3593d90](https://github.com/SAP/fundamental-ngx/commit/3593d90c8cc2184ce393dfd7ed2271c475fce63f))





# [0.43.0-rc.29](https://github.com/SAP/fundamental-ngx/compare/v0.43.0-rc.28...v0.43.0-rc.29) (2023-07-28)


### Features

* **core:** form message popover placement ([#10231](https://github.com/SAP/fundamental-ngx/issues/10231)) ([90bc352](https://github.com/SAP/fundamental-ngx/commit/90bc3529acfc675a28167322b239b6a51440a8de))





# [0.43.0-rc.28](https://github.com/SAP/fundamental-ngx/compare/v0.43.0-rc.27...v0.43.0-rc.28) (2023-07-27)


### Bug Fixes

* **core:** provided wizard service ([#10233](https://github.com/SAP/fundamental-ngx/issues/10233)) ([92735ef](https://github.com/SAP/fundamental-ngx/commit/92735efc033f68efeaebbebd1fdd7c44e854a216))





# [0.43.0-rc.27](https://github.com/SAP/fundamental-ngx/compare/v0.43.0-rc.26...v0.43.0-rc.27) (2023-07-27)


### Bug Fixes

* **docs:** i18n example sources ([#10232](https://github.com/SAP/fundamental-ngx/issues/10232)) ([918bdfb](https://github.com/SAP/fundamental-ngx/commit/918bdfbde85d886d67e0e90fede88e6798d8ceed))





# [0.43.0-rc.26](https://github.com/SAP/fundamental-ngx/compare/v0.43.0-rc.25...v0.43.0-rc.26) (2023-07-26)


### Bug Fixes

* **platform:** add missing labels ([#10229](https://github.com/SAP/fundamental-ngx/issues/10229)) ([13756fd](https://github.com/SAP/fundamental-ngx/commit/13756fd702c1e2f93564562d7c7f2c7f5fb56ba4))





# [0.43.0-rc.25](https://github.com/SAP/fundamental-ngx/compare/v0.43.0-rc.24...v0.43.0-rc.25) (2023-07-26)


### Bug Fixes

* **docs:** highlight async content ([#10227](https://github.com/SAP/fundamental-ngx/issues/10227)) ([369af39](https://github.com/SAP/fundamental-ngx/commit/369af39ba9f38574c2ae6793cedfdad4b0c9bbcc))





# [0.43.0-rc.24](https://github.com/SAP/fundamental-ngx/compare/v0.43.0-rc.23...v0.43.0-rc.24) (2023-07-26)


### Bug Fixes

* **core:** correct icon placement ([#10228](https://github.com/SAP/fundamental-ngx/issues/10228)) ([f7927a6](https://github.com/SAP/fundamental-ngx/commit/f7927a66d4cfebb7ed9d20b362d7d86e5d84a5d0))





# [0.43.0-rc.23](https://github.com/SAP/fundamental-ngx/compare/v0.43.0-rc.22...v0.43.0-rc.23) (2023-07-26)


### Bug Fixes

* **core:** only apply the animation/transition to the switch when the… ([#10200](https://github.com/SAP/fundamental-ngx/issues/10200)) ([0118c58](https://github.com/SAP/fundamental-ngx/commit/0118c5853b65afa1ec15562b1fe7fcc3ef004555))





# [0.43.0-rc.22](https://github.com/SAP/fundamental-ngx/compare/v0.43.0-rc.21...v0.43.0-rc.22) (2023-07-26)


### Bug Fixes

* **platform:** interpolation adding whitespace to table text ([#10223](https://github.com/SAP/fundamental-ngx/issues/10223)) ([71f8d07](https://github.com/SAP/fundamental-ngx/commit/71f8d0775507f3630ac588ea81842dcb84439815))





# [0.43.0-rc.21](https://github.com/SAP/fundamental-ngx/compare/v0.43.0-rc.20...v0.43.0-rc.21) (2023-07-26)


### Bug Fixes

* add focusAutoCapture to table popover ([#10226](https://github.com/SAP/fundamental-ngx/issues/10226)) ([65640e7](https://github.com/SAP/fundamental-ngx/commit/65640e7945d46b606ebd2542fc67f12b9e743d45))





# [0.43.0-rc.20](https://github.com/SAP/fundamental-ngx/compare/v0.43.0-rc.19...v0.43.0-rc.20) (2023-07-25)


### Bug Fixes

* **core,platform:** remove the i18n files for not translated languages ([#10225](https://github.com/SAP/fundamental-ngx/issues/10225)) ([f6a19f7](https://github.com/SAP/fundamental-ngx/commit/f6a19f79c8304d7518ee8f24a27caab42dfc6f34))


### BREAKING CHANGES

* **core,platform:** remove English placeholder files for Arabic, Belarusian, Croatian, German, Portuguese, Romanian, Sinhala, Spanish as the translation is missing





# [0.43.0-rc.19](https://github.com/SAP/fundamental-ngx/compare/v0.43.0-rc.18...v0.43.0-rc.19) (2023-07-25)


### Bug Fixes

* **docs:** dayjs datetime adapter docs ([#10220](https://github.com/SAP/fundamental-ngx/issues/10220)) ([06aaa26](https://github.com/SAP/fundamental-ngx/commit/06aaa26777e81268e849c97a44741eb523641e14))





# [0.43.0-rc.18](https://github.com/SAP/fundamental-ngx/compare/v0.43.0-rc.17...v0.43.0-rc.18) (2023-07-24)


### Bug Fixes

* **core:** only stop propagation of scroll in the popover ([#10195](https://github.com/SAP/fundamental-ngx/issues/10195)) ([71ef496](https://github.com/SAP/fundamental-ngx/commit/71ef496a5a63411a8ab609d00246b8d951a727c2))





# [0.43.0-rc.17](https://github.com/SAP/fundamental-ngx/compare/v0.43.0-rc.16...v0.43.0-rc.17) (2023-07-24)

**Note:** Version bump only for package fundamental-ngx





# [0.43.0-rc.16](https://github.com/SAP/fundamental-ngx/compare/v0.43.0-rc.15...v0.43.0-rc.16) (2023-07-20)


### Bug Fixes

* **platform:** update tablerows index ([#10191](https://github.com/SAP/fundamental-ngx/issues/10191)) ([53d4ad7](https://github.com/SAP/fundamental-ngx/commit/53d4ad7eda3c740129f739b1478f266a1951acf6))





# [0.43.0-rc.15](https://github.com/SAP/fundamental-ngx/compare/v0.43.0-rc.14...v0.43.0-rc.15) (2023-07-19)


### Bug Fixes

* **platform:** preserves table scrolling position ([#10098](https://github.com/SAP/fundamental-ngx/issues/10098)) ([ef240ff](https://github.com/SAP/fundamental-ngx/commit/ef240ffc6bc1a1330c98eb788f314b466daa17b0))





# [0.43.0-rc.14](https://github.com/SAP/fundamental-ngx/compare/v0.43.0-rc.13...v0.43.0-rc.14) (2023-07-19)


### Bug Fixes

* **core:** add option to focus first focusable element in tab panel when using stacked tabs ([#10193](https://github.com/SAP/fundamental-ngx/issues/10193)) ([e50b451](https://github.com/SAP/fundamental-ngx/commit/e50b451c6de99db2aa1bf68ebddac29f9ccdcb72))





# [0.43.0-rc.13](https://github.com/SAP/fundamental-ngx/compare/v0.43.0-rc.12...v0.43.0-rc.13) (2023-07-17)


### Bug Fixes

* **core:** remove manual change detection from dialog container ([#10170](https://github.com/SAP/fundamental-ngx/issues/10170)) ([f350bd0](https://github.com/SAP/fundamental-ngx/commit/f350bd00c7afed61ac51d0d675a388af1a4d9ea5))





# [0.43.0-rc.12](https://github.com/SAP/fundamental-ngx/compare/v0.43.0-rc.11...v0.43.0-rc.12) (2023-07-13)


### Bug Fixes

* **platform:** various fixes for platform table ([#10164](https://github.com/SAP/fundamental-ngx/issues/10164)) ([82c39c3](https://github.com/SAP/fundamental-ngx/commit/82c39c3ad7415037bfa5860b563e4d33503d75ce))





# [0.43.0-rc.11](https://github.com/SAP/fundamental-ngx/compare/v0.43.0-rc.10...v0.43.0-rc.11) (2023-07-13)


### Bug Fixes

* **platform:** remove aria-labelledby from platform table header cells ([#10157](https://github.com/SAP/fundamental-ngx/issues/10157)) ([41877a3](https://github.com/SAP/fundamental-ngx/commit/41877a3ff4541623d32f0913c261961614d9080e))





# [0.43.0-rc.10](https://github.com/SAP/fundamental-ngx/compare/v0.43.0-rc.9...v0.43.0-rc.10) (2023-07-13)


### Bug Fixes

* **platform:** table console error ([#10163](https://github.com/SAP/fundamental-ngx/issues/10163)) ([3228343](https://github.com/SAP/fundamental-ngx/commit/3228343906f527c1f2b0455ba582af6bc6f7d91f))





# [0.43.0-rc.9](https://github.com/SAP/fundamental-ngx/compare/v0.43.0-rc.8...v0.43.0-rc.9) (2023-07-13)


### Bug Fixes

* **docs,core,platform:** various fixes from deffect hunt ([#10168](https://github.com/SAP/fundamental-ngx/issues/10168)) ([00b858b](https://github.com/SAP/fundamental-ngx/commit/00b858bcfb1a1e6963c36a7d768fe9dcf100a135))





# [0.43.0-rc.8](https://github.com/SAP/fundamental-ngx/compare/v0.43.0-rc.7...v0.43.0-rc.8) (2023-07-13)


### Bug Fixes

* **platform:** fixed table sort rules update ([#10167](https://github.com/SAP/fundamental-ngx/issues/10167)) ([457bfac](https://github.com/SAP/fundamental-ngx/commit/457bfac0dab855012614a02c802366c296479ab5))





# [0.43.0-rc.7](https://github.com/SAP/fundamental-ngx/compare/v0.43.0-rc.6...v0.43.0-rc.7) (2023-07-12)


### Bug Fixes

* **core:** carousel not updating when slide count changes ([#10153](https://github.com/SAP/fundamental-ngx/issues/10153)) ([32e0eae](https://github.com/SAP/fundamental-ngx/commit/32e0eaeb96de4e31f82cbd23f11b0dc79eccc3c0))





# [0.43.0-rc.6](https://github.com/SAP/fundamental-ngx/compare/v0.43.0-rc.5...v0.43.0-rc.6) (2023-07-12)

**Note:** Version bump only for package fundamental-ngx





# [0.43.0-rc.5](https://github.com/SAP/fundamental-ngx/compare/v0.43.0-rc.4...v0.43.0-rc.5) (2023-07-12)

**Note:** Version bump only for package fundamental-ngx





# [0.43.0-rc.4](https://github.com/SAP/fundamental-ngx/compare/v0.43.0-rc.3...v0.43.0-rc.4) (2023-07-11)



# [0.43.0-rc.3](https://github.com/SAP/fundamental-ngx/compare/v0.43.0-rc.2...v0.43.0-rc.3) (2023-07-10)


### Bug Fixes

* **core:** redundant popover open/close/event things ([#10063](https://github.com/SAP/fundamental-ngx/issues/10063)) ([6c5b4ca](https://github.com/SAP/fundamental-ngx/commit/6c5b4ca4aa1e30a6d714168f9078962c84ddba79))



# [0.43.0-rc.2](https://github.com/SAP/fundamental-ngx/compare/v0.43.0-rc.1...v0.43.0-rc.2) (2023-07-10)


### Bug Fixes

* fixed sap-component generator ([#10150](https://github.com/SAP/fundamental-ngx/issues/10150)) ([ec62a02](https://github.com/SAP/fundamental-ngx/commit/ec62a020a3c86e8f39b5494f6879766df74875a9))



# [0.43.0-rc.1](https://github.com/SAP/fundamental-ngx/compare/v0.43.0-rc.0...v0.43.0-rc.1) (2023-07-10)


### Bug Fixes

* **platform:** table expand all event ([#10136](https://github.com/SAP/fundamental-ngx/issues/10136)) ([c224315](https://github.com/SAP/fundamental-ngx/commit/c22431594acf80bd44a82023db51fdd14dd78f00))



# [0.43.0-rc.0](https://github.com/SAP/fundamental-ngx/compare/v0.42.1-rc.15...v0.43.0-rc.0) (2023-07-07)


### chore

* **deps:** update theming-base-content v.11.5.0 ([#10120](https://github.com/SAP/fundamental-ngx/issues/10120)) ([e61a532](https://github.com/SAP/fundamental-ngx/commit/e61a5328878180285a0ee279a604fdeab881cd79))


### BREAKING CHANGES

* **deps:** SAP-Icons: icon name changed from `clinical-tast-tracker` to `clinical-task-tracker`



## [0.42.1-rc.15](https://github.com/SAP/fundamental-ngx/compare/v0.42.1-rc.14...v0.42.1-rc.15) (2023-07-06)


### Bug Fixes

* **platform:** table checkbox space scroll bug ([#10129](https://github.com/SAP/fundamental-ngx/issues/10129)) ([0f3f03f](https://github.com/SAP/fundamental-ngx/commit/0f3f03f64c3c4a8f7f613c19b1031f20f9fb1ee1))



## [0.42.1-rc.14](https://github.com/SAP/fundamental-ngx/compare/v0.42.1-rc.13...v0.42.1-rc.14) (2023-07-05)


### Features

* **core:** added select all toggler to the multi combo box ([#9876](https://github.com/SAP/fundamental-ngx/issues/9876)) ([66476d9](https://github.com/SAP/fundamental-ngx/commit/66476d93eabb6eb0a4090cd6bf01ad3ee30d24dc))



## [0.42.1-rc.13](https://github.com/SAP/fundamental-ngx/compare/v0.42.1-rc.12...v0.42.1-rc.13) (2023-07-04)


### Bug Fixes

* **platform:** add aria-description for select all checkbox ([#10100](https://github.com/SAP/fundamental-ngx/issues/10100)) ([58e1567](https://github.com/SAP/fundamental-ngx/commit/58e1567e49404f3d836a7597274c36ddaa4f08a5))



## [0.42.1-rc.12](https://github.com/SAP/fundamental-ngx/compare/v0.42.1-rc.11...v0.42.1-rc.12) (2023-07-04)



## [0.42.1-rc.11](https://github.com/SAP/fundamental-ngx/compare/v0.42.1-rc.10...v0.42.1-rc.11) (2023-06-30)


### Features

* **platform,core:** custom title and subtitle template for dynamic page ([#10065](https://github.com/SAP/fundamental-ngx/issues/10065)) ([6cd0daa](https://github.com/SAP/fundamental-ngx/commit/6cd0daa1e48b4e9d26b25ccb0fc36d044a3fc40a))



## [0.42.1-rc.10](https://github.com/SAP/fundamental-ngx/compare/v0.42.1-rc.9...v0.42.1-rc.10) (2023-06-29)


### Bug Fixes

* **docs:** placeimg is shutting down so new placeholder site ([#10061](https://github.com/SAP/fundamental-ngx/issues/10061)) ([9a8a4d1](https://github.com/SAP/fundamental-ngx/commit/9a8a4d10469e775094f1fe43cd30580ca307fc73))



## [0.42.1-rc.9](https://github.com/SAP/fundamental-ngx/compare/v0.42.1-rc.8...v0.42.1-rc.9) (2023-06-29)


### Bug Fixes

* **platform:** table tbody focus ([#10102](https://github.com/SAP/fundamental-ngx/issues/10102)) ([5aec926](https://github.com/SAP/fundamental-ngx/commit/5aec926b652ebf1397c0efb56291a93fea373cb4))



## [0.42.1-rc.8](https://github.com/SAP/fundamental-ngx/compare/v0.42.1-rc.7...v0.42.1-rc.8) (2023-06-29)


### Bug Fixes

* **cdk,core,platform:** circular dependencies ([#10099](https://github.com/SAP/fundamental-ngx/issues/10099)) ([5fc2e54](https://github.com/SAP/fundamental-ngx/commit/5fc2e5481197bfb2fa709ebe21a08c510cf40f41))
* **cdk:** fix import path ([#10103](https://github.com/SAP/fundamental-ngx/issues/10103)) ([5f1e74d](https://github.com/SAP/fundamental-ngx/commit/5f1e74d07f68144f4fa726e1c442840acd7fbdc2))



## [0.42.1-rc.7](https://github.com/SAP/fundamental-ngx/compare/v0.42.1-rc.6...v0.42.1-rc.7) (2023-06-28)


### Bug Fixes

* dayjs adapter was enforcing double digits for month and day ([#10096](https://github.com/SAP/fundamental-ngx/issues/10096)) ([4932c63](https://github.com/SAP/fundamental-ngx/commit/4932c63525df26e6cfd0195320dcc53aac9eab79))



## [0.42.1-rc.6](https://github.com/SAP/fundamental-ngx/compare/v0.42.1-rc.5...v0.42.1-rc.6) (2023-06-28)


### Bug Fixes

* **platform:** fix expand all functionality ([#10097](https://github.com/SAP/fundamental-ngx/issues/10097)) ([76651de](https://github.com/SAP/fundamental-ngx/commit/76651de19cf2a983a5933796ba9161a4bdc47171))



## [0.42.1-rc.5](https://github.com/SAP/fundamental-ngx/compare/v0.42.1-rc.4...v0.42.1-rc.5) (2023-06-27)


### Bug Fixes

* **core:** add the correct styling for Select placeholder ([#10092](https://github.com/SAP/fundamental-ngx/issues/10092)) ([55c020b](https://github.com/SAP/fundamental-ngx/commit/55c020bfc746b508748c2fcbf018f367e4687e7c))



## [0.42.1-rc.4](https://github.com/SAP/fundamental-ngx/compare/v0.42.1-rc.3...v0.42.1-rc.4) (2023-06-27)


### Bug Fixes

* **core,platform:** update multi input aria-label ([#10071](https://github.com/SAP/fundamental-ngx/issues/10071)) ([28bacc5](https://github.com/SAP/fundamental-ngx/commit/28bacc5b9af59db086aebf26af19b0707a7632b0))



## [0.42.1-rc.3](https://github.com/SAP/fundamental-ngx/compare/v0.42.1-rc.2...v0.42.1-rc.3) (2023-06-27)



## [0.42.1-rc.2](https://github.com/SAP/fundamental-ngx/compare/v0.42.1-rc.1...v0.42.1-rc.2) (2023-06-27)


### Features

* **platform:** table children lazy load ([#10072](https://github.com/SAP/fundamental-ngx/issues/10072)) ([1360219](https://github.com/SAP/fundamental-ngx/commit/1360219a6d16d1777cb04400f3bea509f01590ff))



## [0.42.1-rc.1](https://github.com/SAP/fundamental-ngx/compare/v0.42.1-rc.0...v0.42.1-rc.1) (2023-06-27)


### Bug Fixes

* **platform:** preserved state fixes ([#10084](https://github.com/SAP/fundamental-ngx/issues/10084)) ([8fd1826](https://github.com/SAP/fundamental-ngx/commit/8fd182689ca4adf1b26e40100889db85c0fd2c54))



## [0.42.1-rc.0](https://github.com/SAP/fundamental-ngx/compare/v0.42.0...v0.42.1-rc.0) (2023-06-26)



# [0.42.0](https://github.com/SAP/fundamental-ngx/compare/v0.42.0-rc.31...v0.42.0) (2023-06-26)



# [0.42.0-rc.31](https://github.com/SAP/fundamental-ngx/compare/v0.42.0-rc.30...v0.42.0-rc.31) (2023-06-21)



# [0.42.0-rc.30](https://github.com/SAP/fundamental-ngx/compare/v0.42.0-rc.29...v0.42.0-rc.30) (2023-06-21)


### Bug Fixes

* **core:** bug where token would not be removed from mobile mode ([#10056](https://github.com/SAP/fundamental-ngx/issues/10056)) ([871d69b](https://github.com/SAP/fundamental-ngx/commit/871d69b3709ef402bd93f4422b9f95b6cf6072da))



# [0.42.0-rc.29](https://github.com/SAP/fundamental-ngx/compare/v0.42.0-rc.28...v0.42.0-rc.29) (2023-06-21)


### Bug Fixes

* **core:** selecting only date and not time and pressing OK does not set date ([#10053](https://github.com/SAP/fundamental-ngx/issues/10053)) ([0256e9d](https://github.com/SAP/fundamental-ngx/commit/0256e9d47be50597a03a684cfecbb998ba3e923b))



# [0.42.0-rc.28](https://github.com/SAP/fundamental-ngx/compare/v0.42.0-rc.27...v0.42.0-rc.28) (2023-06-21)


### Bug Fixes

* **core:** new checkbox hidden element for a11y ([#10038](https://github.com/SAP/fundamental-ngx/issues/10038)) ([779c92b](https://github.com/SAP/fundamental-ngx/commit/779c92bcccaa535aa8132c7cf8ae9204aaec3990))



# [0.42.0-rc.27](https://github.com/SAP/fundamental-ngx/compare/v0.42.0-rc.26...v0.42.0-rc.27) (2023-06-20)


### Features

* **core:** message strip alert implementation ([#9989](https://github.com/SAP/fundamental-ngx/issues/9989)) ([7aad43d](https://github.com/SAP/fundamental-ngx/commit/7aad43d8112aa11c1436d2436d25a1451e5c971d))



# [0.42.0-rc.26](https://github.com/SAP/fundamental-ngx/compare/v0.42.0-rc.25...v0.42.0-rc.26) (2023-06-20)



# [0.42.0-rc.25](https://github.com/SAP/fundamental-ngx/compare/v0.42.0-rc.24...v0.42.0-rc.25) (2023-06-20)


### Bug Fixes

* **core:** tokenizer bug when removing tokens ([#10054](https://github.com/SAP/fundamental-ngx/issues/10054)) ([23e6c5f](https://github.com/SAP/fundamental-ngx/commit/23e6c5f69a494850e8363af1a551cb29abacd03b))



# [0.42.0-rc.24](https://github.com/SAP/fundamental-ngx/compare/v0.42.0-rc.23...v0.42.0-rc.24) (2023-06-16)


### Bug Fixes

* **core:** localize combobox addon button ([#10033](https://github.com/SAP/fundamental-ngx/issues/10033)) ([53846da](https://github.com/SAP/fundamental-ngx/commit/53846da173901b035aac0ca1f6701f54ebe5c5c7))



# [0.42.0-rc.23](https://github.com/SAP/fundamental-ngx/compare/v0.42.0-rc.22...v0.42.0-rc.23) (2023-06-15)


### Bug Fixes

* **cdk:** if row is not focusable, focus first cell ([#10032](https://github.com/SAP/fundamental-ngx/issues/10032)) ([58c9687](https://github.com/SAP/fundamental-ngx/commit/58c96879ee86480b6c82db4a9810f8e9b4b98bab))



# [0.42.0-rc.22](https://github.com/SAP/fundamental-ngx/compare/v0.42.0-rc.21...v0.42.0-rc.22) (2023-06-14)



# [0.42.0-rc.21](https://github.com/SAP/fundamental-ngx/compare/v0.42.0-rc.20...v0.42.0-rc.21) (2023-06-14)


### Features

* **platform:** table optimisation ([#9991](https://github.com/SAP/fundamental-ngx/issues/9991)) ([d2476c6](https://github.com/SAP/fundamental-ngx/commit/d2476c6af59be9e3f538d3eea6e7f79bd9f61a2f))


### BREAKING CHANGES

* **platform:** **Components that rely on `HasElementRef` interface:**

- `HasElementRef` interface has been changed. Now instead of `elementRef()` method, components should have `elementRef: ElementRef` property. This can include getters too;

**Core table:**

- `TableCellDirective` now directly extends from `FocusableItemDirective`. Previously it had `FocusableItemDirective` as a host directive applied to itself;

**Platform table:**

- All directives, services, models, data source classes are moved from `@fundamental-ngx/platform/table` into a separate package `@fundamental-ngx/platform/table-helpers`. To keep backwards compatibility, `@fundamental-ngx/platform/table` re-exports `@fundamental-ngx/platform/table-helpers` so that the import paths are the same as before;
- Platform table directives are standalone now;
- Platform table data-source related functionality has been moved to `TableDataSourceDirective` standalone directive. Input properties are preserved;
- Platform table drag&drop related functionality has been moved to `TableDraggableDirective` standalone directive. Input properties are preserved;
- Platform table initial state related functionality has been moved to `TableInitialStateDirective` standalone directive. Input properties are preserved;
- Platform table virtual scroll related functionality has been moved to `TableVirtualScrollDirective` standalone directive. Input properties are preserved;
- Platform table data source has been refactored to utilize `@fundamental-ngx/cdk/data-source` implementation. Backwards compatibility is preserved for classes that extend from data-source/data-provider. More complex classes may need to be refactored according to new class signature;
- Platform table now uses `TableRowImpl` class as implementation of `TableRow` interface instead of simple object;
- Helper methods from TableComponent has been moved to a standalone functions;
- `SearchInput` type is now not re-exported from `@fundamental-ngx/platform/table`. Instead use `@fundamental-ngx/platform/search-field`;
- Table component html is now split between logical parts: table, table header rows, table content rows. Resulting markup is not changed, but the business logic parts are being moved to appropriate components;
- Platform table rows now try to reuse the html element they bounded to. This means that if developers use reference to elementRef of the row, and rows array changes, they need to manually recalculate the reference to the element;
- Platform table group row: text pattern changed from {{ column.name }} : {{ column.value }} to {{ column.name }}: {{ column.value }}. Space before colon has been removed;
- Platform table input properties recalculation now more efficient. Previously we checked property value on every `mousemove`, now, only when something inside the table itself is changed. This may require additional detectChanges calls from developers who are using Platform Table.
- Such input properties has been removed from platform table class:
  - `dataSource `- setter available via `fdp-table[dataSource]` but class property now accessible from `_dataSourceDirective` property of Table component;
  -  `state`, `initialVisibleColumns`, `initialSortBy`, `initialFilterBy`, `initialGroupBy`, `initialPage` setters available via `fdp-table[property]` but the class property now accessible from `initialState` property of Table component;
  - `isTreeTable`, `enableRowReordering`, `dropMode` setters available via `fdp-table[property]` but the class property now accessible via `_dndTableDirective` property of Table component;
  - `virtualScroll`, `renderAhead` setter available via `fdp-table[virtualScroll]`, but the class property now accessible via `_virtualScrollDirective` property of Table component;
- Such events has been removed from Platform Table class:
  - `rowsRearrange` - listener still available via `fdp-table(rowsRearrange)`, but actual eventEmitter is now located in `_dndTableDirective` property of Table component;
  - `onDataRequested`, `onDataReceived` - listeners still available via `fdp-table(event)`, but actual eventEmitters are now located in `_dataSourceDirective` property of Table component;
- Private API changed. For more information refer to [this PR](https://github.com/SAP/fundamental-ngx/pull/9991)



# [0.42.0-rc.20](https://github.com/SAP/fundamental-ngx/compare/v0.42.0-rc.19...v0.42.0-rc.20) (2023-06-13)


### Bug Fixes

* **core:** select should have listbox role ([#9986](https://github.com/SAP/fundamental-ngx/issues/9986)) ([3bb5ab0](https://github.com/SAP/fundamental-ngx/commit/3bb5ab042548d829bd61766d309717b827ba273f))



# [0.42.0-rc.19](https://github.com/SAP/fundamental-ngx/compare/v0.42.0-rc.18...v0.42.0-rc.19) (2023-06-13)


### Bug Fixes

* **core:** add label for multi input ([#9972](https://github.com/SAP/fundamental-ngx/issues/9972)) ([199c5dd](https://github.com/SAP/fundamental-ngx/commit/199c5dde12f2a608c0b36ecbb59cdee302b83753))



# [0.42.0-rc.18](https://github.com/SAP/fundamental-ngx/compare/v0.42.0-rc.17...v0.42.0-rc.18) (2023-06-13)


### Bug Fixes

* **docs:** remove display none spans from inline help docs ([#10005](https://github.com/SAP/fundamental-ngx/issues/10005)) ([f307937](https://github.com/SAP/fundamental-ngx/commit/f3079372cb9ebdc86e365847e9cf586abb13ce1c))



# [0.42.0-rc.17](https://github.com/SAP/fundamental-ngx/compare/v0.42.0-rc.16...v0.42.0-rc.17) (2023-06-12)


### Bug Fixes

* **core:** update 72 Bold font name ([#9971](https://github.com/SAP/fundamental-ngx/issues/9971)) ([26fb2f6](https://github.com/SAP/fundamental-ngx/commit/26fb2f6be40c10420b04c605b6173d7abc43bc57))



# [0.42.0-rc.16](https://github.com/SAP/fundamental-ngx/compare/v0.42.0-rc.15...v0.42.0-rc.16) (2023-06-09)


### Bug Fixes

* **docs:** sidebar container css bug ([#10006](https://github.com/SAP/fundamental-ngx/issues/10006)) ([8a635a6](https://github.com/SAP/fundamental-ngx/commit/8a635a65098a6e1fe532a385e78b39b1c2ce30d6))



# [0.42.0-rc.15](https://github.com/SAP/fundamental-ngx/compare/v0.42.0-rc.14...v0.42.0-rc.15) (2023-06-09)


### Bug Fixes

* **platform:** do not set aria-expanded for table cells that do not expand ([#10007](https://github.com/SAP/fundamental-ngx/issues/10007)) ([030954c](https://github.com/SAP/fundamental-ngx/commit/030954c7eedfa990bbfc57a5949e8a3264786c62))



# [0.42.0-rc.14](https://github.com/SAP/fundamental-ngx/compare/v0.42.0-rc.13...v0.42.0-rc.14) (2023-06-07)


### Bug Fixes

* **core:** template based inline help was not setting screenreader element ([#9985](https://github.com/SAP/fundamental-ngx/issues/9985)) ([e041216](https://github.com/SAP/fundamental-ngx/commit/e0412166cff8f9441f14254cc41f403c3479299b))



# [0.42.0-rc.13](https://github.com/SAP/fundamental-ngx/compare/v0.42.0-rc.12...v0.42.0-rc.13) (2023-06-06)


### Bug Fixes

* **platform:** add Tooltip header update ([#9947](https://github.com/SAP/fundamental-ngx/issues/9947)) ([c989f73](https://github.com/SAP/fundamental-ngx/commit/c989f7326d690e77d7579b02ee22c5cc7736d8ba))



# [0.42.0-rc.12](https://github.com/SAP/fundamental-ngx/compare/v0.42.0-rc.11...v0.42.0-rc.12) (2023-06-06)


### Bug Fixes

* **platform:** do not  use fdkClicked ([#9987](https://github.com/SAP/fundamental-ngx/issues/9987)) ([a5621ad](https://github.com/SAP/fundamental-ngx/commit/a5621adf3c6af0816754f39af13dc6470f26f073))



# [0.42.0-rc.11](https://github.com/SAP/fundamental-ngx/compare/v0.42.0-rc.10...v0.42.0-rc.11) (2023-06-06)


### Bug Fixes

* **core:** added blocking of the document scroll when dialog is open ([#9948](https://github.com/SAP/fundamental-ngx/issues/9948)) ([4f8093f](https://github.com/SAP/fundamental-ngx/commit/4f8093f7ff6c3b55593e4f751c83c1b17c8ebb1a))



# [0.42.0-rc.10](https://github.com/SAP/fundamental-ngx/compare/v0.42.0-rc.9...v0.42.0-rc.10) (2023-06-05)



# [0.42.0-rc.9](https://github.com/SAP/fundamental-ngx/compare/v0.42.0-rc.8...v0.42.0-rc.9) (2023-06-05)



# [0.42.0-rc.8](https://github.com/SAP/fundamental-ngx/compare/v0.42.0-rc.7...v0.42.0-rc.8) (2023-06-05)


### Bug Fixes

* **core:** fixed popover arrow placement ([#9946](https://github.com/SAP/fundamental-ngx/issues/9946)) ([b7d5cb6](https://github.com/SAP/fundamental-ngx/commit/b7d5cb618e93449cb77553cfbe2836d2b35deef4))



# [0.42.0-rc.7](https://github.com/SAP/fundamental-ngx/compare/v0.42.0-rc.6...v0.42.0-rc.7) (2023-06-02)


### Bug Fixes

* **core:** escape key when using focusable grid closes dialog ([#9962](https://github.com/SAP/fundamental-ngx/issues/9962)) ([3508177](https://github.com/SAP/fundamental-ngx/commit/3508177b0c2dfdc731c44dc05aebf4d70bef917f))



# [0.42.0-rc.6](https://github.com/SAP/fundamental-ngx/compare/v0.42.0-rc.5...v0.42.0-rc.6) (2023-06-02)


### Bug Fixes

* **core:** multi input, various fixes and doc updates ([#9961](https://github.com/SAP/fundamental-ngx/issues/9961)) ([6faa0bc](https://github.com/SAP/fundamental-ngx/commit/6faa0bc349e8587cf7af86ed6deddd2e9529a2ad))



# [0.42.0-rc.5](https://github.com/SAP/fundamental-ngx/compare/v0.42.0-rc.4...v0.42.0-rc.5) (2023-06-02)


### Bug Fixes

* **core:** select focus on page load bug ([#9969](https://github.com/SAP/fundamental-ngx/issues/9969)) ([38da804](https://github.com/SAP/fundamental-ngx/commit/38da804e5674ac905139bf0550644367683cc7cb))



# [0.42.0-rc.4](https://github.com/SAP/fundamental-ngx/compare/v0.42.0-rc.3...v0.42.0-rc.4) (2023-06-02)



# [0.42.0-rc.3](https://github.com/SAP/fundamental-ngx/compare/v0.42.0-rc.2...v0.42.0-rc.3) (2023-06-01)


### Bug Fixes

* **platform:** add rowheader role input option ([#9956](https://github.com/SAP/fundamental-ngx/issues/9956)) ([e1cddff](https://github.com/SAP/fundamental-ngx/commit/e1cddffee3f033348ab437ea07ef1beaf1577514))



# [0.42.0-rc.2](https://github.com/SAP/fundamental-ngx/compare/v0.42.0-rc.1...v0.42.0-rc.2) (2023-06-01)


### Bug Fixes

* **core:** list accessibility updates ([#9883](https://github.com/SAP/fundamental-ngx/issues/9883)) ([8c57d08](https://github.com/SAP/fundamental-ngx/commit/8c57d08208f9ceaf187e025cabf4e19509d0181d))



# [0.42.0-rc.1](https://github.com/SAP/fundamental-ngx/compare/v0.42.0-rc.0...v0.42.0-rc.1) (2023-05-31)



# [0.42.0-rc.0](https://github.com/SAP/fundamental-ngx/compare/v0.41.1-rc.9...v0.42.0-rc.0) (2023-05-30)


### Features

* **cdk,platform:** dnd predicate ([#9921](https://github.com/SAP/fundamental-ngx/issues/9921)) ([402b8b5](https://github.com/SAP/fundamental-ngx/commit/402b8b5deee3284e9e2a5bb5a6b1327e82714b81))


### BREAKING CHANGES

* **cdk,platform:** Moved async-strategy from @fundamental-ngx/platform/shared to @fundamental-ngx/cdk/utils;



## [0.41.1-rc.9](https://github.com/SAP/fundamental-ngx/compare/v0.41.1-rc.8...v0.41.1-rc.9) (2023-05-26)



## [0.41.1-rc.8](https://github.com/SAP/fundamental-ngx/compare/v0.41.1-rc.7...v0.41.1-rc.8) (2023-05-25)


### Bug Fixes

* **core:** inline help hidden element for screenreaders ([#9822](https://github.com/SAP/fundamental-ngx/issues/9822)) ([dad5d7f](https://github.com/SAP/fundamental-ngx/commit/dad5d7fbd70eb1b46b57b652096650a82ab3f036))



## [0.41.1-rc.7](https://github.com/SAP/fundamental-ngx/compare/v0.41.1-rc.6...v0.41.1-rc.7) (2023-05-24)


### Features

* **platform,docs:** table preserved state ([#9907](https://github.com/SAP/fundamental-ngx/issues/9907)) ([640f78b](https://github.com/SAP/fundamental-ngx/commit/640f78b276011ef957241936f761bb11e92906ef))



## [0.41.1-rc.6](https://github.com/SAP/fundamental-ngx/compare/v0.41.1-rc.5...v0.41.1-rc.6) (2023-05-23)


### Bug Fixes

* **core:** hardcode table css prop ([#9918](https://github.com/SAP/fundamental-ngx/issues/9918)) ([dd31f21](https://github.com/SAP/fundamental-ngx/commit/dd31f21d34f1a09cc8d3fabc81fe8e8f45303b47))



## [0.41.1-rc.5](https://github.com/SAP/fundamental-ngx/compare/v0.41.1-rc.4...v0.41.1-rc.5) (2023-05-23)


### Bug Fixes

* **platform:** remove live announcer from platform table ([#9885](https://github.com/SAP/fundamental-ngx/issues/9885)) ([63f4777](https://github.com/SAP/fundamental-ngx/commit/63f4777768401d61b3713f58bff6d35d4a963902))



## [0.41.1-rc.4](https://github.com/SAP/fundamental-ngx/compare/v0.41.1-rc.3...v0.41.1-rc.4) (2023-05-22)


### Bug Fixes

* **core,cdk:** better fix for 9682 ([#9888](https://github.com/SAP/fundamental-ngx/issues/9888)) ([a56ba6f](https://github.com/SAP/fundamental-ngx/commit/a56ba6fb328f05e20d26fb7f4ad36689af2a0278))



## [0.41.1-rc.3](https://github.com/SAP/fundamental-ngx/compare/v0.41.1-rc.2...v0.41.1-rc.3) (2023-05-22)


### Bug Fixes

* **platform:** bug where combobox selection event fires twice ([#9895](https://github.com/SAP/fundamental-ngx/issues/9895)) ([01875af](https://github.com/SAP/fundamental-ngx/commit/01875afd47cf532c60bcc99c67c8220740b91c51))



## [0.41.1-rc.2](https://github.com/SAP/fundamental-ngx/compare/v0.41.1-rc.1...v0.41.1-rc.2) (2023-05-22)


### Features

* **core:** message toast bound to element ([#9910](https://github.com/SAP/fundamental-ngx/issues/9910)) ([0d28c13](https://github.com/SAP/fundamental-ngx/commit/0d28c132d4f2bf9acffc113af2e7282c5586829b))



## [0.41.1-rc.1](https://github.com/SAP/fundamental-ngx/compare/v0.41.1-rc.0...v0.41.1-rc.1) (2023-05-17)



## [0.41.1-rc.0](https://github.com/SAP/fundamental-ngx/compare/v0.41.0...v0.41.1-rc.0) (2023-05-16)


### Features

* **core:** tree component ([#9781](https://github.com/SAP/fundamental-ngx/issues/9781)) ([2a89bed](https://github.com/SAP/fundamental-ngx/commit/2a89bedd6ca1aeff14c818fd81417418d5e22ccc))



# [0.41.0](https://github.com/SAP/fundamental-ngx/compare/v0.41.0-rc.3...v0.41.0) (2023-05-16)



# [0.41.0-rc.3](https://github.com/SAP/fundamental-ngx/compare/v0.41.0-rc.2...v0.41.0-rc.3) (2023-05-15)


### Bug Fixes

* **core,platform,cx:** navigation components had missing/incorrect roles ([#9818](https://github.com/SAP/fundamental-ngx/issues/9818)) ([4bae7a3](https://github.com/SAP/fundamental-ngx/commit/4bae7a3c59a9bb71328ca602274d1b9a6058a46d))



# [0.41.0-rc.2](https://github.com/SAP/fundamental-ngx/compare/v0.41.0-rc.1...v0.41.0-rc.2) (2023-05-12)


### Bug Fixes

* **platform:** checkbox focus/keyboard nav issue in platform table ([#9762](https://github.com/SAP/fundamental-ngx/issues/9762)) ([01b1e31](https://github.com/SAP/fundamental-ngx/commit/01b1e31003598d90e2b253cb1e5b4f69d138ae6e))



# [0.41.0-rc.1](https://github.com/SAP/fundamental-ngx/compare/v0.41.0-rc.0...v0.41.0-rc.1) (2023-05-12)


### Bug Fixes

* **core,platform:** remove unnecessary innerText usage ([#9819](https://github.com/SAP/fundamental-ngx/issues/9819)) ([0f7195c](https://github.com/SAP/fundamental-ngx/commit/0f7195c9192952b9f5697305fc8e3b2fc2b88ba5))



# [0.41.0-rc.0](https://github.com/SAP/fundamental-ngx/compare/v0.40.4-rc.6...v0.41.0-rc.0) (2023-05-10)


### Features

* **core:** message toast custom positions ([#9810](https://github.com/SAP/fundamental-ngx/issues/9810)) ([5ab4981](https://github.com/SAP/fundamental-ngx/commit/5ab4981ebd79d510c6ce7b373b19d80a8f7dee22))


### BREAKING CHANGES

* **core:** - `@fundamental-ngx/fn/cdk` package has been completely removed. Instead use `@fundamental-ngx/cdk`;
- The following public methods has been removed from Message Toast component: `close `, `open`;
- The following public properties has been removed from Message Toast component: `containerRef`, `onHide` been replaced with `onExit$`;
- Message Toast component requires `BrowserAnimationsModule` or `NoopAnimationsModule` to be added to the application;
- Message Toast config can receive `animated` boolean property. If `true`, Message Toast component appearance will be animated.



## [0.40.4-rc.6](https://github.com/SAP/fundamental-ngx/compare/v0.40.4-rc.5...v0.40.4-rc.6) (2023-05-09)


### Bug Fixes

* **platform:** p13n dialog - disableP13n rollback ([#9793](https://github.com/SAP/fundamental-ngx/issues/9793)) ([69c53e6](https://github.com/SAP/fundamental-ngx/commit/69c53e6604450fbace624e7eeec77af1cddd0bfe))



## [0.40.4-rc.5](https://github.com/SAP/fundamental-ngx/compare/v0.40.4-rc.4...v0.40.4-rc.5) (2023-05-09)


### Bug Fixes

* **core:** inline help needs tooltip role ([#9785](https://github.com/SAP/fundamental-ngx/issues/9785)) ([dd01f9b](https://github.com/SAP/fundamental-ngx/commit/dd01f9b2835aa65473245ed57534498629a16f44))



## [0.40.4-rc.4](https://github.com/SAP/fundamental-ngx/compare/v0.40.4-rc.3...v0.40.4-rc.4) (2023-05-08)


### Bug Fixes

* scrollbar should stop immediate propagation ([#9784](https://github.com/SAP/fundamental-ngx/issues/9784)) ([42336a1](https://github.com/SAP/fundamental-ngx/commit/42336a168dba963536106c598f6a540630f48bd0))



## [0.40.4-rc.3](https://github.com/SAP/fundamental-ngx/compare/v0.40.4-rc.2...v0.40.4-rc.3) (2023-05-08)


### Bug Fixes

* **core,platform:** multi combobox with numpad input ([#9808](https://github.com/SAP/fundamental-ngx/issues/9808)) ([91eee35](https://github.com/SAP/fundamental-ngx/commit/91eee35a88c14f4ae4d30e04540f0eb666fc0aa4))
* **core,platform:** table toolbar responsiveness ([#9788](https://github.com/SAP/fundamental-ngx/issues/9788)) ([b6d9c3c](https://github.com/SAP/fundamental-ngx/commit/b6d9c3c88cb273eeafebfc39b9e0b95206507fd2))



## [0.40.4-rc.2](https://github.com/SAP/fundamental-ngx/compare/v0.40.4-rc.1...v0.40.4-rc.2) (2023-05-05)


### Bug Fixes

* **core:** vertical navigation focus issue ([#9789](https://github.com/SAP/fundamental-ngx/issues/9789)) ([9df1c4c](https://github.com/SAP/fundamental-ngx/commit/9df1c4c6940c0d2fd99a0c0c17193be6dd687a86))
* **platform:** failing combobox unit test ([#9790](https://github.com/SAP/fundamental-ngx/issues/9790)) ([a929ff4](https://github.com/SAP/fundamental-ngx/commit/a929ff4f280e2ee881aa0fbccfc738ba7b87e003))



## [0.40.4-rc.1](https://github.com/SAP/fundamental-ngx/compare/v0.40.4-rc.0...v0.40.4-rc.1) (2023-05-03)


### Bug Fixes

* **core,platform:** refocus select element on option select ([#9756](https://github.com/SAP/fundamental-ngx/issues/9756)) ([cfd6475](https://github.com/SAP/fundamental-ngx/commit/cfd6475b02b910b95d30d82931f2b65608250456))



## [0.40.4-rc.0](https://github.com/SAP/fundamental-ngx/compare/v0.40.3...v0.40.4-rc.0) (2023-05-03)


### Bug Fixes

* **platform:** check state for tree table ([#9672](https://github.com/SAP/fundamental-ngx/issues/9672)) ([c9eec59](https://github.com/SAP/fundamental-ngx/commit/c9eec59a8faec9f2443dca19f92acfc8b85339f5))



## [0.40.3](https://github.com/SAP/fundamental-ngx/compare/v0.40.3-rc.1...v0.40.3) (2023-04-29)



## [0.40.3-rc.1](https://github.com/SAP/fundamental-ngx/compare/v0.40.3-rc.0...v0.40.3-rc.1) (2023-04-28)


### Bug Fixes

* various dialog fixes ([#9770](https://github.com/SAP/fundamental-ngx/issues/9770)) ([ebe3c28](https://github.com/SAP/fundamental-ngx/commit/ebe3c2882ab3c664e09880d86a06f5240d75b499))



## [0.40.3-rc.0](https://github.com/SAP/fundamental-ngx/compare/v0.40.2...v0.40.3-rc.0) (2023-04-28)


### Bug Fixes

* **core:** roll back styles version ([#9768](https://github.com/SAP/fundamental-ngx/issues/9768)) ([7511373](https://github.com/SAP/fundamental-ngx/commit/75113734118406ca3d509bf830f22d4e68d579db))



## [0.40.2](https://github.com/SAP/fundamental-ngx/compare/v0.40.2-rc.22...v0.40.2) (2023-04-25)



## [0.40.2-rc.22](https://github.com/SAP/fundamental-ngx/compare/v0.40.2-rc.21...v0.40.2-rc.22) (2023-04-25)


### Bug Fixes

* **docs:** background color on the search input in side nav ([#9750](https://github.com/SAP/fundamental-ngx/issues/9750)) ([39efe5c](https://github.com/SAP/fundamental-ngx/commit/39efe5c6ff044960f42389238b77e50bddc44e0c))



## [0.40.2-rc.21](https://github.com/SAP/fundamental-ngx/compare/v0.40.2-rc.20...v0.40.2-rc.21) (2023-04-25)


### Bug Fixes

* **platform:** fix table indentation ([#9748](https://github.com/SAP/fundamental-ngx/issues/9748)) ([d7f42b9](https://github.com/SAP/fundamental-ngx/commit/d7f42b9c4f9d2d9ab56c8e4508b042d75bff576b))



## [0.40.2-rc.20](https://github.com/SAP/fundamental-ngx/compare/v0.40.2-rc.19...v0.40.2-rc.20) (2023-04-24)


### Bug Fixes

* **platform:** open up drag and drop to sorting/filtering/etc ([#9712](https://github.com/SAP/fundamental-ngx/issues/9712)) ([3154f74](https://github.com/SAP/fundamental-ngx/commit/3154f747007a803ef1333e735c1805a1027afe45))



## [0.40.2-rc.19](https://github.com/SAP/fundamental-ngx/compare/v0.40.2-rc.18...v0.40.2-rc.19) (2023-04-24)


### Bug Fixes

* **platform:** enables correct behavior for buttons when used as action in the cell ([#9741](https://github.com/SAP/fundamental-ngx/issues/9741)) ([5678204](https://github.com/SAP/fundamental-ngx/commit/5678204d035da93133fa68736c15e78c6b2e5a9d))



## [0.40.2-rc.18](https://github.com/SAP/fundamental-ngx/compare/v0.40.2-rc.17...v0.40.2-rc.18) (2023-04-24)


### Bug Fixes

* remove translation_v2 ([#9745](https://github.com/SAP/fundamental-ngx/issues/9745)) ([9c94593](https://github.com/SAP/fundamental-ngx/commit/9c94593d09321ad5b932192d915e05c208b26f1f))



## [0.40.2-rc.17](https://github.com/SAP/fundamental-ngx/compare/v0.40.2-rc.16...v0.40.2-rc.17) (2023-04-24)


### Features

* **core:** added byline input to multi-input component ([#9730](https://github.com/SAP/fundamental-ngx/issues/9730)) ([0589851](https://github.com/SAP/fundamental-ngx/commit/058985182e8a996434c72f6c66f6a90749f56fcd))



## [0.40.2-rc.16](https://github.com/SAP/fundamental-ngx/compare/v0.40.2-rc.15...v0.40.2-rc.16) (2023-04-22)


### Bug Fixes

* **docs:** api absence in prod builds ([#9729](https://github.com/SAP/fundamental-ngx/issues/9729)) ([24e5e82](https://github.com/SAP/fundamental-ngx/commit/24e5e82967971f95c9a2716d3c02463494a70fdc))



## [0.40.2-rc.15](https://github.com/SAP/fundamental-ngx/compare/v0.40.2-rc.14...v0.40.2-rc.15) (2023-04-21)



## [0.40.2-rc.14](https://github.com/SAP/fundamental-ngx/compare/v0.40.2-rc.13...v0.40.2-rc.14) (2023-04-21)


### Bug Fixes

* **platform:** exclude columns from p13n dialog ([#9590](https://github.com/SAP/fundamental-ngx/issues/9590)) ([a1adcb9](https://github.com/SAP/fundamental-ngx/commit/a1adcb9b574c8c81618debb7f58f99f29ac10a85))



## [0.40.2-rc.13](https://github.com/SAP/fundamental-ngx/compare/v0.40.2-rc.12...v0.40.2-rc.13) (2023-04-21)


### Bug Fixes

* **cdk:** resize observer cleanup and breakpoint directive export absence ([#9720](https://github.com/SAP/fundamental-ngx/issues/9720)) ([c5d2cda](https://github.com/SAP/fundamental-ngx/commit/c5d2cda24408165ac921b1ad3b06c913a642f5a5))



## [0.40.2-rc.12](https://github.com/SAP/fundamental-ngx/compare/v0.40.2-rc.11...v0.40.2-rc.12) (2023-04-20)


### Bug Fixes

* **platform:** minor table visual issues ([#9713](https://github.com/SAP/fundamental-ngx/issues/9713)) ([32e1722](https://github.com/SAP/fundamental-ngx/commit/32e172282487324c6d4c86c8e2462e4c5a28d338))



## [0.40.2-rc.11](https://github.com/SAP/fundamental-ngx/compare/v0.40.2-rc.10...v0.40.2-rc.11) (2023-04-19)


### Bug Fixes

* testing translation_v2 ([#9717](https://github.com/SAP/fundamental-ngx/issues/9717)) ([502d5e5](https://github.com/SAP/fundamental-ngx/commit/502d5e55be9b3ef8588fa54885d5a65facf2cc7d))



## [0.40.2-rc.10](https://github.com/SAP/fundamental-ngx/compare/v0.40.2-rc.9...v0.40.2-rc.10) (2023-04-18)


### Bug Fixes

* **core:** fix overflow layout calculation ([#9687](https://github.com/SAP/fundamental-ngx/issues/9687)) ([e8fc19b](https://github.com/SAP/fundamental-ngx/commit/e8fc19b948ac46abbf780b334e3a2a80f24504a8))
* **platform:** enable keydown events also for the non-tree rows ([#9693](https://github.com/SAP/fundamental-ngx/issues/9693)) ([dce1786](https://github.com/SAP/fundamental-ngx/commit/dce17862b7f81e4e20c0bed59ce6d96e13477df6))



## [0.40.2-rc.9](https://github.com/SAP/fundamental-ngx/compare/v0.40.2-rc.8...v0.40.2-rc.9) (2023-04-17)


### Bug Fixes

* **cdk:** dynamic component should markForCheck after creation ([#9692](https://github.com/SAP/fundamental-ngx/issues/9692)) ([a517cae](https://github.com/SAP/fundamental-ngx/commit/a517cae9e5593dcfb4f6ab3b2dc903e9a232e8c0))



## [0.40.2-rc.8](https://github.com/SAP/fundamental-ngx/compare/v0.40.2-rc.7...v0.40.2-rc.8) (2023-04-17)


### Bug Fixes

* **core:** fd-scrollbar should prevent scroll event from bubbling ([#9696](https://github.com/SAP/fundamental-ngx/issues/9696)) ([b37a5d5](https://github.com/SAP/fundamental-ngx/commit/b37a5d5067a8f6c78ad81db346e35436398ec435))



## [0.40.2-rc.7](https://github.com/SAP/fundamental-ngx/compare/v0.40.2-rc.6...v0.40.2-rc.7) (2023-04-17)


### Bug Fixes

* **core:** fix grid list item semantic colors ([#9707](https://github.com/SAP/fundamental-ngx/issues/9707)) ([6684b98](https://github.com/SAP/fundamental-ngx/commit/6684b985625ec181d0a1669c6f35c3e7edcbd7ca))



## [0.40.2-rc.6](https://github.com/SAP/fundamental-ngx/compare/v0.40.2-rc.5...v0.40.2-rc.6) (2023-04-14)


### Bug Fixes

* **platform:** custom status for approval flow ([#9630](https://github.com/SAP/fundamental-ngx/issues/9630)) ([3907eef](https://github.com/SAP/fundamental-ngx/commit/3907eef3de8bf2aa7086c3c2b4117dfbab32d475))



## [0.40.2-rc.5](https://github.com/SAP/fundamental-ngx/compare/v0.40.2-rc.4...v0.40.2-rc.5) (2023-04-14)


### Bug Fixes

* **core:** allow shrinking groups ([#9670](https://github.com/SAP/fundamental-ngx/issues/9670)) ([c6202ea](https://github.com/SAP/fundamental-ngx/commit/c6202ea46535400528e1ed348abedd6b6130b13c))



## [0.40.2-rc.4](https://github.com/SAP/fundamental-ngx/compare/v0.40.2-rc.3...v0.40.2-rc.4) (2023-04-14)


### Bug Fixes

* **core,platform:** multi combobox/input keyboard behaviour ([#9694](https://github.com/SAP/fundamental-ngx/issues/9694)) ([7c4b67d](https://github.com/SAP/fundamental-ngx/commit/7c4b67da2b574aca02d93af4ae79ebba5f85806f))



## [0.40.2-rc.3](https://github.com/SAP/fundamental-ngx/compare/v0.40.2-rc.2...v0.40.2-rc.3) (2023-04-14)


### Bug Fixes

* **platform:** only scroll freezable cells when using l/r keyboard buttons, freezable column width not updating on table data load ([#9657](https://github.com/SAP/fundamental-ngx/issues/9657)) ([51363c7](https://github.com/SAP/fundamental-ngx/commit/51363c77657e4aedbeaf3d54dfd81682f85b28e7))



## [0.40.2-rc.2](https://github.com/SAP/fundamental-ngx/compare/v0.40.2-rc.1...v0.40.2-rc.2) (2023-04-14)


### Bug Fixes

* **platform:** tooltip for column size shrink ([#9612](https://github.com/SAP/fundamental-ngx/issues/9612)) ([951b69e](https://github.com/SAP/fundamental-ngx/commit/951b69e60a3eba302c56567a5cc9d2f9824bf922))



## [0.40.2-rc.1](https://github.com/SAP/fundamental-ngx/compare/v0.40.2-rc.0...v0.40.2-rc.1) (2023-04-14)


### Features

* **platform:** custom table popover renderer ([#9659](https://github.com/SAP/fundamental-ngx/issues/9659)) ([b7e69b1](https://github.com/SAP/fundamental-ngx/commit/b7e69b1bfeb54e2e2a056361b2de4ac4f75365e6))



## [0.40.2-rc.0](https://github.com/SAP/fundamental-ngx/compare/v0.40.1...v0.40.2-rc.0) (2023-04-14)


### Bug Fixes

* **platform:** add input to disable drag and drop ([#9685](https://github.com/SAP/fundamental-ngx/issues/9685)) ([44bce1a](https://github.com/SAP/fundamental-ngx/commit/44bce1a770dd8ea802edfaf2027a5b5150878b68))



## [0.40.1](https://github.com/SAP/fundamental-ngx/compare/v0.40.1-rc.9...v0.40.1) (2023-04-13)



## [0.40.1-rc.9](https://github.com/SAP/fundamental-ngx/compare/v0.40.1-rc.8...v0.40.1-rc.9) (2023-04-13)


### Bug Fixes

* **cx:** updated styles version and fixed side nav content density ([#9689](https://github.com/SAP/fundamental-ngx/issues/9689)) ([89730a8](https://github.com/SAP/fundamental-ngx/commit/89730a892d7813bb592901c8975b89189df07d68))



## [0.40.1-rc.8](https://github.com/SAP/fundamental-ngx/compare/v0.40.1-rc.7...v0.40.1-rc.8) (2023-04-13)


### Bug Fixes

* **platform:** automatically sticky table header ([#9684](https://github.com/SAP/fundamental-ngx/issues/9684)) ([c2acd56](https://github.com/SAP/fundamental-ngx/commit/c2acd56287f341ca6ae877b43627e0bb27e6eda0))



## [0.40.1-rc.7](https://github.com/SAP/fundamental-ngx/compare/v0.40.1-rc.6...v0.40.1-rc.7) (2023-04-12)


### Bug Fixes

* **core:** attach popover to different container via append to ([#9634](https://github.com/SAP/fundamental-ngx/issues/9634)) ([b6a637a](https://github.com/SAP/fundamental-ngx/commit/b6a637aaaa2d6f2115b0fa894946e00dcd5b25bd))



## [0.40.1-rc.6](https://github.com/SAP/fundamental-ngx/compare/v0.40.1-rc.5...v0.40.1-rc.6) (2023-04-12)


### Bug Fixes

* **platform:** extend TableRowsRearrangeEvent with new data ([#9673](https://github.com/SAP/fundamental-ngx/issues/9673)) ([89df008](https://github.com/SAP/fundamental-ngx/commit/89df008b1b2cd58c0b46f926656f0d324b57be16))



## [0.40.1-rc.5](https://github.com/SAP/fundamental-ngx/compare/v0.40.1-rc.4...v0.40.1-rc.5) (2023-04-12)



## [0.40.1-rc.4](https://github.com/SAP/fundamental-ngx/compare/v0.40.1-rc.3...v0.40.1-rc.4) (2023-04-12)


### Bug Fixes

* **platform:** search field input value updated when used in form tag ([#9662](https://github.com/SAP/fundamental-ngx/issues/9662)) ([9215623](https://github.com/SAP/fundamental-ngx/commit/9215623865984ae4e410467d2b6ad167ab68d1aa))



## [0.40.1-rc.3](https://github.com/SAP/fundamental-ngx/compare/v0.40.1-rc.2...v0.40.1-rc.3) (2023-04-11)


### Bug Fixes

* **cx:** side nav updates ([#9570](https://github.com/SAP/fundamental-ngx/issues/9570)) ([449abbc](https://github.com/SAP/fundamental-ngx/commit/449abbc9ca2a934ac2510a4bb53a29c38936582f))



## [0.40.1-rc.2](https://github.com/SAP/fundamental-ngx/compare/v0.40.1-rc.1...v0.40.1-rc.2) (2023-04-10)



## [0.40.1-rc.1](https://github.com/SAP/fundamental-ngx/compare/v0.40.1-rc.0...v0.40.1-rc.1) (2023-04-07)


### Features

* **core:** add cva tests for segmented button ([#9639](https://github.com/SAP/fundamental-ngx/issues/9639)) ([0183cb6](https://github.com/SAP/fundamental-ngx/commit/0183cb6b545851faabbde7df8be9a06fcafa6494))



## [0.40.1-rc.0](https://github.com/SAP/fundamental-ngx/compare/v0.40.0...v0.40.1-rc.0) (2023-04-06)


### Bug Fixes

* **core:** simplify change detection for segmented button ([#9638](https://github.com/SAP/fundamental-ngx/issues/9638)) ([867f3b1](https://github.com/SAP/fundamental-ngx/commit/867f3b14cb228144cf088efd868b4e40bc566fcf))



# [0.40.0](https://github.com/SAP/fundamental-ngx/compare/v0.40.0-rc.15...v0.40.0) (2023-04-05)



# [0.40.0-rc.15](https://github.com/SAP/fundamental-ngx/compare/v0.40.0-rc.14...v0.40.0-rc.15) (2023-04-05)


### Features

* **cdk:** created breakpoint directive ([#9594](https://github.com/SAP/fundamental-ngx/issues/9594)) ([0e8a5e6](https://github.com/SAP/fundamental-ngx/commit/0e8a5e6f0af3c929219aca82dc357e257ec151fa))



# [0.40.0-rc.14](https://github.com/SAP/fundamental-ngx/compare/v0.40.0-rc.13...v0.40.0-rc.14) (2023-04-05)


### Features

* **platform, cdk:** Drag & drop auto detect mode ([#9626](https://github.com/SAP/fundamental-ngx/issues/9626)) ([e4b5c6c](https://github.com/SAP/fundamental-ngx/commit/e4b5c6ce5686a7152f12d71d23c1b6475a9a89b2))


### BREAKING CHANGES

* **platform, cdk:** - Platform table now exposes `dropMode` input property which is `auto` by default;
- Default `auto` dnd option behaves in following way: if dragged item is hovering another item by over `n` pixels, where `n` is calculated with following formula: `[hovered element half height] + [hovered element height * threshold]`, it will apply `shift` mode, which during the drop of the dragged item will place it before or after the hovered element on the same level, otherwhise it will apply `group` mode, which creates children array of hovered element and places the dragged item inside it, adding +1 level to it;
- Platform Table page has been splitted into smaller pages that are grouped by the usage scenarios such as: Personalization Dialog, Settings Dialog, Navigation, Scrolling options, etc.



# [0.40.0-rc.13](https://github.com/SAP/fundamental-ngx/compare/v0.40.0-rc.12...v0.40.0-rc.13) (2023-04-05)


### Features

* new content density mechanism ([#9596](https://github.com/SAP/fundamental-ngx/issues/9596)) ([34c15ba](https://github.com/SAP/fundamental-ngx/commit/34c15bad0422b00a7958f3cc57f985d521e4e179))


### BREAKING CHANGES

* - Content Density mechanism was changed in favour of fundamental-styles content density mechanism based on parent css classes: `.is-cozy`, '.is-compact', '.is-condensed';
- All components are now relying on those css classes instead of previous approach with `.fd-${component-name}__[cozy|compact|condensed]`;
- Now, if content densities of child and parent components are equal, child component will omit adding `.is-cozy`, `.is-compact` or `.is-condensed` css class modifier.
- Shellbar and it's inner components are always keep `cozy` state, no matter the global or directive content density applied to it;
- Select component changed `.fd-button` tag from `button` to `span` to match the markup and visual styling from fundamental-styles;



# [0.40.0-rc.12](https://github.com/SAP/fundamental-ngx/compare/v0.40.0-rc.11...v0.40.0-rc.12) (2023-04-02)



# [0.40.0-rc.11](https://github.com/SAP/fundamental-ngx/compare/v0.40.0-rc.10...v0.40.0-rc.11) (2023-04-02)



# [0.40.0-rc.10](https://github.com/SAP/fundamental-ngx/compare/v0.40.0-rc.9...v0.40.0-rc.10) (2023-04-02)


### Bug Fixes

* **platform:** no tooltip for breadcrumb when overflow dots are shown ([#9610](https://github.com/SAP/fundamental-ngx/issues/9610)) ([9bf5758](https://github.com/SAP/fundamental-ngx/commit/9bf5758155cc46c017654d99cc5e7bb49bf3372a))



# [0.40.0-rc.9](https://github.com/SAP/fundamental-ngx/compare/v0.40.0-rc.8...v0.40.0-rc.9) (2023-04-02)


### Bug Fixes

* **platform:** semantic borderless example ([#9603](https://github.com/SAP/fundamental-ngx/issues/9603)) ([ad7d9cb](https://github.com/SAP/fundamental-ngx/commit/ad7d9cbaeda9b158b4c02943dc87b0de33b67725))



# [0.40.0-rc.8](https://github.com/SAP/fundamental-ngx/compare/v0.40.0-rc.7...v0.40.0-rc.8) (2023-03-31)



# [0.40.0-rc.7](https://github.com/SAP/fundamental-ngx/compare/v0.40.0-rc.6...v0.40.0-rc.7) (2023-03-30)



# [0.40.0-rc.6](https://github.com/SAP/fundamental-ngx/compare/v0.40.0-rc.5...v0.40.0-rc.6) (2023-03-29)


### Bug Fixes

* **platform:** missing tooltip - aria label for table toolbar actions ([#9601](https://github.com/SAP/fundamental-ngx/issues/9601)) ([e1d3dfe](https://github.com/SAP/fundamental-ngx/commit/e1d3dfee8fdcc4edcc58eddc6342a6c85922e062))
* value help dialog hidden label ([#9605](https://github.com/SAP/fundamental-ngx/issues/9605)) ([782afdc](https://github.com/SAP/fundamental-ngx/commit/782afdc73b11e202b494567c8021edd796a470a4))



# [0.40.0-rc.5](https://github.com/SAP/fundamental-ngx/compare/v0.40.0-rc.4...v0.40.0-rc.5) (2023-03-29)


### Bug Fixes

* **core:** use renderer instead of cdr ([#9602](https://github.com/SAP/fundamental-ngx/issues/9602)) ([b6bdd34](https://github.com/SAP/fundamental-ngx/commit/b6bdd345f480b709a845d3dcb8fa1166e1d7037a))



# [0.40.0-rc.4](https://github.com/SAP/fundamental-ngx/compare/v0.40.0-rc.3...v0.40.0-rc.4) (2023-03-28)



# [0.40.0-rc.3](https://github.com/SAP/fundamental-ngx/compare/v0.40.0-rc.2...v0.40.0-rc.3) (2023-03-28)


### Bug Fixes

* **platform:** collapseAll/expandAll needs to be now in the same group as sort,filter buttons ([#9591](https://github.com/SAP/fundamental-ngx/issues/9591)) ([19f4513](https://github.com/SAP/fundamental-ngx/commit/19f45138d712ce2b10930a87b8aa6f35531eaef4))



# [0.40.0-rc.2](https://github.com/SAP/fundamental-ngx/compare/v0.40.0-rc.1...v0.40.0-rc.2) (2023-03-27)


### Bug Fixes

* **ci:** latest version hotfix failure ([#9574](https://github.com/SAP/fundamental-ngx/issues/9574)) ([3b776f1](https://github.com/SAP/fundamental-ngx/commit/3b776f10a50f46e401c391b16ae22e2033ad0607))



# [0.40.0-rc.1](https://github.com/SAP/fundamental-ngx/compare/v0.40.0-rc.0...v0.40.0-rc.1) (2023-03-24)


### Features

* **platform:** form generator inline help support for templates ([#9560](https://github.com/SAP/fundamental-ngx/issues/9560)) ([5814ba3](https://github.com/SAP/fundamental-ngx/commit/5814ba3a2a2b920df7c5bb7b77bbbff9582c4fb2))



# [0.40.0-rc.0](https://github.com/SAP/fundamental-ngx/compare/v0.39.1-rc.29...v0.40.0-rc.0) (2023-03-24)


### Bug Fixes

* **core,platform:** multi input and combobox tokenizer behaviour ([#9571](https://github.com/SAP/fundamental-ngx/issues/9571)) ([7430869](https://github.com/SAP/fundamental-ngx/commit/74308695ab2ae1b4c370431a6f612cc838119034))


### BREAKING CHANGES

* **core,platform:** Multi-combobox and Multi-input components for both libraries (core and platform) are now following [guidelines logic regarding reviewing tokens](https://experience.sap.com/fiori-design-web/multiinput/#reviewing-tokens)
