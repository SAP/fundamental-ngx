import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { FdbNavigationState } from '@fundamental-ngx/btp/navigation';
import { NavigationMenuModule } from '@fundamental-ngx/btp/navigation-menu';
import { FdbViewMode } from '@fundamental-ngx/btp/shared';
import { UserMenuComponent } from '@fundamental-ngx/btp/user-menu';
import { FocusableGridDirective } from '@fundamental-ngx/cdk/utils';
import { ButtonComponent } from '@fundamental-ngx/core/button';
import { PopoverModule } from '@fundamental-ngx/core/popover';
import { SegmentedButtonComponent } from '@fundamental-ngx/core/segmented-button';
import { NavigationModule } from '../../../../../btp/navigation/navigation.module';

@Component({
    selector: 'fdb-user-menu-basic-example',
    templateUrl: './user-menu-basic-example.component.html',
    imports: [
        UserMenuComponent,
        NavigationModule,
        NavigationMenuModule,
        PopoverModule,
        RouterLink,
        SegmentedButtonComponent,
        ButtonComponent,
        FormsModule,
        FocusableGridDirective
    ],
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserMenuBasicExampleComponent {
    mode: FdbViewMode = '';
    state: FdbNavigationState = 'expanded';

    signOutClicked(event: MouseEvent): void {
        alert('Sign out button clicked!');
        console.log(event);
    }
}
