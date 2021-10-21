import { CoreBaseComponentPo } from './core-base-component.po';
import { waitForElDisplayed } from '../../driver/wdio';

export class SelectPo extends CoreBaseComponentPo {
    url = '/select';

    selectModesExample = 'fd-select-mode-example';
    displayedText = ' .fd-select__text-content';
    buttons = ' button';
    option = '[role="option"]';
    overlayContainer = '.cdk-overlay-container';
    selectSemanticStatesExample = 'fd-select-semantic-state-example';
    customControlExample = 'fd-select-custom-trigger';
    extendedOptionsExample = 'fd-select-nested-options';
    mobileModeExample = 'fd-select-mobile-example';
    maxHeightExample = 'fd-select-max-height-example';
    addRemoveOptionExample = 'fd-select-adding-example';
    programmaticControlExample = 'fd-select-programmatic-example';

    options = (id) => `#fd-option-${id}`;

    open(): void {
        super.open(this.url);
        waitForElDisplayed(this.selectModesExample);
    }

    getScreenshotFolder(): object {
        return super.getScreenshotFolder(this.url);
    }

    saveExampleBaselineScreenshot(specName: string = 'select'): void {
        super.saveExampleBaselineScreenshot(specName, this.getScreenshotFolder());
    }

    compareWithBaseline(specName: string = 'select'): any {
        return super.compareWithBaseline(specName, this.getScreenshotFolder());
    }
}
