import { NgTemplateOutlet } from '@angular/common';
import {
    AfterContentInit,
    AfterViewInit,
    ChangeDetectorRef,
    Component,
    ContentChild,
    ElementRef,
    HostBinding,
    HostListener,
    Input,
    OnChanges,
    OnInit,
    QueryList,
    SimpleChanges,
    ViewChild,
    ViewChildren,
    ViewEncapsulation,
    inject,
    signal
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Nullable } from '@fundamental-ngx/cdk/utils';
import { ButtonComponent } from '@fundamental-ngx/core/button';
import { MenuKeyboardService } from '@fundamental-ngx/core/menu';
import { SideNavigationInterface } from '@fundamental-ngx/core/side-navigation';
import { warnOnce } from '@fundamental-ngx/core/utils';
import {
    NestedListComponent,
    NestedListKeyboardService,
    NestedListStateService,
    PreparedNestedListComponent
} from '@fundamental-ngx/cx/nested-list';
import { I18nModule } from '@fundamental-ngx/i18n';
import { SideNavigationButtonDirective } from './side-navigation-button.directive';
import { SideNavigationMainComponent } from './side-navigation-main.component';
import { SideNavigationModel } from './side-navigation-model';
import { SideNavigationUtilityDirective } from './side-navigation-utility.directive';

/**
 * The side-navigation is a wrapping component representing
 * a left navigation that can always display or expand/collapse using the menu icon within the global navigation.
 */
