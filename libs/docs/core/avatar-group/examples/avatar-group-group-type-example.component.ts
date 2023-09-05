import { ENTER, ESCAPE, SPACE, TAB } from '@angular/cdk/keycodes';
import { Component, ViewChild } from '@angular/core';

import { NgFor, NgIf } from '@angular/common';
import { KeyUtil, RtlService, Size } from '@fundamental-ngx/cdk/utils';
import { AvatarModule } from '@fundamental-ngx/core/avatar';
import { AvatarGroupModule } from '@fundamental-ngx/core/avatar-group';
import { BarModule } from '@fundamental-ngx/core/bar';
import { ButtonModule } from '@fundamental-ngx/core/button';
import { ContentDensityDirective } from '@fundamental-ngx/core/content-density';
import { LinkComponent } from '@fundamental-ngx/core/link';
import {
    PopoverBodyComponent,
    PopoverBodyComponent as PopoverBodyComponent_1,
    PopoverBodyHeaderDirective,
    PopoverComponent,
    PopoverComponent as PopoverComponent_1,
    PopoverControlComponent
} from '@fundamental-ngx/core/popover';
import { QuickViewModule } from '@fundamental-ngx/core/quick-view';
import { AvatarGroupDataExampleService } from './avatar-group-data-example.service';

@Component({
    selector: 'fd-avatar-group-group-type-example',
    templateUrl: './avatar-group-group-type-example.component.html',
    standalone: true,
    imports: [
        AvatarGroupModule,
        PopoverComponent_1,
        PopoverControlComponent,
        NgFor,
        NgIf,
        AvatarModule,
        ButtonModule,
        ContentDensityDirective,
        PopoverBodyComponent_1,
        PopoverBodyHeaderDirective,
        BarModule,
        QuickViewModule,
        LinkComponent
    ]
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

    constructor(
        private readonly avatarGroupDataExampleService: AvatarGroupDataExampleService,
        private _rtlService: RtlService
    ) {}

    get isRtl(): boolean {
        return this._rtlService.rtl.getValue();
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
