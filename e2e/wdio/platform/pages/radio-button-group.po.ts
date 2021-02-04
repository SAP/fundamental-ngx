import { BaseComponentPo } from './base-component.po';
import { waitForElDisplayed, waitForPresent } from '../../driver/wdio';

export class RadioButtonGroupPage extends BaseComponentPo {
    url = '/radio-group';
    root = '#page-content';
    containersArr = 'component-example .fd-container';
    selectedValueLabel = '//p[contains(text(), "Selected")]';
    preferredBrandLabel = '//p[contains(text(), "Preferred Brand:")]';
    radioButtonForm = '.fd-form-group fdp-input-message-group';
    radioButtons = 'fd-form-group .fd-form-item label.fd-radio__label';
    formGroup = 'fd-form-group[role=radiogroup]';
    errorMessage = '.is-error';

    radioButtonInputByName = (name: number = 0) => {
        return `[id="fd-popover-${name}"] input`;
    };

    radioButtonLabelByName = (name: number = 0) => {
        return `[id="fd-popover-${name}"] label`;
    };

    actionButtonByName = (name: number = 8) => {
        return `#fdp-id-${name}`;
    };

    open(): void {
        super.open(this.url);
        waitForElDisplayed(this.root);
        waitForPresent(this.formGroup);
    }
}
