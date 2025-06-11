import { CoreBaseComponentPo, waitForElDisplayed } from '@fundamental-ngx/e2e';

export class VerticalNavigationPo extends CoreBaseComponentPo {
    defaultExample = 'fd-vertical-navigation-default-example ';
    condensedExample = 'fd-vertical-navigation-condensed-example ';
    textOnlyExample = 'fd-vertical-navigation-no-icons-example ';
    groupingExample = 'fd-vertical-navigation-grouping-example ';

    listItem = '.fd-list__navigation-item';
    itemText = '.fd-list__navigation-item-text';
    itemIcon = '.fd-list__navigation-item-icon';
    expandArrow = '.fd-list__navigation-item-arrow';
    expandableItem = '.fd-list__navigation-item--expandable ';
    expandableItemText = this.expandableItem + this.itemText;
    hiddenItem = this.expandableItem + this.listItem;
    groupHeader = '.fd-list__group-header';

    private url = '/vertical-navigation';

    async open(): Promise<void> {
        await super.open(this.url);
        await this.waitForRoot();
        await waitForElDisplayed(this.title);
    }
}
