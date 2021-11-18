import {
    Component,
    ChangeDetectionStrategy,
    ViewChild,
    ElementRef,
    AfterViewInit,
    ChangeDetectorRef,
    Renderer2
} from '@angular/core';
import { delay, tap } from 'rxjs/operators';

import { GoogleChartService, Visualization } from './card-kpi-google-charts.service';

@Component({
    selector: 'fd-card-kpi-example',
    templateUrl: './card-kpi-example.component.html',
    styleUrls: ['./card-kpi-example.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CardKpiExampleComponent implements AfterViewInit {
    isLoading = true;

    @ViewChild('chart')
    private chartContainer: ElementRef<HTMLElement>;

    constructor(
        private googleChartService: GoogleChartService,
        private changeDetectorRef: ChangeDetectorRef,
        private renderer: Renderer2
    ) {}

    ngAfterViewInit(): void {
        this.googleChartService
            .getVisualization()
            .pipe(
                tap({
                    complete: () => {
                        this.isLoading = false;
                        this.changeDetectorRef.markForCheck();
                    }
                }),
                // postpone until the next tick to get view updated
                delay(0)
            )
            .subscribe((visualization) => {
                this.drawChart(visualization);
            });
    }

    drawChart(visualization: Visualization): void {
        const dataTable = [
            ['Entities', 'Target', 'Cost', 'Revenue', { role: 'annotation' }],
            ['Weather', 5000, 2500, 3200, ''],
            ['Mechanics', 5000, 2500, 4300, ''],
            ['Software', 5000, 2500, 1250, '']
        ];

        let labelText = '';

        dataTable.forEach((dataChart) => {
            dataChart.forEach((chartData) => {
                if (typeof chartData !== 'object') {
                    labelText += ` ${chartData}`;
                }
            });
        });

        const data = visualization.arrayToDataTable(dataTable);

        this.renderer.setAttribute(this.chartContainer.nativeElement, 'aria-label', labelText);
        // Instantiate and draw our chart, passing in some options.
        const chart = new visualization.ColumnChart(this.chartContainer.nativeElement);
        chart.draw(data, {
            legend: { position: 'bottom' },
            isStacked: true
        });
    }
}
