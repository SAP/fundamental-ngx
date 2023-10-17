/* eslint-disable @angular-eslint/no-input-rename,@angular-eslint/no-host-metadata-property */
import { FocusKeyManager } from '@angular/cdk/a11y';
import { DOWN_ARROW, UP_ARROW } from '@angular/cdk/keycodes';
import { NgIf, NgTemplateOutlet } from '@angular/common';
import {
    AfterViewInit,
    ChangeDetectionStrategy,
    Component,
    ContentChild,
    ContentChildren,
    DestroyRef,
    ElementRef,
    HostListener,
    Input,
    OnChanges,
    OnInit,
    QueryList,
    TemplateRef,
    ViewChild,
    ViewEncapsulation,
    computed,
    forwardRef,
    inject,
    signal
} from '@angular/core';
import { takeUntilDestroyed, toObservable } from '@angular/core/rxjs-interop';
import { FdbViewMode } from '@fundamental-ngx/btp/shared';
import { CssClassBuilder, HasElementRef, KeyUtil, Nullable, applyCssClass } from '@fundamental-ngx/cdk/utils';
import { debounceTime, merge, startWith, switchMap } from 'rxjs';
import { NavigationHomeDirective } from './directives/navigation-home.directive';
import { FdbNavigationComponent } from './navigation-component.token';
import { NavigationContentComponent } from './navigation-content.token';
import { NavigationLinkComponent } from './navigation-link.component';
import { FdbNavigationListComponent } from './navigation-list-component.token';
import { FdbNavigationListItemComponent } from './navigation-list-item-component.token';
import { NavigationListItemComponent } from './navigation-list/navigation-list-item.component';
import { NavigationListComponent } from './navigation-list/navigation-list.component';
import { NavigationService } from './navigation.service';
import { FdbNavigationState, FdbNavigationType } from './navigation.types';

