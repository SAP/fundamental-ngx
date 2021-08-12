import { BaseComponentPo } from './base-component.po';
import { waitForElDisplayed, waitForPresent } from '../../driver/wdio';

export class PanelPo extends BaseComponentPo {

    url = '/panel';
    root = '#page-content';

    expandablePanelRoot = 'fdp-platform-panel-expandable-example ';
    expandablePanelBtn = this.expandablePanelRoot + 'button';
    expandablePanelTitle = this.expandablePanelRoot + 'h5';
    expandablePanelContent = this.expandablePanelRoot + '.fd-panel__content';

    fixedPanelSection = 'fdp-panel-fixed-example fd-panel';
    fixedPanelDescription = 'fdp-panel-fixed-example fdp-panel-content';

    compactPanelRoot = '#compact-panel-id';
    compactPanelBtn = this.compactPanelRoot + ' button';

    fixedHeightPanelRoot = 'fdp-panel-fixed-height-example #fixed-panel-id';
    fixedHeightPanelContentRegion = this.fixedHeightPanelRoot + ' [role="region"]';
    fixedHeightPanelContent = this.fixedHeightPanelRoot + ' fdp-panel-content';

    actionPanelRoot = '#panel-actions-id';
    actionPanelBtn = this.actionPanelRoot + ' button.fd-ellipsis';

    open(): void {
        super.open(this.url);
        waitForElDisplayed(this.root);
        waitForPresent(this.title);
    }

    getScreenshotFolder(): object {
        return super.getScreenshotFolder(this.url);
    }

    saveExampleBaselineScreenshot(specName: string = 'panel'): void {
        super.saveExampleBaselineScreenshot(specName, this.getScreenshotFolder());
    }

    compareWithBaseline(specName: string = 'panel'): any {
        return super.compareWithBaseline(specName, this.getScreenshotFolder());
    }
}
