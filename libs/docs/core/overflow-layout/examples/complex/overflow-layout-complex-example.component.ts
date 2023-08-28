import { ENTER, ESCAPE, SPACE, TAB } from '@angular/cdk/keycodes';
import { NgFor, NgIf, NgTemplateOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { KeyUtil, Size } from '@fundamental-ngx/cdk/utils';
import { AvatarModule } from '@fundamental-ngx/core/avatar';
import { AvatarGroupModule } from '@fundamental-ngx/core/avatar-group';
import { BarModule } from '@fundamental-ngx/core/bar';
import { ButtonModule } from '@fundamental-ngx/core/button';
import { LinkComponent } from '@fundamental-ngx/core/link';
import { OverflowLayoutModule } from '@fundamental-ngx/core/overflow-layout';
import {
    PopoverBodyComponent,
    PopoverBodyHeaderDirective,
    PopoverComponent,
    PopoverComponent as PopoverComponent_1,
    PopoverControlComponent
} from '@fundamental-ngx/core/popover';
import { QuickViewModule } from '@fundamental-ngx/core/quick-view';
import { AvatarGeneratorExampleService } from './avatar-generator-example.service';

@Component({
    selector: 'fd-overflow-layout-complex-example',
    templateUrl: './overflow-layout-complex-example.component.html',
    styleUrls: ['./overflow-layout-complex-example.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [
        QuickViewModule,
        NgIf,
        BarModule,
        AvatarModule,
        LinkComponent,
        OverflowLayoutModule,
        NgFor,
        PopoverComponent_1,
        PopoverControlComponent,
        NgTemplateOutlet,
        PopoverBodyComponent,
        ButtonModule,
        AvatarGroupModule,
        PopoverBodyHeaderDirective
    ]
})
export class OverflowLayoutComplexExampleComponent {
    size: Size = 's';

    itemsToRender = this._avatarService.generate();

    @ViewChild('overflowPopover', { read: PopoverComponent })
    overflowPopover: PopoverComponent;

    private _overflowPopoverStage: 'main' | 'detail' = 'main';

    set overflowPopoverStage(value: 'main' | 'detail') {
        this._overflowPopoverStage = value;
        this.overflowPopover.refreshPosition();
    }

    get overflowPopoverStage(): 'main' | 'detail' {
        return this._overflowPopoverStage;
    }

    personDetails: any = null;

    get isDetailStage(): boolean {
        return this.overflowPopoverStage === 'detail';
    }

    constructor(private _avatarService: AvatarGeneratorExampleService) {}

    addItem(): void {
        this.itemsToRender.push(this._avatarService.generateAvatar());
    }

    removeItem(): void {
        this.itemsToRender.pop();
    }

    openOverflowDetails(idx: number): void {
        this.personDetails = this.itemsToRender[idx];
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

    handleOverflowPopoverOpen(isOpen: boolean): void {
        if (isOpen) {
            this.openOverflowMain();
        }
    }
}
