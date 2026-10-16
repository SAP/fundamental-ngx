import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { FDP_ICON_TAB_BAR, IconTabTitleDirective } from '@fundamental-ngx/platform/icon-tab-bar';

@Component({
    selector: 'fdp-icon-tab-bar-stack-content-active-repro-example',
    imports: [FDP_ICON_TAB_BAR, IconTabTitleDirective],
    styles: `
        .stack-content-panel {
            padding: 0.5rem;
        }

        .stack-content-row {
            margin: 0;
            padding: 0.35rem 0.5rem;
            border-bottom: 1px solid #e0e0e0;
        }
    `,
    templateUrl: './icon-tab-bar-stack-content-active-repro-example.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class IconTabBarStackContentActiveReproExampleComponent {
    readonly rows = Array.from({ length: 15 }, (_, i) => i + 1);
}
