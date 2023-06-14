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
