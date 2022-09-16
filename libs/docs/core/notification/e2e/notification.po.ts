import { CoreBaseComponentPo, waitForElDisplayed, waitForPresent } from '../../../../../e2e';

export class NotificationPo extends CoreBaseComponentPo {
    private url = '/notification';

    defaultExample = 'fd-notification-options-example ';
    openTemplateExample = 'fd-notification-open-template-example ';
    asContentExample = 'fd-notification-component-as-content-example ';
    groupExample = 'fd-notification-group-example ';
    cdkOverlay = '.cdk-overlay-container ';

    notificationContainer = '.fd-notification-container ';
    notification = '.fd-notification ';
    button = '.fd-button';
    openButton = this.button + '[label="Open"]';
    closeButton = this.button + '[glyph="decline"]';

    actionSheetItem = '.fd-action-sheet__item';

    approveButton = this.actionSheetItem + '[label="Approve"]';
    rejectButton = this.actionSheetItem + '[label="Reject"]';
    forwardButton = this.actionSheetItem + '[label="Forward"]';
    cancelButton = this.actionSheetItem + '[label="Cancel"]';
    overflowButton = this.button + '[glyph="overflow"]';

    tabPanel = '.fd-tabs__panel';
    tabsItem = '.fd-tabs__item';
    notificationHeader = '.fd-notification__group-header ';
    notificationBody = '.fd-notification__body ';
    result = 'span:nth-child(2)';
    notificationActions = '.fd-notification__actions ';
    messageStrip = '.fd-message-strip ';
    notificationIndicator = this.notificationBody + '.fd-notification__indicator';
    avatar = this.notificationBody + '.fd-avatar';
    messageToast = '.fd-message-toast';

    open(): void {
        super.open(this.url);
        waitForPresent(this.root);
        waitForElDisplayed(this.title);
    }
}
