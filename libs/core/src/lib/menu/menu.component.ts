import {
    AfterContentInit,
    AfterViewInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ContentChildren,
    ElementRef,
    EventEmitter,
    Input,
    Optional,
    Output,
    QueryList,
    TemplateRef,
    ViewChild,
    ViewEncapsulation
} from '@angular/core';
import { MenuItemComponent } from './menu-item/menu-item.component';
import { MenuService } from './services/menu.service';
import { DynamicComponentService } from '../utils/dynamic-component/dynamic-component.service';
import { MenuMobileComponent } from './menu-mobile/menu-mobile/menu-mobile.component';
import { PopoverComponent } from '../..';

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
export class MenuComponent implements AfterContentInit, AfterViewInit {

    /** Display menu in compact mode */
    @Input()
    compact: boolean = false;

    /** Display menu in mobile mode */
    @Input()
    mobile: boolean = false;

    /** Custom config used to open the Dialog */
    @Input()
    openOnHoverTime: number = 0;

    /** Emits array of active elements. */
    @Output()
    readonly activePath: EventEmitter<MenuItemComponent[]> = new EventEmitter<MenuItemComponent[]>();

    /** @hidden */
    @ViewChild('menuRootTemplate')
    menuRootTemplate: TemplateRef<any>;

    /** @hidden */
    @ContentChildren(MenuItemComponent, {descendants: true})
    menuItems: QueryList<MenuItemComponent>;

    isOpen: boolean;

    constructor(public elementRef: ElementRef,
                public changeDetectorRef: ChangeDetectorRef,
                private _menuService: MenuService,
                @Optional() private _popoverComponent: PopoverComponent,
                @Optional() private _dynamicComponentService: DynamicComponentService) {}

    ngAfterContentInit() {
        console.log(this.mobile);
        this._menuService.setMenuRoot(this);
        this._listenOnMenuChanges();
    }

    ngAfterViewInit() {
        this._setupMobileMode();
    }

    get closeOnOutsideClick(): boolean {
        return !this.mobile && !this._popoverComponent;
    }

    open(): void {
        this.changeDetectorRef.markForCheck();
    }

    close(): void {
        this.changeDetectorRef.markForCheck();
    }

    emitActivePath(): void {
        this.activePath.emit(
            this._menuService.activeNodePath
                .map(node => node.item)
        );
    }

    private _setupMobileMode(): void {
        if (this.mobile) {
            this._dynamicComponentService.createDynamicComponent(
                this.menuRootTemplate,
                MenuMobileComponent,
                {container: this.elementRef.nativeElement},
                {services: [this, this._menuService]}
            )
        }
    }

    private _listenOnMenuChanges(): void {
        if (this._popoverComponent) {
            this._popoverComponent.isOpenChange.subscribe(console.log);
        }
    }
}
