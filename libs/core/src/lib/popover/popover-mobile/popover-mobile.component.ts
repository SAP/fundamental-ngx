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
    ViewEncapsulation,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { DialogService } from '../../dialog/public_api';
import {
    MobileModeBase,
    MOBILE_MODE_CONFIG,
    MobileModeControl,
    MobileModeConfigToken
} from '@fundamental-ngx/core/mobile-mode';
import { RtlService } from '../../utils/public_api';
import { PopoverService } from '../popover-service/popover.service';
import { PopoverInterface, POPOVER_COMPONENT } from '../popover.interface';
import { takeUntil } from 'rxjs/operators';

@Component({
    selector: 'fd-popover-mobile',
    templateUrl: './popover-mobile.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    providers: [PopoverService],
})
export class PopoverMobileComponent extends MobileModeBase<PopoverInterface> implements OnInit, OnDestroy {
    childContent: TemplateRef<any> = undefined;

    @ViewChild('dialogTemplate')
    _dialogTemplate: TemplateRef<any>;

    private _subscriptions = new Subscription();

    constructor(
        elementRef: ElementRef,
        dialogService: DialogService,
        private _popoverService: PopoverService,
        private _changeDetectorref: ChangeDetectorRef,
        @Optional() private _rtlService: RtlService,
        @Inject(POPOVER_COMPONENT) _popoverComponent: PopoverInterface,
        @Optional() @Inject(MOBILE_MODE_CONFIG) mobileModes: MobileModeConfigToken[]
    ) {
        super(elementRef, dialogService, _popoverComponent, MobileModeControl.POPOVER, mobileModes);
    }

    ngOnInit(): void {
        this._listenOnPopoverOpenChange();
    }

    ngOnDestroy(): void {
        this.dialogRef.close();
        super.onDestroy();
        this._subscriptions.unsubscribe();
    }

    close(): void {
        this.dialogRef.close();
        this._component.close();
    }

    private _listenOnPopoverOpenChange(): void {
        this._subscriptions.add(
            this._component.isOpenChange
                .pipe(takeUntil(this._onDestroy$))
                .subscribe((isOpen) => {
                    if (isOpen) {
                        this._openDialog();
                    } else {
                        this.dialogRef.hide(true);
                    }
                })
        );
    }

    private _openDialog(): void {
        this.dialogRef = this._dialogService.open(this._dialogTemplate, {
            ...this.dialogConfig,
            mobile: true,
            focusTrapped: false,
            verticalPadding: false,
            escKeyCloseable: false,
            backdropClickCloseable: false,
            container: this._elementRef.nativeElement,
        });
    }
}
