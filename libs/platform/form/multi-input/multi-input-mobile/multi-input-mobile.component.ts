import {
    ChangeDetectionStrategy,
    Component,
    Inject,
    OnInit,
    TemplateRef,
    ViewChild,
    ViewEncapsulation
} from '@angular/core';
import { distinctUntilChanged } from 'rxjs/operators';

import { CdkScrollable } from '@angular/cdk/overlay';
import { NgTemplateOutlet } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Nullable, TemplateDirective } from '@fundamental-ngx/cdk/utils';
import { BarModule } from '@fundamental-ngx/core/bar';
import { DialogModule } from '@fundamental-ngx/core/dialog';
import { MobileModeBase, MobileModeControl } from '@fundamental-ngx/core/mobile-mode';
import { ScrollbarDirective } from '@fundamental-ngx/core/scrollbar';
import { MULTIINPUT_COMPONENT, PlatformMultiInputInterface } from '../multi-input.interface';

@Component({
    selector: 'fdp-multi-input-mobile',
    templateUrl: './multi-input-mobile.component.html',
    styleUrl: './multi-input-mobile.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    imports: [DialogModule, TemplateDirective, BarModule, NgTemplateOutlet, CdkScrollable, ScrollbarDirective]
})
export class PlatformMultiInputMobileComponent extends MobileModeBase<PlatformMultiInputInterface> implements OnInit {
    /** @hidden */
    @ViewChild('dialogTemplate') dialogTemplate: TemplateRef<any>;

    /** @hidden
     * For internal usage
     * Control element, which will be rendered inside dialog.
     * List element, which will be rendered inside dialog.
     */
    childContent: Nullable<{
        listTemplate: TemplateRef<any>;
        controlTemplate: TemplateRef<any>;
    }> = null;

    /** @hidden */
    private _selectedBackup: any[];

    /** @hidden */
    constructor(@Inject(MULTIINPUT_COMPONENT) multiInputComponent: PlatformMultiInputInterface) {
        super(multiInputComponent, MobileModeControl.MULTI_INPUT);
    }

    /** @hidden */
    ngOnInit(): void {
        this._listenOnMultiInputOpenChange();
    }

    /** @hidden */
    _handleApprove(): void {
        this.dialogRef.close();
        this._component._dialogApprove();
    }

    /** @hidden */
    _handleDismiss(): void {
        this.dialogRef.dismiss();
        this._component._dialogDismiss(this._selectedBackup);
    }

    /** @hidden */
    private _listenOnMultiInputOpenChange(): void {
        this._component.openChange
            .pipe(distinctUntilChanged(), takeUntilDestroyed(this._destroyRef))
            .subscribe((isOpen) => this._toggleDialog(isOpen));
    }

    /** @hidden */
    private _toggleDialog(open: boolean): void {
        if (!open) {
            this._handleApprove();
            return;
        }

        this._selectedBackup = [...this._component._selected];
        if (!this._dialogService.hasOpenDialogs()) {
            this._open();
        }
    }

    /** @hidden */
    private _open(): void {
        this.dialogRef = this._dialogService.open(this.dialogTemplate, {
            mobile: true,
            disablePaddings: true,
            ...this.dialogConfig,
            backdropClickCloseable: false,
            escKeyCloseable: false,
            container: this._elementRef.nativeElement
        });
    }
}
