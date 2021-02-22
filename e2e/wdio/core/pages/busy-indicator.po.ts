import { CoreBaseComponentPo } from './core-base-component.po';
import { waitForElDisplayed, waitForPresent } from '../../driver/wdio';

export class BusyIndicatorPo extends CoreBaseComponentPo {
    private url = '/busyIndicator';
    root = '#page-content';
    disableButton = 'br~br~button';
    formName = 'input[id="name"]';
    formSurname = 'input[id="surname"]';
    formPassword = 'input[id="password"]';
    saveButton = 'h5~fd-busy-indicator button';
    enableLoadButton = 'br~br~button span';
    saveIndicator = 'button~div.fd-busy-indicator';
    formIndicator = 'form~div.fd-busy-indicator';
    smallIndicator = '.fd-busy-indicator--s';
    middleIndicator = '.fd-busy-indicator.fd-busy-indicator--m';
    largeIndicator = '.fd-busy-indicator.fd-busy-indicator--l';

    open(): void {
        super.open(this.url);
        waitForElDisplayed(this.root);
        waitForPresent(this.disableButton);
    }
}
