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
                @Optional() private _dynamicComponentService: DynamicComponentService) {}

    ngAfterContentInit() {
        this._menuService.setMenuRoot(this);
        this._listenOnMenuChanges();
    }

    ngAfterViewInit() {
        this._setupMobileMode();
    }

    open(): void {
        this.isOpen = true;
        this.changeDetectorRef.markForCheck();
    }

    close(): void {
        this.isOpen = false;
        this.changeDetectorRef.markForCheck();
    }

    toggle(): void {
        this.isOpen ? this.close() : this.open();
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

    private _listenOnMenuChanges() {

    }
}
