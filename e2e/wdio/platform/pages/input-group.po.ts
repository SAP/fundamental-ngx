import { BaseComponentPo } from './base-component.po';
import { webDriver } from '../../driver/wdio';

export class InputGroupPo extends BaseComponentPo {
    readonly url = '/input-group';
    readonly root = '#page-content';

    standartInputLabelsArr = 'fdp-input-group-standard-example p';


    leftAlignedTextInput = 'fdp-input-group-standard-example [name="leftTextAddon"]';
    leftAlignedTextInputTextAddon = 'fdp-input-group-standard-example [name="leftTextAddon"] fdp-input-group-addon-body';


    rightAlignedTextInput = 'fdp-input-group-standard-example ';
    rightAlignedTextInputTextAddon = 'fdp-input-group-standard-example [name="rightTextAddon"] fdp-input-group-addon-body';

    leftAndRightAlignedTextInput = 'fdp-input-group-standard-example [name="leftAndRightAddonsExample"] ';
    rightLeftAlignedTextInputTextAddon = 'fdp-input-group-standard-example [name="leftAndRightAddonsExample"] fdp-input-group-addon-body';

    buttonInput = 'fdp-input-group-standard-example [name="donation"] input';
    buttonInputLeftAndRightTextAddon = 'fdp-input-group-standard-example [name="donation"] fdp-input-group-addon-body';
    buttonInputSubmitButton = 'fdp-input-group-standard-example [name="donation"] button';



    iconInput = 'fdp-input-group-standard-example [name="employee"] ';
    iconInputEmailIcon = 'fdp-input-group-standard-example [name="employee"] fd-icon[title="Email"]';



    compactGroupInput = 'fdp-input-group-compact-example fdp-input-group input';
    compactGroupButtonAddon = 'fdp-input-group-compact-example [name="example"] button';
    compactGroupLeftTextAddon = 'fdp-input-group-compact-example [name="example"] fdp-input-group-addon-body';

    disabledInput = 'fdp-input-group-disabled-example fdp-input-group input';
    disabledInputButton = 'fdp-input-group-disabled-example fdp-input-group button';

    withFormInput = 'fdp-input-group-form-example input';
    withFormInputTextAddon = 'fdp-input-group-form-example fdp-input-group-addon-body';
    withFormInputButtonAddon = 'fdp-input-group-form-example fdp-input-group-addon-body button';
    withFormInputLabel = 'fdp-input-group-form-example label > span';
    withFormInputQuestionMark = 'fdp-input-group-form-example label span[role="alert"]';
    withFormInputAsterixMark = 'fdp-input-group-form-example label';
    withFormInputErrorTooltip = '[type="error"] span';


    open(): void {
        super.open(this.url);
        webDriver.waitForDisplayed(this.root);
    }

}
