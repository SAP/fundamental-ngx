import { CoreBaseComponentPo } from './core-base-component.po';
import { waitForElDisplayed, waitForPresent } from '../../driver/wdio';

export class GridListPo extends CoreBaseComponentPo {
    private url = '/grid-list';
    root = '#page-content';

    layoutPattern = 'h2#layout-pattern';
    moreButton = '.fd-grid-list__more';
    moreButtonItems = 'fd-grid-list-more-example fd-grid-list fd-grid-list-item';
    footer = '.fd-grid-list__footer';
    gridListsArray = '.fd-doc-component';
    gridListsTitle = 'fd-toolbar label';
    deleteModeTitle = '[selectionmode="delete"] [title="Products"]';
    deleteItemButton = '[selectionmode="delete"] fd-grid-list-item button';
    multiSelectModeSelectedItems = 'fd-grid-list[selectionmode="multiSelect"] fd-grid-list-item .is-selected';
    multiSelectModeCheckboxes = 'fd-grid-list[selectionmode="multiSelect"] .fd-checkbox__label';
    singleSelectItems = '[selectionmode="singleSelect"] fd-grid-list-item > div';
    singleSelectItemsSelected = '[selectionmode="singleSelect"] fd-grid-list-item .is-selected';
    unreadStateItem = '[state="unread"] h6';
    errorStateItem = '.fd-object-status--negative';
    lockedStateItemButton = '[state="locked"] button';
    lockedStateItemText = '[state="locked"] .fd-button__text';
    draftStateItemButton = '[state="draft"] button';
    draftStateItemText = '[state="draft"] span';
    successStatusIndicator = '[status="success"] span';
    warningStatusIndicator = '[status="warning"] span';
    errorStatusIndicator = '[status="error"] span';
    neutralStatusIndicator = '[status="neutral"] span';
    dragAndDropItems = '#dnd + component-example fd-grid-list-item';
    dragAndDropItemTitles = '#dnd + component-example fd-grid-list-item .fd-title';
    gridListButtons = '.docs-tile-content-example button';
    gridListItem = 'fd-grid-list-item.ng-star-inserted div.fd-grid-list__item';
    gridListItemUnread = '.fd-grid-list__item--unread';
    gridListItemError = '.fd-grid-list__item--error';
    gridListItemLocked = '.fd-grid-list__item--locked';
    gridListItemDraft = '.fd-grid-list__item--draft';
    gridListItemStatus = 'div#fd-grid-list-8 fd-grid-list-item';
    gridListLinkStatus = 'div#fd-grid-list-8 a';
    gridListLink = 'a.fd-link';
    gridListToolbar = '.fd-toolbar.fd-toolbar--info ';
    gridListRadioButton = '.fd-grid-list__item-toolbar .fd-grid-list__radio-label';
    gridListCheckbox = '.fd-grid-list__checkbox-label';
    button = '.fd-button';

    gridListItemsByMode = (name: string): string => ` [selectionmode="${name}"] fd-grid-list-item`;

    open(): void {
        super.open(this.url);
        waitForPresent(this.root);
        waitForElDisplayed(this.title);
    }

    getScreenshotFolder(): Record<string, any> {
        return super.getScreenshotFolder(this.url);
    }

    saveExampleBaselineScreenshot(specName: string = 'grid-list'): void {
        super.saveExampleBaselineScreenshot(specName, this.getScreenshotFolder());
    }

    compareWithBaseline(specName: string = 'grid-list'): any {
        return super.compareWithBaseline(specName, this.getScreenshotFolder());
    }
}
