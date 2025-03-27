/* eslint-disable @angular-eslint/no-input-rename */
import { PortalModule } from '@angular/cdk/portal';
import { AsyncPipe, NgTemplateOutlet } from '@angular/common';
import {
    ChangeDetectionStrategy,
    Component,
    ContentChild,
    ContentChildren,
    EventEmitter,
    HostListener,
    Injector,
    Input,
    NgZone,
    OnDestroy,
    Output,
    QueryList,
    ViewEncapsulation,
    booleanAttribute,
    inject
} from '@angular/core';
import { ToolHeaderButtonDirective } from '@fundamental-ngx/btp/button';
import {
    NavigationMenuComponent,
    NavigationMenuPopoverComponent,
    NavigationMenuPopoverControlDirective
} from '@fundamental-ngx/btp/navigation-menu';
import { SearchFieldComponent } from '@fundamental-ngx/btp/search-field';
import { FdbViewMode } from '@fundamental-ngx/btp/shared';
import {
    FDK_INDIRECT_FOCUSABLE_ITEM_ORDER,
    FocusableItemDirective,
    FocusableListDirective,
    IndirectFocusableListDirective
} from '@fundamental-ngx/cdk/utils';
import { ButtonComponent } from '@fundamental-ngx/core/button';
import { contentDensityObserverProviders } from '@fundamental-ngx/core/content-density';
import {
    OverflowItemRef,
    OverflowItemRefDirective,
    OverflowLayoutComponent,
    OverflowLayoutItemDirective
} from '@fundamental-ngx/core/overflow-layout';
import { FD_PRODUCT_SWITCH_COMPONENT } from '@fundamental-ngx/core/product-switch';
import { FdTranslatePipe } from '@fundamental-ngx/i18n';
import { BehaviorSubject, Subscription, delayWhen, first } from 'rxjs';
import { ToolHeaderActionButtonDirective } from '../../directives/tool-header-action-button.directive';
import { ToolHeaderActionDirective } from '../../directives/tool-header-action.directive';
import { ToolHeaderElementDirective } from '../../directives/tool-header-element.directive';
import { ToolHeaderGroupDirective } from '../../directives/tool-header-group.directive';
import { ToolHeaderLogoDirective } from '../../directives/tool-header-logo.directive';
import { ToolHeaderUserDirective } from '../../directives/tool-header-user.directive';
import { ToolHeaderActionClass } from '../../tool-header-action.class';
import { ToolHeaderComponentClass } from '../../tool-header-component.class';

@Component({
    selector: 'fdb-tool-header',
    templateUrl: './tool-header.component.html',
    styleUrls: ['./tool-header.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    host: {
        class: 'fd-tool-header',
        '[class.fd-tool-header--menu]': 'showMenuButton'
    },
    imports: [
        ToolHeaderGroupDirective,
        NgTemplateOutlet,
        ToolHeaderElementDirective,
        ButtonComponent,
        ToolHeaderButtonDirective,
        ToolHeaderLogoDirective,
        FdTranslatePipe,
        NavigationMenuComponent,
        FocusableListDirective,
        IndirectFocusableListDirective,
        FocusableItemDirective,
        NavigationMenuPopoverComponent,
        NavigationMenuPopoverControlDirective,
        AsyncPipe,
        OverflowLayoutComponent,
        OverflowLayoutItemDirective,
        OverflowItemRefDirective,
        PortalModule,
        ToolHeaderActionButtonDirective
    ],
    providers: [
        contentDensityObserverProviders(),
        {
            provide: ToolHeaderComponentClass,
            useExisting: ToolHeaderComponent
        }
    ]
})
export class ToolHeaderComponent extends ToolHeaderComponentClass implements OnDestroy {
    /**
     * (required) the Product Name is the official name of the tool.
     */
    @Input({ required: true }) productName!: string;
    /**
     * Second Title is an optional second text identifier of the tool.
     **/
    @Input() secondTitle?: string;
    /** Mode */
    @Input('mode')
    set _mode(mode: FdbViewMode) {
        if (mode !== this._mode$()) {
            this._mode$.set(mode);
        }
    }

    /** @hidden */
    @Input('orientation')
    set _orientation(orientation: 'landscape' | 'portrait') {
        if (orientation !== this._orientation$()) {
            this._orientation$.set(orientation);
        }
    }

    /**
     * Whether to show the menu button
     */
    @Input({ transform: booleanAttribute })
    showMenuButton = false;

    /**
     * Whether to show the voice input action button on
     * the right side of the tool header, when the mode is mobile
     * and the search input is expanded
     */
    @Input({ transform: booleanAttribute })
    showVoiceInputAction = true;

    /**
     * Event emitted when the menu button is clicked
     **/
    @Output()
    menuClick = new EventEmitter<void>();

    /**
     * Event emitted when user intends to expand the menu.
     * Happens when user clicks `right arrow` key on the menu button
     * if on ltr or `left arrow` key if on rtl.
     **/
    @Output()
    menuExpand = new EventEmitter<void>();

