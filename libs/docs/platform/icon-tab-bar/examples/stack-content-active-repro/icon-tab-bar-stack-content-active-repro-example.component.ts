import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { FDP_ICON_TAB_BAR, IconTabTitleDirective } from '@fundamental-ngx/platform/icon-tab-bar';

@Component({
    selector: 'fdp-icon-tab-bar-stack-content-active-repro-example',
    imports: [FDP_ICON_TAB_BAR, IconTabTitleDirective],
    styles: `
        /*
         * position: relative makes .fd-icon-tab-bar__content the offsetParent for
         * its child panels. Without it, panels and the container share an ancestor
         * offsetParent, making panelEl.offsetTop - containerEl.offsetTop equal to
         * the scroll-spy threshold — so the jump disappears. With it the two values
         * diverge by ~containerEl.offsetTop, producing a visible backward jump.
         */
        fdp-icon-tab-bar-stack-content-active-repro-example .fd-icon-tab-bar__content {
            position: relative;
        }

        .scroll-repro-panel {
            padding: 0.5rem;
        }

        .scroll-repro-row {
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
