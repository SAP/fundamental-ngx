import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ElementRef,
    Inject,
    OnDestroy,
    OnInit,
    Optional,
    TemplateRef,
    ViewChild,
    ViewEncapsulation
} from '@angular/core';

import { Subscription } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import {
    MOBILE_MODE_CONFIG,
    MobileModeBase,
    MobileModeConfigToken,
    MobileModeControl
} from '@fundamental-ngx/core/mobile-mode';
import { DialogModule, DialogService } from '@fundamental-ngx/core/dialog';
import { POPOVER_COMPONENT, PopoverInterface } from '../popover.interface';
import { PopoverChildContent } from '../popover-child-content.interface';
import { ScrollbarDirective } from '@fundamental-ngx/core/scrollbar';
import { CdkScrollable } from '@angular/cdk/overlay';
import { NgIf, NgTemplateOutlet } from '@angular/common';
import { TitleComponent } from '@fundamental-ngx/core/title';

let mobilePopoverUniqueId = 0;

@Component({
    selector: 'fd-popover-mobile',
    templateUrl: './popover-mobile.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [DialogModule, TitleComponent, NgIf, CdkScrollable, ScrollbarDirective, NgTemplateOutlet]
})
export class PopoverMobileComponent extends MobileModeBase<PopoverInterface> implements OnInit, OnDestroy {
    /** @hidden */
    @ViewChild('dialogTemplate')
    _dialogTemplate: TemplateRef<any>;

    /** @hidden
     * from mobile class can not prefix _,
     * to avoid build issues
     */
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
    private _subscriptions = new Subscription();

    /** @hidden */
    get titleId(): string {
        return this.id + '-title';
    }

    /** @hidden */
    constructor(
        elementRef: ElementRef,
        dialogService: DialogService,
        private _changeDetectorref: ChangeDetectorRef,
        @Inject(POPOVER_COMPONENT) _popoverComponent: PopoverInterface,
        @Optional() @Inject(MOBILE_MODE_CONFIG) mobileModes: MobileModeConfigToken[]
    ) {
        super(elementRef, dialogService, _popoverComponent, MobileModeControl.POPOVER, mobileModes);
    }

    /** @hidden */
    ngOnInit(): void {
        this._listenOnPopoverOpenChange();

        this.title = this.mobileConfig.title || '';
        this.viewBody = this.childContent?.popoverBodyContentTemplate ?? null;
        this.viewFooter = this.childContent?.popoverFooterContentTemplate ?? null;

        this._changeDetectorref.markForCheck();
    }

    /** @hidden */
    ngOnDestroy(): void {
        this.dialogRef?.close();
        super.onDestroy();
        this._subscriptions.unsubscribe();
    }

    /** Closes the Dialog and Popover component */
    close(): void {
        this.dialogRef.close();
        this._component.close();
    }

    /** @hidden Opens/closes the Dialog based on Popover isOpenChange events */
    private _listenOnPopoverOpenChange(): void {
        this._subscriptions.add(
            this._component.isOpenChange.pipe(takeUntil(this._onDestroy$)).subscribe((isOpen) => {
                if (isOpen) {
                    this._openDialog();
                } else {
                    this.dialogRef.hide(true);
                }
            })
        );
    }

    /** @hidden Opens the Dialog */
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
