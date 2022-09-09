import { CoreBaseComponentPo, waitForElDisplayed, waitForPresent } from '../../../../../e2e';

export class TilePo extends CoreBaseComponentPo {
    private url = '/tile';

    columnsExample = 'fd-tile-columns-example ';
    launchExample = 'fd-launch-tile-example ';
    kpiExample = 'fd-kpi-tile-example ';
    actionExample = 'fd-action-tile-example ';
    bagdeExample = 'fd-badge-tile-example ';
    feedExample = 'fd-feed-tile-example ';

    tile = '.fd-tile ';
    fdTile = 'fd-tile';
    closeButton = '.fd-tile__action-close';
    moreButton = '.fd-tile__action-indicator';
    badge = '.fd-badge';

    kpiNumericContent = this.kpiExample + '.fd-numeric-content';
    launchTile = this.launchExample + this.fdTile;
    columnsTileHeader = this.columnsExample + '.fd-tile__header';
    columnsTileContent = this.columnsExample + '.fd-tile__content';
    columnsTileFooter = this.columnsExample + '.fd-tile__footer';

    open(): void {
        super.open(this.url);
        waitForPresent(this.root);
        waitForElDisplayed(this.title);
    }

    getScreenshotFolder(): Record<string, any> {
        return super.getScreenshotFolder(this.url);
    }

    saveExampleBaselineScreenshot(specName: string = 'tile'): void {
        super.saveExampleBaselineScreenshot(specName, this.getScreenshotFolder());
    }

    compareWithBaseline(specName: string = 'tile'): any {
        return super.compareWithBaseline(specName, this.getScreenshotFolder());
    }
}
