import { BaseComponentPo } from './base-component.po';
import { waitForElDisplayed, waitForPresent } from '../../driver/wdio';

export class IconTabBarPO extends BaseComponentPo {
    url = '/icon-tab-bar';
    
    textExample = '#background-ex0 ';
    columnsExample = '#background-ex1 ';
    iconOnlyExample = '#background-ex2 ';
    iconExample = '#background-ex3 ';
    filterExample = '#background-ex4 ';
    processExample = '#background-ex5 ';
    nestedTabsExample = '#background-ex6 ';
    reorderingExample = '#background-ex7 ';
    overflowingExample = '#background-ex8 ';
    configuratablePaddingsExample = '#background-ex9 ';

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

    open(): void {
        super.open(this.url);
        waitForPresent(this.root);
        waitForElDisplayed(this.title);
    }
}
