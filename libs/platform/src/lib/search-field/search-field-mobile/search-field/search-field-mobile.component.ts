import {
    ChangeDetectionStrategy,
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
import {
    MOBILE_MODE_CONFIG,
    MobileModeBase,
    MobileModeConfigToken,
    MobileModeControl
} from '@fundamental-ngx/core/mobile-mode';
import { DialogService } from '@fundamental-ngx/core/dialog';
import {
    SEARCH_FIELD_COMPONENT,
    SearchFieldChildContent,
    SearchFieldMobileInterface
} from '../search-field-mobile.interface';
import { takeUntil } from 'rxjs/operators';

@Component({
    selector: 'fdp-search-field-mobile',
    templateUrl: 'search-field-mobile.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None
})
export class SearchFieldMobileComponent
    extends MobileModeBase<SearchFieldMobileInterface>
    implements OnInit, OnDestroy
{
    /** @hidden */
    childContent: SearchFieldChildContent | null = null;

    /** @hidden */
    @ViewChild('dialogTemplate') dialogTemplate: TemplateRef<any>;

    /** @hidden */
    constructor(
        elementRef: ElementRef,
        dialogService: DialogService,
        @Inject(SEARCH_FIELD_COMPONENT) searchFieldComponent: SearchFieldMobileInterface,
        @Optional() @Inject(MOBILE_MODE_CONFIG) mobileModes: MobileModeConfigToken[]
    ) {
        super(elementRef, dialogService, searchFieldComponent, MobileModeControl.SEARCH_FIELD, mobileModes);
    }

    /** @hidden */
    ngOnInit(): void {
        this.listenChanges();
    }

    /** @hidden */
    ngOnDestroy(): void {
        super.onDestroy();
    }

    /** @hidden */
    listenChanges(): void {
        this._component.isOpenChange.pipe(takeUntil(this._onDestroy$)).subscribe((isOpen) => {
            if (!isOpen) {
                this._handleDismiss();

                return;
            }

            if (!this._dialogService.hasOpenDialogs()) {
                this._open();
            }
        });
    }

    /** @hidden */
    _handleDismiss(): void {
        this.dialogRef.close();
        this._component.dialogDismiss();
    }

    /** @hidden */
    _handleApprove(): void {
        this.dialogRef.close();
        this._component.dialogApprove();
    }

    /** @hidden */
    private _open(): void {
        this.dialogRef = this._dialogService.open(this.dialogTemplate, {
            mobile: true,
            verticalPadding: false,
            ...this.dialogConfig,
            backdropClickCloseable: false,
            escKeyCloseable: true,
            container: this._elementRef.nativeElement
        });
    }
}
