import { PlatformBaseComponentPo, waitForElDisplayed } from '@fundamental-ngx/e2e';

export class InputGroupPo extends PlatformBaseComponentPo {
    readonly url = '/input-group';
    readonly root = '#page-content';

    standartInputLabelsArr = 'fdp-input-group-standard-example label';
    standartInputArr = 'fdp-input-group-standard-example input';

    leftAlignedTextInput = 'fdp-input-group-standard-example [name="leftTextAddon"] input';
    leftAlignedTextInputTextAddon = 'fdp-input-group-standard-example [name="leftTextAddon"] .fd-input-group__addon';

    rightAlignedTextInput = 'fdp-input-group-standard-example [name="rightTextAddon"] input';
    rightAlignedTextInputTextAddon = 'fdp-input-group-standard-example [name="rightTextAddon"] .fd-input-group__addon';

    leftAndRightAlignedTextInput = 'fdp-input-group-standard-example [name="leftAndRightAddonsExample"] input';
    rightLeftAlignedTextInputTextAddon =
        'fdp-input-group-standard-example [name="leftAndRightAddonsExample"] .fd-input-group__addon';

    buttonInput = 'fdp-input-group-standard-example [name="donation"] input';
    buttonInputLeftAndRightTextAddon = 'fdp-input-group-standard-example [name="donation"] .fd-input-group__addon';
    buttonInputSubmitButton = 'fdp-input-group-standard-example [name="donation"] button';

    iconInput = 'fdp-input-group-standard-example [name="employee"] input';
    iconInputEmailIcon = 'fdp-input-group-standard-example [name="employee"] fd-icon[title="Email"]';

    compactGroupInput = 'fdp-input-group-compact-example fdp-input-group input';
    compactGroupButtonAddon = 'fdp-input-group-compact-example [name="example"] button';
    compactGroupLeftTextAddon = 'fdp-input-group-compact-example [name="example"] .fd-input-group__addon';

    disabledInput = 'fdp-input-group-disabled-example fdp-input-group input';
    disabledInputButton = 'fdp-input-group-disabled-example fdp-input-group button';

    withFormInput = 'fdp-platform-input-group-form-example input';
    withFormInputTextAddon = 'fdp-platform-input-group-form-example .fd-input-group__addon';
    withFormInputButtonAddon = 'fdp-platform-input-group-form-example .fd-input-group__addon button';
    withFormInputLabel = 'fdp-platform-input-group-form-example label > span';
    withFormInputQuestionMark = 'fdp-platform-input-group-form-example .sap-icon--hint';
    withFormInputAsterixMark = 'fdp-platform-input-group-form-example label span';
    withFormInputErrorTooltip = '[type="error"] span';
    withFormInputInfoTooltip = '.fd-inline-help__content';

    exampleAreaContainersArr = '.fd-doc-component';
    rtlSwitcherArr = 'rtl-switch .fd-switch__handle';

    async open(): Promise<void> {
        await super.open(this.url);
        await this.waitForRoot();
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
