import { CoreBaseComponentPo, waitForElDisplayed, waitForPresent } from '../../../../../e2e';

export class PopoverPo extends CoreBaseComponentPo {
    private url = '/popover';

    avatar = 'fd-popover-example .fd-avatar--circle';
    programmaticAvatar = 'fd-popover-programmatic-open-example .fd-avatar--circle';
    popover = '.fd-popover__body';
    button = '.fd-button';
    option = 'li.fd-list__item';
    icon = 'fd-icon.sap-icon--menu2';
    iconMoney = 'i.sap-icon--money-bills ';
    standardMoneyButton = 'fd-button-bar .fd-button--standard';
    barElement = '.fd-bar__element';
    basicPopoverButton = 'fd-popover-example button';
    simplePopoverButton = 'fd-popover-trigger-example .fd-button--standard';
    popoverMessage = '.fd-popover__body--no-arrow div';
    headerPopoverButton = 'fd-popover-complex-example button';
    placementPopoverButton = 'fd-popover-placement-example button';
    programmaticControlButton = 'fd-popover-programmatic-open-example button';
    popoverDialogsButton = 'fd-popover-dialog-example button';
    popoverDialogsHeader = '.fd-title.fd-title--h5';
    multiInputButton = '.fd-multi-input button';
    multiInputOption = 'li.fd-list__item';
    multiInputSpan = '.no-text-select span';
    popoverDialogParagraph = 'fd-multi-input~p';
    clickMeButton = 'fd-dialog-body .fd-button--standard';
    popoverDialogMessage = '#fd-dialog-button-1';
    hoverElement = 'fd-popover-c-fill .fd-popover__control div';
    triggerButton2 = 'fd-popover-focus-example button';
    triggerButton = 'fd-popover-container-example button';
    popoverContainer = 'fd-popover-container-example div';
    scrollButton = 'fd-popover-scroll-example button';
    scrollMessage = '.fd-popover__body--no-arrow div';
    scrollCheckbox = 'fd-popover-scroll-example .fd-checkbox__label';
    plusButton = 'fd-popover-dynamic-example button';
    dynamicButton = '.fd-popover__body .fd-button';
    dropdownButton = 'fd-popover-dropdown-example button';
    dropdownOption = 'div.cdk-overlay-connected-position-bounding-box:last-of-type li.fd-list__item';
    cdkButton = 'fd-popover-cdk-placement-example button';
    segmentButton = '.fd-segmented-button';
    startButton = this.button + '[value="start"]';
    bottomButton = this.button + '[value="bottom"]';
    centerButton = this.button + '[value="center"]';
    topButton = this.button + '[value="top"]';
    endButton = this.button + '[value="end"]';
    dialogInput = 'fd-popover-control input';
    popoverNoArrow = '.fd-popover__body--no-arrow ';
    paragraph = 'p';
    triggerButtonContainer = 'fd-popover-container-example button';
    mobilePopoverButton = 'fd-dialog-body button';
    popoverMobileExample = 'fd-popover-mobile-example ';
    mobileInput = 'fd-dialog-body input';
    mobileFooterButton = 'fd-dialog-footer button';

    async open(): Promise<void> {
        await super.open(this.url);
        await waitForPresent(this.root);
        await waitForElDisplayed(this.title);
    }

    async getScreenshotFolder(): Promise<Record<string, any>> {
        return super.getScreenshotFolder(this.url);
    }

    async saveExampleBaselineScreenshot(specName: string = 'popover'): Promise<void> {
        await super.saveExampleBaselineScreenshot(specName, this.getScreenshotFolder());
    }

    async compareWithBaseline(specName: string = 'popover'): Promise<any> {
        return super.compareWithBaseline(specName, await this.getScreenshotFolder());
    }
}
