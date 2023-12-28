import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { FDB_NAVIGATION } from '@fundamental-ngx/btp/navigation';
import { FdbViewMode } from '@fundamental-ngx/btp/shared';
import { ButtonComponent, SegmentedButtonComponent } from '@fundamental-ngx/core';

@Component({
    selector: 'fdb-navigation-horizontal-example',
    standalone: true,
    imports: [RouterLink, FDB_NAVIGATION, ButtonComponent, SegmentedButtonComponent, FormsModule],
    templateUrl: './navigation-horizontal-example.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavigationHorizontalExampleComponent {
    mode: FdbViewMode = '';
}
