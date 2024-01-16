import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { FDP_ICON_TAB_BAR } from '@fundamental-ngx/platform';

@Component({
    selector: 'fdp-icon-tab-bar-tabs-content-example',
    standalone: true,
    imports: [FDP_ICON_TAB_BAR],
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
