import { PlatformBaseComponentPo, waitForElDisplayed, waitForPresent } from '../../../../../e2e';

export class ObjectListItemPo extends PlatformBaseComponentPo {
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
    objListAttr = 'fdp-platform-object-list-item-border-less-example fdp-list';
    objListItem = 'fdp-platform-object-list-item-border-less-example li';
    obJListIntro = 'fdp-platform-object-list-item-border-less-example .fd-object-list__intro';
    objListAttributes =
        'fdp-platform-object-list-item-border-less-example fdp-object-list-item:first-of-type fdp-object-attribute';
    objListStatuses =
        'fdp-platform-object-list-item-border-less-example fdp-object-list-item:first-of-type .fd-object-status';
    // obj list item with row selection examples
    objListSelItem = 'fdp-platform-object-list-item-with-row-selection-example li';
    obJListSelIntro = 'fdp-platform-object-list-item-with-row-selection-example .fd-object-list__intro';
    objListSelAttributes = 'fdp-platform-object-list-item-with-row-selection-example fdp-object-attribute';
    objListSelStatuses = 'fdp-platform-object-list-item-with-row-selection-example .fd-object-status';
    objSelToolbar = 'fdp-platform-object-list-item-with-row-selection-example fd-toolbar';
    // obj navigation examples
    objNavLink = 'fdp-platform-object-list-item-with-row-navigation-example a';
    objNavList = 'fdp-platform-object-list-item-with-row-navigation-example li';
    objNavAttributes = 'fdp-platform-object-list-item-with-row-navigation-example fdp-object-attribute';
    objNavStatuses = 'fdp-platform-object-list-item-with-row-navigation-example .fd-object-status';
    // row selection and navigation examples
    objRowNavLink = 'fdp-platform-object-list-item-with-row-selection-and-navigation-example a';
    objRowNavList = 'fdp-platform-object-list-item-with-row-selection-and-navigation-example li';
    objRowNavAttributes =
        'fdp-platform-object-list-item-with-row-selection-and-navigation-example fdp-object-attribute';
    objRowNavStatuses = 'fdp-platform-object-list-item-with-row-selection-and-navigation-example .fd-object-status';
    objRowNavToolbar = 'fdp-platform-object-list-item-with-row-selection-and-navigation-example fd-toolbar';
    // declarative examples
    objDecIntro = 'fdp-platform-object-list-item-example .fd-object-list__intro';
    objDecAttributes = 'fdp-platform-object-list-item-example fdp-object-attribute';
    objDecStatuses = 'fdp-platform-object-list-item-example .fd-object-status';

    async open(): Promise<void> {
        await super.open(this.url);
        await waitForPresent(this.root);
        await waitForElDisplayed(this.title);
    }

    async getScreenshotFolder(): Promise<Record<string, any>> {
        return super.getScreenshotFolder(this.url);
    }

    async saveExampleBaselineScreenshot(specName: string = 'object-list-item'): Promise<void> {
        await super.saveExampleBaselineScreenshot(specName, await this.getScreenshotFolder());
    }

    async compareWithBaseline(specName: string = 'object-list-item'): Promise<any> {
        return super.compareWithBaseline(specName, await this.getScreenshotFolder());
    }
}
