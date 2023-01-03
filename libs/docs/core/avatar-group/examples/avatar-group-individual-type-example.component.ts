import { Component, ViewChild } from '@angular/core';
import { ENTER, ESCAPE, SPACE, TAB } from '@angular/cdk/keycodes';

import { AvatarGroupComponent } from '@fundamental-ngx/core/avatar-group';
import { PopoverComponent, PopoverBodyComponent } from '@fundamental-ngx/core/popover';
import { KeyUtil, RtlService, Size } from '@fundamental-ngx/cdk/utils';
import { AvatarGroupDataExampleService } from './avatar-group-data-example.service';

@Component({
    selector: 'fd-avatar-group-individual-type-example',
    templateUrl: './avatar-group-individual-type-example.component.html'
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

    constructor(
        private readonly avatarGroupDataExampleService: AvatarGroupDataExampleService,
        private _rtlService: RtlService
    ) {}

    get isRtl(): boolean {
        return this._rtlService.rtl.getValue();
    }

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

    handleControlClick(event: MouseEvent, popover: PopoverComponent): void {
        popover.open();
    }

    handleControlKeydown(event: KeyboardEvent, popover: PopoverComponent): void {
        if (!KeyUtil.isKeyCode(event, [ESCAPE, TAB, SPACE, ENTER])) {
            return;
        }

        if (KeyUtil.isKeyCode(event, [ESCAPE, TAB])) {
            popover.close();
        }

        if (KeyUtil.isKeyCode(event, [SPACE, ENTER])) {
            popover.open();
        }
    }

    handleOverflowPopoverOpen(isOpen: boolean): void {
        if (isOpen) {
            this.openOverflowMain();
        }
    }
}
