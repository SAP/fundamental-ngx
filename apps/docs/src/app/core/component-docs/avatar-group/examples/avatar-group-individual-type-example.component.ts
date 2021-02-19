import { Component } from '@angular/core';

import { Size } from '@fundamental-ngx/core';
import { AvatarGroupDataExampleService } from './avatar-group-data-example.service';

@Component({
    selector: 'fd-avatar-group-individual-type-example',
    templateUrl: './avatar-group-individual-type-example.component.html',
    styles: [`
        .fd-popover__wrapper {
            max-width: 450px;
        }
        .fd-avatar-group__overflow-item-example {
            margin: 0.25rem 0 !important;
        }
        .fd-avatar-group__overflow-item-example fd-avatar {
            margin-right: .5rem;
        }
        .fd-col {
            padding-top: 0;
            padding-bottom: .5rem;
        }
    `]
})
export class AvatarGroupIndividualTypeExampleComponent {
    size: Size = 's';
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
