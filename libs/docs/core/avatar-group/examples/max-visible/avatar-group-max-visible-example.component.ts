import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AvatarComponent } from '@fundamental-ngx/core/avatar';
import { AvatarGroupComponent, AvatarGroupItemDirective } from '@fundamental-ngx/core/avatar-group';
import { QuickViewModule } from '@fundamental-ngx/core/quick-view';
import { SliderComponent } from '@fundamental-ngx/core/slider';
import { AvatarGroupDataExampleService } from '../avatar-group-data-example.service';

@Component({
    selector: 'fd-avatar-group-max-visible-example',
    templateUrl: './avatar-group-max-visible-example.component.html',
    imports: [
        AvatarGroupComponent,
        AvatarComponent,
        AvatarGroupItemDirective,
        SliderComponent,
        FormsModule,
        QuickViewModule
    ]
})
export class AvatarGroupMaxVisibleExampleComponent {
    readonly avatarGroupDataExampleService = inject(AvatarGroupDataExampleService);
    people = this.avatarGroupDataExampleService.generate();

    readonly defaultContainerWidth = signal(800);
    readonly maxItemsContainerWidth = signal(800);
}
