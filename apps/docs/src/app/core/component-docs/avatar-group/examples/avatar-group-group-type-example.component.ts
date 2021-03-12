import { Component, ViewChild, ViewEncapsulation } from '@angular/core';

import { PopoverBodyComponent, Size } from '@fundamental-ngx/core';
import { AvatarGroupDataExampleService } from './avatar-group-data-example.service';

@Component({
    selector: 'fd-avatar-group-group-type-example',
    templateUrl: './avatar-group-group-type-example.component.html',
    styleUrls: ['./avatar-group-group-type-example.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class AvatarGroupGroupTypeExampleComponent {
    @ViewChild('overflowPopoverBody')
    popoverBodyComponent: PopoverBodyComponent;

    size: Size = 'l';
    people = this.avatarGroupDataExampleService.generate();
    personDetails: any = null;
    overflowPopoverStage: 'main' | 'detail' = 'main';

    get isDetailStage(): boolean {
        return this.overflowPopoverStage === 'detail';
    }

    constructor(private readonly avatarGroupDataExampleService: AvatarGroupDataExampleService) {}

    openOverflowDetails(idx: number): void {
        this.personDetails = this.people[idx];
        this.overflowPopoverStage = 'detail';

        setTimeout(() => this.popoverBodyComponent?._focusFirstTabbableElement(), 0);
    }

    openOverflowMain(): void {
        this.personDetails = null;
        this.overflowPopoverStage = 'main';

        setTimeout(() => this.popoverBodyComponent?._focusFirstTabbableElement(), 0);
    }
}
