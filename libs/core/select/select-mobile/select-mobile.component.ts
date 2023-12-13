import {
    AfterViewInit,
    ChangeDetectionStrategy,
    Component,
    ElementRef,
    HostListener,
    Inject,
    OnDestroy,
    OnInit,
    Optional,
    TemplateRef,
    ViewChild
} from '@angular/core';
import { Subscription } from 'rxjs';

import { ESCAPE } from '@angular/cdk/keycodes';
import { CdkScrollable } from '@angular/cdk/overlay';
import { NgTemplateOutlet } from '@angular/common';
import { DynamicComponentService, KeyUtil } from '@fundamental-ngx/cdk/utils';
import { ButtonBarComponent } from '@fundamental-ngx/core/bar';
import { DialogModule, DialogService } from '@fundamental-ngx/core/dialog';
import {
    MOBILE_MODE_CONFIG,
    MobileModeBase,
    MobileModeConfigToken,
    MobileModeControl
} from '@fundamental-ngx/core/mobile-mode';
import { ScrollbarDirective } from '@fundamental-ngx/core/scrollbar';
import { TitleComponent } from '@fundamental-ngx/core/title';
import { SELECT_COMPONENT, SelectInterface } from '../select.interface';

/**
 * This component provides extended mobile support for Select component to render list of option since full screen
 * dialog.
 */
@Component({
    selector: 'fd-select-mobile',
    templateUrl: './select-mobile.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    providers: [DynamicComponentService],
    imports: [DialogModule, TitleComponent, CdkScrollable, ScrollbarDirective, NgTemplateOutlet, ButtonBarComponent]
})
export class SelectMobileComponent extends MobileModeBase<SelectInterface> implements OnInit, AfterViewInit, OnDestroy {
    /** @ignore
     * from mobile class can not prefix _,
     * to avoid build issues
     */
    childContent: TemplateRef<any> | null = null;

    /** @ignore */
    @ViewChild('dialogTemplate')
    _dialogTemplate: TemplateRef<any>;

    /** @ignore */
    private _subscriptions = new Subscription();

    /** @ignore */
    @HostListener('keydown', ['$event'])
    onItemKeydown(event: KeyboardEvent): void {
        if (event && KeyUtil.isKeyCode(event, [ESCAPE])) {
            this._component.close(true);
        }
    }

    /** @ignore */
    constructor(
        _elementRef: ElementRef,
        _dialogService: DialogService,
        @Inject(SELECT_COMPONENT) _selectComponent: SelectInterface,
        @Optional() @Inject(MOBILE_MODE_CONFIG) mobileModes: MobileModeConfigToken[]
    ) {
        super(_elementRef, _dialogService, _selectComponent, MobileModeControl.SELECT, mobileModes);
    }

    /** @ignore */
    ngOnInit(): void {
        this._listenOnSelectOpenChange();
    }

    /** @ignore */
    ngAfterViewInit(): void {
        this._openDialog();
        this.dialogRef.hide(true);
    }

    /** @ignore */
    ngOnDestroy(): void {
        this.dialogRef.close();
        super.onDestroy();
        this._subscriptions.unsubscribe();
    }

    /**
     * Only when we have Approve.
     * @ignore
     */
    _cancel(): void {
        this._component.close(true);
    }

    /** @ignore */
    _approve(): void {
        this._component.close(true);
    }

    /** @ignore Hide/Show the Dialog when Select Open/Close*/
    private _listenOnSelectOpenChange(): void {
        this._subscriptions.add(
            this._component.isOpenChange.subscribe((isOpen) => {
                this._elementRef.nativeElement.blur();
                this.dialogRef.hide(!isOpen);
            })
        );
    }

    /** @ignore */
    private _openDialog(): void {
        this.dialogRef = this._dialogService.open(this._dialogTemplate, {
            ...this.dialogConfig,
            mobile: true,
            disablePaddings: true,
            backdropClickCloseable: false,
            container: this._elementRef.nativeElement,
            ariaLabelledBy: 'fd-dialog-header'
        });
    }
}
