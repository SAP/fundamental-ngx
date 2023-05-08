// eslint-disable-next-line @nx/enforce-module-boundaries
import { CoreBaseComponentPo, waitForElDisplayed, waitForPresent } from '../../../../../e2e';

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
    loaderCardAttr = '.fd-busy-indicator__container';
    loaderIcon = 'fd-card-loader-example fd-busy-indicator';
    // footer examples
    ftCardHeader = 'fd-card-footer-example fd-card-header';
    ftCardListItems = 'fd-card-footer-example fd-card:first-of-type li';
    ftFooter = 'fd-card-footer-example fd-card-footer';
    ftCardFooterActionItems =
        'fd-card-footer-example fd-card:first-of-type fd-card-footer .fd-card__footer-actions-item';
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
    barChartItems = 'fd-bar-chart-list-card-example li span.fd-list__title';
    barCharBars = 'fd-bar-chart-list-card-example fd-card-bar';

    quickViewExampleHeader = 'fd-card-quick-view-example fd-card-header';
    quickViewExampleContent = 'fd-card-quick-view-example fd-card-content ';
    quickView = '.fd-quick-view';

    calendarExampleHeader = 'fd-card-calendar-example fd-card-header';
    calendarExampleContent = 'fd-card-calendar-example fd-card-content ';
    calendar = '.fd-calendar';

    listExampleHeader = 'fd-card-list-example fd-card-header';
    listExampleContent = 'fd-card-list-example fd-card-content ';
    list = '.fd-list ';

    linkListExampleHeader = 'fd-card-link-list-example fd-card-header';
    linkListExampleContent = 'fd-card-link-list-example fd-card-content ';
    link = 'a';

    async open(): Promise<void> {
        await super.open(this.url);
        await waitForPresent(this.root);
        await waitForElDisplayed(this.title);
    }

    async getScreenshotFolder(): Promise<Record<string, any>> {
        return super.getScreenshotFolder(this.url);
    }

    async saveExampleBaselineScreenshot(specName: string = 'card'): Promise<void> {
        await super.saveExampleBaselineScreenshot(specName, this.getScreenshotFolder());
    }

    async compareWithBaseline(specName: string = 'card'): Promise<any> {
        return super.compareWithBaseline(specName, await this.getScreenshotFolder());
    }
}
