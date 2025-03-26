import { PlatformBaseComponentPo, waitForElDisplayed } from '../../../../../e2e';

export class ObjectListItemPo extends PlatformBaseComponentPo {
    root = '#page-content';

    // selectors for all items on the page
    allObjsList = 'fdp-object-list-item .fd-list__item';
    allObjAvatars = 'fdp-object-list-item fd-avatar';
    allObjNumbers = 'fdp-object-list-item fd-object-number';
    allObjIcons = 'fdp-object-list-item i';
    allObjTitles = 'fdp-object-list-item fd-object-identifier';
    allObjAttrStatusRows = 'fdp-object-list-item fdp-object-list-item-row';
    // object list item examples
    objListAttr = 'fdp-platform-object-list-item-border-less-example fdp-list';
    objListItem = 'fdp-platform-object-list-item-border-less-example .fd-list__item';
    obJListIntro = 'fdp-platform-object-list-item-border-less-example .fd-object-list__intro';
    objListAttributes =
        'fdp-platform-object-list-item-border-less-example fdp-object-list-item:first-of-type fd-object-attribute';
    objListStatuses =
        'fdp-platform-object-list-item-border-less-example fdp-object-list-item:first-of-type .fd-object-status';
    // obj list item with row selection examples
    objListSelItem = 'fdp-platform-object-list-item-with-row-selection-example .fd-list__item';
    obJListSelIntro = 'fdp-platform-object-list-item-with-row-selection-example .fd-object-list__intro';
    objListSelAttributes = 'fdp-platform-object-list-item-with-row-selection-example fd-object-attribute';
    objListSelStatuses = 'fdp-platform-object-list-item-with-row-selection-example .fd-object-status';
    objSelToolbar = 'fdp-platform-object-list-item-with-row-selection-example fd-toolbar';
    // obj navigation examples
    objNavLink = 'fdp-platform-object-list-item-with-row-navigation-example a';
    objNavList = 'fdp-platform-object-list-item-with-row-navigation-example .fd-list__item';
    objNavAttributes = 'fdp-platform-object-list-item-with-row-navigation-example fd-object-attribute';
    objNavStatuses = 'fdp-platform-object-list-item-with-row-navigation-example .fd-object-status';
    // row selection and navigation examples
    objRowNavLink = 'fdp-platform-object-list-item-with-row-selection-and-navigation-example a';
    objRowNavList = 'fdp-platform-object-list-item-with-row-selection-and-navigation-example .fd-list__item';
    objRowNavAttributes = 'fdp-platform-object-list-item-with-row-selection-and-navigation-example fd-object-attribute';
    objRowNavStatuses = 'fdp-platform-object-list-item-with-row-selection-and-navigation-example .fd-object-status';
    objRowNavToolbar = 'fdp-platform-object-list-item-with-row-selection-and-navigation-example fd-toolbar';
    // declarative examples
    objDecIntro = 'fdp-platform-object-list-item-example .fd-object-list__intro';
    objDecAttributes = 'fdp-platform-object-list-item-example fd-object-attribute';
    objDecStatuses = 'fdp-platform-object-list-item-example .fd-object-status';

    private url = '/object-list-item';

    async open(): Promise<void> {
        await super.open(this.url);
        await this.waitForRoot();
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
