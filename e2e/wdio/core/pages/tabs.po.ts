import { CoreBaseComponentPo } from './core-base-component.po';
import { waitForElDisplayed, waitForPresent } from '../../driver/wdio';

export class TabsPo extends CoreBaseComponentPo {
    private url = '/tabs';

    tabsExample = 'fd-tabs-example ';
    IconOnlyExample = 'fd-tab-icon-only-example ';
    ProcessExample = 'fd-tab-process-example ';
    FilterExample = 'fd-tab-filter-example ';
    SelectionExample = 'fd-tab-selection-example ';
    AddExample = 'fd-adding-tab-example ';
    collapsibleOverflowExample = 'fd-collapsible-overflow-example ';
    stackendContentExample = 'fd-stacked-content-example ';
    collapsibleExample = 'fd-tab-collapsible-example ';
    playGroundExample = 'playground ';
    tabsWrapper = '.fd-tabs__wrapper ';
    tab = '.fd-tabs__item';
    fdTab = '.fd-tabs__wrapper .fd-tabs__item';
    fdTabFF = '.fd-tabs__link';
    chooseTabsBtn = this.SelectionExample + '.fd-button';
    collapsibleTab = 'fd-tab-list:nth-child(6) div.fd-tabs__item';
    addBtn = this.AddExample + 'button:nth-child(2)';
    removeBtn = this.AddExample + 'button:nth-child(3)';
    expandedList = '.cdk-overlay-container ';
    expandedListItem = this.expandedList + '.fd-menu__title';
    moreBtn = this.collapsibleOverflowExample + '.fd-tabs__item--overflow';
    tabPanel = this.collapsibleExample + '.fd-tabs__panel';

    // playground form
    modeSelect = '#playgroundmode ';
    iconOnlyMode = this.modeSelect + 'option:nth-child(2)';
    filterMode = this.modeSelect + 'option:nth-child(3)';
    compactCheckBox = '.fd-checkbox__label';
    threeTabsGroup = this.playGroundExample + '.fd-tabs';
    compactFilterModeClass = 'fd-tabs fd-tabs--filter fd-tabs--m fd-tabs--compact';
    titleField = '#playgroundtitle';
    counterField = '#playgroundcounter';
    icon1 = '#playgroundicon ';
    acceleratedIcon = this.icon1 + 'option:nth-child(2)';
    fdIcon = this.playGroundExample + 'fd-icon';

    open(): void {
        super.open(this.url);
        waitForElDisplayed(this.root);
        waitForPresent(this.title);
    }

    getScreenshotFolder(): object {
        return super.getScreenshotFolder(this.url);
    }

    saveExampleBaselineScreenshot(specName: string = 'tabs'): void {
        super.saveExampleBaselineScreenshot(specName, this.getScreenshotFolder());
    }

    compareWithBaseline(specName: string = 'tabs'): any {
        return super.compareWithBaseline(specName, this.getScreenshotFolder());
    }
}
