import { CoreBaseComponentPo } from './core-base-component.po';
import { waitForElDisplayed, waitForPresent } from '../../driver/wdio';

export class CardPo extends CoreBaseComponentPo {
    private url = '/card';
    root = '#page-content';

    // standard examples
    cardTitle = 'fd-card-example .fd-card__title';
    cardHeader = 'fd-card-example fd-card-header';
    cardListItems = 'fd-card-example li';
    cardAvatar = 'fd-card-example fd-avatar';
    cardSubtitle = 'fd-card-example .fd-card__subtitle';
    cardCounter = 'fd-card-example .fd-card__counter';
    cardBadge = 'fd-card-example fd-card .fd-badge';
    cardAttr = 'fd-card-example fd-card';
    // compact examples
    compactCardHeader = 'fd-card-compact-example fd-card-header';
    compactCardListItems = 'fd-card-compact-example li';
    compactCardAttr = 'fd-card-compact-example fd-card';
    // card loader examples
    loaderCardAttr = 'fd-card-loader-example fd-card';
    loaderIcon = 'fd-card-loader-example fd-busy-indicator';
    // footer examples
    ftCardHeader = 'fd-card-footer-example fd-card-header';
    ftCardListItems = 'fd-card-footer-example li';
    ftFooter = 'fd-card-footer-example fd-card-footer';
    ftButtons = 'fd-card-footer-example fd-toolbar button';
    // analytical card examples
    kpiCardHeader = 'fd-card-kpi-example fd-card-header';
    kpiCardTitle = 'fd-card-kpi-example .fd-card__title';
    kpiAnalyticsHeaderIcons = 'fd-card-kpi-example fd-card-kpi-header span';
    kpiAnalyticsHeader = 'fd-card-kpi-example fd-card-kpi-header';
    kpiHeaderSubtitle = 'fd-card-kpi-example fd-card__second-subtitle';
    kpiCardContent = 'fd-card-kpi-example fd-card-content';
    kpiCardChart = 'fd-card-kpi-example fd-card-content svg';
    // table card examples
    tableCardHeader = 'fd-card-table-example fd-card-header h2';
    tableCardTableHeader = 'fd-card-table-example thead th';
    tableCardItems = 'fd-card-table-example tbody tr';
    tableCardItemNames = 'fd-card-table-example tbody td:first-of-type';
    tableCardItemCountries = 'fd-card-table-example tbody td:nth-of-type(2)';
    tableCardItemPrices = 'fd-card-table-example tbody td:nth-of-type(3)';
    tableCardItemStatuses = 'fd-card-table-example td span';
    // bar chart examples
    barChartHeader = 'fd-bar-chart-list-card-example fd-card-header';
    barChartTitle = 'fd-bar-chart-list-card-example fd-card-header h2';
    barChartCounter = 'fd-bar-chart-list-card-example fd-card-header span';
    barChartItems = 'fd-bar-chart-list-card-example li span';
    barCharBars = 'fd-bar-chart-list-card-example fd-card-bar';

    open(): void {
        super.open(this.url);
        waitForElDisplayed(this.root);
        waitForPresent(this.cardTitle);
    }

    getScreenshotFolder(): object {
        return super.getScreenshotFolder(this.url);
    }

    saveExampleBaselineScreenshot(specName: string = 'card'): void {
        super.saveExampleBaselineScreenshot(specName, this.getScreenshotFolder());
    }

    compareWithBaseline(specName: string = 'card'): any {
        return super.compareWithBaseline(specName, this.getScreenshotFolder());
    }
}
