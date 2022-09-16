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

    open(): void {
        super.open(this.url);
        waitForPresent(this.root);
        waitForElDisplayed(this.title);
    }

    getScreenshotFolder(): Record<string, any> {
        return super.getScreenshotFolder(this.url);
    }

    saveExampleBaselineScreenshot(specName: string = 'avatar'): void {
        super.saveExampleBaselineScreenshot(specName, this.getScreenshotFolder());
    }

    compareWithBaseline(specName: string = 'avatar'): any {
        return super.compareWithBaseline(specName, this.getScreenshotFolder());
    }
}
