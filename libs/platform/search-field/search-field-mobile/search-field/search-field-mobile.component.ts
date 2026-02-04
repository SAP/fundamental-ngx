import { CdkScrollable } from '@angular/cdk/overlay';
import { NgTemplateOutlet } from '@angular/common';
import {
    ChangeDetectionStrategy,
    Component,
    Inject,
    OnInit,
    TemplateRef,
    ViewChild,
    ViewEncapsulation
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { TemplateDirective } from '@fundamental-ngx/cdk/utils';
import { BarElementDirective, BarMiddleDirective, ButtonBarComponent } from '@fundamental-ngx/core/bar';
import { ButtonComponent } from '@fundamental-ngx/core/button';
import {
    DialogBodyComponent,
    DialogCloseButtonComponent,
    DialogComponent,
    DialogFooterComponent,
    DialogHeaderComponent
} from '@fundamental-ngx/core/dialog';
import { MobileModeBase, MobileModeControl } from '@fundamental-ngx/core/mobile-mode';
import { ScrollbarDirective } from '@fundamental-ngx/core/scrollbar';
import { FdTranslatePipe } from '@fundamental-ngx/i18n';
import {
    SEARCH_FIELD_COMPONENT,
    SearchFieldChildContent,
    SearchFieldMobileInterface
} from '../search-field-mobile.interface';

@Component({
    selector: 'fdp-search-field-mobile',
    templateUrl: 'search-field-mobile.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    styles: [
        `
            .fdp-search-field__mobile-dialog-header .fd-select__text-content {
                display: none;
            }
        `
    ],
    imports: [
        DialogComponent,
        DialogHeaderComponent,
        TemplateDirective,
        BarMiddleDirective,
        BarElementDirective,
        NgTemplateOutlet,
        CdkScrollable,
        ScrollbarDirective,
        DialogBodyComponent,
        DialogFooterComponent,
        ButtonBarComponent,
        ButtonComponent,
        FdTranslatePipe,
        DialogCloseButtonComponent
    ]
})
export class SearchFieldMobileComponent extends MobileModeBase<SearchFieldMobileInterface> implements OnInit {
    /** @hidden */
    @ViewChild('dialogTemplate') dialogTemplate: TemplateRef<any>;
    /** @hidden */
    childContent: SearchFieldChildContent | null = null;
    /** @hidden */
    _inShellbar = false;

    /** @hidden */
    constructor(@Inject(SEARCH_FIELD_COMPONENT) searchFieldComponent: SearchFieldMobileInterface) {
        super(searchFieldComponent, MobileModeControl.SEARCH_FIELD);
    }

    /** @hidden */
    ngOnInit(): void {
        this.listenChanges();
    }

    /** @hidden */
    listenChanges(): void {
        this._component.isOpenChange.pipe(takeUntilDestroyed(this._destroyRef)).subscribe((isOpen) => {
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
            disablePaddings: true,
            ...this.dialogConfig,
            backdropClickCloseable: false,
            escKeyCloseable: true,
            container: 'body',
            minWidth: '100vw',
            minHeight: '100vh'
        });
    }
}
