// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { CoreBaseComponentPo, waitForElDisplayed, waitForPresent } from '../../../../../e2e';

export class AvatarPo extends CoreBaseComponentPo {
    private url = '/avatar';
    root = '#page-content';

    avatarInitials = 'fd-avatar-initials-example .fd-avatar';
    circleAvatar = 'fd-avatar-circle-example .fd-avatar';
    borderAvatar = 'fd-avatar-borders-example .fd-avatar';
    zoomAvatar = 'fd-avatar-zoom-icon-example .fd-avatar';
    zoomIcon = ' .fd-avatar__zoom-icon';
    avatarTile = 'fd-avatar-tile-example .fd-avatar';
    placeholderAvatar = 'fd-avatar-placeholder-example .fd-avatar';
    transparentAvatar = 'fd-avatar-transparent-example .fd-avatar';
    colorAvatar = 'fd-avatar-accent-colors-example .fd-avatar';

    async open(): Promise<void> {
        await super.open(this.url);
        await waitForPresent(this.root);
        await waitForElDisplayed(this.title);
    }

    async getScreenshotFolder(): Promise<Record<string, any>> {
        return super.getScreenshotFolder(this.url);
    }

    async saveExampleBaselineScreenshot(specName: string = 'avatar'): Promise<void> {
        await super.saveExampleBaselineScreenshot(specName, this.getScreenshotFolder());
    }

    async compareWithBaseline(specName: string = 'avatar'): Promise<any> {
        return super.compareWithBaseline(specName, await this.getScreenshotFolder());
    }
}
