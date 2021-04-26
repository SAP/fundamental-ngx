import { CoreBaseComponentPo } from './core-base-component.po';
import { waitForElDisplayed } from '../../driver/wdio';

export class NotificationPo extends CoreBaseComponentPo {
    private url = '/notification';
    root = '#page-content';

    notificationButton = '.fd-doc-component button.fd-button--standard';
    notificationBlock = 'fd-notification.fd-notification-custom-block';
    closeButton = 'button.fd-notification__close';
    moreInfoButton = 'fd-notification-footer button.fd-button--transparent';
    approveButton = '.fd-button--positive';
    cancelButton = '.fd-notification__actions button.fd-button--negative';
    notificationTitle = 'h3.fd-notification__title';
    notificationDescription = 'div.fd-notification__description';
    notificationMetadata = 'div.fd-notification__metadata';
    notificationAvatar = '.fd-avatar.fd-avatar--s';
    notificationIndicator = 'div.fd-notification__indicator--information';
    successIndicator = 'div.fd-notification__indicator--success';
    warningIndicator = 'div.fd-notification__indicator--warning';
    notificationSpan = 'button~span';


    open(): void {
        super.open(this.url);
        waitForElDisplayed(this.root);
        waitForElDisplayed(this.notificationButton);
    };

    getScreenshotFolder(): object {
        return super.getScreenshotFolder(this.url);
    }

    saveExampleBaselineScreenshot(specName: string = 'notification'): void {
        super.saveExampleBaselineScreenshot(specName, this.getScreenshotFolder());
    }

    compareWithBaseline(specName: string = 'notification'): any {
        return super.compareWithBaseline(specName, this.getScreenshotFolder());
    }
}
