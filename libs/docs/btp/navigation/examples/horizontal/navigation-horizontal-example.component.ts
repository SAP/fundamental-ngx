import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FDB_NAVIGATION } from '@fundamental-ngx/btp/navigation';

@Component({
    selector: 'fdb-navigation-horizontal-example',
    standalone: true,
    imports: [RouterLink, FDB_NAVIGATION],
    templateUrl: './navigation-horizontal-example.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavigationHorizontalExampleComponent {}
