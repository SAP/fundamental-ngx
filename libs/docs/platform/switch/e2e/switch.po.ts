import { PlatformBaseComponentPo, waitForElDisplayed, waitForPresent } from '../../../../../e2e';

export class SwitchPo extends PlatformBaseComponentPo {
    private url = '/switch';

    root = '#page-content';
    defaultSwitchLabel = '#default-switch .fd-switch';
    defaultSwitchInput = '#default-switch-input';
    defaultSwitchSizeAttr = '#default-switch .fd-switch span';
    defaultSwitchHandel = '#default-switch .fd-switch__handle';

    defaultCompactSwitchLabel = '#default-compact-switch .fd-switch';
    defaultCompactSwitchInput = '#default-compact-switch-input';
    defaultCompactSwitchSizeAttr = '#default-compact-switch .fd-switch--compact span';
    defaultCompactSwitchHandel = '#default-compact-switch .fd-switch__handle';

    disabledSwitchLabel = '#switch-disabled .fd-switch';
    disabledSwitchInput = '#switch-disabled-input';
    disabledSwitchHandel = '#switch-disabled .fd-switch__handle';

    formDisabledSwitchLabel = '#form-switch-disabled .fd-switch';
    formDisabledSwitchInput = '#form-switch-disabled-input';
    formDisabledSwitchHandel = '#form-switch-disabled .fd-switch__handle';

    semanticSwitchLabel = '#semantic-switch .fd-switch';
    semanticSwitchInput = '#semantic-switch-input';
    semanticSwitchHandel = '#semantic-switch .fd-switch__handle';
    semanticSwitchIconOff = '#semantic-switch .fd-switch__icon--off';
    semanticSwitchIconOn = '#semantic-switch .fd-switch__icon--on';

    semanticCompactSwitchLabel = '#semantic-switch-compact .fd-switch';
    semanticCompactSwitchInput = '#semantic-switch-compact-input';
    semanticCompactSwitchHandel = '#semantic-switch-compact .fd-switch__handle';
    semanticCompactSwitchIconOff = '#semantic-switch-compact .fd-switch__icon--off';
    semanticCompactSwitchIconOn = '#semantic-switch-compact .fd-switch__icon--on';

    async open(): Promise<void> {
        await super.open(this.url);
        await waitForPresent(this.root);
        await waitForElDisplayed(this.title);
    }

    async getScreenshotFolder(): Promise<Record<string, any>> {
        return super.getScreenshotFolder(this.url);
    }

    async saveExampleBaselineScreenshot(specName: string = 'switch'): Promise<void> {
        await super.saveExampleBaselineScreenshot(specName, await this.getScreenshotFolder());
    }

    async compareWithBaseline(specName: string = 'switch'): Promise<any> {
        return super.compareWithBaseline(specName, await this.getScreenshotFolder());
    }
}
