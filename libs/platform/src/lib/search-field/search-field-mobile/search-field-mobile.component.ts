import {
    ChangeDetectionStrategy,
    Component,
    ElementRef,
    Inject, OnDestroy,
    OnInit,
    Optional,
    TemplateRef,
    ViewChild,
    ViewEncapsulation
} from '@angular/core';
import {
    DialogService,
    MOBILE_MODE_CONFIG,
    MobileModeBase,
    MobileModeConfigToken,
    MobileModeControl
} from '@fundamental-ngx/core';
import { SEARCH_FIELD_COMPONENT, SearchFieldMobileInterface } from './search-field-mobile.interface';
import { takeUntil } from 'rxjs/operators';

@Component({
    selector: 'fdp-search-field-mobile',
    templateUrl: 'search-field-mobile.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None
})
export class SearchFieldMobileComponent extends MobileModeBase<SearchFieldMobileInterface> implements OnInit, OnDestroy {
    childContent: {
        inputFieldTemplate: TemplateRef<any>,
        suggestionMenuTemplate: TemplateRef<any>
    } = null;


    /** @hidden */
    @ViewChild('dialogTemplate') dialogTemplate: TemplateRef<any>;

    constructor(
        @Inject(SEARCH_FIELD_COMPONENT) searchFieldComponent: SearchFieldMobileInterface,
        elementRef: ElementRef,
        dialogService: DialogService,
        @Optional() @Inject(MOBILE_MODE_CONFIG) mobileModes: MobileModeConfigToken[]
    ) {
        super(elementRef, dialogService, searchFieldComponent, MobileModeControl.SEARCH_FIELD, mobileModes)
    }

    ngOnInit(): void {
        this.listenChanges();
    }

    ngOnDestroy(): void {
        super.onDestroy();
    }

    listenChanges(): void {
        this._component.isOpenChange.pipe(
            takeUntil(this._onDestroy$)
        ).subscribe((isOpen) => {
            if (!isOpen) {
                this.handleDismiss();

                return;
            }

            if (!this._dialogService.hasOpenDialogs()) {
                this._open();
            }
        })
    }

    /** @hidden */
    handleDismiss(): void {
        this.dialogRef.close();
        this._component.dialogDismiss();
    }

    /** @hidden */
    handleApprove(): void {
        this.dialogRef.close();
        this._component.dialogApprove();
    }

    private _open(): void {
        this.dialogRef = this._dialogService.open(this.dialogTemplate,
            {
                mobile: true,
                verticalPadding: false,
                ...this.dialogConfig,
                backdropClickCloseable: false,
                escKeyCloseable: false,
                container: this._elementRef.nativeElement
            }
        );
    }
}
