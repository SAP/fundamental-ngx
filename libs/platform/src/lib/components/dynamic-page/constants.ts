import { InjectionToken } from '@angular/core';

export const CLASS_NAME = {
    dynamicPage: 'fd-dynamic-page',
    dynamicPageTitleArea: 'fd-dynamic-page__title-area',
    dynamicPageTitleAreaTransparentBg: 'fd-dynamic-page__title-area--transparent-bg',
    dynamicPageTitleAreaSmall: 'fd-dynamic-page__title-area--sm',
    dynamicPageTitleAreaMedium: 'fd-dynamic-page__title-area--md',
    dynamicPageTitleAreaLarge: 'fd-dynamic-page__title-area--lg',
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
    dynamicPageHeaderSmall: 'fd-dynamic-page__header--sm',
    dynamicPageHeaderMedium: 'fd-dynamic-page__header--md',
    dynamicPageHeaderLarge: 'fd-dynamic-page__header--lg',
    dynamicPageHeaderExtraLarge: 'fd-dynamic-page__header--xl',
    dynamicPageHeaderPinCollapseNoShadow: 'fd-dynamic-page__header-visibility-container--no-shadow',
    dynamicPageTabs: 'fd-dynamic-page__tabs',
    dynamicPageTabsAddShadow: 'fd-dynamic-page__tabs--add-shadow',
    dynamicPageTabsSmall: 'fd-dynamic-page__tabs--sm',
    dynamicPageTabsMedium: 'fd-dynamic-page__tabs--md',
    dynamicPageTabsLarge: 'fd-dynamic-page__tabs--lg',
    dynamicPageTabsExtraLarge: 'fd-dynamic-page__tabs--xl',
    dynamicPageContent: 'fd-dynamic-page__content',
    dynamicPageContentAreaSmall: 'fd-dynamic-page__content--sm',
    dynamicPageContentAreaMedium: 'fd-dynamic-page__content--md',
    dynamicPageContentAreaLarge: 'fd-dynamic-page__content--lg',
    dynamicPageContentAreaExtraLarge: 'fd-dynamic-page__content--xl',
    dynamicPageContentListBg: 'fd-dynamic-page__content--list-bg',
    dynamicPageContentTransparentBg: 'fd-dynamic-page__content--transparent-bg',
    dynamicPageSummarizedTitleArea: 'fd-dynamic-page__summarized-title-area',
    dynamicPageSummarizedTitleAreaSmall: 'fd-dynamic-page__summarized-title-area--sm',
    dynamicPageSummarizedTitleAreaMedium: 'fd-dynamic-page__summarized-title-area--md',
    dynamicPageSummarizedTitleAreaLarge: 'fd-dynamic-page__summarized-title-area--lg',
    dynamicPageSummarizedTitleAreaExtraLarge: 'fd-dynamic-page__summarized-title-area',
    dynamicPageSummarizedTitleAreaNoShadow: 'fd-dynamic-page__summarized-title-area--no-shadow',
    dynamicPageSummarizedTitle: 'fd-dynamic-page__summarized-title',
    dynamicPageSummarizedTitleCollapsed: 'fd-dynamic-page__summarized-title-area--collapsed'
} as const;

export const DYNAMIC_PAGE_CHILD_TOKEN = new InjectionToken<string>('DYNAMIC_PAGE_CHILD_TOKEN');

export type BACKGROUND_TYPE = 'solid' | 'list' | 'transparent';

export type RESPONSIVE_SIZE = 'small' | 'medium' | 'large' | 'extra-large';
