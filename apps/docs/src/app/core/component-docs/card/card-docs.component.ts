import { Component } from '@angular/core';

import { ExampleFile } from '../../../documentation/core-helpers/code-example/example-file';

import cardExampleHtml from '!./examples/card-example.component.html?raw';
import cardExampleTs from '!./examples/card-example.component.ts?raw';
import cardExampleScss from '!./examples/card-example.component.scss?raw';
import cardCompactExampleHtml from '!./examples/card-compact-example.component.html?raw';
import cardLoaderExampleHtml from '!./examples/card-loader-example.component.html?raw';
import cardFooterExampleHtml from '!./examples/card-footer-example.component.html?raw';
import cardKpiExampleHtml from '!./examples/card-kpi-example.component.html?raw';
import cardKpiExampleScss from '!./examples/card-kpi-example.component.scss?raw';
import cardKpiExampleTs from '!./examples/card-kpi-example.component.ts?raw';
import googleChartServiceTs from '!./examples/card-kpi-google-charts.service.ts?raw';
import cardTableExampleHtml from '!./examples/card-table-example.component.html?raw';
import cardBarChartListExampleTs from '!./examples/bar-chart-list-card/bar-chart-list-card-example.component.ts?raw';
import cardBarChartListExampleHtml from '!./examples/bar-chart-list-card/bar-chart-list-card-example.component.html?raw';
import cardBarChartListExampleScss from '!./examples/bar-chart-list-card/bar-chart-list-card-example.component.scss?raw';
import cardBarTs from '!./examples/bar-chart-list-card/card-bar.component.ts?raw';
import cardBarHtml from '!./examples/bar-chart-list-card/card-bar.component.html?raw';
import cardBarScss from '!./examples/bar-chart-list-card/card-bar.component.scss?raw';
import cardObjectTs from '!./examples/object-card/card-object-example.component.ts?raw';
import cardObjectHtml from '!./examples/object-card/card-object-example.component.html?raw';
import cardCalendarTs from '!./examples/calendar-card/card-calendar-example.component.ts?raw';
import cardCalendarHtml from '!./examples/calendar-card/card-calendar-example.component.html?raw';
import cardQuickViewTs from '!./examples/quick-view-card/card-quick-view-example.component.ts?raw';
import cardQuickViewHtml from '!./examples/quick-view-card/card-quick-view-example.component.html?raw';
import cardListTs from '!./examples/list-card/card-list-example.component.ts?raw';
import cardListHtml from '!./examples/list-card/card-list-example.component.html?raw';
import cardLinkListTs from '!./examples/link-list-card/card-link-list-example.component.ts?raw';
import cardLinkListHtml from '!./examples/link-list-card/card-link-list-example.component.html?raw';

@Component({
    templateUrl: './card-docs.component.html'
})
export class CardDocsComponent {
    standard: ExampleFile[] = [
        {
            language: 'html',
            code: cardExampleHtml,
            fileName: 'card-example'
        },
        {
            language: 'ts',
            code: cardExampleTs,
            fileName: 'card-example'
        },
        {
            language: 'scss',
            code: cardExampleScss,
            fileName: 'card-example'
        }
    ];

    compact: ExampleFile[] = [
        {
            language: 'html',
            code: cardCompactExampleHtml,
            fileName: 'card-compact-example'
        }
    ];

    loader: ExampleFile[] = [
        {
            language: 'html',
            code: cardLoaderExampleHtml,
            fileName: 'card-loader-example'
        }
    ];

    footer: ExampleFile[] = [
        {
            language: 'html',
            code: cardFooterExampleHtml,
            fileName: 'card-footer-example'
        }
    ];

    kpi: ExampleFile[] = [
        {
            language: 'typescript',
            code: cardKpiExampleTs,
            fileName: 'card-kpi-example',
            component: 'CardKpiExampleComponent'
        },
        {
            language: 'html',
            code: cardKpiExampleHtml,
            fileName: 'card-kpi-example'
        },
        {
            language: 'scss',
            code: cardKpiExampleScss,
            fileName: 'card-kpi-example'
        },
        {
            language: 'typescript',
            name: 'card-kpi-google-charts.service.ts',
            code: googleChartServiceTs,
            fileName: 'card-kpi-google-charts',
            component: 'GoogleChartService',
            service: true
        }
    ];

    table: ExampleFile[] = [
        {
            language: 'html',
            code: cardTableExampleHtml,
            fileName: 'card-table-example'
        }
    ];

    barChartList: ExampleFile[] = [
        {
            language: 'typescript',
            name: 'bar-chart-list-card-example.component.ts',
            code: cardBarChartListExampleTs,
            fileName: 'bar-chart-list-card-example',
            component: 'BarChartListCardExampleComponent'
        },
        {
            language: 'html',
            name: 'bar-chart-list-card-example.component.html',
            code: cardBarChartListExampleHtml,
            fileName: 'bar-chart-list-card-example'
        },
        {
            language: 'scss',
            name: 'bar-chart-list-card-example.component.scss',
            code: cardBarChartListExampleScss,
            fileName: 'bar-chart-list-card-example'
        },
        {
            language: 'typescript',
            name: 'card-bar.component.ts',
            code: cardBarTs,
            fileName: 'card-bar',
            component: 'CardBarComponent'
        },
        {
            language: 'html',
            name: 'card-bar.component.html',
            code: cardBarHtml,
            fileName: 'card-bar'
        },
        {
            language: 'scss',
            name: 'card-bar.component.scss',
            code: cardBarScss,
            fileName: 'card-bar'
        }
    ];

    objectCard: ExampleFile[] = [
        {
            language: 'typescript',
            code: cardObjectTs,
            fileName: 'card-object-example',
            component: 'CardObjectExampleComponent'
        },
        {
            language: 'html',
            code: cardObjectHtml,
            fileName: 'card-object-example'
        }
    ];

    calendarCard: ExampleFile[] = [
        {
            language: 'typescript',
            code: cardCalendarTs,
            fileName: 'card-calendar-example',
            component: 'CardCalendarExampleComponent'
        },
        {
            language: 'html',
            code: cardCalendarHtml,
            fileName: 'card-calendar-example'
        }
    ];

    quickViewCard: ExampleFile[] = [
        {
            language: 'typescript',
            code: cardQuickViewTs,
            fileName: 'card-quick-view-example',
            component: 'CardQuickViewExampleComponent'
        },
        {
            language: 'html',
            code: cardQuickViewHtml,
            fileName: 'card-quick-view-example'
        }
    ];

    listCard: ExampleFile[] = [
        {
            language: 'typescript',
            code: cardListTs,
            fileName: 'card-list-example',
            component: 'CardListExampleComponent'
        },
        {
            language: 'html',
            code: cardListHtml,
            fileName: 'card-list-example'
        }
    ];

    linkListCard: ExampleFile[] = [
        {
            language: 'typescript',
            code: cardLinkListTs,
            fileName: 'card-link-list-example',
            component: 'CardLinkListExampleComponent'
        },
        {
            language: 'html',
            code: cardLinkListHtml,
            fileName: 'card-link-list-example'
        }
    ];
}
