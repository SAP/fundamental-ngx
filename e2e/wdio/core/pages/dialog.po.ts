import { CoreBaseComponentPo } from './core-base-component.po';
import { waitForElDisplayed, waitForPresent } from '../../driver/wdio';

export class DialogPo extends CoreBaseComponentPo {
    url = '/dialog';
    root = '#page-content';

    // example selectors
    templateDialog = 'fd-dialog-open-template-example ';
    componentDialog = 'fd-component-based-dialog-example ';
    objectDialog = 'fd-dialog-object-example ';
    stateDialog = 'fd-dialog-state-example ';
    configurationDialog = 'fd-dialog-configuration-example ';
    positionDialog = 'fd-dialog-position-example ';
    mobileDialog = 'fd-dialog-mobile-example ';
    complexDialog = 'fd-dialog-complex-example ';
    stackedDialog = 'fd-dialog-stacked-example ';
    customDialog = 'fd-dialog-backdrop-container-example ';
    playgroundDialog = 'playground ';
    dialogExamples = 'component-example ';

    // main selectors
    dialog = 'fd-dialog.fd-dialog--active ';
    button = 'button';
    dialogOutput = 'p';
    busyIndicator = 'fd-busy-indicator';
    dialogContainer = this.dialog + '.cdk-drag';
    resizeHandle = this.dialog + '.fd-dialog__resize-handle';
    dialogItems = this.dialog + 'li';
    searchBar = this.dialog + 'input';
    dialogCartOutput = this.dialog + 'footer .fd-bar__element';
    checkboxes = 'fd-checkbox label';
    inputFields = '.form-group input';
    dialogBody = this.dialog + 'fd-dialog-body';

    open(): void {
        super.open(this.url);
        waitForElDisplayed(this.root);
        waitForPresent(this.title);
    }

    getScreenshotFolder(): object {
        return super.getScreenshotFolder(this.url);
    }

    saveExampleBaselineScreenshot(specName: string = 'dialog'): void {
        super.saveExampleBaselineScreenshot(specName, this.getScreenshotFolder());
    }

    compareWithBaseline(specName: string = 'dialog'): any {
        return super.compareWithBaseline(specName, this.getScreenshotFolder());
    }
}
