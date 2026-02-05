import { ENTER, ESCAPE, SPACE, TAB } from '@angular/cdk/keycodes';
import { Component, computed, inject, ViewChild } from '@angular/core';

import { SlicePipe } from '@angular/common';
import { KeyUtil, RtlService, Size } from '@fundamental-ngx/cdk/utils';
import { AvatarComponent } from '@fundamental-ngx/core/avatar';
import {
    AvatarGroupLegacyComponent,
    AvatarGroupLegacyFocusableAvatarDirective,
    AvatarGroupLegacyItemDirective,
    AvatarGroupLegacyOverflowBodyDirective,
    AvatarGroupLegacyOverflowButtonDirective,
    AvatarGroupLegacyOverflowButtonTextDirective,
    AvatarGroupLegacyOverflowItemDirective
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
    selector: 'fd-avatar-group-legacy-individual-type-example',
    templateUrl: './avatar-group-legacy-individual-type-example.component.html',
    imports: [
        AvatarGroupLegacyComponent,
        PopoverComponent,
        PopoverControlComponent,
        AvatarGroupLegacyItemDirective,
        AvatarComponent,
        PopoverBodyComponent,
        QuickViewModule,
        LinkComponent,
        ButtonComponent,
        AvatarGroupLegacyOverflowButtonDirective,
        ContentDensityDirective,
        AvatarGroupLegacyOverflowButtonTextDirective,
        PopoverBodyHeaderDirective,
        BarModule,
        AvatarGroupLegacyOverflowBodyDirective,
        AvatarGroupLegacyOverflowItemDirective,
        AvatarGroupLegacyFocusableAvatarDirective,
        SlicePipe
    ]
})
export class AvatarGroupLegacyIndividualTypeExampleComponent {
    @ViewChild('avatarGroup_IndividualType')
    avatarGroup: AvatarGroupLegacyComponent;

    @ViewChild('overflowPopoverBody')
    popoverBodyComponent: PopoverBodyComponent;

    size: Size = 's';
    people: any;
    personDetails: any = null;
    overflowPopoverStage: 'main' | 'detail' = 'main';

    get isDetailStage(): boolean {
        return this.overflowPopoverStage === 'detail';
    }

    protected readonly navigationArrow = computed(() =>
        this._rtlService?.rtl() ? 'navigation-right-arrow' : 'navigation-left-arrow'
    );

    private readonly _rtlService = inject(RtlService, { optional: true });

    constructor(private readonly avatarGroupDataExampleService: AvatarGroupLegacyDataExampleService) {
        this.people = this.avatarGroupDataExampleService.generate();
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
