import { PlatformBaseComponentPo, waitForElDisplayed, waitForPresent } from '../../../../../e2e';

export class DynamicPagePo extends PlatformBaseComponentPo {
    private url = '/dynamic-page';
    basicExampleButton = 'fdp-platform-dynamic-page-example button';
    snapsExampleButton = 'fdp-platform-dynamic-page-snap-scroll-example button';
    tabbesExampleButton = 'fdp-platform-dynamic-page-tabbed-example button';
    responsiveExampleButton = 'fdp-platform-dynamic-page-responsive-padding-example button';
    disableHeaderCollapseExampleButton = 'fdp-platform-dynamic-page-non-collapsible-example button';
    flexibleColumnExampleButton = 'fdp-platform-dynamic-page-flexible-column-example button';

    dynamicPage = 'fdp-dynamic-page';
    dynamicPageCollapseIcon = this.dynamicPage + ' .fd-dynamic-page__collapse-button';
    dynamicPageContentStart = 'fdp-dynamic-page-content-host br';
    dynamicPageContentEnd = 'fdp-dynamic-page-content-host .footer-spacer';
    dynamicPageTitle = '.fd-dynamic-page__title-container';
    dynamicPageTabs = '.fd-dynamic-page .fd-tabs__item';
    dynamicPageTabsContent = '.fd-dynamic-page__content';
    dynamicPageToolBarAccept = this.dynamicPage + ' .fd-button--positive';
    dynamicPageToolBarReject = this.dynamicPage + ' .fd-button--negative';
    dynamicPageCollapsibleHeader = this.dynamicPage + ' .fd-dynamic-page__collapsible-header-container [role="region"]';

    columnSection = 'section';
    openColumnButton = '.docs-fcl-example-section button';
    columnSectionHeader = 'section header';
    columnSectionExpandIcon = '.fd-flexible-column-layout__button';

    open(): void {
        super.open(this.url);
        waitForPresent(this.root);
        waitForElDisplayed(this.title);
    }

    getScreenshotFolder(): Record<string, any> {
        return super.getScreenshotFolder(this.url);
    }

    saveExampleBaselineScreenshot(specName: string = 'checkbox'): void {
        super.saveExampleBaselineScreenshot(specName, this.getScreenshotFolder());
    }

    compareWithBaseline(specName: string = 'checkbox'): any {
        return super.compareWithBaseline(specName, this.getScreenshotFolder());
    }
}
