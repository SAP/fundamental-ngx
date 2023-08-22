import { ENTER, ESCAPE, SPACE, TAB } from '@angular/cdk/keycodes';
import { ChangeDetectionStrategy, Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { PopoverComponent } from '@fundamental-ngx/core/popover';
import { KeyUtil, Size } from '@fundamental-ngx/cdk/utils';
import { AvatarGeneratorExampleService } from './avatar-generator-example.service';
import { PopoverBodyHeaderDirective } from '@fundamental-ngx/core/popover';
import { AvatarGroupModule } from '@fundamental-ngx/core/avatar-group';
import { ButtonModule } from '@fundamental-ngx/core/button';
import { PopoverBodyComponent } from '@fundamental-ngx/core/popover';
import { PopoverControlComponent } from '@fundamental-ngx/core/popover';
import { PopoverComponent as PopoverComponent_1 } from '@fundamental-ngx/core/popover';
import { OverflowLayoutModule } from '@fundamental-ngx/core/overflow-layout';
import { LinkComponent } from '@fundamental-ngx/core/link';
import { AvatarModule } from '@fundamental-ngx/core/avatar';
import { BarModule } from '@fundamental-ngx/core/bar';
import { NgIf, NgFor, NgTemplateOutlet } from '@angular/common';
import { QuickViewModule } from '@fundamental-ngx/core/quick-view';

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
