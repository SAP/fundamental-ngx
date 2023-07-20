import { Component, inject } from '@angular/core';
import { Size } from '@fundamental-ngx/core';
import { AvatarGroupDataExampleService } from '../avatar-group-data-example.service';

@Component({
    selector: 'fd-avatar-group-vertical-example',
    templateUrl: './avatar-group-vertical-example.component.html'
})
export class AvatarGroupVerticalExampleComponent {
    readonly avatarGroupDataExampleService: AvatarGroupDataExampleService = inject(AvatarGroupDataExampleService);
    size: Size = 's';
    people = this.avatarGroupDataExampleService.generate(5);
}
