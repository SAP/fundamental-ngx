# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [0.45.0](https://github.com/SAP/fundamental-ngx/compare/v0.45.0-rc.0...v0.45.0) (2023-08-11)

**Note:** Version bump only for package @fundamental-ngx/platform





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

**Note:** Version bump only for package @fundamental-ngx/platform





## [0.44.1-rc.2](https://github.com/SAP/fundamental-ngx/compare/v0.44.1-rc.1...v0.44.1-rc.2) (2023-08-07)

**Note:** Version bump only for package @fundamental-ngx/platform





## [0.44.1-rc.1](https://github.com/SAP/fundamental-ngx/compare/v0.44.1-rc.0...v0.44.1-rc.1) (2023-08-04)

**Note:** Version bump only for package @fundamental-ngx/platform





## [0.44.1-rc.0](https://github.com/SAP/fundamental-ngx/compare/v0.44.0...v0.44.1-rc.0) (2023-08-04)

**Note:** Version bump only for package @fundamental-ngx/platform





# [0.44.0](https://github.com/SAP/fundamental-ngx/compare/v0.44.0-rc.7...v0.44.0) (2023-08-04)

**Note:** Version bump only for package @fundamental-ngx/platform





# [0.44.0-rc.7](https://github.com/SAP/fundamental-ngx/compare/v0.44.0-rc.6...v0.44.0-rc.7) (2023-08-04)

**Note:** Version bump only for package @fundamental-ngx/platform





# [0.44.0-rc.6](https://github.com/SAP/fundamental-ngx/compare/v0.44.0-rc.5...v0.44.0-rc.6) (2023-08-04)


### Bug Fixes