@Component({
    selector: 'fdb-navigation',
    template: `
        <ng-content></ng-content>
        <ng-template #defaultLinkTemplate>
            <a fdb-navigation-link glyph="home" label="Home"></a>
        </ng-template>
    `,
    styleUrls: ['./navigation.component.scss'],
    standalone: true,
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        role: 'navigation'
    },
    providers: [
        NavigationService,
        {
            provide: FdbNavigationComponent,
            useExisting: forwardRef(() => NavigationComponent)
        }
    ],
    imports: [NgIf, NgTemplateOutlet, NavigationListComponent, NavigationListItemComponent, NavigationLinkComponent]
})
export class NavigationComponent
    extends FdbNavigationComponent
    implements OnChanges, OnInit, CssClassBuilder, HasElementRef, AfterViewInit
{
    /** @hidden */
    @Input()
    class = '';

    /** @hidden */
    @Input('state')
    set _state(state: FdbNavigationState) {
        this.state.set(state);
    }

    /** @hidden */
    @Input('horizontal')
    set _horizontal(horizontal: boolean) {
        this.type.set(horizontal ? 'horizontal' : 'vertical');
    }

    /** @hidden */
    @Input('mode')
    set _mode(mode: FdbViewMode) {
        this.mode.set(mode);
    }

    /** @hidden */
    @Input('type')
    set _type(type: FdbNavigationType) {
        this.type.set(type);
    }

    /** @hidden */
    @ContentChild(NavigationHomeDirective)
    set _homeDirective(homeDirective: NavigationHomeDirective) {
        this.homeDirective.set(homeDirective);
    }

    /** @hidden */
    @ViewChild('defaultLinkTemplate')
    set _defaultLinkTemplate(templateRef: TemplateRef<any>) {
        this.defaultLinkTemplate.set(templateRef);
    }

    /** @hidden */
    @ContentChildren(FdbNavigationListItemComponent, { descendants: true })
    _navigationItems: QueryList<FdbNavigationListItemComponent>;

    /** @hidden */
    @ContentChildren(FdbNavigationListComponent, { descendants: true })
    _navigationLists: QueryList<FdbNavigationListComponent>;

    /** @hidden */
    @ContentChildren(NavigationContentComponent, { descendants: true })
    private readonly _navigationContents: QueryList<NavigationContentComponent>;

    /** @hidden */
    elementRef: ElementRef<HTMLElement> = inject(ElementRef);

    /** @hidden */
    mode = signal<FdbViewMode>('');
    /** @hidden */
    state = signal<FdbNavigationState>('expanded');
    /** @hidden */
    type = signal<FdbNavigationType>('vertical');
    /** @hidden */
    homeDirective = signal<NavigationHomeDirective | null>(null);

    /** @hidden */
    defaultLinkTemplate = signal<TemplateRef<any> | null>(null);
    /** @hidden */
    homeLinkTemplate = computed(() =>
        this.homeDirective() ? this.homeDirective()!.templateRef : this.defaultLinkTemplate()
    );

    /** @hidden */
    private _keyboardEventsManager: Nullable<FocusKeyManager<FdbNavigationListItemComponent>>;

    /** @hidden */
    private readonly _isSnapped$ = toObservable(this.isSnapped);

    /** @hidden */
    private readonly _destroyRef = inject(DestroyRef);

    /** @hidden */
    @applyCssClass
    buildComponentCssClass(): string[] {
        return [
            this.class,
            'fd-navigation',
            this.type() === 'horizontal' ? 'fd-navigation--horizontal' : 'fd-navigation--vertical',
            this.mode() ? `fd-navigation--${this.mode()}` : '',
            // Mobile mode should not support snapped state.
            this.isSnapped() || this.state() !== 'snapped' ? `fd-navigation--${this.state()}` : ''
        ];
    }

    /** @hidden */
    @HostListener('keydown', ['$event'])
    keyDownHandler(event: KeyboardEvent): void {
        if (KeyUtil.isKeyCode(event, [DOWN_ARROW, UP_ARROW])) {
            this._keyboardEventsManager?.onKeydown(event);
        }
    }

    /** @hidden */
    ngOnChanges(): void {
        this.buildComponentCssClass();
    }

    /** @hidden */
    ngOnInit(): void {
        this.buildComponentCssClass();
    }

    /** @hidden */
    ngAfterViewInit(): void {
        this._navigationContents.changes
            .pipe(
                startWith(null),
                switchMap(() =>
                    merge(this._isSnapped$, ...this._navigationContents.map((content) => content.refresh$)).pipe(
                        startWith(null),
                        debounceTime(5)
                    )
                ),
                takeUntilDestroyed(this._destroyRef)
            )
            .subscribe(() => {
                const listItems = this._navigationContents.reduce(
                    (items: FdbNavigationListItemComponent[], content) => {
                        items.push(...content.getNavigatableItems());
                        return items;
                    },
                    [] as FdbNavigationListItemComponent[]
                );

                // Reset keyboard manager.
                this._keyboardEventsManager?.destroy();
                const homeListItem = this._navigationLists.find((list) => !!list.homeListItem)?.homeListItem;
                if (homeListItem) {
                    listItems.unshift(homeListItem);
                }

                this._keyboardEventsManager = new FocusKeyManager(listItems)
                    .withVerticalOrientation(true)
                    .skipPredicate((item) => {
                        if (!item.elementRef.nativeElement.isConnected) {
                            return true;
                        }
                        if (item.alwaysFocusable) {
                            return false;
                        }

                        const moreOpened = this._navigationContents.some((c) => c.showMoreOpened());

                        if (item.level() === 1) {
                            if (!this.isSnapped()) {
                                return false;
                            }

                            if (item.normalizedLevel() === 1) {
                                return true;
                            }

                            return item._hidden() && !moreOpened;
                        }

                        if (this.isSnapped()) {
                            if (
                                item.inPortal() &&
                                (item.parentListItemComponent?.isOpen || item.parentNavigationListComponent.focused) &&
                                moreOpened
                            ) {
                                return false;
                            }
                            if (item._hidden()) {
                                return true;
                            }
                            return item.parentListItemComponent?.expandedAttr() !== true;
                        }

                        const navigatable = item.parentListItemComponent?.fullPathExpanded() === false;

                        return navigatable;
                    });
            });
    }

    /** @hidden */
    setNextItemActive(): void {
        this._keyboardEventsManager?.setNextItemActive();
    }

    /** @hidden */
    setPreviousItemActive(): void {
        this._keyboardEventsManager?.setPreviousItemActive();
    }

    /** @hidden */
    setActiveItem(item: FdbNavigationListItemComponent): void {
        this._keyboardEventsManager?.setActiveItem(item);
    }

    /** @hidden */
    focusMoreButton(): void {
        const showMoreButton = this._navigationContents.find((c) => !!c.showMoreOverflowItem)?.showMoreOverflowItem;
        showMoreButton?.focus();
        showMoreButton?.collapse();
    }

    /** @hidden */
    getMoreButton(): Nullable<FdbNavigationListItemComponent> {
        return this._navigationContents.find((c) => !!c.showMoreOverflowItem)?.showMoreOverflowItem;
    }
}
