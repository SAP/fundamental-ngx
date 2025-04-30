# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [0.43.54](https://github.com/SAP/fundamental-ngx/compare/v0.43.53...v0.43.54) (2025-04-30)


### Bug Fixes

* **platform:** fix platform table aria-haspopup incorrect values ([#13218](https://github.com/SAP/fundamental-ngx/issues/13218)) ([bb034a3](https://github.com/SAP/fundamental-ngx/commit/bb034a366c198ef9b4b5a452a67fee916af90bd4))





## [0.43.53](https://github.com/SAP/fundamental-ngx/compare/v0.43.52...v0.43.53) (2025-04-15)


### Bug Fixes

* **core,platform:** add input for dynamic page header title heading level ([#13192](https://github.com/SAP/fundamental-ngx/issues/13192)) ([72110f0](https://github.com/SAP/fundamental-ngx/commit/72110f0f391180d949441b97f59c21cb536f04c7))
* **core,platform:** combobox/multi-input/multi-combobox escape key handling ([#13167](https://github.com/SAP/fundamental-ngx/issues/13167)) ([92affbc](https://github.com/SAP/fundamental-ngx/commit/92affbc7c3a24f0befe1b9e7e175073de45ed86b))
* **core,platform:** move token count announcer logic to tokenizer ([#13175](https://github.com/SAP/fundamental-ngx/issues/13175)) ([e0b04f9](https://github.com/SAP/fundamental-ngx/commit/e0b04f9079b2bd85c61b4a3c84cf59b5ab286a44))





## [0.43.52](https://github.com/SAP/fundamental-ngx/compare/v0.43.51...v0.43.52) (2025-03-19)


### Bug Fixes

* **platform:** do not set focus on list when there is IME processing ([#13123](https://github.com/SAP/fundamental-ngx/issues/13123)) ([87a2392](https://github.com/SAP/fundamental-ngx/commit/87a2392cf80cd6be8a2f18427c2909a4c9639d6d))





## [0.43.51](https://github.com/SAP/fundamental-ngx/compare/v0.43.50...v0.43.51) (2025-02-05)


### Bug Fixes

* **platform:** autocomplete should support japanese keyboard input source ([#12989](https://github.com/SAP/fundamental-ngx/issues/12989)) ([88d889c](https://github.com/SAP/fundamental-ngx/commit/88d889c686402bad673c028ed367c547a5dc74ad))
* **platform:** do not focus list combobox item on space keydown from input ([#13008](https://github.com/SAP/fundamental-ngx/issues/13008)) ([5883b6d](https://github.com/SAP/fundamental-ngx/commit/5883b6d72842f667cb9d8161f4298c5a816a35e3))





## [0.43.50](https://github.com/SAP/fundamental-ngx/compare/v0.43.49...v0.43.50) (2025-01-29)


### Bug Fixes

* **platform:** bug where vertical blue resizing line stays after horizontal scrolling platform table ([#12934](https://github.com/SAP/fundamental-ngx/issues/12934)) ([1dc1f67](https://github.com/SAP/fundamental-ngx/commit/1dc1f67ce3bc580af39417c81eb10da03c988dab))





## [0.43.49](https://github.com/SAP/fundamental-ngx/compare/v0.43.48...v0.43.49) (2025-01-09)


### Bug Fixes

* **core,platform:** add input to list item to prevent click selection. fix issue with toggling column on p13 dialog ([#12879](https://github.com/SAP/fundamental-ngx/issues/12879)) ([145e91c](https://github.com/SAP/fundamental-ngx/commit/145e91c340ae25e150dea82475c57d755ef0c873))





## [0.43.48](https://github.com/SAP/fundamental-ngx/compare/v0.43.47...v0.43.48) (2024-12-04)


### Bug Fixes

* **core,platform:** multi input focus switching bug ([#12665](https://github.com/SAP/fundamental-ngx/issues/12665)) ([6f90b39](https://github.com/SAP/fundamental-ngx/commit/6f90b390f33eea182349dc53f791a988abf4f2f6))
* **platform:** bug where enter key would not freeze/unfreeze columns ([#12774](https://github.com/SAP/fundamental-ngx/issues/12774)) ([b3a49e0](https://github.com/SAP/fundamental-ngx/commit/b3a49e0241118ac94523ae99065b743316fb8f00))





## [0.43.47](https://github.com/SAP/fundamental-ngx/compare/v0.43.46...v0.43.47) (2024-10-10)


### Bug Fixes

* **platform:** add loadingState recheck when async refocusing cell ([#12517](https://github.com/SAP/fundamental-ngx/issues/12517)) ([0831c29](https://github.com/SAP/fundamental-ngx/commit/0831c2962fad2d4936a24d64a6bb3c8a24dc433f))





## [0.43.46](https://github.com/SAP/fundamental-ngx/compare/v0.43.45...v0.43.46) (2024-10-07)

**Note:** Version bump only for package @fundamental-ngx/platform





## [0.43.45](https://github.com/SAP/fundamental-ngx/compare/v0.43.43...v0.43.45) (2024-09-20)


### Bug Fixes

* **core,platform:** provide translation for multi-combobox Invalid Entry message ([#12410](https://github.com/SAP/fundamental-ngx/issues/12410)) ([6284454](https://github.com/SAP/fundamental-ngx/commit/628445494097f4d8a214886a273dd6580a9b107f))
* **platform:** prevent filter input from losing focus when entering spaces ([#12449](https://github.com/SAP/fundamental-ngx/issues/12449)) ([5c8842e](https://github.com/SAP/fundamental-ngx/commit/5c8842e5e41db59d16a93389c80553cdb3625b41))
* **platform:** vhd should reset search after closing dialog ([#12406](https://github.com/SAP/fundamental-ngx/issues/12406)) ([d419dac](https://github.com/SAP/fundamental-ngx/commit/d419dace29358fe1fefd4e80e65b4386adabe77d))





## [0.43.43](https://github.com/SAP/fundamental-ngx/compare/v0.43.42...v0.43.43) (2024-09-10)


### Bug Fixes

* **platform:** broken _getNumberOfRowsToDisplay() function ([#12365](https://github.com/SAP/fundamental-ngx/issues/12365)) ([a7ec69e](https://github.com/SAP/fundamental-ngx/commit/a7ec69e2db2870f6dc9c301d1407f2cd108934fe))
* **platform:** more specific targeting of blocking wheel event when using scrollWholeRows ([#12375](https://github.com/SAP/fundamental-ngx/issues/12375)) ([6b81be6](https://github.com/SAP/fundamental-ngx/commit/6b81be6baa5f26133c334b4dad55285fefbe1a01))





## [0.43.42](https://github.com/SAP/fundamental-ngx/compare/v0.43.41...v0.43.42) (2024-09-03)


### Bug Fixes

* **core,platform:** add preventWheelEvents input to busy indicator ([#12307](https://github.com/SAP/fundamental-ngx/issues/12307)) ([a42994e](https://github.com/SAP/fundamental-ngx/commit/a42994ee96c4857f76a5d4e3fb4bab5b21a87c61))
* **platform:** add input for restricting table column min width ([#12266](https://github.com/SAP/fundamental-ngx/issues/12266)) ([13c3d93](https://github.com/SAP/fundamental-ngx/commit/13c3d938cc974aec99edde5208e7167ea20258e9))
* **platform:** platform table column resizer performance improvements ([#12325](https://github.com/SAP/fundamental-ngx/issues/12325)) ([c7c9974](https://github.com/SAP/fundamental-ngx/commit/c7c99748ee53bb457e53e9eda1cc2695b88d65da))
* **platform:** screenreader should announce posinset and setsize for table header popover ([#12335](https://github.com/SAP/fundamental-ngx/issues/12335)) ([35bf566](https://github.com/SAP/fundamental-ngx/commit/35bf566701c3c9638dae72e82d6a33ad3cadf7d1))





## [0.43.41](https://github.com/SAP/fundamental-ngx/compare/v0.43.40...v0.43.41) (2024-08-16)

**Note:** Version bump only for package @fundamental-ngx/platform





## [0.43.40](https://github.com/SAP/fundamental-ngx/compare/v0.43.39...v0.43.40) (2024-08-01)


### Bug Fixes

* **platform:** enable move up / move down buttons at all times for p13 columns dialog ([#12174](https://github.com/SAP/fundamental-ngx/issues/12174)) ([e49891d](https://github.com/SAP/fundamental-ngx/commit/e49891d257782d9f9b0fcf05a1960c916fbaec93))
* **platform:** scrollWholeRows should emit tableScrolled event when using pageScrolling ([#12182](https://github.com/SAP/fundamental-ngx/issues/12182)) ([d88094f](https://github.com/SAP/fundamental-ngx/commit/d88094fe2e93cfa3e9d0304dd3204c8f89941f05))
* **platform:** table freezing incorrect columns, and better explanation of how it works in the docs ([#12183](https://github.com/SAP/fundamental-ngx/issues/12183)) ([7f6728c](https://github.com/SAP/fundamental-ngx/commit/7f6728cedc8e9ea7e6b69b92d2c0d229ebfd03b1))





## [0.43.39](https://github.com/SAP/fundamental-ngx/compare/v0.43.38...v0.43.39) (2024-07-24)


### Bug Fixes

* **platform:** fdp-button role and title issues ([#12170](https://github.com/SAP/fundamental-ngx/issues/12170)) ([7fbcefa](https://github.com/SAP/fundamental-ngx/commit/7fbcefad2ec9c23123842114982505e2d6c00d2f))
* **platform:** pageScroll/virtualScroll lag, and bug where new page of data would not be fetched after scroll ([#12164](https://github.com/SAP/fundamental-ngx/issues/12164)) ([b289f33](https://github.com/SAP/fundamental-ngx/commit/b289f33b279b3f61debad836cf9b5a32953f21eb))
* remove bad translation on platform VHD ([#12167](https://github.com/SAP/fundamental-ngx/issues/12167)) ([3161b81](https://github.com/SAP/fundamental-ngx/commit/3161b81376a44afbedadd2e2a5e5969eb7d69051))





## [0.43.38](https://github.com/SAP/fundamental-ngx/compare/v0.43.37...v0.43.38) (2024-07-19)


### Bug Fixes

* **platform:** cache user selection after searching for new user list for approval flow ([#12107](https://github.com/SAP/fundamental-ngx/issues/12107)) ([4dc4af3](https://github.com/SAP/fundamental-ngx/commit/4dc4af35e6e94c832888f946b4b75bcdd4b31e8c))
* **platform:** remove attr.title from small cells ([#12143](https://github.com/SAP/fundamental-ngx/issues/12143)) ([dde5cd8](https://github.com/SAP/fundamental-ngx/commit/dde5cd818550c959534503486d6ad3eb15d34249))
* **platform:** trackBy function not working with scrollWholeRows ([#12146](https://github.com/SAP/fundamental-ngx/issues/12146)) ([79edeec](https://github.com/SAP/fundamental-ngx/commit/79edeeca95f2345a1745b57299655c3331f38e64))





## [0.43.37](https://github.com/SAP/fundamental-ngx/compare/v0.43.36...v0.43.37) (2024-07-18)


### Bug Fixes

* **core:** clear input and close options list on checkbox selection for Multi combobox ([#12105](https://github.com/SAP/fundamental-ngx/issues/12105)) ([7d3ca52](https://github.com/SAP/fundamental-ngx/commit/7d3ca52dfbdf0fe0d30f8e4af62f47072801bbfe))
* reset input but do not close popover when checkbox clicked on multi combobox ([#12134](https://github.com/SAP/fundamental-ngx/issues/12134)) ([a38f85c](https://github.com/SAP/fundamental-ngx/commit/a38f85c9c5f12046f6c7918f34f9144482a3c6d7))


### Features

* **platform:** virtual scroll whole rows enhancement for ng15 ([#12049](https://github.com/SAP/fundamental-ngx/issues/12049)) ([4612541](https://github.com/SAP/fundamental-ngx/commit/461254150036054e88fb1e25827e67f411eed5e1))





## [0.43.36](https://github.com/SAP/fundamental-ngx/compare/v0.43.35...v0.43.36) (2024-07-11)


### Bug Fixes

* **platform:** when loading child datasource, need to recursively check all expanded children for insertion index ([#12089](https://github.com/SAP/fundamental-ngx/issues/12089)) ([7c71226](https://github.com/SAP/fundamental-ngx/commit/7c712268184afda537c9551d10a44d968aa8b79b))





## [0.43.35](https://github.com/SAP/fundamental-ngx/compare/v0.43.34...v0.43.35) (2024-06-20)


### Bug Fixes

* **platform:** quick fix performance for platform table with many columns ([#12015](https://github.com/SAP/fundamental-ngx/issues/12015)) ([8e4c2d7](https://github.com/SAP/fundamental-ngx/commit/8e4c2d775c966b97a7dbb186ba60fee7ba517647))





## [0.43.34](https://github.com/SAP/fundamental-ngx/compare/v0.43.33...v0.43.34) (2024-05-07)


### Bug Fixes

* **core:** remove tabindex from dynamic page header ([#11818](https://github.com/SAP/fundamental-ngx/issues/11818)) ([4da497a](https://github.com/SAP/fundamental-ngx/commit/4da497ada72cfe7e1435ca0a01d50798787bea89))
* **platform:** add cellActivate event to platform table ([#11876](https://github.com/SAP/fundamental-ngx/issues/11876)) ([b25d510](https://github.com/SAP/fundamental-ngx/commit/b25d51027f987c52f8c867a82a5453ba3673cc07))
* **platform:** check validator before open Filtering Settings Dialog ([#11878](https://github.com/SAP/fundamental-ngx/issues/11878)) ([a012cdc](https://github.com/SAP/fundamental-ngx/commit/a012cdc9dd131f1127b2f7376d093ee43f4c19c8))
* **platform:** header cell popover freeze button should be keydown, not keyup ([#11801](https://github.com/SAP/fundamental-ngx/issues/11801)) ([33f9485](https://github.com/SAP/fundamental-ngx/commit/33f9485c7e39a557c41f0a6762d2d4f2ed06d313))
* **platform:** prevent keyboard press on checkbox header cell from scrolling page ([#11813](https://github.com/SAP/fundamental-ngx/issues/11813)) ([727f3f5](https://github.com/SAP/fundamental-ngx/commit/727f3f58198b29f5f4c1043f1a57703e445d4bdc))
* **platform:** remove tabindex from scrollable containers in VHD ([#11852](https://github.com/SAP/fundamental-ngx/issues/11852)) ([30e6441](https://github.com/SAP/fundamental-ngx/commit/30e64410586ee814e788ecff1ccc1876291cd322))
* **platform:** some improvements to platform table header popover ([#11822](https://github.com/SAP/fundamental-ngx/issues/11822)) ([b4a7a5b](https://github.com/SAP/fundamental-ngx/commit/b4a7a5bc78eced485a55cf2103dfa798251ad401))
* **platform:** table toolbar not passing aria label input to search field ([#11817](https://github.com/SAP/fundamental-ngx/issues/11817)) ([392315e](https://github.com/SAP/fundamental-ngx/commit/392315e1ac8184fe72698238a91a7bb273d7abc0))





## [0.43.33](https://github.com/SAP/fundamental-ngx/compare/v0.43.32...v0.43.33) (2024-04-19)


### Bug Fixes

* **core, platform:** add fix for breadcrumb template not being rendered in Dynamic Page component ([#11677](https://github.com/SAP/fundamental-ngx/issues/11677)) ([bf5ae72](https://github.com/SAP/fundamental-ngx/commit/bf5ae72c86f718d025b6c3de02715f3b1eb735c3))
* **core:** remove parent row tabindex when cell is focused to address screenreader issue ([#11691](https://github.com/SAP/fundamental-ngx/issues/11691)) ([3045a41](https://github.com/SAP/fundamental-ngx/commit/3045a41080b28d96b492bc27192e9e215bb09b83))
* **platform:** dialog aria-labelledBy for vhd ([#11651](https://github.com/SAP/fundamental-ngx/issues/11651)) ([239ec2a](https://github.com/SAP/fundamental-ngx/commit/239ec2af587df59e5838d90925a3a545ec56b41b))
* **platform:** focus menu button trigger when closed ([#11661](https://github.com/SAP/fundamental-ngx/issues/11661)) ([9b1c106](https://github.com/SAP/fundamental-ngx/commit/9b1c106f088458a9df755099c9cf395404f30bec))
* **platform:** vhd keyboard improvements ([#11563](https://github.com/SAP/fundamental-ngx/issues/11563)) ([8c7fd1b](https://github.com/SAP/fundamental-ngx/commit/8c7fd1b9b66e67245511a942f9d03a244653379e))





## [0.43.32](https://github.com/SAP/fundamental-ngx/compare/v0.43.31...v0.43.32) (2024-03-26)

**Note:** Version bump only for package @fundamental-ngx/platform





## [0.43.31](https://github.com/SAP/fundamental-ngx/compare/v0.43.30...v0.43.31) (2024-03-25)


### Bug Fixes

* **platform:** table empty cell screenreader text ([#11608](https://github.com/SAP/fundamental-ngx/issues/11608)) ([dbdaa51](https://github.com/SAP/fundamental-ngx/commit/dbdaa510084e94eff2500ca6522064862d1acf99))





## [0.43.30](https://github.com/SAP/fundamental-ngx/compare/v0.43.29...v0.43.30) (2024-03-22)


### Bug Fixes

* **core:** pass aria-label to the close button ([c66bd10](https://github.com/SAP/fundamental-ngx/commit/c66bd1087b9cde9c59b4de0d0997f1fda5a202e2))
* **platform:** (ng-15-downport) add input to remove space node from ApprovalFlow graph ([#11584](https://github.com/SAP/fundamental-ngx/issues/11584)) ([ff013c9](https://github.com/SAP/fundamental-ngx/commit/ff013c91a4b9cecf5501084246f37fc4951b9d96))
* **platform:** add proper z-index to Table toolbar so checkboxes don't go over it ([#11553](https://github.com/SAP/fundamental-ngx/issues/11553)) ([8221867](https://github.com/SAP/fundamental-ngx/commit/8221867d3e59f380d64ccebf4d5f6ce1efff7996))
* **platform:** add validator input for p13 filter component ([#11535](https://github.com/SAP/fundamental-ngx/issues/11535)) ([c306581](https://github.com/SAP/fundamental-ngx/commit/c30658189f391b64b94a0f8448c0d8db25e22e7d))
* **platform:** fix p13 dialog focus ([#11519](https://github.com/SAP/fundamental-ngx/issues/11519)) ([beeef66](https://github.com/SAP/fundamental-ngx/commit/beeef66157f961d52e941f9320ec0526483fb29a))





## [0.43.29](https://github.com/SAP/fundamental-ngx/compare/v0.43.28...v0.43.29) (2024-03-06)


### Bug Fixes

* issue with icon itself ([#11448](https://github.com/SAP/fundamental-ngx/issues/11448)) ([cd78138](https://github.com/SAP/fundamental-ngx/commit/cd7813803a13c4bc9c5364aaffa1a64d2372bad3))
* **platform:** prevent space key scrolling ([#11489](https://github.com/SAP/fundamental-ngx/issues/11489)) ([c924b37](https://github.com/SAP/fundamental-ngx/commit/c924b37568edfb45f1b3d3e66f30a954f15a4e6e))





## [0.43.28](https://github.com/SAP/fundamental-ngx/compare/v0.43.27...v0.43.28) (2024-02-23)


### Bug Fixes

* **platform:** arrows for p13 dialog ([#11444](https://github.com/SAP/fundamental-ngx/issues/11444)) ([0c22ae9](https://github.com/SAP/fundamental-ngx/commit/0c22ae96cff9c5db15dd7ea0c8a91e5251cf8c30))





## [0.43.27](https://github.com/SAP/fundamental-ngx/compare/v0.43.26...v0.43.27) (2024-02-16)


### Bug Fixes

* **core,platform:** detect changes when control value being updated ([#11397](https://github.com/SAP/fundamental-ngx/issues/11397)) ([411e14a](https://github.com/SAP/fundamental-ngx/commit/411e14a2e34ca9d96ee295681e2e89824e16741e))
* **platform:** disallow select all for single select ([#11379](https://github.com/SAP/fundamental-ngx/issues/11379)) ([d708041](https://github.com/SAP/fundamental-ngx/commit/d708041d21edfdba6fae23a2c636dc9588fb5b43))
* **platform:** live announcer should say whether column is fixed ([#11314](https://github.com/SAP/fundamental-ngx/issues/11314)) ([fdef7db](https://github.com/SAP/fundamental-ngx/commit/fdef7db105e12688e0da3b18417755eee0c6e995))
* **platform:** p13 dialog active issue ([#11341](https://github.com/SAP/fundamental-ngx/issues/11341)) ([0cb0c28](https://github.com/SAP/fundamental-ngx/commit/0cb0c28be3a3b9d75762b6f4e90b4f0f538aa113))





## [0.43.26](https://github.com/SAP/fundamental-ngx/compare/v0.43.25...v0.43.26) (2024-01-23)


### Bug Fixes

* **platform:** initial visible columns ([#11238](https://github.com/SAP/fundamental-ngx/issues/11238)) ([b13ef33](https://github.com/SAP/fundamental-ngx/commit/b13ef333e794fc460db7113fc696f45d76c0de8a))
* **platform:** table selection column bug ([#11174](https://github.com/SAP/fundamental-ngx/issues/11174)) ([d70e2ec](https://github.com/SAP/fundamental-ngx/commit/d70e2ec32854c7dbab8dc8cfb39ddbd6af5c5d81))


### Features

* **platform:** vhd validator ([#11303](https://github.com/SAP/fundamental-ngx/issues/11303)) ([1d95356](https://github.com/SAP/fundamental-ngx/commit/1d9535618f9d73f2a2caa183622bc21aa4120457))





## [0.43.25](https://github.com/SAP/fundamental-ngx/compare/v0.43.23...v0.43.25) (2024-01-18)


### Bug Fixes

* add addonIconTitle input to multi input ([#11185](https://github.com/SAP/fundamental-ngx/issues/11185)) ([63ecd38](https://github.com/SAP/fundamental-ngx/commit/63ecd38cde32149cce310854d2a21357e9476f96))
* **cdk:** tabbable observer out of the zone ([#11196](https://github.com/SAP/fundamental-ngx/issues/11196)) ([6503cc1](https://github.com/SAP/fundamental-ngx/commit/6503cc19ab3ddddaf32b63ea95cf67b0c95cef02))
* **platform:** combobox selection issue ([#11115](https://github.com/SAP/fundamental-ngx/issues/11115)) ([fb8bd0e](https://github.com/SAP/fundamental-ngx/commit/fb8bd0e56470c28ca0b29c05f12e44ff6c1fdb84))
* **platform:** corrected translations ([#11205](https://github.com/SAP/fundamental-ngx/issues/11205)) ([ad977a2](https://github.com/SAP/fundamental-ngx/commit/ad977a2435e8d7a072f85e795e4c0eb82a7ef8ed))
* **platform:** p13 a11y fixes ([#11149](https://github.com/SAP/fundamental-ngx/issues/11149)) ([00a5238](https://github.com/SAP/fundamental-ngx/commit/00a5238da4d7c402ff275bcc454e64278ebb0311))
* **platform:** tree table text overflow ([#11231](https://github.com/SAP/fundamental-ngx/issues/11231)) ([e992a96](https://github.com/SAP/fundamental-ngx/commit/e992a962544984f791b0bf8a6ebd4c7644e09597))
* **platform:** unfrozen area min width ([#11236](https://github.com/SAP/fundamental-ngx/issues/11236)) ([499ba98](https://github.com/SAP/fundamental-ngx/commit/499ba9897c8b42d5e17ebcd9e814c9be4209b309))


### Features

* **platform:** added ariaLabel priority over the ariaLabelledBy ([#11172](https://github.com/SAP/fundamental-ngx/issues/11172)) ([#11203](https://github.com/SAP/fundamental-ngx/issues/11203)) ([6e82b18](https://github.com/SAP/fundamental-ngx/commit/6e82b18905a2c7684a46fa619a3de9051235fe00))





## [0.43.24](https://github.com/SAP/fundamental-ngx/compare/v0.43.23...v0.43.24) (2023-12-28)

**Note:** Version bump only for package @fundamental-ngx/platform





## [0.43.23](https://github.com/SAP/fundamental-ngx/compare/v0.43.22...v0.43.23) (2023-12-25)


### Features

* **platform:** allow disabling select all in vhd ([#11128](https://github.com/SAP/fundamental-ngx/issues/11128)) ([167aae3](https://github.com/SAP/fundamental-ngx/commit/167aae3c9702399ccb4e2bcbbaa7db0ec52169dc))





## [0.43.22](https://github.com/SAP/fundamental-ngx/compare/v0.43.21...v0.43.22) (2023-12-16)


### Bug Fixes

* **core,platform:** button should not set aria-pressed by default ([#11064](https://github.com/SAP/fundamental-ngx/issues/11064)) ([8f5499f](https://github.com/SAP/fundamental-ngx/commit/8f5499f20fc6b4e517612d7f918774e92619cc2d))
* **platform:** fdp-combobox selection issues ([#11082](https://github.com/SAP/fundamental-ngx/issues/11082)) ([c515108](https://github.com/SAP/fundamental-ngx/commit/c515108c4ff6a5b93c44c387a7b127e76519030e))


### Features

* **platform:** vhd custom filter controls and column renderer ([#11083](https://github.com/SAP/fundamental-ngx/issues/11083)) ([88b5efd](https://github.com/SAP/fundamental-ngx/commit/88b5efda841407e2ba7f0e304626ff52dada5fe3))





## [0.43.21](https://github.com/SAP/fundamental-ngx/compare/v0.43.20...v0.43.21) (2023-12-08)


### Bug Fixes

* **platform:** reset pagination when ds changed ([#11061](https://github.com/SAP/fundamental-ngx/issues/11061)) ([094294b](https://github.com/SAP/fundamental-ngx/commit/094294b8ecf08c2d508dd49ed71f3bf938bd84f0))





## [0.43.20](https://github.com/SAP/fundamental-ngx/compare/v0.43.19...v0.43.20) (2023-12-07)


### Bug Fixes

* **platform:** reset table rows before new rows emitted ([#11059](https://github.com/SAP/fundamental-ngx/issues/11059)) ([9cfde78](https://github.com/SAP/fundamental-ngx/commit/9cfde78632ceac084b2f3151b78d656093d25e51))





## [0.43.19](https://github.com/SAP/fundamental-ngx/compare/v0.43.18...v0.43.19) (2023-12-06)


### Bug Fixes

* **platform:** do not select parent row if tristate is disabled ([#11047](https://github.com/SAP/fundamental-ngx/issues/11047)) ([c97e71d](https://github.com/SAP/fundamental-ngx/commit/c97e71db5e7cbbd330f1431d021865b52ec07601))
* **platform:** list accessibility issues ([#11018](https://github.com/SAP/fundamental-ngx/issues/11018)) ([fd8570c](https://github.com/SAP/fundamental-ngx/commit/fd8570c93b8b8b8ea514916dcd678405a155a682))





## [0.43.18](https://github.com/SAP/fundamental-ngx/compare/v0.43.17...v0.43.18) (2023-11-28)


### Bug Fixes

* **core,platform:** multi announcer improvements ([#10924](https://github.com/SAP/fundamental-ngx/issues/10924)) ([8782d1a](https://github.com/SAP/fundamental-ngx/commit/8782d1a290fc45d82945020087f88481ceaa142c))
* **platform:** add cellFocused event and focusCell method to platform table ([#10966](https://github.com/SAP/fundamental-ngx/issues/10966)) ([1059203](https://github.com/SAP/fundamental-ngx/commit/10592036d706fb8268aa21902a761cda01c77896))
* **platform:** clear table rows on data source changes ([#11019](https://github.com/SAP/fundamental-ngx/issues/11019)) ([#11021](https://github.com/SAP/fundamental-ngx/issues/11021)) ([12bf2e4](https://github.com/SAP/fundamental-ngx/commit/12bf2e4c329d16f15c1e6892e3e1d14188e3da21))
* **platform:** fixed table row excessive focus and toggle handling with space ([#11000](https://github.com/SAP/fundamental-ngx/issues/11000)) ([#11015](https://github.com/SAP/fundamental-ngx/issues/11015)) ([f420e48](https://github.com/SAP/fundamental-ngx/commit/f420e48221acfc09eb62786a1ff17a509f55374c))
* **platform:** move initial focus to search input on p13 ([#10972](https://github.com/SAP/fundamental-ngx/issues/10972)) ([acaa148](https://github.com/SAP/fundamental-ngx/commit/acaa1481db236d11cc99c24ceeda75960e7b4a1f))


### Features

* **core,platform:** dropdown control tabout strategy ([#10991](https://github.com/SAP/fundamental-ngx/issues/10991)) ([7f49f35](https://github.com/SAP/fundamental-ngx/commit/7f49f355f1e9e273e1e5a77cc6fe570c89637caf))





## [0.43.17](https://github.com/SAP/fundamental-ngx/compare/v0.43.16...v0.43.17) (2023-11-14)


### Bug Fixes

* **core,platform:** add aria-label for multi combobox ([#10909](https://github.com/SAP/fundamental-ngx/issues/10909)) ([bce6f61](https://github.com/SAP/fundamental-ngx/commit/bce6f612c64b89f0226a220a9a62055e0bac1b01))
* **core,platform:** inputs with dropdowns ignore tab key ([#10853](https://github.com/SAP/fundamental-ngx/issues/10853)) ([84a74cd](https://github.com/SAP/fundamental-ngx/commit/84a74cd59151e720479f533c6773ff61b3855895))
* **core,platform:** multi combobox blur behaviour ([#10865](https://github.com/SAP/fundamental-ngx/issues/10865)) ([010609e](https://github.com/SAP/fundamental-ngx/commit/010609ebcdd2d2fad87aa9dcf5720b7068a7372d))
* **platform:** aria sort attribute ([#10922](https://github.com/SAP/fundamental-ngx/issues/10922)) ([a66b9a3](https://github.com/SAP/fundamental-ngx/commit/a66b9a3482a1ff47b4fa497651dc0e881086e2f4))
* **platform:** aria-labelledby for select ([#10918](https://github.com/SAP/fundamental-ngx/issues/10918)) ([890b017](https://github.com/SAP/fundamental-ngx/commit/890b01752bb4f3ab4a2f1a499e1ee5934adf7810))
* **platform:** improve functionality when using space bar on table cell with checkbox/switch/button/input child ([#10782](https://github.com/SAP/fundamental-ngx/issues/10782)) ([9b6035d](https://github.com/SAP/fundamental-ngx/commit/9b6035dba91be350d4386e6f1d52c976cbd8884b))
* **platform:** keyboard improvements for search field ([#10881](https://github.com/SAP/fundamental-ngx/issues/10881)) ([61a54af](https://github.com/SAP/fundamental-ngx/commit/61a54af089aa426065d02a36cc625360d4ab7478))
* **platform:** remove selected duplicates ([#10859](https://github.com/SAP/fundamental-ngx/issues/10859)) ([70444a3](https://github.com/SAP/fundamental-ngx/commit/70444a363fecdb26a6f49bcdebc966737357cf7b))
* **platform:** remove title tooltip from table checkbox ([#10908](https://github.com/SAP/fundamental-ngx/issues/10908)) ([d2a780d](https://github.com/SAP/fundamental-ngx/commit/d2a780dcef3e0a553a0b56f12509e202bec97619))
* **platform:** rows should not have tabindex="-1" ([#10800](https://github.com/SAP/fundamental-ngx/issues/10800)) ([8ce67c2](https://github.com/SAP/fundamental-ngx/commit/8ce67c2fa9ffa91638b6b9182d22412d2a4d9c6e))
* **platform:** special characters escape ([#10790](https://github.com/SAP/fundamental-ngx/issues/10790)) ([f3fbc69](https://github.com/SAP/fundamental-ngx/commit/f3fbc6951511b8acea3c686df94cf443101f061a))
* table cell focus issue ([#10754](https://github.com/SAP/fundamental-ngx/issues/10754)) ([45c36fb](https://github.com/SAP/fundamental-ngx/commit/45c36fbe22c88dd5f5778db4a436e7b128d39959))





## [0.43.16](https://github.com/SAP/fundamental-ngx/compare/v0.43.15...v0.43.16) (2023-10-23)

**Note:** Version bump only for package @fundamental-ngx/platform





## [0.43.15](https://github.com/SAP/fundamental-ngx/compare/v0.43.14...v0.43.15) (2023-10-19)

**Note:** Version bump only for package @fundamental-ngx/platform





## [0.43.14](https://github.com/SAP/fundamental-ngx/compare/v0.43.13...v0.43.14) (2023-10-18)

**Note:** Version bump only for package @fundamental-ngx/platform





## [0.43.13](https://github.com/SAP/fundamental-ngx/compare/v0.43.12...v0.43.13) (2023-10-18)


### Bug Fixes

* **core:** improved multi-input screenreader (ng15) ([#10733](https://github.com/SAP/fundamental-ngx/issues/10733)) ([311ca0f](https://github.com/SAP/fundamental-ngx/commit/311ca0fd9317d7c593ecb2d2747b665dbacadb76))





## [0.43.12](https://github.com/SAP/fundamental-ngx/compare/v0.43.11...v0.43.12) (2023-10-11)


### Bug Fixes

* **core,platform:** busy indicator should not have aria-live polite by default, search input count issue ([#10681](https://github.com/SAP/fundamental-ngx/issues/10681)) ([0e6a29e](https://github.com/SAP/fundamental-ngx/commit/0e6a29ebc043b2f5ccc97c0421f5fa6a06c7d54d))





## [0.43.11](https://github.com/SAP/fundamental-ngx/compare/v0.43.10...v0.43.11) (2023-10-05)


### Bug Fixes

* **platform:** column freezing/unfreezing while resizing now behaves the same as ui5 ([#10606](https://github.com/SAP/fundamental-ngx/issues/10606)) ([8785bb0](https://github.com/SAP/fundamental-ngx/commit/8785bb089286dfe1e2f245009633fd0716d5c077))
* **platform:** column freezing/unfreezing while resizing now behaves the same as ui5 ([#10611](https://github.com/SAP/fundamental-ngx/issues/10611)) ([d15017a](https://github.com/SAP/fundamental-ngx/commit/d15017a6bd7c599503bd6858ddc40ab22c5cee03))
* **platform:** fdp multi combobox fires multiple times after value is selected ([#10513](https://github.com/SAP/fundamental-ngx/issues/10513)) ([#10675](https://github.com/SAP/fundamental-ngx/issues/10675)) ([b6d83e3](https://github.com/SAP/fundamental-ngx/commit/b6d83e3f46771abe4dfd42dcfe5e216f656a94e3))





## [0.43.10](https://github.com/SAP/fundamental-ngx/compare/v0.43.9...v0.43.10) (2023-09-20)


### Bug Fixes

* **platform:** table initial selection hydration ([#10549](https://github.com/SAP/fundamental-ngx/issues/10549)) ([4f5c05a](https://github.com/SAP/fundamental-ngx/commit/4f5c05a86c7c117a0bbf526f0f218dc507efea16))





## [0.43.9](https://github.com/SAP/fundamental-ngx/compare/v0.43.8...v0.43.9) (2023-09-11)


### Bug Fixes

* **platform:** checkbox column tabindex ([#10533](https://github.com/SAP/fundamental-ngx/issues/10533)) ([4b33815](https://github.com/SAP/fundamental-ngx/commit/4b33815d63a6c09d9fa3db9644b4be1797295730))
* **platform:** fix freeze functionality ([#10530](https://github.com/SAP/fundamental-ngx/issues/10530)) ([ae0cb4c](https://github.com/SAP/fundamental-ngx/commit/ae0cb4ca1532e1308fc3e80c6625f039208913e7))
* **platform:** search field accessibility update ([#10514](https://github.com/SAP/fundamental-ngx/issues/10514)) ([1eaeccd](https://github.com/SAP/fundamental-ngx/commit/1eaeccde2a868764aac97e201d01ddb7c5e573a8))


### Features

* **core,platform:** dynamic page snap on scroll disable input ([#10518](https://github.com/SAP/fundamental-ngx/issues/10518)) ([9d39c61](https://github.com/SAP/fundamental-ngx/commit/9d39c6123e4a4b66b29ff15187af25f209b882be))





## [0.43.8](https://github.com/SAP/fundamental-ngx/compare/v0.43.7...v0.43.8) (2023-09-08)


### Bug Fixes

* **core,platform:** add role="row" and aria-expanded on row level ([#10492](https://github.com/SAP/fundamental-ngx/issues/10492)) ([1fc741b](https://github.com/SAP/fundamental-ngx/commit/1fc741bd794bf3a9fa4889bcaf05f0bc8e964689))
* **core,platform:** multi-input aria-label ([#10497](https://github.com/SAP/fundamental-ngx/issues/10497)) ([6022905](https://github.com/SAP/fundamental-ngx/commit/6022905abeb327412f75c0c54252055c032d1799))
* **core:** custom list role ([#10502](https://github.com/SAP/fundamental-ngx/issues/10502)) ([21310a2](https://github.com/SAP/fundamental-ngx/commit/21310a2699f49ae36038e7fef661f901a6622b5a))
* **platform:** add aria-selected to multiselect first td ([#10489](https://github.com/SAP/fundamental-ngx/issues/10489)) ([7852063](https://github.com/SAP/fundamental-ngx/commit/7852063270d002defeaefe4140fe980d12913be9))
* **platform:** empty cell screenreader issue ([#10508](https://github.com/SAP/fundamental-ngx/issues/10508)) ([6b90596](https://github.com/SAP/fundamental-ngx/commit/6b90596dd268c98bf28db6fd173e2699d5bcab2c))
* **platform:** hiding selection column when data is not visible ([#10484](https://github.com/SAP/fundamental-ngx/issues/10484)) ([4658ca0](https://github.com/SAP/fundamental-ngx/commit/4658ca0642972474bba11b5aae81d09eb820a420))
* **platform:** row selection tooltip ([#10487](https://github.com/SAP/fundamental-ngx/issues/10487)) ([5151685](https://github.com/SAP/fundamental-ngx/commit/5151685b7395fe2c0816003f6c8f484de8d5d328))
* **platform:** some improvements to search field and VHD aria labels ([#10493](https://github.com/SAP/fundamental-ngx/issues/10493)) ([79c8349](https://github.com/SAP/fundamental-ngx/commit/79c8349b0d591e54b84aa6832cd3928a5391e937))
* **platform:** table boolean filter reset ([#10506](https://github.com/SAP/fundamental-ngx/issues/10506)) ([3d5fb00](https://github.com/SAP/fundamental-ngx/commit/3d5fb009bc5b24b5225aa535b3a8e1435318122d))
* **platform:** table header cells without popovers should have aria-haspopup false ([#10434](https://github.com/SAP/fundamental-ngx/issues/10434)) ([576435a](https://github.com/SAP/fundamental-ngx/commit/576435aceecc47a5a760ec4e221bc2db74fcfee3))


### Features

* **platform:** always showing title on the thead contents ([#10507](https://github.com/SAP/fundamental-ngx/issues/10507)) ([f77ac1c](https://github.com/SAP/fundamental-ngx/commit/f77ac1c919ac95aa50efe401ac9b2fa282fd08c6))
* **platform:** table tree nodes are operable using left and right arrow keys ([#10482](https://github.com/SAP/fundamental-ngx/issues/10482)) ([db5e86e](https://github.com/SAP/fundamental-ngx/commit/db5e86ebcfee89387566c5f5a7e373d13620f499))





## [0.43.7](https://github.com/SAP/fundamental-ngx/compare/v0.43.6...v0.43.7) (2023-09-05)


### Bug Fixes

* **platform:** fix dragdrop with virtual scroll ([#10478](https://github.com/SAP/fundamental-ngx/issues/10478)) ([3fd2328](https://github.com/SAP/fundamental-ngx/commit/3fd232870d70decb0d987dc50a9d38de13481985))
* **platform:** fixed non-existent predefined selected value selection token in multi-combobox ([#10479](https://github.com/SAP/fundamental-ngx/issues/10479)) ([ec8bfe0](https://github.com/SAP/fundamental-ngx/commit/ec8bfe06b0e8406fe01380db25aa0cd044136e9f))
* **platform:** search field aria-haspopup should only be true when there are dropdown values ([#10431](https://github.com/SAP/fundamental-ngx/issues/10431)) ([0f8db50](https://github.com/SAP/fundamental-ngx/commit/0f8db506dfaa7475bbe1c06e9b7be5448a5f1c16))


### Features

* **platform:** added input for table aria-labelledby value ([#10477](https://github.com/SAP/fundamental-ngx/issues/10477)) ([d6d8471](https://github.com/SAP/fundamental-ngx/commit/d6d84711f383dedebfb1f4923b533a500b57a469))





## [0.43.6](https://github.com/SAP/fundamental-ngx/compare/v0.43.5...v0.43.6) (2023-09-04)


### Bug Fixes

* **platform:** cell height instead of tbody ([#10442](https://github.com/SAP/fundamental-ngx/issues/10442)) ([e6282cd](https://github.com/SAP/fundamental-ngx/commit/e6282cd7be7110eeaf2b7eddcabb709592317638))
* **platform:** custom row height ([#10439](https://github.com/SAP/fundamental-ngx/issues/10439)) ([#10441](https://github.com/SAP/fundamental-ngx/issues/10441)) ([0c21d8b](https://github.com/SAP/fundamental-ngx/commit/0c21d8bbd4f7c783bfaf6e2b08cb53fd4b179797))
* **platform:** fixed multi combobox async value selection token ([#10473](https://github.com/SAP/fundamental-ngx/issues/10473)) ([01ea7e2](https://github.com/SAP/fundamental-ngx/commit/01ea7e2fab0afdbd2dfbacc58fcf551fe60fbf7d))


### Features

* **platform:** added aria-labelledby to the table ([#10447](https://github.com/SAP/fundamental-ngx/issues/10447)) ([580c698](https://github.com/SAP/fundamental-ngx/commit/580c6985f7ee95ae72046269056c5a047cebe8ef))





## [0.43.5](https://github.com/SAP/fundamental-ngx/compare/v0.43.4...v0.43.5) (2023-08-16)


### Bug Fixes

* **core:** datepicker perf optimisation ([725aa1b](https://github.com/SAP/fundamental-ngx/commit/725aa1bc6c5022f9e7bca74632dc41df31a51ec1))





## [0.43.4](https://github.com/SAP/fundamental-ngx/compare/v0.43.3...v0.43.4) (2023-08-08)

**Note:** Version bump only for package @fundamental-ngx/platform





## [0.43.3](https://github.com/SAP/fundamental-ngx/compare/v0.43.2...v0.43.3) (2023-08-04)


### Bug Fixes

* **platform:** table accessibility things ([acb1587](https://github.com/SAP/fundamental-ngx/commit/acb1587a636c28f5a765e0584a5e95e4ad7ab0b8))





## [0.43.2](https://github.com/SAP/fundamental-ngx/compare/v0.43.1...v0.43.2) (2023-07-31)

**Note:** Version bump only for package @fundamental-ngx/platform





## [0.43.1](https://github.com/SAP/fundamental-ngx/compare/v0.43.0...v0.43.1) (2023-07-28)

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
