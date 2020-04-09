import {
    AfterContentInit,
    AfterViewInit,
    ChangeDetectionStrategy,
    Component,
    ContentChildren,
    ElementRef,
    HostListener,
    Input,
    OnDestroy,
    Optional,
    QueryList,
    TemplateRef,
    ViewChild,
    ViewEncapsulation
} from '@angular/core';
import { DialogRef } from '../dialog/dialog-utils/dialog-ref.class';
import { DialogService } from '../dialog/dialog-service/dialog.service';
import { PopoverComponent } from '../popover/popover.component';
import { filter } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { MenuItemComponent } from './menu-item/menu-item.component';
import { DialogConfig, MenuKeyboardService } from '../..';

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

    /** Custom config used to open the Dialog */
    @Input()
    dialogConfig: DialogConfig;

    /** @hidden */
    @ViewChild('dialog')
    dialogTemplate: TemplateRef<any>;

    /** @hidden */
    @ViewChild('menuTemplate')
    menuTemplate: TemplateRef<any>;

    /** @hidden */
    @ContentChildren(MenuItemComponent)
    menuItems: QueryList<MenuItemComponent>;

    /** Reference to Dialog used in mobile mode */
    dialogRef: DialogRef;

    /** @hidden */
    private _menuTemplates: DialogContent[] = [];

    /** @hidden */
    private _subscription = new Subscription();

    @HostListener('keydown', ['$event'])
    keydownHandler(event: KeyboardEvent): void {
        switch (event.code || event.keyCode) {
            case 'ArrowUp':
            case 38: {
                this._focus('previous');
                event.preventDefault();
                break;
            }
            case 'ArrowDown':
            case 40: {
                this._focus('next');
                event.preventDefault();
                break;
            }
            case 'ArrowRight':
            case 39: {
                this._focus('childList');
                event.preventDefault();
                break;
            }
            case 'ArrowLeft':
            case 37: {
                this._focus('parentList');
                event.preventDefault();
                break;
            }
            case 'Space':
            case 32: {
                break;
            }
        }
    }

    constructor(private _elementRef: ElementRef,
                private _dialogService: DialogService,
                private _menuKeyboardService: MenuKeyboardService,
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

    /** @hidden Open the Dialog to display Menu in mobile mode */
    openDialog(): void {
        this._dialogService.open(
            this.dialogTemplate,
            {
                mobile: true,
                verticalPadding: false,
                escKeyCloseable: false
            }
        )
    }

    /** @hidden Close mobile Menu mode Dialog */
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

    private _focus(direction: 'next' | 'previous' | 'parentList' | 'childList'): void {
        let activeIndex: number;
        let menuItemsArray: MenuItemComponent[];
        const findActiveIndex = (items: MenuItemComponent[], activeOption: Element): number => items
            .map(item => item.menuLink.elementRef.nativeElement)
            .indexOf(activeOption);

        switch (direction) {
            case 'next':
                menuItemsArray = this.menuItems.toArray();
                activeIndex = findActiveIndex(menuItemsArray, document.activeElement);
                if (activeIndex < this.menuItems.length - 1) {
                    menuItemsArray[++activeIndex].focus();
                }
                break;
            case 'previous':
                menuItemsArray = this.menuItems.toArray();
                activeIndex = findActiveIndex(this.menuItems.toArray(), document.activeElement);
                if (activeIndex > 0) {
                    menuItemsArray[--activeIndex].focus();
                }
                break;
            case 'parentList':
                break;
            case 'childList':
                break;
        }
    }
}
