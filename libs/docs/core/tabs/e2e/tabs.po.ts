import { CoreBaseComponentPo, waitForElDisplayed } from '@fundamental-ngx/e2e';

export class TabsPo extends CoreBaseComponentPo {
    tabsExample = 'fd-tabs-example ';
    IconOnlyExample = 'fd-tab-icon-only-example ';
    ProcessExample = 'fd-tab-process-example ';
    FilterExample = 'fd-tab-filter-example ';
    SelectionExample = 'fd-tab-selection-example ';
    AddExample = 'fd-adding-tab-example ';
    collapsibleOverflowExample = 'fd-tab-collapsible-overflow-example ';
    stackendContentExample = 'fd-stacked-content-example ';
    collapsibleExample = 'fd-tab-collapsible-example ';
    playGroundExample = 'playground ';
    tabsWrapper = '.fd-overflow-layout__items ';
    tab = '.fd-tabs__item';
    fdTab = '.fd-overflow-layout__items .fd-tabs__item';
    fdTabFF = '.fd-tabs__link';
    tabCount = '.fd-tabs__count';
    tabTitle = '.fd-tabs__tag';
    chooseTabsBtn = this.SelectionExample + '.fd-button';
    collapsibleTab = 'fd-tab-list:nth-child(4) div.fd-tabs__item';
    addBtn = this.AddExample + 'button:nth-child(1)';
    removeBtn = this.AddExample + 'button:nth-child(2)';
    expandedList = '.cdk-overlay-container ';
    expandedListItem = this.expandedList + '.fd-menu__title';
    moreBtn = this.collapsibleOverflowExample + 'fd-tab-list:nth-child(4) ' + '.fd-tabs__item--overflow';

    // playground form
    modeSelect = '#playgroundmode ';
    iconOnlyMode = this.modeSelect + 'option:nth-child(2)';
    filterMode = this.modeSelect + 'option:nth-child(3)';
    compactCheckBox = '.fd-checkbox__label';
    threeTabsList = this.playGroundExample + 'fd-tab-list';
    threeTabsGroup = this.playGroundExample + '.fd-tabs';
    compactFilterModeClass = 'fd-tabs fd-tabs--filter fd-tabs--m fd-tabs--compact';
    titleField = '#playgroundtitle';
    counterField = '#playgroundcounter';
    iconSelect = '#playgroundicon ';
    accidentalLeaveIcon = this.iconSelect + 'option:nth-child(2)';
    fdIcon = this.playGroundExample + 'fd-icon';

    private url = '/tabs';

    async open(): Promise<void> {
        await super.open(this.url);
        await this.waitForRoot();
        await waitForElDisplayed(this.title);
    }

    async getScreenshotFolder(): Promise<Record<string, any>> {
        return super.getScreenshotFolder(this.url);
    }

    async saveExampleBaselineScreenshot(specName: string = 'tabs'): Promise<void> {
        await super.saveExampleBaselineScreenshot(specName, this.getScreenshotFolder());
    }

    async compareWithBaseline(specName: string = 'tabs'): Promise<any> {
        return super.compareWithBaseline(specName, await this.getScreenshotFolder());
    }
}
