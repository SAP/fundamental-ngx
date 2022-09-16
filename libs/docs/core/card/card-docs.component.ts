import { Component } from '@angular/core';

import { ExampleFile, getAssetFromModuleAssets } from '@fundamental-ngx/docs/shared';

const cardExampleScss = 'card-example.component.scss';
const cardKpiExampleScss = 'card-kpi-example.component.scss';
const cardBarChartListExampleScss = 'bar-chart-list-card/bar-chart-list-card-example.component.scss';
const cardBarScss = 'bar-chart-list-card/card-bar.component.scss';

const cardExampleHtml = 'card-example.component.html';
const cardExampleTs = 'card-example.component.ts';
const cardCompactExampleHtml = 'card-compact-example.component.html';
const cardLoaderExampleHtml = 'card-loader-example.component.html';
const cardFooterExampleHtml = 'card-footer-example.component.html';
const cardKpiExampleHtml = 'card-kpi-example.component.html';
const cardKpiExampleTs = 'card-kpi-example.component.ts';
const googleChartServiceTs = 'card-kpi-google-charts.service.ts';
const cardTableExampleHtml = 'card-table-example.component.html';
const cardBarChartListExampleTs = 'bar-chart-list-card/bar-chart-list-card-example.component.ts';
const cardBarChartListExampleHtml = 'bar-chart-list-card/bar-chart-list-card-example.component.html';
const cardBarTs = 'bar-chart-list-card/card-bar.component.ts';
const cardBarHtml = 'bar-chart-list-card/card-bar.component.html';
const cardObjectTs = 'object-card/card-object-example.component.ts';
const cardObjectHtml = 'object-card/card-object-example.component.html';
const cardCalendarTs = 'calendar-card/card-calendar-example.component.ts';
const cardCalendarHtml = 'calendar-card/card-calendar-example.component.html';
const cardQuickViewTs = 'quick-view-card/card-quick-view-example.component.ts';
const cardQuickViewHtml = 'quick-view-card/card-quick-view-example.component.html';
const cardListTs = 'list-card/card-list-example.component.ts';
const cardListHtml = 'list-card/card-list-example.component.html';
const cardLinkListTs = 'link-list-card/card-link-list-example.component.ts';
const cardLinkListHtml = 'link-list-card/card-link-list-example.component.html';

@Component({
    templateUrl: './card-docs.component.html'
})
export class CardDocsComponent {
    standard: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(cardExampleHtml),
            fileName: 'card-example'
        },
        {
            language: 'ts',
            code: getAssetFromModuleAssets(cardExampleTs),
            fileName: 'card-example'
        },
        {
            language: 'scss',
            code: getAssetFromModuleAssets(cardExampleScss),
            fileName: 'card-example'
        }
    ];

    compact: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(cardCompactExampleHtml),
            fileName: 'card-compact-example'
        }
    ];

    loader: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(cardLoaderExampleHtml),
            fileName: 'card-loader-example'
        }
    ];

    footer: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(cardFooterExampleHtml),
            fileName: 'card-footer-example'
        }
    ];

    kpi: ExampleFile[] = [
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(cardKpiExampleTs),
            fileName: 'card-kpi-example',
            component: 'CardKpiExampleComponent'
        },
        {
            language: 'html',
            code: getAssetFromModuleAssets(cardKpiExampleHtml),
            fileName: 'card-kpi-example'
        },
        {
            language: 'scss',
            code: getAssetFromModuleAssets(cardKpiExampleScss),
            fileName: 'card-kpi-example'
        },
        {
            language: 'typescript',
            name: 'card-kpi-google-charts.service.ts',
            code: getAssetFromModuleAssets(googleChartServiceTs),
            fileName: 'card-kpi-google-charts',
            component: 'GoogleChartService',
            service: true
        }
    ];

    table: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(cardTableExampleHtml),
            fileName: 'card-table-example'
        }
    ];

    barChartList: ExampleFile[] = [
        {
            language: 'typescript',
            name: 'bar-chart-list-card-example.component.ts',
            code: getAssetFromModuleAssets(cardBarChartListExampleTs),
            fileName: 'bar-chart-list-card-example',
            component: 'BarChartListCardExampleComponent'
        },
        {
            language: 'html',
            name: 'bar-chart-list-card-example.component.html',
            code: getAssetFromModuleAssets(cardBarChartListExampleHtml),
            fileName: 'bar-chart-list-card-example'
        },
        {
            language: 'scss',
            name: 'bar-chart-list-card-example.component.scss',
            code: getAssetFromModuleAssets(cardBarChartListExampleScss),
            fileName: 'bar-chart-list-card-example'
        },
        {
            language: 'typescript',
            name: 'card-bar.component.ts',
            code: getAssetFromModuleAssets(cardBarTs),
            fileName: 'card-bar',
            component: 'CardBarComponent'
        },
        {
            language: 'html',
            name: 'card-bar.component.html',
            code: getAssetFromModuleAssets(cardBarHtml),
            fileName: 'card-bar'
        },
        {
            language: 'scss',
            name: 'card-bar.component.scss',
            code: getAssetFromModuleAssets(cardBarScss),
            fileName: 'card-bar'
        }
    ];

    objectCard: ExampleFile[] = [
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(cardObjectTs),
            fileName: 'card-object-example',
            component: 'CardObjectExampleComponent'
        },
        {
            language: 'html',
            code: getAssetFromModuleAssets(cardObjectHtml),
            fileName: 'card-object-example'
        }
    ];

    calendarCard: ExampleFile[] = [
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(cardCalendarTs),
            fileName: 'card-calendar-example',
            component: 'CardCalendarExampleComponent'
        },
        {
            language: 'html',
            code: getAssetFromModuleAssets(cardCalendarHtml),
            fileName: 'card-calendar-example'
        }
    ];

    quickViewCard: ExampleFile[] = [
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(cardQuickViewTs),
            fileName: 'card-quick-view-example',
            component: 'CardQuickViewExampleComponent'
        },
        {
            language: 'html',
            code: getAssetFromModuleAssets(cardQuickViewHtml),
            fileName: 'card-quick-view-example'
        }
    ];

    listCard: ExampleFile[] = [
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(cardListTs),
            fileName: 'card-list-example',
            component: 'CardListExampleComponent'
        },
        {
            language: 'html',
            code: getAssetFromModuleAssets(cardListHtml),
            fileName: 'card-list-example'
        }
    ];

    linkListCard: ExampleFile[] = [
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(cardLinkListTs),
            fileName: 'card-link-list-example',
            component: 'CardLinkListExampleComponent'
        },
        {
            language: 'html',
            code: getAssetFromModuleAssets(cardLinkListHtml),
            fileName: 'card-link-list-example'
        }
    ];
}
