import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BarComponent, BarLeftDirective } from '@fundamental-ngx/core/bar';

@Component({
    selector: 'fd-quick-view-subheader',
    templateUrl: './quick-view-subheader.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [BarComponent, BarLeftDirective]
})
export class QuickViewSubheaderComponent {}
