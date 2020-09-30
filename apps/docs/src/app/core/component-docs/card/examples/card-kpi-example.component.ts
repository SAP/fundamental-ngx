import { Component, ChangeDetectionStrategy, ViewChild, ElementRef, AfterViewInit } from '@angular/core';

import { GoogleChartService, Visualization } from './charts/google-charts.service';

@Component({
    selector: 'fd-card-kpi-example',
    templateUrl: './card-kpi-example.component.html',
    styleUrls: ['./card-kpi-example.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CardKpiExampleComponent implements AfterViewInit {
    @ViewChild('chart')
    private chartContainer: ElementRef<HTMLElement>;

    constructor(private googleChartService: GoogleChartService) {}

    ngAfterViewInit(): void {
        this.googleChartService.getVisualization().subscribe((visualization) => {
            this.drawChart(visualization);
        });
    }

    drawChart(visualization: Visualization): void {
        const data = visualization.arrayToDataTable([
            ['Entities', 'Target', 'Cost', 'Revenue', { role: 'annotation' }],
            ['Weather', 5000, 2500, 3200, ''],
            ['Mechanics', 5000, 2500, 4300, ''],
            ['Software', 5000, 2500, 1250, '']
        ]);

        // Instantiate and draw our chart, passing in some options.
        const chart = new visualization.ColumnChart(this.chartContainer.nativeElement);
        chart.draw(data, {
            width: 400,
            height: 380,
            legend: { position: 'bottom' },
            isStacked: true
        });
    }
}
