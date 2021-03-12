import { Component, ViewChild, ViewEncapsulation } from '@angular/core';

import { AvatarGroupComponent, PopoverBodyComponent, Size } from '@fundamental-ngx/core';
import { AvatarGroupDataExampleService } from './avatar-group-data-example.service';

@Component({
    selector: 'fd-avatar-group-individual-type-example',
    templateUrl: './avatar-group-individual-type-example.component.html',
    styleUrls: ['./avatar-group-individual-type-example.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class AvatarGroupIndividualTypeExampleComponent {
    @ViewChild('avatarGroup_IndividualType')
    avatarGroup: AvatarGroupComponent;

    @ViewChild('overflowPopoverBody')
    popoverBodyComponent: PopoverBodyComponent;

    size: Size = 's';
    people = this.avatarGroupDataExampleService.generate();
    personDetails: any = null;
    overflowPopoverStage: 'main' | 'detail' = 'main';

    get isDetailStage(): boolean {
        return this.overflowPopoverStage === 'detail';
    }

    constructor(private readonly avatarGroupDataExampleService: AvatarGroupDataExampleService) {}

    openOverflowDetails(idx: number): void {
        const visibleItemsCount = this.avatarGroup.allItemsCount - this.avatarGroup.overflowItemsCount;
        const newIdx = idx + visibleItemsCount;
        this.personDetails = this.people[newIdx];
        this.overflowPopoverStage = 'detail';

        setTimeout(() => this.popoverBodyComponent?._focusFirstTabbableElement(), 0);
    }

    openOverflowMain(): void {
        this.personDetails = null;
        this.overflowPopoverStage = 'main';

        setTimeout(() => this.popoverBodyComponent?._focusFirstTabbableElement(), 0);
    }
}
