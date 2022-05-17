import { waitForElDisplayed, waitForPresent } from '../../driver/wdio';
import { CoreBaseComponentPo } from './core-base-component.po';

export class PanelPo extends CoreBaseComponentPo {
    private url = '/panel';
    root = '#page-content';

    toggleButton = '.docs-button';
    panelExpandableButton = 'fd-panel-expandable-example fd-panel button';
    panelParagraphs = '.fd-panel__content';
    expandableButton = '.fd-panel__button';
    compactPanelButton = 'fd-panel-compact-example button';
    panelTitle = 'h5.fd-panel__title';

    open(): void {
        super.open(this.url);
        waitForPresent(this.root);
        waitForElDisplayed(this.title);
    }

    getScreenshotFolder(): Record<string, any> {
        return super.getScreenshotFolder(this.url);
    }

    saveExampleBaselineScreenshot(specName: string = 'panel'): void {
        super.saveExampleBaselineScreenshot(specName, this.getScreenshotFolder());
    }

    compareWithBaseline(specName: string = 'panel'): any {
        return super.compareWithBaseline(specName, this.getScreenshotFolder());
    }
}
