import { CoreBaseComponentPo } from './core-base-component.po';
import { waitForElDisplayed, waitForPresent } from '../../driver/wdio';

export class AvatarGroupPo extends CoreBaseComponentPo {
    private url = '/avatar-group';

    firstExampleAvatar = '#background-ex0 fd-avatar';
    usedDetailsPopup = '.fd-form-item';
    usedGroupDetailsPopup = '.fd-avatar-group__overflow-body';
    secondExampleAvatar = '#background-ex1 .fd-avatar-group__item';
    popoverUserAvatar = 'fd-popover-body .fd-avatar';
    individualCard = 'fd-popover-body fd-quick-view';
    contactLinks = 'fd-quick-view-group-item a';

    open(): void {
        super.open(this.url);
        waitForElDisplayed(this.root);
        waitForPresent(this.title);
    }

    getScreenshotFolder(): Record<string, any> {
        return super.getScreenshotFolder(this.url);
    }

    saveExampleBaselineScreenshot(specName: string = 'avatar-group'): void {
        super.saveExampleBaselineScreenshot(specName, this.getScreenshotFolder());
    }

    compareWithBaseline(specName: string = 'avatar-group'): any {
        return super.compareWithBaseline(specName, this.getScreenshotFolder());
    }
}
