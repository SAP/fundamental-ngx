import {
    AfterContentInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ContentChildren,
    ElementRef,
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
import { MenuService } from './services/menu.service';

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
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [MenuService]
})
export class MenuComponent implements OnInit, AfterContentInit {

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

    /** Custom config used to open the Dialog */
    @Input()
    openOnHoverTime: number = 0;

    /** @hidden */
    @ViewChild('menuTemplate')
    menuTemplate: TemplateRef<any>;

    /** @hidden */
    @ContentChildren(MenuItemComponent)
    menuItems: QueryList<MenuItemComponent>;

    mobileMenuTitle$: BehaviorSubject<string>;

    /** @hidden */
    private _subMenuTemplates: DialogContent[] = [];

    constructor(public elementRef: ElementRef,
                private _menuService: MenuService,
                private _changeDetectorRef: ChangeDetectorRef,
                private _menuKeyboardService: MenuKeyboardService) {}

    ngOnInit() {
        this.mobileMenuTitle$ = new BehaviorSubject<string>(this.mainMenuTitle)
    }

    ngAfterContentInit() {
        this._menuService.setMenuRoot(this)
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
}
