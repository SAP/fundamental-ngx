import { PlatformBaseComponentPo, waitForElDisplayed, waitForPresent } from '../../../../../e2e';

export class InputGroupPo extends PlatformBaseComponentPo {
    readonly url = '/input-group';
    readonly root = '#page-content';

    standartInputLabelsArr = 'fdp-input-group-standard-example label';
    standartInputArr = 'fdp-input-group-standard-example input';

    leftAlignedTextInput = 'fdp-input-group-standard-example [name="leftTextAddon"] input';
    leftAlignedTextInputTextAddon =
        'fdp-input-group-standard-example [name="leftTextAddon"] fdp-input-group-addon-body';

    rightAlignedTextInput = 'fdp-input-group-standard-example [name="rightTextAddon"] input';
    rightAlignedTextInputTextAddon =
        'fdp-input-group-standard-example [name="rightTextAddon"] fdp-input-group-addon-body';

    leftAndRightAlignedTextInput = 'fdp-input-group-standard-example [name="leftAndRightAddonsExample"] input';
    rightLeftAlignedTextInputTextAddon =
        'fdp-input-group-standard-example [name="leftAndRightAddonsExample"] fdp-input-group-addon-body';

    buttonInput = 'fdp-input-group-standard-example [name="donation"] input';
    buttonInputLeftAndRightTextAddon = 'fdp-input-group-standard-example [name="donation"] fdp-input-group-addon-body';
    buttonInputSubmitButton = 'fdp-input-group-standard-example [name="donation"] button';

    iconInput = 'fdp-input-group-standard-example [name="employee"] input';
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
    withFormInputQuestionMark = 'fdp-input-group-form-example .sap-icon--hint';
    withFormInputAsterixMark = 'fdp-input-group-form-example label span';
    withFormInputErrorTooltip = '[type="error"] span';
    withFormInputInfoTooltip = '.fd-inline-help__content';

    exampleAreaContainersArr = '.fd-doc-component';
    rtlSwitcherArr = 'rtl-switch .fd-switch__handle';

    async open(): Promise<void> {
        await super.open(this.url);
        await waitForPresent(this.root);
        await waitForElDisplayed(this.root);
    }

    async getScreenshotFolder(): Promise<Record<string, any>> {
        return super.getScreenshotFolder(this.url);
    }

    async saveExampleBaselineScreenshot(specName: string = 'input-group'): Promise<void> {
        await super.saveExampleBaselineScreenshot(specName, await this.getScreenshotFolder());
    }

    async compareWithBaseline(specName: string = 'input-group'): Promise<any> {
        return super.compareWithBaseline(specName, await this.getScreenshotFolder());
    }
}
