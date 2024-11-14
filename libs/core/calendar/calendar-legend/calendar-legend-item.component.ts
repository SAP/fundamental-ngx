import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
    selector: 'fd-calendar-legend-item',
    standalone: true,
    imports: [CommonModule],
    template: `
        <div class="fd-calendar-legend__item">
            {{ text }}
        </div>
    `,
    styleUrl: './calendar-legend-item.component.scss'
})
export class LegendItemComponent {
    /** The text that should be displayed in the legend container */
    @Input()
    text: string;

    /** The color of the legend item marker */
    @Input() color: string;

    /** The type of the legend item  */
    @Input() type: string;
}