@Component({
    // eslint-disable-next-line @angular-eslint/component-selector
    selector: 'fdx-side-nav',
    templateUrl: './side-navigation.component.html',
    styleUrl: 'side-navigation.component.scss',
    encapsulation: ViewEncapsulation.None,
    imports: [
        I18nModule,
        NgTemplateOutlet,
        SideNavigationMainComponent,
        PreparedNestedListComponent,
        ButtonComponent,
        SideNavigationUtilityDirective,
        SideNavigationButtonDirective,
    ],
    standalone: true,
    providers: [MenuKeyboardService, NestedListKeyboardService, NestedListStateService]
})
export class SideNavigationComponent
    implements AfterContentInit, AfterViewInit, OnInit, OnChanges, SideNavigationInterface
{
    /** @deprecated Not applicable to the CX side nav. */
    @Input()
    @HostBinding('class.fdx-side-nav--condensed')
    set condensed(value: boolean) {
        warnOnce('The "condensed" input is not applicable to the CX side nav.');
        this._condensed = value;
    }

    get condensed(): boolean {
        return this._condensed;
    }

    /** Whether the sidenav is used with shellbar. */
    @Input()
    inShellbar = false;

    /**
     * Side navigation configuration, to pass whole model object, instead of creating HTML from scratch
     */
    @Input()
    sideNavigationConfiguration: Nullable<SideNavigationModel>;

    /** Prevents the side navigation from truncating or wrapping, extending the width to its longest label. */
    @Input()
    dynamicWidth = false;

    /**
     * The screen width, in pixels, at which to automatically collapse the side navigation on window resize.
     */
    @Input()
    collapseWidth: number;

    /**
     * Whether this side nav should display as narrow. Note this can only be used with side nav items that have icons.
     */
    @Input()
    narrow = false;

    /** Whether this side nav should display in mobile (fullscreen) mode. */
    @Input()
    mobile = false;

    /** Whether to show the scroll buttons in narrow mode. When set to false, default scrollbar behavior will be used. */
    @Input()
    showScrollButtons = true;

    /** Whether clicking on elements should change selected state of items */
    @Input()
    set selectable(selectable: boolean) {
        this._nestedListState.selectable = selectable;
    }

    /** @hidden */
    @ContentChild(SideNavigationUtilityDirective)
    sideNavUtility: SideNavigationUtilityDirective;

    /** @hidden */
    @ContentChild(SideNavigationMainComponent, { descendants: true })
    sideNavMain: SideNavigationMainComponent;

    /** @hidden */
    @ViewChildren(PreparedNestedListComponent)
    preparedNestedList: QueryList<PreparedNestedListComponent>;

    /** @hidden */
    @ViewChild('scrollDownButton', { read: ElementRef })
    _scrollDownButton: ElementRef;

    /** @hidden */
    _showScrollUpButton = false;

    /** @hidden */
    _showScrollDownButton = false;

    /** @hidden */
    additionalShellbarCssClass = 'fd-shellbar--cx-side-nav';

    /** @hidden */
    _narrowAnimatedItems$ = signal(false);

    private _timeout: ReturnType<typeof setTimeout> | undefined;

    /** @hidden */
    private _condensed = false;

    /** @hidden */
    private readonly _keyboardService = inject(NestedListKeyboardService);
    /** @hidden */
    private readonly _nestedListState = inject(NestedListStateService);
    /** @hidden */
    private readonly _cdRef = inject(ChangeDetectorRef);

    /** @hidden */
    constructor() {
        this._keyboardService.refresh$.pipe(takeUntilDestroyed()).subscribe(() => {
            /** Refresh list of elements, that are being supported by keyboard */
            this._keyboardService.refreshItems(this.getLists());
        });
    }

    /** @hidden */
    @HostListener('window:resize')
    onResize(): void {
        if (this.collapseWidth) {
            this._condensed = window.innerWidth <= this.collapseWidth;
        }
    }

    /** @hidden */
    ngOnInit(): void {
        /** Set up condensed state */
        this._nestedListState.condensed =
            this._condensed || !!(this.sideNavigationConfiguration && this.sideNavigationConfiguration.condensed);

        if (this.collapseWidth) {
            this.onResize();
        }
    }

    /** @hidden */
    ngAfterContentInit(): void {
        if (!this.sideNavigationConfiguration) {
            this._keyboardService.refreshItems(this.getLists());
        }
        this._setupScrollButtons();
    }

    /** @hidden */
    ngOnChanges(changes: SimpleChanges): void {
        if (changes.narrow) {
            this._setupScrollButtons();
            this._animateNarrowState();
        }
    }

    /** @hidden */
    ngAfterViewInit(): void {
        if (this.sideNavigationConfiguration) {
            this._keyboardService.refreshItems(this.getLists());
        }
    }

    /** @hidden */
    _setupScrollButtons(): void {
        setTimeout(() => {
            if (!this.sideNavMain) {
                return;
            }
            if (
                this.sideNavMain.elementRef.nativeElement.scrollHeight >
                    this.sideNavMain.elementRef.nativeElement.clientHeight &&
                this.sideNavMain &&
                this.narrow &&
                this.showScrollButtons
            ) {
                this._showScrollUpButton = true;
                this._showScrollDownButton = true;
                this.sideNavMain.list.nestedItems.forEach((item) => {
                    item._narrow = true;
                });
            } else {
                this._showScrollUpButton = false;
                this._showScrollDownButton = false;
                this.sideNavMain.list.nestedItems.forEach((item) => {
                    item._narrow = false;
                });
            }
            this._cdRef.detectChanges();
        });
    }

    /** @hidden */
    _scrollItems(direction: 'up' | 'down'): void {
        this.sideNavMain.elementRef.nativeElement.scrollBy({
            top: direction === 'up' ? -52 : 52,
            left: 0,
            behavior: 'smooth'
        });
    }

    /**
     * @hidden
     * Method that returns 1 deep level of lists.
     */
    private getLists(): NestedListComponent[] {
        const lists: NestedListComponent[] = [];

        if (this.sideNavMain) {
            lists.push(this.sideNavMain.list);
        }
        if (this.sideNavUtility) {
            lists.push(this.sideNavUtility.list);
        }
        if (this.preparedNestedList) {
            lists.push(...this.preparedNestedList.map((preparedNested) => preparedNested.nestedListComponent));
        }

        return lists;
    }

    private _animateNarrowState(): void {
        clearTimeout(this._timeout);
        this._timeout = setTimeout(
            () => {
                this._narrowAnimatedItems$.set(this.narrow);
            },
            !this.narrow ? 200 : 0
        );
    }
}
