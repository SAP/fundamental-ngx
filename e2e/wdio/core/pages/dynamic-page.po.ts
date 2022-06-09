import { waitForElDisplayed, waitForPresent } from '../../driver/wdio';
import { CoreBaseComponentPo } from './core-base-component.po';

export class DynamicPagePo extends CoreBaseComponentPo {
    private url = '/dynamic-page';

    defaultExample = 'fd-dynamic-page-basic-example ';
    tabsExample = 'fd-dynamic-page-tabs-example ';
    columnLayoutExample = 'fd-dynamic-page-column-layout-example ';
    responsiveExample = 'fd-dynamic-page-responsive-example ';

    dynamicPageContent = '.fd-dynamic-page__content ';

    button = '.fd-button';
    dynamicPage = '.fd-dynamic-page ';
    dynamicPageBtn = this.dynamicPage + this.button;
    acceptButton = this.button + '--positive';
    rejectButton = this.button + '--negative';
    exitButton = this.button + '[aria-label="Exit Fullscreen"]';
    closeButton = this.button + '[aria-label="Close"]';

    saveButton = this.button + '--emphasized';
    cancelButton = 'fd-button-bar ' + this.button + '--transparent';

    collapsibleHeader = '.fd-dynamic-page__collapsible-header';
    collapseButton = '.fd-dynamic-page__collapse-button';
    pinButton = '.fd-dynamic-page__pin-button';
    tab = '.fd-dynamic-page .fd-tabs__link';
    tabsContent = '.fd-tabs__panel ' + this.dynamicPageContent + 'div:first-of-type';
    flexibleColumn = '.fd-flexible-column-layout__column ';
    article = '.fd-dynamic-page-section-example';
    breadcrumbLink = '.fd-dynamic-page__breadcrumb-wrapper a';
    currentBreadcrumbLink = '.fd-dynamic-page__breadcrumb-wrapper fd-breadcrumb-item:last-child span';

    open(): void {
        super.open(this.url);
        waitForPresent(this.root);
        waitForElDisplayed(this.title);
    }
}
