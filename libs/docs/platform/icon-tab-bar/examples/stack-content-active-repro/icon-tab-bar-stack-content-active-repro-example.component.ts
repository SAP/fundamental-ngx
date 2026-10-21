import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { FDP_ICON_TAB_BAR, IconTabBarItem } from '@fundamental-ngx/platform/icon-tab-bar';

@Component({
    selector: 'fdp-icon-tab-bar-stack-content-active-repro-example',
    imports: [FDP_ICON_TAB_BAR],
    styles: `
        .stack-content-panel {
            padding: 0.5rem;
        }

        .stack-content-row {
            margin: 0;
            padding: 0.35rem 0.5rem;
            border-bottom: 1px solid var(--sapList_BorderColor);
        }
    `,
    templateUrl: './icon-tab-bar-stack-content-active-repro-example.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class IconTabBarStackContentActiveReproExampleComponent {
    readonly rows = Array.from({ length: 15 }, (_, i) => i + 1);

    readonly steps = Array.from({ length: 15 }, (_, i) => ({ id: `step-${i + 1}`, label: `Step ${i + 1}` }));

    setLastSelected(tab: IconTabBarItem): void {
        console.log('iconTabSelected →', tab.index);
    }
}
