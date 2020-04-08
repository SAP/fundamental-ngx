import {
    AfterViewInit,
    ChangeDetectionStrategy,
    Component,
    ElementRef,
    Input,
    OnDestroy,
    Optional,
    TemplateRef,
    ViewChild,
    ViewEncapsulation
} from '@angular/core';
import { DialogRef } from '../dialog/dialog-utils/dialog-ref.class';
import { DialogService } from '../dialog/dialog-service/dialog.service';
import { PopoverComponent } from '../popover/popover.component';
import { filter } from 'rxjs/operators';
import { Subscription } from 'rxjs';

interface DialogContent {
    title: string,
    template: TemplateRef<any>
}

/**
 * The component that represents a menu.
 */
@Component({
    selector: 'fd-menu',
    templateUrl: './menu.component.html',
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['menu.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MenuComponent implements AfterViewInit, OnDestroy {

    /** Display menu in compact mode */
    @Input()
    compact: boolean = false;

    /** Display menu in mobile mode */
    @Input('mobile') set setMobileMode(value: boolean) {
        this.mobile = value;
        if (this.isUsingPopoverAndMobileMode) {
            this._setPopoverToMobileMode();
        }
    }

    /** @hidden */
    mobile: boolean = false;

    /** Dialog title used for menu in mobile mode */
    @Input()
    mobileMenuTitle: string;

    // TODO REMOVE INPUT
    @Input()
    separator: boolean = false;

    /** @hidden */
    @ViewChild('dialog')
    dialogTemplate: TemplateRef<any>;

    /** @hidden */
    @ViewChild('menuTemplate')
    menuTemplate: TemplateRef<any>;

    /** Reference to Dialog used in mobile mode */
    dialogRef: DialogRef;

    /** @hidden */
    private _menuTemplates: DialogContent[] = [];

    /** @hidden */
    private _subscription = new Subscription();

    constructor(private _dialogService: DialogService,
                private _elementRef: ElementRef,
                @Optional() private _popoverComponent: PopoverComponent) {}

    /** @hidden */
    ngAfterViewInit() {
        this._menuTemplates.push({title: this.mobileMenuTitle, template: this.menuTemplate});
        this._listenOnPopoverOpen();
    }

    /** @hidden */
    ngOnDestroy() {
        this._subscription.unsubscribe();
    }

    /** @hidden */
    get dialogContent(): DialogContent {
        return this._menuTemplates[this._menuTemplates.length - 1];
    }

    /** @hidden */
    get isOnNestedLevel(): boolean {
        return this._menuTemplates.length > 1;
    }

    /** @hidden */
    get isUsingPopoverAndMobileMode(): boolean {
        return this._popoverComponent && this.mobile;
    }

    /** Open the Dialog to display Menu in mobile mode */
    openDialog(): void {
        this._dialogService.open(
            this.dialogTemplate,
            {
                mobile: true,
                verticalPadding: false
            }
        )
    }

    /** Close mobile Menu mode Dialog */
    closeDialog(dialogRef: DialogRef) {
        dialogRef.close();
        if (this.isUsingPopoverAndMobileMode) {
            this._popoverComponent.close();
        }
    }

    /** @hidden */
    goToPreviousMenuLevel(): void {
        this._menuTemplates.pop();
    }

    /** @hidden */
    loadView(view: DialogContent): void {
        this._menuTemplates.push(view);
    }

    /** @hidden If Menu is in mobile mode and it is used inside Popover,
     * automatically open Dialog when popover has been opened */
    private _listenOnPopoverOpen(): void {
        if (this._popoverComponent) {
            this._subscription.add(
                this._popoverComponent.isOpenChange.pipe(
                    filter(isOpen => this.mobile && isOpen)
                ).subscribe(_ => this.openDialog())
            )
        }
    }

    /** @hidden Setup Popover to make it work with Menu in mobile mode */
    private _setPopoverToMobileMode(): void {
        this._popoverComponent.closeOnOutsideClick = false;
    }
}