* removed `deprecated-decorator` ([#10294](https://github.com/SAP/fundamental-ngx/issues/10294)) ([c970974](https://github.com/SAP/fundamental-ngx/commit/c9709746ef2acb5a3daec7c197365952743ab1a1))





# [0.44.0-rc.5](https://github.com/SAP/fundamental-ngx/compare/v0.44.0-rc.4...v0.44.0-rc.5) (2023-08-03)

**Note:** Version bump only for package @fundamental-ngx/platform





# [0.44.0-rc.4](https://github.com/SAP/fundamental-ngx/compare/v0.44.0-rc.3...v0.44.0-rc.4) (2023-08-03)

**Note:** Version bump only for package @fundamental-ngx/platform





# [0.44.0-rc.3](https://github.com/SAP/fundamental-ngx/compare/v0.44.0-rc.2...v0.44.0-rc.3) (2023-08-01)

**Note:** Version bump only for package @fundamental-ngx/platform





# [0.44.0-rc.2](https://github.com/SAP/fundamental-ngx/compare/v0.44.0-rc.1...v0.44.0-rc.2) (2023-08-01)

**Note:** Version bump only for package @fundamental-ngx/platform





# [0.44.0-rc.1](https://github.com/SAP/fundamental-ngx/compare/v0.44.0-rc.0...v0.44.0-rc.1) (2023-07-31)


### Features

* **core,platform:** partial jest migration ([#10238](https://github.com/SAP/fundamental-ngx/issues/10238)) ([75130aa](https://github.com/SAP/fundamental-ngx/commit/75130aa85724060a515d99d675eb672b6d6eef6a))





# [0.44.0-rc.0](https://github.com/SAP/fundamental-ngx/compare/v0.43.2-rc.0...v0.44.0-rc.0) (2023-07-31)


### chore

* angular 16 migration ([#10093](https://github.com/SAP/fundamental-ngx/issues/10093)) ([2303ad9](https://github.com/SAP/fundamental-ngx/commit/2303ad9d07e7745c66f7c0b438e90384e3b6a14b))


### BREAKING CHANGES

* Angular v. 16.1 and Typescript v. 5.1 support





## [0.43.2-rc.0](https://github.com/SAP/fundamental-ngx/compare/v0.43.1-rc.0...v0.43.2-rc.0) (2023-07-28)

**Note:** Version bump only for package @fundamental-ngx/platform





## [0.43.1-rc.0](https://github.com/SAP/fundamental-ngx/compare/v0.43.0...v0.43.1-rc.0) (2023-07-28)

**Note:** Version bump only for package @fundamental-ngx/platform





# [0.43.0](https://github.com/SAP/fundamental-ngx/compare/v0.43.0-rc.30...v0.43.0) (2023-07-28)

**Note:** Version bump only for package @fundamental-ngx/platform





# [0.43.0-rc.30](https://github.com/SAP/fundamental-ngx/compare/v0.43.0-rc.29...v0.43.0-rc.30) (2023-07-28)


### Bug Fixes

* **platform:** add new strings for platform table single selection cells ([#10235](https://github.com/SAP/fundamental-ngx/issues/10235)) ([3593d90](https://github.com/SAP/fundamental-ngx/commit/3593d90c8cc2184ce393dfd7ed2271c475fce63f))





# [0.43.0-rc.29](https://github.com/SAP/fundamental-ngx/compare/v0.43.0-rc.28...v0.43.0-rc.29) (2023-07-28)

**Note:** Version bump only for package @fundamental-ngx/platform





# [0.43.0-rc.28](https://github.com/SAP/fundamental-ngx/compare/v0.43.0-rc.27...v0.43.0-rc.28) (2023-07-27)

**Note:** Version bump only for package @fundamental-ngx/platform





# [0.43.0-rc.27](https://github.com/SAP/fundamental-ngx/compare/v0.43.0-rc.26...v0.43.0-rc.27) (2023-07-27)

**Note:** Version bump only for package @fundamental-ngx/platform





# [0.43.0-rc.26](https://github.com/SAP/fundamental-ngx/compare/v0.43.0-rc.25...v0.43.0-rc.26) (2023-07-26)


### Bug Fixes

* **platform:** add missing labels ([#10229](https://github.com/SAP/fundamental-ngx/issues/10229)) ([13756fd](https://github.com/SAP/fundamental-ngx/commit/13756fd702c1e2f93564562d7c7f2c7f5fb56ba4))





# [0.43.0-rc.25](https://github.com/SAP/fundamental-ngx/compare/v0.43.0-rc.24...v0.43.0-rc.25) (2023-07-26)

**Note:** Version bump only for package @fundamental-ngx/platform





# [0.43.0-rc.24](https://github.com/SAP/fundamental-ngx/compare/v0.43.0-rc.23...v0.43.0-rc.24) (2023-07-26)

**Note:** Version bump only for package @fundamental-ngx/platform





# [0.43.0-rc.23](https://github.com/SAP/fundamental-ngx/compare/v0.43.0-rc.22...v0.43.0-rc.23) (2023-07-26)

**Note:** Version bump only for package @fundamental-ngx/platform





# [0.43.0-rc.22](https://github.com/SAP/fundamental-ngx/compare/v0.43.0-rc.21...v0.43.0-rc.22) (2023-07-26)


### Bug Fixes

* **platform:** interpolation adding whitespace to table text ([#10223](https://github.com/SAP/fundamental-ngx/issues/10223)) ([71f8d07](https://github.com/SAP/fundamental-ngx/commit/71f8d0775507f3630ac588ea81842dcb84439815))





# [0.43.0-rc.21](https://github.com/SAP/fundamental-ngx/compare/v0.43.0-rc.20...v0.43.0-rc.21) (2023-07-26)

**Note:** Version bump only for package @fundamental-ngx/platform





# [0.43.0-rc.20](https://github.com/SAP/fundamental-ngx/compare/v0.43.0-rc.19...v0.43.0-rc.20) (2023-07-25)

**Note:** Version bump only for package @fundamental-ngx/platform





# [0.43.0-rc.19](https://github.com/SAP/fundamental-ngx/compare/v0.43.0-rc.18...v0.43.0-rc.19) (2023-07-25)

**Note:** Version bump only for package @fundamental-ngx/platform





# [0.43.0-rc.18](https://github.com/SAP/fundamental-ngx/compare/v0.43.0-rc.17...v0.43.0-rc.18) (2023-07-24)

**Note:** Version bump only for package @fundamental-ngx/platform





# [0.43.0-rc.17](https://github.com/SAP/fundamental-ngx/compare/v0.43.0-rc.16...v0.43.0-rc.17) (2023-07-24)

**Note:** Version bump only for package @fundamental-ngx/platform





# [0.43.0-rc.16](https://github.com/SAP/fundamental-ngx/compare/v0.43.0-rc.15...v0.43.0-rc.16) (2023-07-20)


### Bug Fixes

* **platform:** update tablerows index ([#10191](https://github.com/SAP/fundamental-ngx/issues/10191)) ([53d4ad7](https://github.com/SAP/fundamental-ngx/commit/53d4ad7eda3c740129f739b1478f266a1951acf6))





# [0.43.0-rc.15](https://github.com/SAP/fundamental-ngx/compare/v0.43.0-rc.14...v0.43.0-rc.15) (2023-07-19)


### Bug Fixes

* **platform:** preserves table scrolling position ([#10098](https://github.com/SAP/fundamental-ngx/issues/10098)) ([ef240ff](https://github.com/SAP/fundamental-ngx/commit/ef240ffc6bc1a1330c98eb788f314b466daa17b0))





# [0.43.0-rc.14](https://github.com/SAP/fundamental-ngx/compare/v0.43.0-rc.13...v0.43.0-rc.14) (2023-07-19)

**Note:** Version bump only for package @fundamental-ngx/platform





# [0.43.0-rc.13](https://github.com/SAP/fundamental-ngx/compare/v0.43.0-rc.12...v0.43.0-rc.13) (2023-07-17)

**Note:** Version bump only for package @fundamental-ngx/platform





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

**Note:** Version bump only for package @fundamental-ngx/platform





# [0.43.0-rc.6](https://github.com/SAP/fundamental-ngx/compare/v0.43.0-rc.5...v0.43.0-rc.6) (2023-07-12)

**Note:** Version bump only for package @fundamental-ngx/platform





# [0.43.0-rc.5](https://github.com/SAP/fundamental-ngx/compare/v0.43.0-rc.4...v0.43.0-rc.5) (2023-07-12)

**Note:** Version bump only for package @fundamental-ngx/platform
