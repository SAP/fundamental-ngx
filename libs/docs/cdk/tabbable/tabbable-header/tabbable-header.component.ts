import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import {
    DescriptionComponent,
    DocPageComponent,
    HeaderComponent,
    HeaderTabsComponent,
    ImportComponent
} from '@fundamental-ngx/docs/shared';

@Component({
    selector: 'app-tabbable-header',
    templateUrl: './tabbable-header.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [DocPageComponent, HeaderComponent, DescriptionComponent, ImportComponent, HeaderTabsComponent]
})
export class TabbableHeaderComponent {
    falseSignal = signal(false);
}
