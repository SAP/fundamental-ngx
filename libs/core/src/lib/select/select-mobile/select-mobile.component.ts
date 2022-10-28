import {
    AfterViewInit,
    Component,
    ElementRef,
    Inject,
    OnDestroy,
    OnInit,
    Optional,
    TemplateRef,
    HostListener,
    ViewChild,
    ChangeDetectionStrategy
} from '@angular/core';
import { Subscription } from 'rxjs';

import { SELECT_COMPONENT, SelectInterface } from '../select.interface';
import { DialogService } from '@fundamental-ngx/core/dialog';
import { KeyUtil } from '@fundamental-ngx/core/utils';
import {
    MOBILE_MODE_CONFIG,
    MobileModeConfigToken,
    MobileModeBase,
    MobileModeControl
} from '@fundamental-ngx/core/mobile-mode';
import { ESCAPE } from '@angular/cdk/keycodes';

/**
 * This component provides extended mobile support for Select component to render list of option since full screen
 * dialog.
 */
@Component({
    selector: 'fd-select-mobile',
    templateUrl: './select-mobile.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SelectMobileComponent extends MobileModeBase<SelectInterface> implements OnInit, AfterViewInit, OnDestroy {
    /** @hidden
     * from mobile class can not prefix _,
     * to avoid build issues
     */
    childContent: TemplateRef<any> | null = null;

    /** @hidden */
    @ViewChild('dialogTemplate')
    _dialogTemplate: TemplateRef<any>;

    /** @hidden */
    private _subscriptions = new Subscription();

    /** @hidden */
    @HostListener('keydown', ['$event'])
    onItemKeydown(event: KeyboardEvent): void {
        if (event && KeyUtil.isKeyCode(event, [ESCAPE])) {
            this._component.close(true);
        }
    }

    /** @hidden */
    constructor(
        _elementRef: ElementRef,
        _dialogService: DialogService,
        @Inject(SELECT_COMPONENT) _selectComponent: SelectInterface,
        @Optional() @Inject(MOBILE_MODE_CONFIG) mobileModes: MobileModeConfigToken[]
    ) {
        super(_elementRef, _dialogService, _selectComponent, MobileModeControl.SELECT, mobileModes);
    }

    /** @hidden */
    ngOnInit(): void {
        this._listenOnSelectOpenChange();
    }

    /** @hidden */
    ngAfterViewInit(): void {
        this._openDialog();
        this.dialogRef.hide(true);
    }

    /** @hidden */
    ngOnDestroy(): void {
        this.dialogRef.close();
        super.onDestroy();
        this._subscriptions.unsubscribe();
    }

    /**
     * Only when we have Approve.
     * @hidden
     */
    _cancel(): void {
        this._component.close(true);
    }

    /** @hidden */
    _approve(): void {
        this._component.close(true);
    }

    /** @hidden Hide/Show the Dialog when Select Open/Close*/
    private _listenOnSelectOpenChange(): void {
        this._subscriptions.add(
            this._component.isOpenChange.subscribe((isOpen) => {
                this._elementRef.nativeElement.blur();
                this.dialogRef.hide(!isOpen);
            })
        );
    }

    /** @hidden */
    private _openDialog(): void {
        this.dialogRef = this._dialogService.open(this._dialogTemplate, {
            ...this.dialogConfig,
            mobile: true,
            verticalPadding: false,
            backdropClickCloseable: false,
            container: this._elementRef.nativeElement,
            ariaLabelledBy: 'fd-dialog-header'
        });
    }
}
