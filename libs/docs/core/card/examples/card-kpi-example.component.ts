import {
    AfterViewInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ElementRef,
    ViewChild
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

    constructor(private googleChartService: GoogleChartService, private changeDetectorRef: ChangeDetectorRef) {}

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
        const data = visualization.arrayToDataTable([
            ['Entities', 'Target', 'Cost', 'Revenue', { role: 'annotation' }],
            ['Weather', 5000, 2500, 3200, ''],
            ['Mechanics', 5000, 2500, 4300, ''],
            ['Software', 5000, 2500, 1250, '']
        ]);

        // Instantiate and draw our chart, passing in some options.
        const chart = new visualization.ColumnChart(this.chartContainer.nativeElement);
        chart.draw(data, {
            legend: { position: 'bottom' },
            isStacked: true
        });
    }
}
