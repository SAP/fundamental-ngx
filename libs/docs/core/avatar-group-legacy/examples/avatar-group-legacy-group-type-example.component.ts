import { ENTER, ESCAPE, SPACE, TAB } from '@angular/cdk/keycodes';
import { Component, ViewChild } from '@angular/core';

import { KeyUtil, RtlService, Size } from '@fundamental-ngx/cdk/utils';
import { AvatarComponent } from '@fundamental-ngx/core/avatar';
import {
    AvatarGroupLegacyComponent,
    AvatarGroupLegacyFocusableAvatarDirective,
    AvatarGroupLegacyItemDirective,
    AvatarGroupLegacyOverflowBodyDirective,
    AvatarGroupLegacyOverflowButtonDirective,
    AvatarGroupLegacyOverflowButtonTextDirective,
    AvatarGroupLegacyOverflowItemDirective,
    AvatarGroupLegacyPopoverControlDirective
} from '@fundamental-ngx/core/avatar-group-legacy';
import { BarModule } from '@fundamental-ngx/core/bar';
import { ButtonComponent } from '@fundamental-ngx/core/button';
import { ContentDensityDirective } from '@fundamental-ngx/core/content-density';
import { LinkComponent } from '@fundamental-ngx/core/link';
import {
    PopoverBodyComponent,
    PopoverBodyHeaderDirective,
    PopoverComponent,
    PopoverControlComponent
} from '@fundamental-ngx/core/popover';
import { QuickViewModule } from '@fundamental-ngx/core/quick-view';
import { AvatarGroupLegacyDataExampleService } from './avatar-group-legacy-data-example.service';

@Component({
    selector: 'fd-avatar-group-legacy-group-type-example',
    templateUrl: './avatar-group-legacy-group-type-example.component.html',
    imports: [
        AvatarGroupLegacyComponent,
        PopoverComponent,
        PopoverControlComponent,
        AvatarGroupLegacyPopoverControlDirective,
        AvatarGroupLegacyItemDirective,
        AvatarComponent,
        ButtonComponent,
        AvatarGroupLegacyOverflowButtonDirective,
        ContentDensityDirective,
        AvatarGroupLegacyOverflowButtonTextDirective,
        PopoverBodyComponent,
        PopoverBodyHeaderDirective,
        BarModule,
        AvatarGroupLegacyOverflowBodyDirective,
        AvatarGroupLegacyOverflowItemDirective,
        AvatarGroupLegacyFocusableAvatarDirective,
        QuickViewModule,
        LinkComponent
    ]
})
export class AvatarGroupLegacyGroupTypeExampleComponent {
    @ViewChild('overflowPopoverBody')
    popoverBodyComponent: PopoverBodyComponent;

    size: Size = 'l';
    people: any;
    personDetails: any = null;
    overflowPopoverStage: 'main' | 'detail' = 'main';

    get isDetailStage(): boolean {
        return this.overflowPopoverStage === 'detail';
    }

    get isRtl(): boolean {
        return this._rtlService.rtl.getValue();
    }

    constructor(
        private readonly avatarGroupDataExampleService: AvatarGroupLegacyDataExampleService,
        private _rtlService: RtlService
    ) {
        this.people = this.avatarGroupDataExampleService.generate();
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