    /**
     * Event emitted when user intends to collapse the menu.
     * Happens when user clicks `left arrow` key on the menu button
     * if on ltr or `right arrow` key if on rtl.
     **/
    @Output()
    menuCollapse = new EventEmitter<void>();

    /**
     * Event emitted when the microphone button is clicked
     **/
    @Output()
    microphoneClick = new EventEmitter<void>();

    /**
     * Event emitted when the default logo is clicked
     */
    @Output()
    logoClick = new EventEmitter<void>();

    /** @hidden */
    @ContentChildren(ToolHeaderActionClass)
    _contentActions: QueryList<ToolHeaderActionClass>;

    /** @hidden */
    @ContentChild(ToolHeaderLogoDirective)
    _toolHeaderLogoDirective?: ToolHeaderLogoDirective;

    /** @hidden */
    @ContentChild(SearchFieldComponent)
    set _searchField(searchField: SearchFieldComponent) {
        this._searchField$.set(searchField);
    }

    /** @hidden */
    @ContentChild(ToolHeaderUserDirective)
    _toolHeaderUser?: ToolHeaderUserDirective;

    /** @hidden */
    @ContentChild(FD_PRODUCT_SWITCH_COMPONENT)
    _toolHeaderProductSwitch?: unknown;

    /** @hidden */
    protected _hiddenActions$ = new BehaviorSubject<OverflowItemRef<ToolHeaderActionDirective>[]>([]);

    /** @hidden */
    protected _delayedHiddenActions$ = this._hiddenActions$.pipe(delayWhen(() => this._ngZone.onStable));

    /** @hidden */
    private _searchFieldOutsideClickSubscription?: Subscription;

    /** @hidden */
    private _ngZone = inject(NgZone);

    /** @hidden */
    private _mapOfItemsAndInjectors = new WeakMap<OverflowItemRef<ToolHeaderActionDirective>, Injector>();

    /**
     * The handler, responsible for closing the search field
     * on outside click
     * @hidden
     **/
    @HostListener('document:click', ['$event'])
    _onClick(event: MouseEvent): void {
        if (this._searchFieldExpanded$()) {
            if (
                this._mode$() === 'tablet' &&
                this._orientation$() === 'portrait' &&
                this._searchField$() &&
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                !event.composedPath().includes(this._searchField$()!.elementRef.nativeElement)
            ) {
                this._searchFieldExpanded$.set(false);
            }
        }
    }

    /**
     * The handler, responsible for the focusing on the search field,
     * when the user presses `Ctrl + K` or `Cmd + K` keys
     * @hidden
     **/
    @HostListener('document:keydown.control.k', ['$event'])
    @HostListener('document:keydown.meta.k', ['$event'])
    _onKeyDown(): void {
        if (this._mode$() === 'tablet' && this._orientation$() === 'portrait' && this._searchField$()) {
            this._searchFieldExpanded$.set(true);
            this._searchField$()?.focus();
        }
    }

    /** @hidden */
    ngOnDestroy(): void {
        if (this._searchFieldOutsideClickSubscription) {
            this._searchFieldOutsideClickSubscription.unsubscribe();
        }
    }

    /**
     * Expand the search field
     **/
    expandSearchField(): void {
        this._searchFieldExpanded$.set(true);
        this._ngZone.onStable.pipe(first()).subscribe(() => {
            this._searchField$()?.focus();
        });
    }

    /** @hidden */
    protected _handleMenuLeftArrowKey(): void {
        if (this._rtl()) {
            this.menuExpand.emit();
        } else {
            this.menuCollapse.emit();
        }
    }

    /** @hidden */
    protected _handleMenuRightArrowKey(): void {
        if (this._rtl()) {
            this.menuCollapse.emit();
        } else {
            this.menuExpand.emit();
        }
    }

    /** @hidden */
    protected _handleHiddenItemsChange($event: OverflowItemRef<ToolHeaderActionDirective>[]): void {
        this._ngZone.runOutsideAngular(() => {
            this._hiddenActions$.next(
                $event.reduce((acc: OverflowItemRef<ToolHeaderActionDirective>[], i) => {
                    if (!i.item.isSeparator) {
                        acc.push(i);
                        this._mapOfItemsAndInjectors.delete(i);
                    }
                    return acc;
                }, [])
            );
        });
    }

    /** @hidden */
    protected _indirectFocusableItemInjector(
        parent: Injector,
        item: OverflowItemRef<ToolHeaderActionDirective>
    ): Injector {
        let injector = this._mapOfItemsAndInjectors.get(item);
        if (!injector) {
            injector = Injector.create({
                parent,
                providers: [
                    {
                        provide: FDK_INDIRECT_FOCUSABLE_ITEM_ORDER,
                        useValue: item.globalIndex
                    }
                ]
            });
            this._mapOfItemsAndInjectors.set(item, injector);
        }
        return injector;
    }
}
