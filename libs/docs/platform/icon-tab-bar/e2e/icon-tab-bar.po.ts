import { PlatformBaseComponentPo, waitForElDisplayed, waitForPresent } from '../../../../../e2e';

export class IconTabBarPO extends PlatformBaseComponentPo {
    url = '/icon-tab-bar';

    textExample = 'fd-icon-tab-bar-text-type-example#textExample ';
    columnsExample = 'fd-icon-tab-bar-text-type-example#columnsExample ';
    iconOnlyExample = 'fd-icon-tab-bar-icon-only-type-example ';
    iconExample = 'fd-icon-tab-bar-icon-type-example#iconExample ';
    filterExample = 'fd-icon-tab-bar-filter-type-example ';
    processExample = 'fdp-icon-tab-bar-process-type ';
    nestedTabsExample = 'fd-icon-tab-bar-text-type-example#nestedTabsExample ';
    reorderingExample = 'fd-icon-tab-bar-text-type-example#reorderingExample ';
    overflowingExample = 'fd-icon-tab-bar-icon-type-example#overflowingExample ';
    configuratablePaddingsExample = 'fd-platform-icon-tab-bar-configurable-paddings-example ';

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
    popoverTab = '.fd-popover__popper span';

    open(): void {
        super.open(this.url);
        waitForPresent(this.root);
        waitForElDisplayed(this.title);
    }
}
