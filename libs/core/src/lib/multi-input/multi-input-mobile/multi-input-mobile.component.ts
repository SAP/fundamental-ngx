import {
    AfterViewInit,
    ChangeDetectionStrategy,
    Component,
    ElementRef, Inject,
    isDevMode,
    OnDestroy,
    OnInit,
    TemplateRef,
    ViewChild,
    ViewEncapsulation
} from '@angular/core';
import { DialogService } from '../../dialog/dialog-service/dialog.service';
import { DialogRef } from '../../dialog/dialog-utils/dialog-ref.class';
import { MobileModeConfig } from '../../utils/interfaces/mobile-mode-config';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { MULTI_INPUT_COMPONENT, MultiInputInterface } from '../multi-input.interface';

@Component({
    selector: 'fd-multi-input-mobile',
    templateUrl: './multi-input-mobile.component.html',
    styleUrls: ['./multi-input-mobile.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None
})
export class MultiInputMobileComponent implements OnInit, AfterViewInit, OnDestroy {

    /** @hidden */
    multiInputConfig: MobileModeConfig;

    /** @hidden
     * For internal usage
     * Control element, which will be rendered inside dialog.
     * List element, which will be rendered inside dialog.
     */
    childContent: {
        listTemplate: TemplateRef<any>,
        controlTemplate: TemplateRef<any>
    } = null;

    /** @hidden */
    @ViewChild('dialogTemplate') dialogTemplate: TemplateRef<any>;

    /** @hidden */
    private _dialogRef: DialogRef;

    /** @hidden */
    private _selectedBackup: any[];

    /** An RxJS Subject that will kill the data stream upon component’s destruction (for unsubscribing)  */
    private readonly _onDestroy$: Subject<void> = new Subject<void>();

    constructor(
        private _dialogService: DialogService,
        @Inject(MULTI_INPUT_COMPONENT) private _multiInputComponent: MultiInputInterface,
        private _elementRef: ElementRef
    ) {}

    /** @hidden */
    ngOnInit(): void {
        this.multiInputConfig = this.getMultiInputConfig();
        if (this.multiInputConfig) {
            this._listenOnMultiInputOpenChange();
        }
    }

    /** @hidden */
    ngAfterViewInit(): void {
        this._open();
        this._dialogRef.hide(true);
    }

    /** @hidden */
    ngOnDestroy(): void {
        this._onDestroy$.next();
        this._onDestroy$.complete();
    }

    /** Throw select all event, it's handled by multi input component */
    selectAll(): void {
        this._multiInputComponent.selectAllItems();
    }

    /** @hidden */
    handleDismiss(): void {
        this._dialogRef.hide(true);
        this._multiInputComponent.dialogDismiss(this._selectedBackup);
    }

    /** @hidden */
    handleApprove(): void {
        this._dialogRef.hide(true);
        this._multiInputComponent.dialogApprove();
    }

    /** @hidden */
    private getMultiInputConfig(): MobileModeConfig {
        if (this._multiInputComponent.multiInputMobileConfig) {
            return this._multiInputComponent.multiInputMobileConfig;
        } else {
            if (isDevMode()) {
                throw new Error('There is no multi input configuration object provided. ' +
                    'You need to pass it as a "[multiInputMobileConfig]",' +
                    'or provide it with "MULTI_INPUT_MOBILE_CONFIG" injection token'
                );
            }
        }
    }

    private _toggleDialog(open: boolean): void {
        if (open) {
            this._selectedBackup = [...this._multiInputComponent.selected];
            if (!this._dialogService.hasOpenDialogs()) {
                this._open();
            }
        }
        this._dialogRef.hide(!open);
    }

    /** @hidden */
    private _listenOnMultiInputOpenChange(): void {
        this._multiInputComponent.openChange
            .pipe(takeUntil(this._onDestroy$))
            .subscribe(isOpen => this._toggleDialog(isOpen))
        ;
    }

    /** @hidden */
    private _open(): void {
        this._dialogRef = this._dialogService.open(
            this.dialogTemplate,
            {
                ...this._multiInputComponent.dialogConfig,
                backdropClickCloseable: false,
                escKeyCloseable: false,
                container: this._elementRef.nativeElement
            }
        );
    }
}
