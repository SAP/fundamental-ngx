// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { CoreBaseComponentPo, waitForElDisplayed, waitForPresent } from '../../../../../e2e';

export class DialogPo extends CoreBaseComponentPo {
    url = '/dialog';
    root = '#page-content';

    // example selectors
    templateDialog = 'fd-template-based-dialog-example ';
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
    formDialog = 'fd-form-dialog-example ';

    // main selectors
    dialog = 'fd-dialog.fd-dialog--active ';
    button = 'button';
    dialogOutput = 'p';
    busyIndicator = 'fd-busy-indicator';
    // works by the same way, just need use different according to specific dialogs
    dialogContainer = this.dialog + '.cdk-drag';
    dialogContainer2 = this.dialog + '.cdk-drag-disabled';
    resizeHandle = this.dialog + '.fd-dialog__resize-handle';
    dialogItems = this.dialog + '.fd-list__item';
    searchBar = this.dialog + 'input';
    dialogCartOutput = this.dialog + 'footer .fd-bar__element';
    checkboxes = 'fd-checkbox label';
    inputFields = '.form-group input';
    dialogBody = this.dialog + 'fd-dialog-body';
    dialogInput = this.dialog + 'input';
    formExampleResult = this.formDialog + 'p';

    open(): void {
        super.open(this.url);
        waitForPresent(this.root);
        waitForElDisplayed(this.title);
    }

    getScreenshotFolder(): Record<string, any> {
        return super.getScreenshotFolder(this.url);
    }

    saveExampleBaselineScreenshot(specName: string = 'dialog'): void {
        super.saveExampleBaselineScreenshot(specName, this.getScreenshotFolder());
    }

    compareWithBaseline(specName: string = 'dialog'): any {
        return super.compareWithBaseline(specName, this.getScreenshotFolder());
    }
}
