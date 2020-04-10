import {
    AfterViewInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ContentChildren,
    ElementRef,
    HostListener,
    Input,
    OnInit,
    QueryList,
    TemplateRef,
    ViewChild,
    ViewEncapsulation
} from '@angular/core';
import { MenuItemComponent } from './menu-item/menu-item.component';
import { DialogConfig } from '../dialog/dialog-utils/dialog-config.class';
import { MenuKeyboardService } from './menu-keyboard.service';
import { BehaviorSubject } from 'rxjs';

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
export class MenuComponent implements OnInit {

    /** Display menu in compact mode */
    @Input()
    compact: boolean = false;

    /** Display menu in mobile mode */
    @Input()
    mobile: boolean = false;

    /** Dialog title used for menu in mobile mode */
    @Input()
    mainMenuTitle: string;

    /** Custom config used to open the Dialog */
    @Input()
    dialogConfig: DialogConfig;

    /** @hidden */
    @ViewChild('menuTemplate')
    menuTemplate: TemplateRef<any>;

    /** @hidden */
    @ContentChildren(MenuItemComponent)
    menuItems: QueryList<MenuItemComponent>;

    mobileMenuTitle$: BehaviorSubject<string>;

    /** @hidden */
    private _subMenuTemplates: DialogContent[] = [];

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
                private _changeDetectorRef: ChangeDetectorRef,
                private _menuKeyboardService: MenuKeyboardService) {}

    ngOnInit() {
        this.mobileMenuTitle$ = new BehaviorSubject<string>(this.mainMenuTitle)
    }

    /** @hidden */
    get dialogContent(): DialogContent {
        return this._subMenuTemplates[this._subMenuTemplates.length - 1];
    }

    /** @hidden */
    get isInSubmenu(): boolean {
        return !!this._subMenuTemplates.length;
    }

    /** Navigate back to parent level of submenu */
    backToParentLevel(): void {
        if (this._subMenuTemplates.length) {
            this._subMenuTemplates.pop();
            this._updateMenuTitle();
        }
    }

    /** @hidden Adds new view to menu templates */
    loadView(view: DialogContent): void {
        this._subMenuTemplates.push(view);
        this._updateMenuTitle();
        this._changeDetectorRef.detectChanges();
    }

    private _updateMenuTitle(): void {
        this.mobileMenuTitle$.next(
            this.isInSubmenu
                ? this.dialogContent.title
                : this.mainMenuTitle
        );
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
