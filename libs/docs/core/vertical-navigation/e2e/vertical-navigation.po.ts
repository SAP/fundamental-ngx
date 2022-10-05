import { CoreBaseComponentPo, waitForElDisplayed, waitForPresent } from '../../../../../e2e';

export class VerticalNavigationPo extends CoreBaseComponentPo {
    private url = '/vertical-navigation';

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

    async open(): Promise<void> {
        await super.open(this.url);
        await waitForPresent(this.root);
        await waitForElDisplayed(this.title);
    }
}
