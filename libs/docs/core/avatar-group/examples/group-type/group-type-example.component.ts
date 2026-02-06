import { ENTER, ESCAPE, SPACE, TAB } from '@angular/cdk/keycodes';

import { Component, inject } from '@angular/core';
import { KeyUtil, Size } from '@fundamental-ngx/cdk/utils';
import { AvatarComponent } from '@fundamental-ngx/core/avatar';
import { AvatarGroupComponent, AvatarGroupItemDirective } from '@fundamental-ngx/core/avatar-group';
import { LinkComponent } from '@fundamental-ngx/core/link';
import { PopoverComponent } from '@fundamental-ngx/core/popover';
import { QuickViewModule } from '@fundamental-ngx/core/quick-view';
import { AvatarGroupDataExampleService } from '../avatar-group-data-example.service';

@Component({
    selector: 'fd-avatar-group-group-type-example',
    templateUrl: './group-type-example.component.html',
    imports: [AvatarGroupComponent, AvatarComponent, QuickViewModule, LinkComponent, AvatarGroupItemDirective]
})
export class GroupTypeExampleComponent {
    size: Size = 'l';
    readonly avatarGroupDataExampleService = inject(AvatarGroupDataExampleService);
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

    isOpenChanged(isOpened: boolean): void {
        if (isOpened) {
            this.openOverflowMain();
        }
    }

    openOverflowDetails(idx: number): void {
        this.personDetails = this.people[idx];
        this.overflowPopoverStage = 'detail';
    }

    openOverflowMain(): void {
        this.personDetails = null;
        this.overflowPopoverStage = 'main';
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
