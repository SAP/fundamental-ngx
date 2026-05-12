import { ChangeDetectionStrategy, Component, computed, Input, input } from '@angular/core';
import { HeadingLevel } from '@fundamental-ngx/core/shared';
import { ToolbarComponent, ToolbarLabelDirective } from '@fundamental-ngx/core/toolbar';

@Component({
    selector: 'fd-grid-list-title-bar',
    templateUrl: './grid-list-title-bar.component.html',
    host: {
        class: 'fd-col fd-col--12'
    },
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [ToolbarComponent, ToolbarLabelDirective]
})
export class GridListTitleBarComponent {
    /** Sets title of the Grid List */
    @Input()
    title: string;

    /**
     * Sets the semantic heading level for the title bar.
     * Renders `role="heading"` with the corresponding `aria-level` attribute.
     * Accepts values 1–6 (as numbers or strings).
     * @default 2
     */
    readonly headingLevel = input<HeadingLevel>(2);

    protected readonly normalizedLevel = computed(() => {
        const level = this.headingLevel();
        if (typeof level === 'string') {
            return parseInt(level.replace(/^h/i, ''), 10) || 2;
        }
        return level;
    });
}
