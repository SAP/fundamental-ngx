import {
    ChangeDetectionStrategy,
    Component,
    effect,
    inject,
    OnDestroy,
    OnInit,
    TemplateRef,
    ViewChild,
    ViewEncapsulation
} from '@angular/core';

import { NgTemplateOutlet } from '@angular/common';
import { TemplateModule } from '@fundamental-ngx/cdk/utils';
import {
    DialogBodyComponent,
    DialogCloseButtonComponent,
    DialogComponent,
    DialogFooterComponent,
    DialogHeaderComponent
} from '@fundamental-ngx/core/dialog';
import { MobileModeBase, MobileModeControl } from '@fundamental-ngx/core/mobile-mode';
import { TitleComponent } from '@fundamental-ngx/core/title';
import { PopoverChildContent } from '../popover-child-content.interface';
import { POPOVER_COMPONENT, PopoverInterface } from '../popover.interface';

let mobilePopoverUniqueId = 0;

@Component({
    selector: 'fd-popover-mobile',
    templateUrl: './popover-mobile.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    imports: [
        TemplateModule,
        TitleComponent,
        NgTemplateOutlet,
        DialogComponent,
        DialogBodyComponent,
        DialogHeaderComponent,
        DialogFooterComponent,
        DialogCloseButtonComponent
    ]
})
export class PopoverMobileComponent extends MobileModeBase<PopoverInterface> implements OnInit, OnDestroy {
    /** @hidden */
    @ViewChild('dialogTemplate')
    _dialogTemplate: TemplateRef<any>;

    /** @hidden Cannot use _ prefix due to mobile class build constraints. */
    childContent?: PopoverChildContent = undefined;

    /** Current popover title */
    title: string;
    /** Dialog body content */
    viewBody: TemplateRef<any> | null;

    /** Dialog footer content */
    viewFooter: TemplateRef<any> | null;

    /** @hidden */
    readonly id = 'fd-popover-mobile-' + mobilePopoverUniqueId++;

    /** @hidden */
    get titleId(): string {
        return this.id + '-title';
    }

    /** @hidden */
    constructor() {
        super(inject<PopoverInterface>(POPOVER_COMPONENT), MobileModeControl.POPOVER);

        // effect() automatically tracks _component.isOpen signal and cleans up on destroy
        effect(() => {
            if (this._component.isOpen()) {
                this._openDialog();
            } else {
                this.dialogRef?.hide(true);
            }
        });
    }

    /** @hidden */
    ngOnInit(): void {
        this.title = this.mobileConfig.title || '';
        this.viewBody = this.childContent?.popoverBodyContentTemplate ?? null;
        this.viewFooter = this.childContent?.popoverFooterContentTemplate ?? null;
    }

    /** @hidden */
    ngOnDestroy(): void {
        this.dialogRef?.close();
    }

    /** Closes the dialog and popover. */
    close(): void {
        this.dialogRef.close();
        this._component.close();
    }

    /** @hidden Opens the dialog. */
    private _openDialog(): void {
        this.dialogRef = this._dialogService.open(this._dialogTemplate, {
            verticalPadding: true,
            horizontalPadding: true,
            ...this.dialogConfig,
            mobile: true,
            focusTrapped: true,
            escKeyCloseable: false,
            backdropClickCloseable: false,
            container: this._elementRef.nativeElement,
            responsivePadding: true,
            ariaLabelledBy: this.titleId
        });
    }
}
