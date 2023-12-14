import { CdkScrollable } from '@angular/cdk/overlay';
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
    OnDestroy,
    Output,
    QueryList,
    signal,
    ViewChild,
    ViewEncapsulation
} from '@angular/core';
import {
    NavigationComponent,
    NavigationContentStartComponent,
    NavigationListItemComponent
} from '@fundamental-ngx/btp/navigation';
import { FocusableListDirective, Nullable } from '@fundamental-ngx/cdk/utils';
import { AvatarComponent } from '@fundamental-ngx/core/avatar';
import { ButtonComponent } from '@fundamental-ngx/core/button';
import { IconComponent } from '@fundamental-ngx/core/icon';
import { PopoverBodyComponent, PopoverComponent, PopoverControlComponent } from '@fundamental-ngx/core/popover';
import { FdTranslatePipe } from '@fundamental-ngx/i18n';
import { Subscription } from 'rxjs';

@Component({
    selector: 'fdb-user-menu, ul[fdb-user-menu]',
    templateUrl: './user-menu.component.html',
    styleUrls: ['./user-menu.component.scss'],
    standalone: true,
    encapsulation: ViewEncapsulation.None,
    host: {
        class: 'fd-user-menu'
    },
    imports: [
        CdkScrollable,
        FdTranslatePipe,
        AvatarComponent,
        IconComponent,
        ButtonComponent,
        PopoverBodyComponent,
        PopoverComponent,
        PopoverControlComponent,
        NavigationComponent,
        NavigationListItemComponent,
        NavigationContentStartComponent
    ],
    hostDirectives: [FocusableListDirective],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserMenuComponent implements AfterContentInit, AfterViewInit, OnDestroy {
    /** Glyph to use for the user avatar. */
    @Input()
    userGlyph: any;

    /** Image to use for the user avatar. */
    @Input()
    image: Nullable<string>;

    /** User name. */
    @Input()
    userName: Nullable<string>;

    /** User role. */
    @Input()
    userRole: Nullable<string>;

    /** Event emitted when the user presses the "Sign Out" button. */
    @Output()
    signOut = new EventEmitter<MouseEvent>();

    /** @hidden */
    @ContentChildren(NavigationComponent)
    _navigationComponents: QueryList<NavigationComponent>;

    /** @hidden */
    @ContentChildren(NavigationListItemComponent, { descendants: true })
    _navigationListItemComponents: QueryList<NavigationListItemComponent>;

    /** @hidden */
    @ContentChildren(NavigationContentStartComponent, { descendants: true })
    _startComponent: QueryList<NavigationContentStartComponent>;

    /** @hidden */
    @ViewChild('popoverBody')
    _popoverBodyComponent: PopoverBodyComponent;

    /** @hidden */
    showPhoneSubmenu$ = signal(false);

    /** @hidden */
    private _subscriptions = new Subscription();

    /** @hidden */
    constructor(
        private _cdRef: ChangeDetectorRef,
        private _elRef: ElementRef
    ) {}

    /** @hidden */
    ngAfterContentInit(): void {
        this._handleNavigationComponents();
        this._subscriptions.add(
            this._navigationComponents.changes.subscribe(() => {
                this._handleNavigationComponents();
            })
        );
        this._navigationListItemComponents.forEach((item) => {
            this._subscriptions.add(
                item.childNavigationPopoverToggled.subscribe((isOpen) => {
                    if (this._navigationComponents.first.mode === 'phone') {
                        this.showPhoneSubmenu$.set(isOpen);
                        item.showPhoneSubmenu$.set(isOpen);
                        item.expanded = isOpen;
                        this._startComponent.forEach((start) => {
                            start._calculateVisibleItems();
                        });
                        this._cdRef.detectChanges();
                    }
                })
            );
        });
    }

    /** @hidden */
    ngAfterViewInit(): void {
        this._popoverBodyComponent._popoverBodyDiv.nativeElement.classList.add('fd-user-menu__popover-body');
    }

    /** @hidden */
    ngOnDestroy(): void {
        this._subscriptions.unsubscribe();
    }

    /** @hidden */
    signOutClicked(event: MouseEvent): void {
        this.signOut.emit(event);
    }

    /** @hidden */
    popoverOpenChange(event: boolean): void {
        if (!event) {
            this.showPhoneSubmenu$.set(false);
            this._navigationComponents.forEach((nav) => {
                nav.closePopups();
            });
            this._navigationListItemComponents.forEach((item) => {
                item.expanded = false;
                item.showPhoneSubmenu$.set(false);
            });
        } else {
            // remove 'snapped' class from the parent navigation component
            this._navigationComponents.first?.elementRef.nativeElement.classList.remove('fd-navigation--snapped');
        }
        this._startComponent.forEach((start) => {
            start._calculateVisibleItems();
        });
        this._cdRef.detectChanges();
    }

    /** @hidden */
    private _handleNavigationComponents(): void {
        this._navigationComponents.forEach((navigationComponent) => {
            navigationComponent.type = 'user';
            navigationComponent.state = 'snapped';
            navigationComponent.ngOnChanges();
        });
    }
}
