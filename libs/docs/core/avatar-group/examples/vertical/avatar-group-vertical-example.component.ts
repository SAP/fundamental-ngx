import { Component, inject } from '@angular/core';
import { Size } from '@fundamental-ngx/cdk/utils';
import { AvatarComponent } from '@fundamental-ngx/core/avatar';
import { AvatarGroupComponent, AvatarGroupItemDirective } from '@fundamental-ngx/core/avatar-group';
import { LinkComponent } from '@fundamental-ngx/core/link';
import { QuickViewModule } from '@fundamental-ngx/core/quick-view';
import { AvatarGroupDataExampleService } from '../avatar-group-data-example.service';

@Component({
    selector: 'fd-avatar-group-vertical-example',
    templateUrl: './avatar-group-vertical-example.component.html',
    imports: [AvatarGroupComponent, AvatarComponent, QuickViewModule, LinkComponent, AvatarGroupItemDirective]
})
export class AvatarGroupVerticalExampleComponent {
    readonly avatarGroupDataExampleService: AvatarGroupDataExampleService = inject(AvatarGroupDataExampleService);
    size: Size = 's';
    people = this.avatarGroupDataExampleService.generate(5);
}
