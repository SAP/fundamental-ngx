import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TitleComponent } from '@fundamental-ngx/core/title';

@Component({
    selector: 'fd-quick-view-subheader-title',
    templateUrl: './quick-view-subheader-title.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [TitleComponent]
})
export class QuickViewSubheaderTitleComponent {}
