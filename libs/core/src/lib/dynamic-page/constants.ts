export const CLASS_NAME = {
    dynamicPage: 'fd-dynamic-page',
    dynamicPageTitleArea: 'fd-dynamic-page__title-area',
    dynamicPageMainContainer: 'fd-dynamic-page__main-container',
    dynamicPageBreadcrumbTitleContainer: 'fd-dynamic-page__breadcrumb-title-container',
    dynamicPageTitleAreaCollapsed: 'fd-dynamic-page__title-area--collapsed',
    dynamicPageTitleContainer: 'fd-dynamic-page__title-container',
    dynamicPageTitle: 'fd-dynamic-page__title',
    dynamicPageBreadcrumb: 'fd-dynamic-page__breadcrumb',
    dynamicPageKeyInfo: 'fd-dynamic-page__title-content',
    dynamicPageToolbar: 'fd-dynamic-page__toolbar',
    dynamicPageLayoutActionsToolbar: 'fd-dynamic-page__toolbar--actions',
    dynamicPageLayoutContentToolbar: 'fd-dynamic-page__toolbar--content',
    dynamicPageHeader: 'fd-dynamic-page__header',
    dynamicPageCollapsibleHeader: 'fd-dynamic-page__collapsible-header',
    dynamicPageCollapsibleHeaderPinCollapseNoShadow:
        'fd-dynamic-page__collapsible-header-visibility-container--no-shadow',
    dynamicPageTabs: 'fd-dynamic-page__tabs',
    dynamicPageTabsAddShadow: 'fd-dynamic-page__tabs--add-shadow',
    dynamicPageContent: 'fd-dynamic-page__content',
    dynamicPageSummarizedTitleArea: 'fd-dynamic-page__summarized-title-area',
    dynamicPageSummarizedTitleAreaExtraLarge: 'fd-dynamic-page__summarized-title-area',
    dynamicPageSummarizedTitleAreaNoShadow: 'fd-dynamic-page__summarized-title-area--no-shadow',
    dynamicPageSummarizedTitle: 'fd-dynamic-page__summarized-title',
    dynamicPageSummarizedTitleCollapsed: 'fd-dynamic-page__summarized-title-area--collapsed'
} as const;

export type DynamicPageBackgroundType = 'solid' | 'list' | 'transparent';

export type DynamicPageResponsiveSize = 'small' | 'medium' | 'large' | 'extra-large';
