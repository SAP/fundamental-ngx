import { PlatformBaseComponentPo, waitForElDisplayed } from '../../../../../e2e';

export class IconTabBarPO extends PlatformBaseComponentPo {
    url = '/icon-tab-bar';

    textExample = 'fdp-platform-icon-tab-bar-text-type-example#textExample ';
    columnsExample = 'fdp-platform-icon-tab-bar-text-type-example#columnsExample ';
    iconOnlyExample = 'fdp-platform-icon-tab-bar-icon-only-type-example ';
    iconExample = 'fdp-platform-icon-tab-bar-icon-type-example#iconExample ';
    filterExample = 'fdp-platform-icon-tab-bar-filter-type-example ';
    processExample = 'fdp-platform-icon-tab-bar-process-type-example ';
    nestedTabsExample = 'fdp-platform-icon-tab-bar-text-type-example#nestedTabsExample ';
    reorderingExample = 'fdp-platform-icon-tab-bar-text-type-example#reorderingExample ';
    overflowingExample = 'fdp-platform-icon-tab-bar-icon-type-example#overflowingExample ';
    configuratablePaddingsExample = 'fdp-platform-icon-tab-bar-configurable-paddings-example ';

    tabBarItem = '.fd-icon-tab-bar__item';
    tabBarTab = ' .fd-icon-tab-bar__tab';
    tabBar = '.fd-icon-tab-bar';
    icon = ' fd-icon';
    label = this.tabBarItem + '.fd-icon-tab-bar__label ';
    counter = this.tabBarItem + '.fd-icon-tab-bar__counter';
    processIcon = '.sap-icon--process';
    overflowButton = this.overflowingExample + '.fd-icon-tab-bar__overflow';
    expandedList = '.cdk-overlay-container ';
    listItem = this.expandedList + '.fd-icon-tab-bar__list-item';
    span = ' span';
    popoverTab = '.fd-popover__body span';

    async open(): Promise<void> {
        await super.open(this.url);
        await this.waitForRoot();
        await waitForElDisplayed(this.title);
    }
}
