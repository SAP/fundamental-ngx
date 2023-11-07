// eslint-disable-next-line @nx/enforce-module-boundaries
import { CoreBaseComponentPo, waitForElDisplayed } from '../../../../../e2e';

export class AvatarGroupLegacyPo extends CoreBaseComponentPo {
    private url = '/avatar-group-legacy';

    firstExampleAvatar = 'fd-avatar-group-legacy-individual-type-example fd-avatar';
    usedDetailsPopup = '.fd-form-item';
    usedGroupDetailsPopup = '.fd-avatar-group-legacy__overflow-body';
    secondExampleAvatar = 'fd-avatar-group-legacy-group-type-example .fd-avatar-group-legacy__item';
    popoverUserAvatar = 'fd-popover-body .fd-avatar';
    individualCard = 'fd-popover-body fd-quick-view';
    contactLinks = 'fd-quick-view-group-item a';

    async open(): Promise<void> {
        await super.open(this.url);
        await this.waitForRoot();
        await waitForElDisplayed(this.title);
    }

    async getScreenshotFolder(): Promise<Record<string, any>> {
        return super.getScreenshotFolder(this.url);
    }

    async saveExampleBaselineScreenshot(specName: string = 'avatar-group-legacy'): Promise<void> {
        await super.saveExampleBaselineScreenshot(specName, this.getScreenshotFolder());
    }

    async compareWithBaseline(specName: string = 'avatar-group-legacy'): Promise<any> {
        return super.compareWithBaseline(specName, await this.getScreenshotFolder());
    }
}
