import { Component, ViewChild } from '@angular/core';
import { ENTER, ESCAPE, SPACE, TAB } from '@angular/cdk/keycodes';

import { PopoverComponent, PopoverBodyComponent } from '@fundamental-ngx/core/popover';
import { KeyUtil, Size } from '@fundamental-ngx/core/utils';
import { AvatarGroupDataExampleService } from './avatar-group-data-example.service';

@Component({
    selector: 'fd-avatar-group-group-type-example',
    templateUrl: './avatar-group-group-type-example.component.html'
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

    getPopoverCtrlAriaLabel(overflowItemsCount = 0): string {
        return (
            'Has popup type dialog Conjoined avatars, ' +
            ((this.people?.length || 0) - overflowItemsCount) +
            ' avatars displayed, ' +
            overflowItemsCount +
            ' avatars hidden, activate for complete list'
        );
    }

    constructor(private readonly avatarGroupDataExampleService: AvatarGroupDataExampleService) {}

    isOpenChanged(isOpened: boolean): void {
        if (isOpened) {
            this.openOverflowMain();
        }
    }

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
}
