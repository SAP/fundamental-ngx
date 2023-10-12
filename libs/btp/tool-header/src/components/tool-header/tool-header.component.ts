/* eslint-disable @angular-eslint/no-input-rename */
import { BooleanInput, coerceBooleanProperty } from '@angular/cdk/coercion';
import { AsyncPipe, NgForOf, NgIf, NgTemplateOutlet } from '@angular/common';
import {
    ChangeDetectionStrategy,
    Component,
    ContentChild,
    EventEmitter,
    HostListener,
    Input,
    NgZone,
    OnDestroy,
    Output,
    ViewEncapsulation,
    inject
} from '@angular/core';
import {
    NavigationMenuComponent,
    NavigationMenuItemComponent,
    NavigationMenuPopoverComponent,
    NavigationMenuPopoverControlDirective
} from '@fundamental-ngx/btp/navigation-menu';
import { SearchFieldComponent } from '@fundamental-ngx/btp/search-field';
import { FD_PRODUCT_SWITCH_COMPONENT, FocusableItemDirective, FocusableListDirective } from '@fundamental-ngx/core';
import { ButtonComponent } from '@fundamental-ngx/core/button';
import { contentDensityObserverProviders } from '@fundamental-ngx/core/content-density';
import { IconComponent } from '@fundamental-ngx/core/icon';
import {
    GlyphMenuAddonDirective,
    MenuAddonDirective,
    MenuComponent,
    MenuInteractiveComponent,
    MenuItemComponent,
    MenuTitleDirective,
    MenuTriggerDirective
} from '@fundamental-ngx/core/menu';
import {
    OverflowExpandDirective,
    OverflowItemRefDirective,
    OverflowLayoutComponent,
    OverflowLayoutItemDirective
} from '@fundamental-ngx/core/overflow-layout';
import { PopoverBodyDirective, PopoverComponent, PopoverControlComponent } from '@fundamental-ngx/core/popover';
import { FdTranslatePipe } from '@fundamental-ngx/i18n';
import { Subscription, first } from 'rxjs';
import { ToolHeaderActionsDirective } from '../../directives/tool-header-actions.directive';
import { ToolHeaderButtonDirective } from '../../directives/tool-header-button.directive';
import { ToolHeaderElementDirective } from '../../directives/tool-header-element.directive';
import { ToolHeaderGroupDirective } from '../../directives/tool-header-group.directive';
import { ToolHeaderLogoDirective } from '../../directives/tool-header-logo.directive';
import { ToolHeaderUserDirective } from '../../directives/tool-header-user.directive';
import { ToolHeaderComponentClass } from '../../tool-header-component.class';

export type FdbToolHeaderMode = 'desktop' | 'tablet' | 'mobile';
const imports = [
    ToolHeaderGroupDirective,
    NgIf,
    NgTemplateOutlet,
    OverflowLayoutComponent,
    NgForOf,
    OverflowLayoutItemDirective,
    OverflowItemRefDirective,
    OverflowExpandDirective,
    PopoverComponent,
    PopoverControlComponent,
    PopoverBodyDirective,
    MenuTriggerDirective,
    MenuComponent,
    MenuItemComponent,
    MenuInteractiveComponent,
    MenuTitleDirective,
    MenuAddonDirective,
    GlyphMenuAddonDirective,
    ToolHeaderElementDirective,
    IconComponent,
    ButtonComponent,
    ToolHeaderButtonDirective,
    ToolHeaderLogoDirective,
    FdTranslatePipe
];

@Component({
    selector: 'fdb-tool-header',
    templateUrl: './tool-header.component.html',
    styleUrls: ['./tool-header.component.scss'],
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    host: {
        class: 'fd-tool-header',
        '[class.fd-tool-header--menu]': 'showMenuButton'
    },
    imports: [
        imports,
        NavigationMenuComponent,
        NavigationMenuItemComponent,
        FocusableListDirective,
        FocusableItemDirective,
        NavigationMenuPopoverComponent,
        NavigationMenuPopoverControlDirective,
        AsyncPipe
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
    set _mode(mode: FdbToolHeaderMode) {
        if (mode !== this.mode()) {
            this.mode.set(mode);
        }
    }

    /** @hidden */
    @Input('orientation')
    set _orientation(orientation: 'landscape' | 'portrait') {
        if (orientation !== this.orientation()) {
            this.orientation.set(orientation);
        }
    }

    /**
     * Whether to show the menu button
     */
    @Input({ transform: coerceBooleanProperty })
    showMenuButton: BooleanInput;

    /**
     * Whether to show the voice input action button on
     * the right side of the tool header, when the mode is mobile
     * and the search input is expanded
     */
    @Input({ transform: coerceBooleanProperty })
    showVoiceInputAction: BooleanInput = true;

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
    @ContentChild(ToolHeaderActionsDirective)
    _toolHeaderActionsDirective?: ToolHeaderActionsDirective;

    /** @hidden */
    @ContentChild(ToolHeaderLogoDirective)
    _toolHeaderLogoDirective?: ToolHeaderLogoDirective;

    /** @hidden */
    @ContentChild(SearchFieldComponent)
    set _searchField(searchField: SearchFieldComponent) {
        this.searchField.set(searchField);
    }

    /** @hidden */
    @ContentChild(ToolHeaderUserDirective)
    _toolHeaderUser?: ToolHeaderUserDirective;

    /** @hidden */
    @ContentChild(FD_PRODUCT_SWITCH_COMPONENT)
    _toolHeaderProductSwitch?: unknown;

    /** @hidden */
    private _searchFieldOutsideClickSubscription?: Subscription;

    /** @hidden */
    private _ngZone = inject(NgZone);

    /**
     * The handler, responsible for closing the search field
     * on outside click
     * @hidden
     **/
    @HostListener('document:click', ['$event'])
    _onClick(event: MouseEvent): void {
        if (this.searchFieldExpanded()) {
            if (
                this.mode() === 'tablet' &&
                this.orientation() === 'portrait' &&
                this.searchField() &&
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                !event.composedPath().includes(this.searchField()!.elementRef.nativeElement)
            ) {
                this.searchFieldExpanded.set(false);
            }
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
        this.searchFieldExpanded.set(true);
        this._ngZone.onStable.pipe(first()).subscribe(() => {
            this.searchField()?.focus();
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
}
