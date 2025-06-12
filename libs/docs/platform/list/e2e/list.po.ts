import { PlatformBaseComponentPo, waitForElDisplayed } from '@fundamental-ngx/e2e';

export class ListPo extends PlatformBaseComponentPo {
    // deletion examples
    deletionListItems = 'fdp-platform-list-with-delete-button-example .fd-list__item';
    deletionBtn = 'fdp-platform-list-with-delete-button-example button';
    // multi selection examples
    multiList = 'fdp-platform-list-with-selection-example fdp-list';
    multiToolbar = 'fdp-platform-list-with-selection-example fd-toolbar';
    multiCheckbox = 'fdp-platform-list-with-selection-example fd-checkbox';
    multiCheckBoxMark = 'fdp-platform-list-with-selection-example fdp-standard-list-item .fd-list__item';
    // navigation indicator examples
    navList = 'fdp-platform-list-with-navigation-example fdp-list';
    navListItems = 'fdp-platform-list-with-navigation-example .fd-list__item';
    navListLink = 'fdp-platform-list-with-navigation-example a';
    // virtual scroll examples:
    vScrollListItems = 'fdp-platform-list-with-infinite-scroll-example fdp-standard-list-item .fd-list__item';
    vScrollLoadIcon = 'fd-busy-indicator .fd-busy-indicator';
    // load on btn click examples
    loadList = 'fdp-platform-list-with-more-button-example fdp-list';
    loadListItems = 'fdp-platform-list-with-more-button-example .fd-list__item';
    loadShowMoreBtn = 'fdp-platform-list-with-more-button-example button';
    loadIcon = 'fd-busy-indicator .fd-busy-indicator';
    // button examples
    btnDeleteBtn = 'fdp-platform-list-with-buttons-example button[id^=delete]';
    btnEditBtn = 'fdp-platform-list-with-buttons-example button[id^=detail]';

    private url = '/list';

    async open(): Promise<void> {
        await super.open(this.url);
        await this.waitForRoot();
        await waitForElDisplayed(this.title);
    }

    async getScreenshotFolder(): Promise<Record<string, any>> {
        return super.getScreenshotFolder(this.url);
    }

    async saveExampleBaselineScreenshot(specName: string = 'list'): Promise<void> {
        await super.saveExampleBaselineScreenshot(specName, await this.getScreenshotFolder());
    }

    async compareWithBaseline(specName: string = 'list'): Promise<any> {
        return super.compareWithBaseline(specName, await this.getScreenshotFolder());
    }
}
