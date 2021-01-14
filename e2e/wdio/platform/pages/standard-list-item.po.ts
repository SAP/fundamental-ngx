import { BaseComponentPo } from './base-component.po';
import { waitForElDisplayed, waitForPresent } from '../../driver/wdio';

export class StandardListItemPo extends BaseComponentPo {
    private url = '/standard-list-item';
    root = '#page-content';

    // noBorder examples
    sNoBorderList = 'fdp-non-byline-standard-list-item-example li';
    sNoBorderAttr = 'fdp-non-byline-standard-list-item-example fdp-list';
    // noBorder ByLine examples
    sNoBorderByLineList = 'fdp-borderless-standard-list-item-example li';
    sNoBorderByLineAttr = 'fdp-borderless-standard-list-item-example fdp-list';
    sNoBorderAvatar = 'fdp-borderless-standard-list-item-example fd-avatar';
    sNoBorderByLineSection = 'fdp-borderless-standard-list-item-example ul';
    // footer examples
    sFooterByLineList = 'fdp-standard-list-item-with-footer-example fdp-standard-list-item li';
    sFooterByLineAvatar = 'fdp-standard-list-item-with-footer-example fd-avatar';
    sFooter = 'fdp-standard-list-item-with-footer-example fdp-list-footer';
    sFooterList = 'fdp-standard-list-item-with-footer-example fdp-list-footer li';
    sFooterAttr = 'fdp-standard-list-item-with-footer-example ul';
    // group header examples
    sGroupHeaderList = 'fdp-standard-list-item-with-group-header-example li';
    sGroupHeaderAttr = 'fdp-standard-list-item-with-group-header-example ul';
    sGroupHeaderAvatar = 'fdp-standard-list-item-with-group-header-example fd-avatar';
    // interactive state examples
    sInteractiveAttr = 'fdp-standard-list-item-example fdp-list';
    sInteractiveList = 'fdp-standard-list-item-example li';
    sInteractiveLink = 'fdp-standard-list-item-example a';
    sInteractiveAvatar = 'fdp-standard-list-item-example fd-avatar';
    // secondary types examples
    sSecTypeAttr = 'fdp-standard-list-item-with-secondary-type-example fdp-list';
    sSecTypeList = 'fdp-standard-list-item-with-secondary-type-example li';
    sSecTypeAvatar = 'fdp-standard-list-item-with-secondary-type-example fd-avatar';
    sSecTypeListItem = 'fdp-standard-list-item-with-secondary-type-example fdp-standard-list-item';
    // multi select with toolbar examples
    sMultiAttr = 'fdp-standard-list-item-with-selection-example fdp-list';
    sMultiList = 'fdp-standard-list-item-with-selection-example li';
    sMultiAvatar = 'fdp-standard-list-item-with-selection-example fd-avatar';
    sMultiToolbar = 'fdp-standard-list-item-with-selection-example fd-toolbar';
    sMultiCheckbox = 'fdp-standard-list-item-with-selection-example fd-checkbox';
    // inverted secondary types examples
    sInvtAttr = 'fdp-standard-list-item-with-inverted-secondary-type-example fdp-list';
    sInvtList = 'fdp-standard-list-item-with-inverted-secondary-type-example li';
    sInvtAvatar = 'fdp-standard-list-item-with-inverted-secondary-type-example fd-avatar';
    sInvtListItem = 'fdp-standard-list-item-with-inverted-secondary-type-example fdp-standard-list-item';

    open(): void {
        super.open(this.url);
        waitForElDisplayed(this.root);
        waitForPresent(this.sNoBorderList);
    }
}
