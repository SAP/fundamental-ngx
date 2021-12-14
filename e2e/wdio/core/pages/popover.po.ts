import { CoreBaseComponentPo } from './core-base-component.po';
import { waitForElDisplayed } from '../../driver/wdio';

export class PopoverPo extends CoreBaseComponentPo {
    private url = '/popover';

    avatar = '.fd-avatar--circle';
    popover = 'ul.fd-list';
    button = '.fd-button';
    option = 'li.fd-list__item';
    icon = 'fd-icon.sap-icon--menu2';
    iconMoney = 'i.sap-icon--money-bills ';
    standardMoneyButton = 'fd-button-bar .fd-button--standard';
    barElement = '.fd-bar__element';
    basicPopoverButton = '#background-ex0 button';
    simplePopoverButton = '#background-ex1 .fd-button--standard';
    popoverMessage = '.fd-popover__popper--no-arrow div';
    headerPopoverButton = '#background-ex2 button';
    placementPopoverButton = '#background-ex3 button';
    programmaticControlButton = '#background-ex4 button';
    popoverDialogsButton = '#background-ex5 button';
    popoverDialogsHeader = '.fd-title.fd-title--h5';
    multiInputButton = '.fd-multi-input button';
    multiInputOption = 'li.fd-list__item';
    multiInputSpan = '.no-text-select span';
    popoverDialogParagraph = 'fd-multi-input~p';
    clickMeButton = 'fd-dialog-body button';
    popoverDialogMessage = '.fd-popover__popper div';
    hoverElement = 'fd-popover-c-fill .fd-popover__control div';
    triggerButton2 = '#background-ex8 button';
    triggerButton = '#background-ex7 button';
    popoverContainer = '#background-ex7 div';
    scrollButton = '#background-ex10 button';
    scrollMessage = '.fd-popover__popper--no-arrow div';
    plusButton = '#background-ex11 button';
    dynamicOption = '.fd-popover__popper .fd-nested-list__button';
    dynamicSubOption = '.level-2.fd-nested-list.ng-star-inserted li a span';
    dropdownButton = '#background-ex12 button';
    dropdownOption = '#cdk-overlay-6 li.fd-list__item';
    cdkButton = '#background-ex9 button';
    segmentButton = '.fd-segmented-button';
    startButton = this.button + '[value="start"]';
    bottomButton = this.button + '[value="bottom"]';
    centerButton = this.button + '[value="center"]';
    topButton = this.button + '[value="top"]';
    endButton = this.button + '[value="end"]';
    dialogInput = 'fd-popover-control input';
    popoverNoArrow = '.fd-popover__popper--no-arrow ';
    paragraph = 'p';
    triggerButtonContainer = 'fd-popover-container-example button';
    mobilePopoverButton = 'fd-dialog-body button';
    popoverMobileExample = 'fd-popover-mobile-example ';
    mobileInput = 'fd-dialog-body input';
    mobileFooterButton = 'fd-dialog-footer button';

    open(): void {
        super.open(this.url);
        waitForElDisplayed(this.avatar);
    }

    getScreenshotFolder(): Record<string, any> {
        return super.getScreenshotFolder(this.url);
    }

    saveExampleBaselineScreenshot(specName: string = 'popover'): void {
        super.saveExampleBaselineScreenshot(specName, this.getScreenshotFolder());
    }

    compareWithBaseline(specName: string = 'popover'): any {
        return super.compareWithBaseline(specName, this.getScreenshotFolder());
    }
}
