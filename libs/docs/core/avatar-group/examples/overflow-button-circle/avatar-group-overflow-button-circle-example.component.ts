import { Component, inject } from '@angular/core';
import { AvatarComponent } from '@fundamental-ngx/core/avatar';
import { AvatarGroupComponent, AvatarGroupItemDirective } from '@fundamental-ngx/core/avatar-group';
import { AvatarGroupDataExampleService } from '../avatar-group-data-example.service';

@Component({
    selector: 'fd-avatar-group-overflow-button-circle-example',
    templateUrl: './avatar-group-overflow-button-circle-example.component.html',
    imports: [AvatarGroupComponent, AvatarComponent, AvatarGroupItemDirective]
})
export class AvatarGroupOverflowButtonCircleExampleComponent {
    readonly avatarGroupDataExampleService = inject(AvatarGroupDataExampleService);
    people = this.avatarGroupDataExampleService.generate();
}
