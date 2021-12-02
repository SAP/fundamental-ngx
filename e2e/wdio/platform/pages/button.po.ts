import { BaseComponentPo } from './base-component.po';
import { waitForPresent } from '../../driver/wdio';

export class ButtonPo extends BaseComponentPo {
    private url = '/button';
    typeButtons = 'fdp-button-types-example button';
    sizeButtons = 'fdp-button-sizes-example button';
    iconButtons = 'fdp-button-icons-example button';
    stateButton = 'fdp-button-state-example button';
    disableStateButtons = 'fdp-button-state-example button.is-disabled';
    truncatedButton = 'fdp-button-truncate-example button';

    open(): void {
        super.open(this.url);
        waitForPresent(this.title);
    }

    getScreenshotFolder(): Record<string, any> {
        return super.getScreenshotFolder(this.url);
    }

    saveExampleBaselineScreenshot(specName: string = 'button'): void {
        super.saveExampleBaselineScreenshot(specName, this.getScreenshotFolder());
    }

    compareWithBaseline(specName: string = 'button'): any {
        return super.compareWithBaseline(specName, this.getScreenshotFolder());
    }
}
