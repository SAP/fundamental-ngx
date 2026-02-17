import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    Inject,
    Injector,
    OnDestroy,
    OnInit,
    runInInjectionContext,
    TemplateRef,
    ViewChild,
    ViewEncapsulation
} from '@angular/core';

import { Subscription } from 'rxjs';

import { NgTemplateOutlet } from '@angular/common';
import { takeUntilDestroyed, toObservable } from '@angular/core/rxjs-interop';
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

    /** @hidden Observable of component isOpen state - created in constructor to preserve injection context */
    private _isOpen$: ReturnType<typeof toObservable<boolean>>;

    /** @hidden */
    get titleId(): string {
        return this.id + '-title';
    }

    /** @hidden */
    constructor(
        private _changeDetectorref: ChangeDetectorRef,
        @Inject(POPOVER_COMPONENT) _popoverComponent: PopoverInterface,
        private _injector: Injector
    ) {
        super(_popoverComponent, MobileModeControl.POPOVER);
        // Create observable in constructor to preserve injection context for toObservable()
        this._isOpen$ = runInInjectionContext(this._injector, () => toObservable(this._component.isOpen));
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
            this._isOpen$.pipe(takeUntilDestroyed(this._destroyRef)).subscribe((isOpen) => {
                if (isOpen) {
                    this._openDialog();
                } else {
                    this.dialogRef?.hide(true);
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
