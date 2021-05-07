import { CoreBaseComponentPo } from './core-base-component.po';
import { waitForElDisplayed, waitForPresent } from '../../driver/wdio';

export class AvatarGroupPo extends CoreBaseComponentPo {
    private url = '/avatar-group';
    root = '#page-content';

    firstExampleAvatar = '#background-ex0 fd-avatar';
    // usedDetailsPopup = '.fd-quick-view__content';
    usedDetailsPopup = '.fd-form-item';
    usedGroupDetailsPopup = '.fd-avatar-group__overflow-body';
    secondExampleAvatar = '#background-ex1 .fd-avatar-group__item';

    open(): void {
        super.open(this.url);
        waitForElDisplayed(this.root);
        waitForPresent(this.title);
    }

    getScreenshotFolder(): object {
        return super.getScreenshotFolder(this.url);
    }

    saveExampleBaselineScreenshot(specName: string = 'avatar-group'): void {
        super.saveExampleBaselineScreenshot(specName, this.getScreenshotFolder());
    }

    compareWithBaseline(specName: string = 'avatar-group'): any {
        return super.compareWithBaseline(specName, this.getScreenshotFolder());
    }
}
