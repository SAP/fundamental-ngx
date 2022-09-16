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

    open(): void {
        super.open(this.url);
        waitForPresent(this.root);
        waitForElDisplayed(this.title);
    }

    getScreenshotFolder(): Record<string, any> {
        return super.getScreenshotFolder(this.url);
    }

    saveExampleBaselineScreenshot(specName: string = 'switch'): void {
        super.saveExampleBaselineScreenshot(specName, this.getScreenshotFolder());
    }

    compareWithBaseline(specName: string = 'switch'): any {
        return super.compareWithBaseline(specName, this.getScreenshotFolder());
    }
}
