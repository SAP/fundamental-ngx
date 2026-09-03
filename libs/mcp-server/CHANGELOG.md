## 0.65.0-rc.4 (2026-09-03)

This was a version bump only for mcp-server to align it with other projects, there were no code changes.

## 0.65.0-rc.3 (2026-09-03)

This was a version bump only for mcp-server to align it with other projects, there were no code changes.

## 0.65.0-rc.2 (2026-09-03)

This was a version bump only for mcp-server to align it with other projects, there were no code changes.

## 0.65.0-rc.1 (2026-09-02)

This was a version bump only for mcp-server to align it with other projects, there were no code changes.

## 0.65.0-rc.0 (2026-09-01)

### 🚀 Features

- ⚠️  **i18n:** lazy registry + secondary entry points for tree-shaking ([#14495](https://github.com/SAP/fundamental-ngx/pull/14495))

### ⚠️  Breaking Changes

- **i18n:** lazy registry + secondary entry points for tree-shaking  ([#14495](https://github.com/SAP/fundamental-ngx/pull/14495))
  FD_LANGUAGE_* constants and provideAllFundamentalLanguages are no longer exported from the root entry. See MIGRATION.md for import path changes. provideFundamentalTranslations, FD_LANGUAGE_SIGNAL, all tokens, pipes, and utilities stay in the root."
  M	.claude/rules/i18n.md
  M	.claude/skills/i18n-manage/SKILL.md
  M	.prettierignore
  M	apps/docs/src/app.config.ts
  M	apps/docs/src/environments/translations.prod.ts
  M	apps/e2e-harness/src/app/app.config.ts
  M	docs/agents/i18n-patterns.md
  M	libs/core/calendar/i18n/calendar-i18n-labels.ts
  M	libs/core/card/card.component.spec.ts
  M	libs/core/date-picker/date-picker.component.spec.ts
  M	libs/core/feed-list-item/components/item/feed-list-item.component.spec.ts
  M	libs/core/step-input/step-input.component.spec.ts
  M	libs/docs/core/datetime-picker/examples/datetime-picker-complex-i18n-example/datetime-picker-complex-i18n-example.component.ts
  M	libs/docs/i18n/changing-translations/changing-translations-docs.component.html
  M	libs/docs/i18n/changing-translations/changing-translations-docs.component.ts
  M	libs/docs/i18n/changing-translations/examples/i18n-auto-detect-example/auto-detect-example.component.ts
  M	libs/docs/i18n/changing-translations/examples/i18n-custom-language-example/custom-language-example.component.ts
  M	libs/docs/i18n/changing-translations/examples/i18n-language-change-example/language-change-example.component.ts
  M	libs/docs/i18n/changing-translations/examples/i18n-locale-override-example/locale-override-example.component.ts
  M	libs/docs/i18n/changing-translations/examples/i18n-migration-example/migration-example.component.ts
  M	libs/docs/i18n/getting-started/examples/getting-started-example.component.ts
  M	libs/docs/i18n/getting-started/getting-started-docs.component.html
  M	libs/docs/i18n/getting-started/getting-started-docs.component.ts
  M	libs/docs/i18n/loading-translations/examples/basic-usage-example/basic-usage-example.component.ts
  M	libs/docs/i18n/loading-translations/examples/json-loading-example/json-loading-example.component.ts
  M	libs/docs/i18n/loading-translations/examples/properties-loading-example/properties-loading-example.component.ts
  M	libs/docs/i18n/translation-resolver/examples/basic-usage-example.component.ts
  M	libs/docs/i18n/translation-resolver/examples/pipe-parameters-example/pipe-parameters-example.component.ts
  M	libs/docs/i18n/translation-resolver/examples/using-translation-pipe-example.component.ts
  M	libs/docs/i18n/translation-resolver/examples/using-utility-functions-example.component.ts
  M	libs/docs/i18n/translation-resolver/translation-resolver-docs.component.html
  M	libs/docs/i18n/troubleshooting/troubleshooting-docs.component.html
  M	libs/docs/platform/settings-generator/examples/default/settings-generator-default-example.component.ts
  M	libs/docs/platform/smart-filter-bar/examples/platform-smart-filter-bar-custom-labels-example.component.ts
  A	libs/i18n/MIGRATION.md
  M	libs/i18n/README.md
  A	libs/i18n/all/all-languages.ts
  A	libs/i18n/all/index.ts
  A	libs/i18n/all/ng-package.json
  A	libs/i18n/all/providers-all.ts
  A	libs/i18n/ar/arabic.ts
  A	libs/i18n/ar/index.ts
  A	libs/i18n/ar/ng-package.json
  A	libs/i18n/ar/translations_ar.ts
  A	libs/i18n/bg/bulgarian.ts
  A	libs/i18n/bg/index.ts
  A	libs/i18n/bg/ng-package.json
  A	libs/i18n/bg/translations_bg.ts
  A	libs/i18n/cs/czech.ts
  A	libs/i18n/cs/index.ts
  A	libs/i18n/cs/ng-package.json
  A	libs/i18n/cs/translations_cs.ts
  A	libs/i18n/da/danish.ts
  A	libs/i18n/da/index.ts
  A	libs/i18n/da/ng-package.json
  A	libs/i18n/da/translations_da.ts
  A	libs/i18n/de/german.ts
  A	libs/i18n/de/index.ts
  A	libs/i18n/de/ng-package.json
  A	libs/i18n/de/translations_de.ts
  A	libs/i18n/el/greek.ts
  A	libs/i18n/el/index.ts
  A	libs/i18n/el/ng-package.json
  A	libs/i18n/el/translations_el.ts
  A	libs/i18n/en/english.ts
  A	libs/i18n/en/index.ts
  A	libs/i18n/en/ng-package.json
  A	libs/i18n/en/translations.ts
  A	libs/i18n/es/index.ts
  A	libs/i18n/es/ng-package.json
  A	libs/i18n/es/spanish.ts
  A	libs/i18n/es/translations_es.ts
  A	libs/i18n/fi/finnish.ts
  A	libs/i18n/fi/index.ts
  A	libs/i18n/fi/ng-package.json
  A	libs/i18n/fi/translations_fi.ts
  A	libs/i18n/fr/french.ts
  A	libs/i18n/fr/index.ts
  A	libs/i18n/fr/ng-package.json
  A	libs/i18n/fr/translations_fr.ts
  A	libs/i18n/he/hebrew.ts
  A	libs/i18n/he/index.ts
  A	libs/i18n/he/ng-package.json
  A	libs/i18n/he/translations_he.ts
  A	libs/i18n/hi/hindi.ts
  A	libs/i18n/hi/index.ts
  A	libs/i18n/hi/ng-package.json
  A	libs/i18n/hi/translations_hi.ts
  A	libs/i18n/hr/croatian.ts
  A	libs/i18n/hr/index.ts
  A	libs/i18n/hr/ng-package.json
  A	libs/i18n/hr/translations_hr.ts
  A	libs/i18n/hu/hungarian.ts
  A	libs/i18n/hu/index.ts
  A	libs/i18n/hu/ng-package.json
  A	libs/i18n/hu/translations_hu.ts
  A	libs/i18n/it/index.ts
  A	libs/i18n/it/italian.ts
  A	libs/i18n/it/ng-package.json
  A	libs/i18n/it/translations_it.ts
  A	libs/i18n/ja/index.ts
  A	libs/i18n/ja/japanese.ts
  A	libs/i18n/ja/ng-package.json
  A	libs/i18n/ja/translations_ja.ts
  M	libs/i18n/jest.config.ts
  A	libs/i18n/ka/georgian.ts
  A	libs/i18n/ka/index.ts
  A	libs/i18n/ka/ng-package.json
  A	libs/i18n/ka/translations_ka.ts
  A	libs/i18n/kk/index.ts
  A	libs/i18n/kk/kazakh.ts
  A	libs/i18n/kk/ng-package.json
  A	libs/i18n/kk/translations_kk.ts
  A	libs/i18n/ko/index.ts
  A	libs/i18n/ko/korean.ts
  A	libs/i18n/ko/ng-package.json
  A	libs/i18n/ko/translations_ko.ts
  A	libs/i18n/ms/index.ts
  A	libs/i18n/ms/malay.ts
  A	libs/i18n/ms/ng-package.json
  A	libs/i18n/ms/translations_ms.ts
  A	libs/i18n/nl/dutch.ts
  A	libs/i18n/nl/index.ts
  A	libs/i18n/nl/ng-package.json
  A	libs/i18n/nl/translations_nl.ts
  A	libs/i18n/no/index.ts
  A	libs/i18n/no/ng-package.json
  A	libs/i18n/no/norwegian.ts
  A	libs/i18n/no/translations_no.ts
  A	libs/i18n/pl/index.ts
  A	libs/i18n/pl/ng-package.json
  A	libs/i18n/pl/polish.ts
  A	libs/i18n/pl/translations_pl.ts
  A	libs/i18n/pt/index.ts
  A	libs/i18n/pt/ng-package.json
  A	libs/i18n/pt/portuguese.ts
  A	libs/i18n/pt/translations_pt.ts
  A	libs/i18n/ro/index.ts
  A	libs/i18n/ro/ng-package.json
  A	libs/i18n/ro/romanian.ts
  A	libs/i18n/ro/translations_ro.ts
  A	libs/i18n/ru/index.ts
  A	libs/i18n/ru/ng-package.json
  A	libs/i18n/ru/russian.ts
  A	libs/i18n/ru/translations_ru.ts
  A	libs/i18n/sk/index.ts
  A	libs/i18n/sk/ng-package.json
  A	libs/i18n/sk/slovak.ts
  A	libs/i18n/sk/translations_sk.ts
  A	libs/i18n/sl/index.ts
  A	libs/i18n/sl/ng-package.json
  A	libs/i18n/sl/slovenian.ts
  A	libs/i18n/sl/translations_sl.ts
  A	libs/i18n/sq/albanian.ts
  A	libs/i18n/sq/index.ts
  A	libs/i18n/sq/ng-package.json
  A	libs/i18n/sq/translations_sq.ts
  A	libs/i18n/sr/index.ts
  A	libs/i18n/sr/ng-package.json
  A	libs/i18n/sr/serbian.ts
  A	libs/i18n/sr/translations_sr.ts
  M	libs/i18n/src/index.ts
  M	libs/i18n/src/lib/directives/patch-language.directive.ts
  M	libs/i18n/src/lib/languages/index.ts
  M	libs/i18n/src/lib/pipes/fd-translate.pipe.spec.ts
  A	libs/i18n/src/lib/providers.spec.ts
  A	libs/i18n/src/lib/providers.ts
  M	libs/i18n/src/lib/utils/detect-language.spec.ts
  M	libs/i18n/src/lib/utils/detect-language.ts
  M	libs/i18n/src/lib/utils/index.ts
  M	libs/i18n/src/lib/utils/resolve-helpers/resolve-translations-signal.spec.ts
  M	libs/i18n/src/lib/utils/tokens.spec.ts
  M	libs/i18n/src/lib/utils/translation-resolver.ts
  A	libs/i18n/sv/index.ts
  A	libs/i18n/sv/ng-package.json
  A	libs/i18n/sv/swedish.ts
  A	libs/i18n/sv/translations_sv.ts
  A	libs/i18n/th/index.ts
  A	libs/i18n/th/ng-package.json
  A	libs/i18n/th/thai.ts
  A	libs/i18n/th/translations_th.ts
  A	libs/i18n/tr/index.ts
  A	libs/i18n/tr/ng-package.json
  A	libs/i18n/tr/translations_tr.ts
  A	libs/i18n/tr/turkish.ts
  A	libs/i18n/uk/index.ts
  A	libs/i18n/uk/ng-package.json
  A	libs/i18n/uk/translations_uk.ts
  A	libs/i18n/uk/ukrainian.ts
  A	libs/i18n/zh-hans/chinese.ts
  A	libs/i18n/zh-hans/chinese_simplified.ts
  A	libs/i18n/zh-hans/index.ts
  A	libs/i18n/zh-hans/ng-package.json
  A	libs/i18n/zh-hans/translations_zh_CN.ts
  A	libs/i18n/zh-hant/chinese_traditional.ts
  A	libs/i18n/zh-hant/index.ts
  A	libs/i18n/zh-hant/ng-package.json
  A	libs/i18n/zh-hant/translations_zh_TW.ts
  M	libs/platform/value-help-dialog/value-help-dialog/value-help-dialog.component.spec.ts
  M	libs/ui5-webcomponents-base/i18n/ui5-language.service.spec.ts
  M	tsconfig.base.json

### ❤️ Thank You

- deno

## 0.64.4-rc.2 (2026-08-31)

This was a version bump only for mcp-server to align it with other projects, there were no code changes.

## 0.64.4-rc.1 (2026-08-31)

This was a version bump only for mcp-server to align it with other projects, there were no code changes.

## 0.64.4-rc.0 (2026-08-31)

This was a version bump only for mcp-server to align it with other projects, there were no code changes.

## 0.64.3 (2026-08-31)

### 🚀 Features

- **platform:** table - deprecate p13 dialog, add include/exclude filter component ([#14448](https://github.com/SAP/fundamental-ngx/pull/14448))
- **i18n:** add auto-correct command to i18n-manage executor ([#14429](https://github.com/SAP/fundamental-ngx/pull/14429))

### 🩹 Fixes

- **deps:** ui5-webcomponents version 2.26.0 ([#14499](https://github.com/SAP/fundamental-ngx/pull/14499))
- **ui5:** enable SPA navigation for [routerLink] on UI5 href components ([#14438](https://github.com/SAP/fundamental-ngx/pull/14438))
- **e2e:** scope visual regression snapshots to component container ([#14440](https://github.com/SAP/fundamental-ngx/pull/14440))

### ❤️ Thank You

- deno
- fundamental-bot
- github-actions
- Mike O'Donnell @mikerodonnell89

## 0.64.2-rc.50 (2026-08-30)

### 🩹 Fixes

- **deps:** ui5-webcomponents version 2.26.0 ([#14499](https://github.com/SAP/fundamental-ngx/pull/14499))

### ❤️ Thank You

- Mike O'Donnell @mikerodonnell89

## 0.64.2-rc.49 (2026-08-28)

This was a version bump only for mcp-server to align it with other projects, there were no code changes.

## 0.64.2-rc.48 (2026-08-28)

This was a version bump only for mcp-server to align it with other projects, there were no code changes.

## 0.64.2-rc.47 (2026-08-28)

This was a version bump only for mcp-server to align it with other projects, there were no code changes.

## 0.64.2-rc.46 (2026-08-28)

This was a version bump only for mcp-server to align it with other projects, there were no code changes.

## 0.64.2-rc.45 (2026-08-25)

This was a version bump only for mcp-server to align it with other projects, there were no code changes.

## 0.64.2-rc.44 (2026-08-25)

This was a version bump only for mcp-server to align it with other projects, there were no code changes.

## 0.64.2-rc.43 (2026-08-22)

This was a version bump only for mcp-server to align it with other projects, there were no code changes.

## 0.64.2-rc.42 (2026-08-21)

This was a version bump only for mcp-server to align it with other projects, there were no code changes.

## 0.64.2-rc.41 (2026-08-21)

This was a version bump only for mcp-server to align it with other projects, there were no code changes.

## 0.64.2-rc.40 (2026-08-21)

This was a version bump only for mcp-server to align it with other projects, there were no code changes.

## 0.64.2-rc.39 (2026-08-21)

This was a version bump only for mcp-server to align it with other projects, there were no code changes.

## 0.64.2-rc.38 (2026-08-20)

This was a version bump only for mcp-server to align it with other projects, there were no code changes.

## 0.64.2-rc.37 (2026-08-20)

This was a version bump only for mcp-server to align it with other projects, there were no code changes.

## 0.64.2-rc.36 (2026-08-20)

This was a version bump only for mcp-server to align it with other projects, there were no code changes.

## 0.64.2-rc.35 (2026-08-20)

This was a version bump only for mcp-server to align it with other projects, there were no code changes.

## 0.64.2-rc.34 (2026-08-19)

### 🚀 Features

- **platform:** table - deprecate p13 dialog, add include/exclude filter component ([#14448](https://github.com/SAP/fundamental-ngx/pull/14448))

### ❤️ Thank You

- github-actions
- Mike O'Donnell @mikerodonnell89

## 0.64.2-rc.33 (2026-08-19)

This was a version bump only for mcp-server to align it with other projects, there were no code changes.

## 0.64.2-rc.32 (2026-08-18)

This was a version bump only for mcp-server to align it with other projects, there were no code changes.

## 0.64.2-rc.31 (2026-08-14)

This was a version bump only for mcp-server to align it with other projects, there were no code changes.

## 0.64.2-rc.30 (2026-08-13)

This was a version bump only for mcp-server to align it with other projects, there were no code changes.

## 0.64.2-rc.29 (2026-08-13)

This was a version bump only for mcp-server to align it with other projects, there were no code changes.

## 0.64.2-rc.28 (2026-08-12)

This was a version bump only for mcp-server to align it with other projects, there were no code changes.

## 0.64.2-rc.27 (2026-08-12)

This was a version bump only for mcp-server to align it with other projects, there were no code changes.

## 0.64.2-rc.26 (2026-08-12)

This was a version bump only for mcp-server to align it with other projects, there were no code changes.

## 0.64.2-rc.25 (2026-08-12)

This was a version bump only for mcp-server to align it with other projects, there were no code changes.

## 0.64.2-rc.24 (2026-08-12)

This was a version bump only for mcp-server to align it with other projects, there were no code changes.

## 0.64.2-rc.23 (2026-08-11)

This was a version bump only for mcp-server to align it with other projects, there were no code changes.

## 0.64.2-rc.22 (2026-08-11)

This was a version bump only for mcp-server to align it with other projects, there were no code changes.

## 0.64.2-rc.21 (2026-08-11)

This was a version bump only for mcp-server to align it with other projects, there were no code changes.

## 0.64.2-rc.20 (2026-08-11)

This was a version bump only for mcp-server to align it with other projects, there were no code changes.

## 0.64.2-rc.19 (2026-08-11)

This was a version bump only for mcp-server to align it with other projects, there were no code changes.

## 0.64.2-rc.18 (2026-08-11)

This was a version bump only for mcp-server to align it with other projects, there were no code changes.

## 0.64.2-rc.17 (2026-08-10)

This was a version bump only for mcp-server to align it with other projects, there were no code changes.

## 0.64.2-rc.16 (2026-08-08)

This was a version bump only for mcp-server to align it with other projects, there were no code changes.

## 0.64.2-rc.15 (2026-08-07)

This was a version bump only for mcp-server to align it with other projects, there were no code changes.

## 0.64.2-rc.14 (2026-08-07)

### 🩹 Fixes

- **ui5:** enable SPA navigation for [routerLink] on UI5 href components ([#14438](https://github.com/SAP/fundamental-ngx/pull/14438))

### ❤️ Thank You

- deno

## 0.64.2-rc.13 (2026-08-05)

### 🩹 Fixes

- **e2e:** scope visual regression snapshots to component container ([#14440](https://github.com/SAP/fundamental-ngx/pull/14440))

### ❤️ Thank You

- deno
- github-actions

## 0.64.2-rc.12 (2026-08-05)

This was a version bump only for mcp-server to align it with other projects, there were no code changes.

## 0.64.2-rc.11 (2026-08-05)

This was a version bump only for mcp-server to align it with other projects, there were no code changes.

## 0.64.2-rc.10 (2026-08-04)

### 🚀 Features

- **i18n:** add auto-correct command to i18n-manage executor ([#14429](https://github.com/SAP/fundamental-ngx/pull/14429))

### ❤️ Thank You

- deno
- fundamental-bot

## 0.64.2-rc.9 (2026-08-03)

This was a version bump only for mcp-server to align it with other projects, there were no code changes.

## 0.64.2-rc.8 (2026-08-03)

This was a version bump only for mcp-server to align it with other projects, there were no code changes.

## 0.64.2-rc.7 (2026-08-03)

This was a version bump only for mcp-server to align it with other projects, there were no code changes.

## 0.64.2-rc.6 (2026-08-03)

This was a version bump only for mcp-server to align it with other projects, there were no code changes.

## 0.64.2-rc.5 (2026-08-03)

This was a version bump only for mcp-server to align it with other projects, there were no code changes.

## 0.64.2-rc.4 (2026-07-31)

This was a version bump only for mcp-server to align it with other projects, there were no code changes.

## 0.64.2-rc.3 (2026-07-31)

This was a version bump only for mcp-server to align it with other projects, there were no code changes.

## 0.64.2-rc.2 (2026-07-31)

This was a version bump only for mcp-server to align it with other projects, there were no code changes.

## 0.64.2-rc.1 (2026-07-31)

This was a version bump only for mcp-server to align it with other projects, there were no code changes.

## 0.64.2-rc.0 (2026-07-30)

This was a version bump only for mcp-server to align it with other projects, there were no code changes.

## 0.64.1 (2026-07-30)

### 🩹 Fixes

- **ui5:** use relative import in theming-bridge template to fix lint boundary error ([#14419](https://github.com/SAP/fundamental-ngx/pull/14419))
- skip linux snapshot check in merge commits ([#14414](https://github.com/SAP/fundamental-ngx/pull/14414))
- **ui5:** force-construct per-package theme providers to eliminate "Theme not registered" errors ([#14396](https://github.com/SAP/fundamental-ngx/pull/14396))
- **cdk:** complete moduleResolution bundler migration and TS project references ([#14389](https://github.com/SAP/fundamental-ngx/pull/14389))
- **core,platform,cdk:** remove extendedDiagnostics suppressions, retire `$safeNavigationMigration` and fix all violations ([#14393](https://github.com/SAP/fundamental-ngx/pull/14393), [#14334](https://github.com/SAP/fundamental-ngx/issues/14334))

### ❤️ Thank You

- deno
- Maria Dineva @MariaIDineva

## 0.64.1-rc.19 (2026-07-30)

This was a version bump only for mcp-server to align it with other projects, there were no code changes.

## 0.64.1-rc.18 (2026-07-30)

This was a version bump only for mcp-server to align it with other projects, there were no code changes.

## 0.64.1-rc.17 (2026-07-29)

This was a version bump only for mcp-server to align it with other projects, there were no code changes.

## 0.64.1-rc.16 (2026-07-29)

### 🩹 Fixes

- **ui5:** use relative import in theming-bridge template to fix lint boundary error ([#14419](https://github.com/SAP/fundamental-ngx/pull/14419))

### ❤️ Thank You

- deno

## 0.64.1-rc.14 (2026-07-29)

### 🩹 Fixes

- skip linux snapshot check in merge commits ([#14414](https://github.com/SAP/fundamental-ngx/pull/14414))

### ❤️ Thank You

- Maria Dineva @MariaIDineva

## 0.64.1-rc.13 (2026-07-28)

This was a version bump only for mcp-server to align it with other projects, there were no code changes.

## 0.64.1-rc.12 (2026-07-28)

This was a version bump only for mcp-server to align it with other projects, there were no code changes.

## 0.64.1-rc.11 (2026-07-28)

### 🩹 Fixes

- **ui5:** force-construct per-package theme providers to eliminate "Theme not registered" errors ([#14396](https://github.com/SAP/fundamental-ngx/pull/14396))

### ❤️ Thank You

- deno

## 0.64.1-rc.10 (2026-07-28)

### 🩹 Fixes

- **cdk:** complete moduleResolution bundler migration and TS project references ([#14389](https://github.com/SAP/fundamental-ngx/pull/14389))

### ❤️ Thank You

- Maria Dineva @MariaIDineva

## 0.64.1-rc.9 (2026-07-27)

This was a version bump only for mcp-server to align it with other projects, there were no code changes.

## 0.64.1-rc.8 (2026-07-27)

This was a version bump only for mcp-server to align it with other projects, there were no code changes.

## 0.64.1-rc.7 (2026-07-27)

This was a version bump only for mcp-server to align it with other projects, there were no code changes.

## 0.64.1-rc.6 (2026-07-27)

### 🩹 Fixes

- **core,platform,cdk:** remove extendedDiagnostics suppressions, retire `$safeNavigationMigration` and fix all violations ([#14393](https://github.com/SAP/fundamental-ngx/pull/14393), [#14334](https://github.com/SAP/fundamental-ngx/issues/14334))

### ❤️ Thank You

- Maria Dineva @MariaIDineva

## 0.64.1-rc.5 (2026-07-24)

This was a version bump only for mcp-server to align it with other projects, there were no code changes.

## 0.64.1-rc.3 (2026-07-24)

This was a version bump only for mcp-server to align it with other projects, there were no code changes.

## 0.64.1-rc.2 (2026-07-23)

This was a version bump only for mcp-server to align it with other projects, there were no code changes.

## 0.64.1-rc.1 (2026-07-23)

This was a version bump only for mcp-server to align it with other projects, there were no code changes.

## 0.64.1-rc.0 (2026-07-23)

This was a version bump only for mcp-server to align it with other projects, there were no code changes.

## 0.64.0 (2026-07-20)

### 🩹 Fixes

- **ci:** grant contents:write permission for gh-pages deployment ([#14349](https://github.com/SAP/fundamental-ngx/pull/14349))

### ❤️ Thank You

- Inna Atanasova @InnaAtanasova

## 0.64.0-rc.11 (2026-07-20)

This was a version bump only for mcp-server to align it with other projects, there were no code changes.

## 0.64.0-rc.10 (2026-07-20)

This was a version bump only for mcp-server to align it with other projects, there were no code changes.

## 0.64.0-rc.9 (2026-07-20)

This was a version bump only for mcp-server to align it with other projects, there were no code changes.

## 0.64.0-rc.8 (2026-07-20)

This was a version bump only for mcp-server to align it with other projects, there were no code changes.

## 0.64.0-rc.7 (2026-07-20)

This was a version bump only for mcp-server to align it with other projects, there were no code changes.

## 0.64.0-rc.6 (2026-07-20)

This was a version bump only for mcp-server to align it with other projects, there were no code changes.

## 0.64.0-rc.5 (2026-07-20)

This was a version bump only for mcp-server to align it with other projects, there were no code changes.

## 0.64.0-rc.4 (2026-07-17)

This was a version bump only for mcp-server to align it with other projects, there were no code changes.

## 0.64.0-rc.3 (2026-07-17)

This was a version bump only for mcp-server to align it with other projects, there were no code changes.

## 0.64.0-rc.2 (2026-07-17)

This was a version bump only for mcp-server to align it with other projects, there were no code changes.

## 0.64.0-rc.1 (2026-07-17)

This was a version bump only for mcp-server to align it with other projects, there were no code changes.

## 0.64.0-rc.0 (2026-07-16)

This was a version bump only for mcp-server to align it with other projects, there were no code changes.

## 0.63.2-rc.7 (2026-07-16)

This was a version bump only for mcp-server to align it with other projects, there were no code changes.

## 0.63.2-rc.6 (2026-07-16)

This was a version bump only for mcp-server to align it with other projects, there were no code changes.

## 0.63.2-rc.5 (2026-07-14)

This was a version bump only for mcp-server to align it with other projects, there were no code changes.

## 0.63.2-rc.4 (2026-07-14)

This was a version bump only for mcp-server to align it with other projects, there were no code changes.

## 0.63.2-rc.3 (2026-07-13)

This was a version bump only for mcp-server to align it with other projects, there were no code changes.

## 0.63.2-rc.2 (2026-07-10)

This was a version bump only for mcp-server to align it with other projects, there were no code changes.

## 0.63.2-rc.1 (2026-07-10)

This was a version bump only for mcp-server to align it with other projects, there were no code changes.

## 0.63.2-rc.0 (2026-07-09)

### 🩹 Fixes

- **ci:** grant contents:write permission for gh-pages deployment ([#14349](https://github.com/SAP/fundamental-ngx/pull/14349))

### ❤️ Thank You

- Inna Atanasova @InnaAtanasova

## 0.63.1 (2026-07-09)

### 🩹 Fixes

- **ci:** set npm provenance config directly before publish ([#14342](https://github.com/SAP/fundamental-ngx/pull/14342))
- ng update report missing ([#14331](https://github.com/SAP/fundamental-ngx/pull/14331))

### ❤️ Thank You

- Inna Atanasova @InnaAtanasova
- robertIsaac

## 0.63.1-rc.21 (2026-07-09)

This was a version bump only for mcp-server to align it with other projects, there were no code changes.

## 0.63.1-rc.20 (2026-07-09)

This was a version bump only for mcp-server to align it with other projects, there were no code changes.

## 0.63.1-rc.19 (2026-07-09)

This was a version bump only for mcp-server to align it with other projects, there were no code changes.

## 0.63.1-rc.18 (2026-07-09)

This was a version bump only for mcp-server to align it with other projects, there were no code changes.

## 0.63.1-rc.17 (2026-07-09)

### 🩹 Fixes

- **ci:** set npm provenance config directly before publish ([#14342](https://github.com/SAP/fundamental-ngx/pull/14342))
- ng update report missing ([#14331](https://github.com/SAP/fundamental-ngx/pull/14331))

### ❤️ Thank You

- Inna Atanasova @InnaAtanasova
- robertIsaac

## 0.63.1-rc.16 (2026-07-07)

This was a version bump only for mcp-server to align it with other projects, there were no code changes.

## 0.63.1-rc.15 (2026-07-07)

This was a version bump only for mcp-server to align it with other projects, there were no code changes.

## 0.63.1-rc.14 (2026-07-06)

This was a version bump only for mcp-server to align it with other projects, there were no code changes.

## 0.63.1-rc.13 (2026-07-06)

This was a version bump only for mcp-server to align it with other projects, there were no code changes.

## 0.63.1-rc.12 (2026-07-06)

This was a version bump only for mcp-server to align it with other projects, there were no code changes.

## 0.63.1-rc.11 (2026-07-06)

This was a version bump only for mcp-server to align it with other projects, there were no code changes.

## 0.63.1-rc.10 (2026-07-06)

This was a version bump only for mcp-server to align it with other projects, there were no code changes.

## 0.63.1-rc.9 (2026-07-02)

This was a version bump only for mcp-server to align it with other projects, there were no code changes.

## 0.63.1-rc.8 (2026-06-29)

This was a version bump only for mcp-server to align it with other projects, there were no code changes.

## 0.63.1-rc.7 (2026-06-29)

This was a version bump only for mcp-server to align it with other projects, there were no code changes.

## 0.63.1-rc.6 (2026-06-25)

This was a version bump only for mcp-server to align it with other projects, there were no code changes.

## 0.63.1-rc.5 (2026-06-24)

This was a version bump only for mcp-server to align it with other projects, there were no code changes.

## 0.63.1-rc.4 (2026-06-24)

This was a version bump only for mcp-server to align it with other projects, there were no code changes.

## 0.63.1-rc.3 (2026-06-23)

This was a version bump only for mcp-server to align it with other projects, there were no code changes.

## 0.63.1-rc.2 (2026-06-23)

This was a version bump only for mcp-server to align it with other projects, there were no code changes.

## 0.63.1-rc.1 (2026-06-23)

This was a version bump only for mcp-server to align it with other projects, there were no code changes.

## 0.63.1-rc.0 (2026-06-23)

This was a version bump only for mcp-server to align it with other projects, there were no code changes.

## 0.63.0 (2026-06-23)

### 🚀 Features

- **core:** add header content area to User Menu, adopt latest fund-styles ([#14268](https://github.com/SAP/fundamental-ngx/pull/14268))
- **mcp:** MCP server evaluation - part 6 ([#14259](https://github.com/SAP/fundamental-ngx/pull/14259))
- ⚠️  **mcp:** MCP server evaluation - part 5 ([#14224](https://github.com/SAP/fundamental-ngx/pull/14224))
- **mcp:** MCP server evaluation - part 4 ([#14221](https://github.com/SAP/fundamental-ngx/pull/14221))
- **mcp:** MCP server evaluation part 3 - Skills ([#14211](https://github.com/SAP/fundamental-ngx/pull/14211))

### 🩹 Fixes

- **ci:** generate components.json before netlify docs build ([#14285](https://github.com/SAP/fundamental-ngx/pull/14285))
- datetime adapters migration ([#14016](https://github.com/SAP/fundamental-ngx/pull/14016))
- **ui5:** bridge ThemingService to UI5 Web Components and fix theme propagation ([#14188](https://github.com/SAP/fundamental-ngx/pull/14188))

### ⚠️  Breaking Changes

- **mcp:** MCP server evaluation - part 5  ([#14224](https://github.com/SAP/fundamental-ngx/pull/14224))
  recommend_components removed. It used a hardcoded
  23-entry UI_PATTERNS dict that missed the entire platform form layer
  (fdp-form-group, fdp-form-field). Use search_components with relevant
  keywords instead.
  BREAKING CHANGE: get_design_tokens removed. The corpus was only 92
  tokens (42 hardcoded SAP theme vars + 50 spacing utility classes);
  focus, disabled, and hover tokens were absent, making it unusable for
  component styling. Use @fundamental-styles/mcp get_design_tokens
  (1500+ tokens) instead.
  BREAKING CHANGE: get_migration_guide tool removed from @fundamental-ngx/mcp.
  BREAKING CHANGE: get_accessibility_guide tool removed from @fundamental-ngx/mcp.
  Use get_component_api — it returns all inputs (including ARIA inputs with
  descriptions) and the keyboardHandling field.

### ❤️ Thank You

- Copilot
- deno
- github-actions
- Inna Atanasova @InnaAtanasova
- Maria Dineva @MariaIDineva

## 0.63.0-rc.40 (2026-06-23)

This was a version bump only for mcp-server to align it with other projects, there were no code changes.

## 0.63.0-rc.39 (2026-06-22)

This was a version bump only for mcp-server to align it with other projects, there were no code changes.

## 0.63.0-rc.38 (2026-06-22)

This was a version bump only for mcp-server to align it with other projects, there were no code changes.

## 0.63.0-rc.37 (2026-06-22)

This was a version bump only for mcp-server to align it with other projects, there were no code changes.

## 0.63.0-rc.36 (2026-06-19)

This was a version bump only for mcp-server to align it with other projects, there were no code changes.

## 0.63.0-rc.35 (2026-06-19)

This was a version bump only for mcp-server to align it with other projects, there were no code changes.

## 0.63.0-rc.34 (2026-06-18)

This was a version bump only for mcp-server to align it with other projects, there were no code changes.

## 0.63.0-rc.33 (2026-06-18)

This was a version bump only for mcp-server to align it with other projects, there were no code changes.

## 0.63.0-rc.32 (2026-06-18)

This was a version bump only for mcp-server to align it with other projects, there were no code changes.

## 0.63.0-rc.31 (2026-06-18)

This was a version bump only for mcp-server to align it with other projects, there were no code changes.

## 0.63.0-rc.30 (2026-06-17)

This was a version bump only for mcp-server to align it with other projects, there were no code changes.

## 0.63.0-rc.29 (2026-06-17)

This was a version bump only for mcp-server to align it with other projects, there were no code changes.

## 0.63.0-rc.28 (2026-06-16)

This was a version bump only for mcp-server to align it with other projects, there were no code changes.

## 0.63.0-rc.27 (2026-06-16)

This was a version bump only for mcp-server to align it with other projects, there were no code changes.

## 0.63.0-rc.26 (2026-06-15)

This was a version bump only for mcp-server to align it with other projects, there were no code changes.

## 0.63.0-rc.25 (2026-06-15)

This was a version bump only for mcp-server to align it with other projects, there were no code changes.

## 0.63.0-rc.24 (2026-06-15)

This was a version bump only for mcp-server to align it with other projects, there were no code changes.

## 0.63.0-rc.23 (2026-06-15)

This was a version bump only for mcp-server to align it with other projects, there were no code changes.

## 0.63.0-rc.22 (2026-06-15)

This was a version bump only for mcp-server to align it with other projects, there were no code changes.

## 0.63.0-rc.21 (2026-06-13)

This was a version bump only for mcp-server to align it with other projects, there were no code changes.

## 0.63.0-rc.20 (2026-06-12)

### 🩹 Fixes

- **ci:** generate components.json before netlify docs build ([#14285](https://github.com/SAP/fundamental-ngx/pull/14285))

### ❤️ Thank You

- deno

## 0.63.0-rc.19 (2026-06-12)

This was a version bump only for mcp-server to align it with other projects, there were no code changes.

## 0.63.0-rc.18 (2026-06-12)

This was a version bump only for mcp-server to align it with other projects, there were no code changes.

## 0.63.0-rc.17 (2026-06-11)

This was a version bump only for mcp-server to align it with other projects, there were no code changes.

## 0.63.0-rc.16 (2026-06-11)

This was a version bump only for mcp-server to align it with other projects, there were no code changes.

## 0.63.0-rc.15 (2026-06-10)

This was a version bump only for mcp-server to align it with other projects, there were no code changes.

## 0.63.0-rc.14 (2026-06-10)

### 🚀 Features

- **core:** add header content area to User Menu, adopt latest fund-styles ([#14268](https://github.com/SAP/fundamental-ngx/pull/14268))

### ❤️ Thank You

- Inna Atanasova @InnaAtanasova

## 0.63.0-rc.13 (2026-06-10)

This was a version bump only for mcp-server to align it with other projects, there were no code changes.

## 0.63.0-rc.12 (2026-06-10)

### 🩹 Fixes

- datetime adapters migration ([#14016](https://github.com/SAP/fundamental-ngx/pull/14016))

### ❤️ Thank You

- deno
- github-actions

## 0.63.0-rc.11 (2026-06-09)

### 🚀 Features

- **mcp:** MCP server evaluation - part 6 ([#14259](https://github.com/SAP/fundamental-ngx/pull/14259))

### ❤️ Thank You

- Maria Dineva @MariaIDineva

## 0.63.0-rc.10 (2026-06-09)

This was a version bump only for mcp-server to align it with other projects, there were no code changes.

## 0.63.0-rc.9 (2026-06-08)

This was a version bump only for mcp-server to align it with other projects, there were no code changes.

## 0.63.0-rc.8 (2026-06-08)

This was a version bump only for mcp-server to align it with other projects, there were no code changes.

## 0.63.0-rc.7 (2026-06-05)

This was a version bump only for mcp-server to align it with other projects, there were no code changes.

## 0.63.0-rc.6 (2026-06-05)

This was a version bump only for mcp-server to align it with other projects, there were no code changes.

## 0.63.0-rc.5 (2026-06-05)

This was a version bump only for mcp-server to align it with other projects, there were no code changes.

## 0.63.0-rc.4 (2026-06-05)

This was a version bump only for mcp-server to align it with other projects, there were no code changes.

## 0.63.0-rc.3 (2026-06-04)

This was a version bump only for mcp-server to align it with other projects, there were no code changes.

## 0.63.0-rc.2 (2026-06-01)

This was a version bump only for mcp-server to align it with other projects, there were no code changes.

## 0.63.0-rc.1 (2026-05-29)

This was a version bump only for mcp-server to align it with other projects, there were no code changes.

## 0.63.0-rc.0 (2026-05-28)

### 🚀 Features

- ⚠️  **mcp:** MCP server evaluation - part 5 ([#14224](https://github.com/SAP/fundamental-ngx/pull/14224))

### ⚠️  Breaking Changes

- **mcp:** MCP server evaluation - part 5  ([#14224](https://github.com/SAP/fundamental-ngx/pull/14224))
  recommend_components removed. It used a hardcoded
  23-entry UI_PATTERNS dict that missed the entire platform form layer
  (fdp-form-group, fdp-form-field). Use search_components with relevant
  keywords instead.
  BREAKING CHANGE: get_design_tokens removed. The corpus was only 92
  tokens (42 hardcoded SAP theme vars + 50 spacing utility classes);
  focus, disabled, and hover tokens were absent, making it unusable for
  component styling. Use @fundamental-styles/mcp get_design_tokens
  (1500+ tokens) instead.
  BREAKING CHANGE: get_migration_guide tool removed from @fundamental-ngx/mcp.
  BREAKING CHANGE: get_accessibility_guide tool removed from @fundamental-ngx/mcp.
  Use get_component_api — it returns all inputs (including ARIA inputs with
  descriptions) and the keyboardHandling field.

### ❤️ Thank You

- Maria Dineva @MariaIDineva

## 0.62.4-rc.9 (2026-05-27)

This was a version bump only for mcp-server to align it with other projects, there were no code changes.

## 0.62.4-rc.8 (2026-05-24)

This was a version bump only for mcp-server to align it with other projects, there were no code changes.

## 0.62.4-rc.7 (2026-05-23)

This was a version bump only for mcp-server to align it with other projects, there were no code changes.

## 0.62.4-rc.6 (2026-05-21)

This was a version bump only for mcp-server to align it with other projects, there were no code changes.

## 0.62.4-rc.5 (2026-05-21)

### 🚀 Features

- **mcp:** MCP server evaluation - part 4 ([#14221](https://github.com/SAP/fundamental-ngx/pull/14221))

### ❤️ Thank You

- Maria Dineva @MariaIDineva

## 0.62.4-rc.4 (2026-05-20)

This was a version bump only for mcp-server to align it with other projects, there were no code changes.

## 0.62.4-rc.3 (2026-05-20)

This was a version bump only for mcp-server to align it with other projects, there were no code changes.

## 0.62.4-rc.2 (2026-05-20)

### 🚀 Features

- **mcp:** MCP server evaluation part 3 - Skills ([#14211](https://github.com/SAP/fundamental-ngx/pull/14211))

### ❤️ Thank You

- Copilot
- Maria Dineva @MariaIDineva

## 0.62.4-rc.1 (2026-05-19)

This was a version bump only for mcp-server to align it with other projects, there were no code changes.

## 0.62.4-rc.0 (2026-05-18)

### 🩹 Fixes

- **ui5:** bridge ThemingService to UI5 Web Components and fix theme propagation ([#14188](https://github.com/SAP/fundamental-ngx/pull/14188))

### ❤️ Thank You

- deno

## 0.62.3 (2026-05-18)

### 🚀 Features

- **mcp:** MCP server evaluation part 2 ([#14208](https://github.com/SAP/fundamental-ngx/pull/14208), [#1](https://github.com/SAP/fundamental-ngx/issues/1), [#2](https://github.com/SAP/fundamental-ngx/issues/2), [#3](https://github.com/SAP/fundamental-ngx/issues/3), [#4](https://github.com/SAP/fundamental-ngx/issues/4), [#5](https://github.com/SAP/fundamental-ngx/issues/5), [#6](https://github.com/SAP/fundamental-ngx/issues/6), [#7](https://github.com/SAP/fundamental-ngx/issues/7))
- MCP server evaluation - part 1 ([#14178](https://github.com/SAP/fundamental-ngx/pull/14178), [#14159](https://github.com/SAP/fundamental-ngx/issues/14159))

### ❤️ Thank You

- Maria Dineva @MariaIDineva

## 0.62.3-rc.5 (2026-05-18)

This was a version bump only for mcp-server to align it with other projects, there were no code changes.

## 0.62.3-rc.4 (2026-05-18)

### 🚀 Features

- **mcp:** MCP server evaluation part 2 ([#14208](https://github.com/SAP/fundamental-ngx/pull/14208), [#1](https://github.com/SAP/fundamental-ngx/issues/1), [#2](https://github.com/SAP/fundamental-ngx/issues/2), [#3](https://github.com/SAP/fundamental-ngx/issues/3), [#4](https://github.com/SAP/fundamental-ngx/issues/4), [#5](https://github.com/SAP/fundamental-ngx/issues/5), [#6](https://github.com/SAP/fundamental-ngx/issues/6), [#7](https://github.com/SAP/fundamental-ngx/issues/7))

### ❤️ Thank You

- Maria Dineva @MariaIDineva

## 0.62.3-rc.3 (2026-05-15)

This was a version bump only for mcp-server to align it with other projects, there were no code changes.

## 0.62.3-rc.2 (2026-05-14)

This was a version bump only for mcp-server to align it with other projects, there were no code changes.

## 0.62.3-rc.1 (2026-05-13)

This was a version bump only for mcp-server to align it with other projects, there were no code changes.

## 0.62.3-rc.0 (2026-05-13)

### 🚀 Features

- MCP server evaluation - part 1 ([#14178](https://github.com/SAP/fundamental-ngx/pull/14178), [#14159](https://github.com/SAP/fundamental-ngx/issues/14159))

### ❤️ Thank You

- Maria Dineva @MariaIDineva

## 0.62.2 (2026-05-13)

### 🚀 Features

- **core:** improve MCP server metadata and add usage guide tool ([#14159](https://github.com/SAP/fundamental-ngx/pull/14159))

### ❤️ Thank You

- deno

## 0.62.2-rc.17 (2026-05-12)

This was a version bump only for mcp-server to align it with other projects, there were no code changes.

## 0.62.2-rc.16 (2026-05-12)

This was a version bump only for mcp-server to align it with other projects, there were no code changes.

## 0.62.2-rc.15 (2026-05-12)

This was a version bump only for mcp-server to align it with other projects, there were no code changes.

## 0.62.2-rc.14 (2026-05-12)

This was a version bump only for mcp-server to align it with other projects, there were no code changes.

## 0.62.2-rc.13 (2026-05-11)

This was a version bump only for mcp-server to align it with other projects, there were no code changes.

## 0.62.2-rc.12 (2026-05-11)

This was a version bump only for mcp-server to align it with other projects, there were no code changes.

## 0.62.2-rc.11 (2026-05-11)

This was a version bump only for mcp-server to align it with other projects, there were no code changes.

## 0.62.2-rc.10 (2026-05-11)

This was a version bump only for mcp-server to align it with other projects, there were no code changes.

## 0.62.2-rc.9 (2026-05-11)

This was a version bump only for mcp-server to align it with other projects, there were no code changes.

## 0.62.2-rc.8 (2026-05-08)

This was a version bump only for mcp-server to align it with other projects, there were no code changes.

## 0.62.2-rc.7 (2026-05-08)

This was a version bump only for mcp-server to align it with other projects, there were no code changes.

## 0.62.2-rc.6 (2026-05-08)

This was a version bump only for mcp-server to align it with other projects, there were no code changes.

## 0.62.2-rc.5 (2026-05-08)

This was a version bump only for mcp-server to align it with other projects, there were no code changes.

## 0.62.2-rc.4 (2026-05-08)

This was a version bump only for mcp-server to align it with other projects, there were no code changes.

## 0.62.2-rc.3 (2026-05-05)

This was a version bump only for mcp-server to align it with other projects, there were no code changes.

## 0.62.2-rc.2 (2026-05-05)

### 🚀 Features

- **core:** improve MCP server metadata and add usage guide tool ([#14159](https://github.com/SAP/fundamental-ngx/pull/14159))

### ❤️ Thank You

- deno

## 0.62.2-rc.1 (2026-05-05)

This was a version bump only for mcp-server to align it with other projects, there were no code changes.

## 0.62.2-rc.0 (2026-05-05)

This was a version bump only for mcp-server to align it with other projects, there were no code changes.

## 0.62.1 (2026-05-03)

This was a version bump only for mcp-server to align it with other projects, there were no code changes.

## 0.62.1-rc.0 (2026-05-01)

This was a version bump only for mcp-server to align it with other projects, there were no code changes.

## 0.62.0 (2026-04-29)

### 🚀 Features

- add mcp ([#14121](https://github.com/SAP/fundamental-ngx/pull/14121))
- **i18n,ui5:** implement ui5 locale support ([#13981](https://github.com/SAP/fundamental-ngx/pull/13981))
- **i18n:** introduce i18n cli commands and GHAction for translation ([#13968](https://github.com/SAP/fundamental-ngx/pull/13968))
- i18n migration ([#13937](https://github.com/SAP/fundamental-ngx/pull/13937))

### 🩹 Fixes

- **ui5:** make webcomponents wrappers more visible ([#14156](https://github.com/SAP/fundamental-ngx/pull/14156))
- **ci:** harden workflow security against injection and over-permissioning ([#14084](https://github.com/SAP/fundamental-ngx/pull/14084))
- **core, platform:** adopt latest fund-styles changes ([#14102](https://github.com/SAP/fundamental-ngx/pull/14102))
- **core:** fix mobile popover/menu reopen and form-item NG0100 ([#14087](https://github.com/SAP/fundamental-ngx/pull/14087))
- ⚠️  **core:** remove Angular animation dependncy + redesign example cards with density toggle, responsive preview, and keyboard hints ([#14077](https://github.com/SAP/fundamental-ngx/pull/14077))
- **ci:** allow .ts files in i18n fork PR validation ([#14062](https://github.com/SAP/fundamental-ngx/pull/14062))

### ⚠️  Breaking Changes

- **core:** remove Angular animation dependncy + redesign example cards with density toggle, responsive preview, and keyboard hints  ([#14077](https://github.com/SAP/fundamental-ngx/pull/14077))
  @angular/animations is no longer required by @fundamental-ngx/core. The add-animations schematic has been removed.

### ❤️ Thank You

- deno
- Inna Atanasova @InnaAtanasova
- Maria Dineva @MariaIDineva

## 0.62.0-rc.101 (2026-04-29)

This was a version bump only for mcp-server to align it with other projects, there were no code changes.

## 0.62.0-rc.100 (2026-04-29)

This was a version bump only for mcp-server to align it with other projects, there were no code changes.

## 0.62.0-rc.99 (2026-04-29)

This was a version bump only for mcp-server to align it with other projects, there were no code changes.

## 0.62.0-rc.98 (2026-04-28)

This was a version bump only for mcp-server to align it with other projects, there were no code changes.

## 0.62.0-rc.97 (2026-04-27)

This was a version bump only for mcp-server to align it with other projects, there were no code changes.

## 0.62.0-rc.96 (2026-04-27)

### 🩹 Fixes

- **ui5:** make webcomponents wrappers more visible ([#14156](https://github.com/SAP/fundamental-ngx/pull/14156))

### ❤️ Thank You

- Maria Dineva @MariaIDineva

## 0.62.0-rc.95 (2026-04-25)

This was a version bump only for mcp-server to align it with other projects, there were no code changes.

## 0.62.0-rc.94 (2026-04-25)

This was a version bump only for mcp-server to align it with other projects, there were no code changes.

## 0.62.0-rc.93 (2026-04-24)

This was a version bump only for mcp-server to align it with other projects, there were no code changes.

## 0.62.0-rc.92 (2026-04-24)

This was a version bump only for mcp-server to align it with other projects, there were no code changes.

## 0.62.0-rc.91 (2026-04-24)

This was a version bump only for mcp-server to align it with other projects, there were no code changes.

## 0.62.0-rc.90 (2026-04-24)

This was a version bump only for mcp-server to align it with other projects, there were no code changes.

## 0.62.0-rc.89 (2026-04-21)

This was a version bump only for mcp-server to align it with other projects, there were no code changes.

## 0.62.0-rc.88 (2026-04-20)

This was a version bump only for mcp-server to align it with other projects, there were no code changes.

## 0.62.0-rc.87 (2026-04-18)

This was a version bump only for mcp-server to align it with other projects, there were no code changes.

## 0.62.0-rc.86 (2026-04-17)

This was a version bump only for mcp-server to align it with other projects, there were no code changes.

## 0.62.0-rc.85 (2026-04-17)

### 🚀 Features

- add mcp ([#14121](https://github.com/SAP/fundamental-ngx/pull/14121))

### ❤️ Thank You

- deno