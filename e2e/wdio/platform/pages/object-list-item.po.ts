import { BaseComponentPo } from './base-component.po';
import { waitForElDisplayed, waitForPresent } from '../../driver/wdio';

export class ObjectListItemPo extends BaseComponentPo {
    private url = '/object-list-item';
    root = '#page-content';

    // selectors for all items on the page
    allObjsList = 'fdp-object-list-item li';
    allObjAvatars = 'fdp-object-list-item fd-avatar';
    allObjNumbers = 'fdp-object-list-item fd-object-number';
    allObjIcons = 'fdp-object-list-item i';
    allObjTitles = 'fdp-object-list-item fd-object-identifier';
    allObjAttrStatusRows = 'fdp-object-list-item fdp-object-list-item-row';
    // object list item examples
    objListAttr = 'fdp-borderless-object-list-item-example fdp-list';
    objListItem = 'fdp-borderless-object-list-item-example li';
    obJListIntro = 'fdp-borderless-object-list-item-example .fd-object-list__intro';
    objListAttributes = 'fdp-borderless-object-list-item-example fdp-object-list-item:first-of-type fdp-object-attribute';
    objListStatuses = 'fdp-borderless-object-list-item-example fdp-object-list-item:first-of-type .fd-object-status';
    // obj list item with row selection examples
    objListSelItem = 'fdp-object-list-item-with-row-selection-example li';
    obJListSelIntro = 'fdp-object-list-item-with-row-selection-example .fd-object-list__intro';
    objListSelAttributes = 'fdp-object-list-item-with-row-selection-example fdp-object-attribute';
    objListSelStatuses = 'fdp-object-list-item-with-row-selection-example .fd-object-status';
    objSelToolbar = 'fdp-object-list-item-with-row-selection-example fd-toolbar';
    // obj navigation examples
    objNavLink = 'fdp-object-list-item-with-row-navigation-example a';
    objNavList = 'fdp-object-list-item-with-row-navigation-example li';
    objNavAttributes = 'fdp-object-list-item-with-row-navigation-example fdp-object-attribute';
    objNavStatuses = 'fdp-object-list-item-with-row-navigation-example .fd-object-status';
    // row selection and navigation examples
    objRowNavLink = 'fdp-object-list-item-with-row-selection-and-navigation-example a';
    objRowNavList = 'fdp-object-list-item-with-row-selection-and-navigation-example li';
    objRowNavAttributes = 'fdp-object-list-item-with-row-selection-and-navigation-example fdp-object-attribute';
    objRowNavStatuses = 'fdp-object-list-item-with-row-selection-and-navigation-example .fd-object-status';
    objRowNavToolbar = 'fdp-object-list-item-with-row-selection-and-navigation-example fd-toolbar';
    // declarative examples
    objDecIntro = 'fdp-object-list-item-example .fd-object-list__intro';
    objDecAttributes = 'fdp-object-list-item-example fdp-object-attribute';
    objDecStatuses = 'fdp-object-list-item-example .fd-object-status';

    open(): void {
        super.open(this.url);
        waitForElDisplayed(this.root);
        waitForPresent(this.allObjsList);
    }
}
