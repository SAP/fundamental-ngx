import { Component } from '@angular/core';

import { ExampleFile } from '../../../documentation/core-helpers/code-example/example-file';

import * as cardExampleHtml from '!raw-loader!./examples/card-example.component.html';
import * as cardCompactExampleHtml from '!raw-loader!./examples/card-compact-example.component.html';
import * as cardLoaderExampleHtml from '!raw-loader!./examples/card-loader-example.component.html';
import * as cardFooterExampleHtml from '!raw-loader!./examples/card-footer-example.component.html';
import * as cardKpiExampleHtml from '!raw-loader!./examples/card-kpi-example.component.html';
import * as cardKpiExampleScss from '!raw-loader!./examples/card-kpi-example.component.scss';
import * as cardKpiExampleTs from '!raw-loader!./examples/card-kpi-example.component.ts';
import * as googleChartServiceTs from '!raw-loader!./examples/card-kpi-google-charts.service.ts';
import * as cardTableExampleHtml from '!raw-loader!./examples/card-table-example.component.html';
import * as cardBarChartListExampleTs from '!raw-loader!./examples/bar-chart-list-card/bar-chart-list-card-example.component.ts';
import * as cardBarChartListExampleHtml from '!raw-loader!./examples/bar-chart-list-card/bar-chart-list-card-example.component.html';
import * as cardBarChartListExampleScss from '!raw-loader!./examples/bar-chart-list-card/bar-chart-list-card-example.component.scss';
import * as cardBarTs from '!raw-loader!./examples/bar-chart-list-card/card-bar.component.ts';
import * as cardBarHtml from '!raw-loader!./examples/bar-chart-list-card/card-bar.component.html';
import * as cardBarScss from '!raw-loader!./examples/bar-chart-list-card/card-bar.component.scss';
import * as cardObjectTs from '!raw-loader!./examples/object-card/card-object-example.component.ts';
import * as cardObjectHtml from '!raw-loader!./examples/object-card/card-object-example.component.html';
import * as cardCalendarTs from '!raw-loader!./examples/calendar-card/card-calendar-example.component.html';
import * as cardCalendarHtml from '!raw-loader!./examples/calendar-card/card-calendar-example.component.html';

import * as cardQuickViewTs from '!raw-loader!./examples/quick-view-card/card-quick-view-example.component.html';
import * as cardQuickViewHtml from '!raw-loader!./examples/quick-view-card/card-quick-view-example.component.html';

import * as cardListTs from '!raw-loader!./examples/list-card/card-list-example.component.html';
import * as cardListHtml from '!raw-loader!./examples/list-card/card-list-example.component.html';

import * as cardLinkListTs from '!raw-loader!./examples/link-list-card/card-link-list-example.component.html';
import * as cardLinkListHtml from '!raw-loader!./examples/link-list-card/card-link-list-example.component.html';

@Component({
    templateUrl: './card-docs.component.html'
})
export class CardDocsComponent {
    standard: ExampleFile[] = [
        {
            language: 'html',
            code: cardExampleHtml,
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
