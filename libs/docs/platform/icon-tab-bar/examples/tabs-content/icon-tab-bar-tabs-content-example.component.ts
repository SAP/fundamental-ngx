import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { FDP_ICON_TAB_BAR, IconTabTitleDirective } from '@fundamental-ngx/platform/icon-tab-bar';

@Component({
    selector: 'fdp-icon-tab-bar-tabs-content-example',
    imports: [FDP_ICON_TAB_BAR, IconTabTitleDirective],
    styles: `
        .tab-container-example {
            height: 100px;
            border: 1px dashed grey;
            padding: 0.5rem;
        }
    `,
    templateUrl: './icon-tab-bar-tabs-content-example.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class IconTabBarTabsContentExampleComponent {}
