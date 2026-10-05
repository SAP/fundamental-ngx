import { Component, inject } from '@angular/core';
import { AvatarComponent } from '@fundamental-ngx/core/avatar';
import { AvatarGroupComponent, AvatarGroupItemDirective } from '@fundamental-ngx/core/avatar-group';
import { AvatarGroupDataExampleService } from '../avatar-group-data-example.service';

@Component({
    selector: 'fd-avatar-group-popover-placement-example',
    templateUrl: './avatar-group-popover-placement-example.component.html',
    imports: [AvatarGroupComponent, AvatarComponent, AvatarGroupItemDirective]
})
export class AvatarGroupPopoverPlacementExampleComponent {
    readonly avatarGroupDataExampleService = inject(AvatarGroupDataExampleService);
    people = this.avatarGroupDataExampleService.generate();
}
