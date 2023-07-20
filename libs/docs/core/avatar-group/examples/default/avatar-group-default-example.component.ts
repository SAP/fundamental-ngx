import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Size } from '@fundamental-ngx/cdk/utils';
import { AvatarGroupDataExampleService } from '../avatar-group-data-example.service';

@Component({
    selector: 'fundamental-ngx-avatar-group-default-example',
    templateUrl: './avatar-group-default-example.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AvatarGroupDefaultExampleComponent {
    readonly avatarGroupDataExampleService: AvatarGroupDataExampleService = inject(AvatarGroupDataExampleService);
    size: Size = 's';
    people = this.avatarGroupDataExampleService.generate();
}
