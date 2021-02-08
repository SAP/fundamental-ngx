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
        },
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
}
