import { InjectionToken } from '@angular/core';

export const CLASS_NAME = {
    dynamicPage: 'fd-dynamic-page',
    dynamicPageTitleArea: 'fd-dynamic-page__title-area',
    dynamicPageTitleAreaTransparentBg: 'fd-dynamic-page__title-area--transparent-bg',
    dynamicPageTitleAreaSmall: 'fd-dynamic-page__title-area--s',
    dynamicPageTitleAreaMedium: 'fd-dynamic-page__title-area--m',
    dynamicPageTitleAreaLarge: 'fd-dynamic-page__title-area--l',
    dynamicPageTitleAreaExtraLarge: 'fd-dynamic-page__title-area--xl',
    dynamicPageTitleAreaCollapsed: 'fd-dynamic-page__title-area--collapsed', // need to use thiis TODO
    dynamicPageTitleContainer: 'fd-dynamic-page__title-container',
    dynamicPageTitle: 'fd-dynamic-page__title',
    dynamicPageBreadcrumb: 'fd-dynamic-page__breadcrumb',
    dynamicPageKeyInfo: 'fd-dynamic-page__title-content',
    // dynamicPageSubtitle: 'fd-dynamic-page__header',
    dynamicPageGlobalActions: 'fd-dynamic-page__toolbar',
    dynamicPageLayoutActions: 'fd-dynamic-page__toolbar--actions',
    dynamicPageHeader: 'fd-dynamic-page__header',
    dynamicPageHeaderTransparentBg: 'fd-dynamic-page__header--transparent-bg',
    dynamicPageHeaderSmall: 'fd-dynamic-page__header--s',
    dynamicPageHeaderMedium: 'fd-dynamic-page__header--m',
    dynamicPageHeaderLarge: 'fd-dynamic-page__header--l',
    dynamicPageHeaderExtraLarge: 'fd-dynamic-page__header--xl',
    dynamicPageHeaderPinCollapseNoShadow: 'fd-dynamic-page__header-visibility-container--no-shadow',
    dynamicPageTabs: 'fd-dynamic-page__tabs',
    dynamicPageTabsAddShadow: 'fd-dynamic-page__tabs--add-shadow',
    dynamicPageTabsSmall: 'fd-dynamic-page__tabs--s',
    dynamicPageTabsMedium: 'fd-dynamic-page__tabs--m',
    dynamicPageTabsLarge: 'fd-dynamic-page__tabs--l',
    dynamicPageTabsExtraLarge: 'fd-dynamic-page__tabs--xl',
    dynamicPageContent: 'fd-dynamic-page__content',
    dynamicPageContentAreaSmall: 'fd-dynamic-page__content--s',
    dynamicPageContentAreaMedium: 'fd-dynamic-page__content--m',
    dynamicPageContentAreaLarge: 'fd-dynamic-page__content--l',
    dynamicPageContentAreaExtraLarge: 'fd-dynamic-page__content--xl',
    dynamicPageContentListBg: 'fd-dynamic-page__content--list-bg',
    dynamicPageContentTransparentBg: 'fd-dynamic-page__content--transparent-bg',
    dynamicPageSummarizedTitleArea: 'fd-dynamic-page__summarized-title-area',
    dynamicPageSummarizedTitleAreaSmall: 'fd-dynamic-page__summarized-title-area--s',
    dynamicPageSummarizedTitleAreaMedium: 'fd-dynamic-page__summarized-title-area--m',
    dynamicPageSummarizedTitleAreaLarge: 'fd-dynamic-page__summarized-title-area--l',
    dynamicPageSummarizedTitleAreaExtraLarge: 'fd-dynamic-page__summarized-title-area',
    dynamicPageSummarizedTitleAreaNoShadow: 'fd-dynamic-page__summarized-title-area--no-shadow',
    dynamicPageSummarizedTitle: 'fd-dynamic-page__summarized-title',
    dynamicPageSummarizedTitleCollapsed: 'fd-dynamic-page__summarized-title-area--collapsed'
} as const;

export const DYNAMIC_PAGE_CHILD_TOKEN = new InjectionToken<string>('DYNAMIC_PAGE_CHILD_TOKEN');

export type BACKGROUND_TYPE = 'solid' | 'list' | 'transparent';

export type RESPONSIVE_SIZE = 'small' | 'medium' | 'large' | 'extra-large';
