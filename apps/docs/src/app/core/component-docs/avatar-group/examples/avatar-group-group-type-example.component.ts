import { Component } from '@angular/core';

import { Size } from '@fundamental-ngx/core';
import { AvatarGroupDataExampleService } from './avatar-group-data-example.service';

@Component({
    selector: 'fd-avatar-group-group-type-example',
    templateUrl: './avatar-group-group-type-example.component.html',
    styles: [`.fd-popover__wrapper { max-width: 314px; }`]
})
export class AvatarGroupGroupTypeExampleComponent {
    size: Size = 'l';
    people = this.avatarGroupDataExampleService.generate();
    personDetails: any = null;
    overflowPopoverStage: 'main' | 'detail' = 'main';

    constructor(private readonly avatarGroupDataExampleService: AvatarGroupDataExampleService) {}

    openOverflowDetails(idx: number): void {
        this.personDetails = this.people[idx];
        this.overflowPopoverStage = 'detail';
    }

    openOverflowMain(): void {
        this.personDetails = null;
        this.overflowPopoverStage = 'main';
    }
}
