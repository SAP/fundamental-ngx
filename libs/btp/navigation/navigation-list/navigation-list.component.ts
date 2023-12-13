/* eslint-disable @angular-eslint/no-host-metadata-property */

import {
    ChangeDetectionStrategy,
    Component,
    computed,
    ContentChildren,
    ElementRef,
    HostListener,
    inject,
    Input,
    OnChanges,
    OnInit,
    QueryList,
    ViewChild,
    ViewEncapsulation
} from '@angular/core';
import { applyCssClass, CssClassBuilder, HasElementRef, Nullable } from '@fundamental-ngx/cdk/utils';
import { FdbNavigationComponent } from '../navigation-component.token';
import { NavigationContentComponent } from '../navigation-content.token';
import { FdbNavigationListComponent } from '../navigation-list-component.token';
import { FdbNavigationListItemComponent } from '../navigation-list-item-component.token';
import { NavigationListItemComponent } from './navigation-list-item.component';

@Component({
    // eslint-disable-next-line @angular-eslint/component-selector
    selector: 'ul[fdb-navigation-list]',
    templateUrl: './navigation-list.component.html',
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    host: {
        role: 'menubar',
        '[attr.aria-hidden]': 'true'
    },
    providers: [
        {
            provide: FdbNavigationListComponent,
            useExisting: NavigationListComponent
        }
    ],
    imports: [NavigationListItemComponent]
})
export class NavigationListComponent
    implements OnInit, OnChanges, CssClassBuilder, HasElementRef, FdbNavigationListComponent
{
    /** @ignore */
    @Input()
    class: Nullable<string>;

    /** @ignore */
    @Input()
    showHome = true;

    /** @ignore */
    @ContentChildren(FdbNavigationListItemComponent)
    readonly listItems: QueryList<FdbNavigationListItemComponent>;

    /** @ignore */
    @ViewChild('homeListItem', { static: false, read: FdbNavigationListItemComponent })
    readonly homeListItem: Nullable<FdbNavigationListItemComponent>;

    /** @ignore */
    @ViewChild('homeListItem', { static: false, read: ElementRef })
    private readonly _homeListItemElement: Nullable<ElementRef<HTMLElement>>;

    /** @ignore */
    @ViewChild('homeListSeparator', { static: false, read: ElementRef })
    private readonly _homeListSeparator: Nullable<ElementRef<HTMLElement>>;

    /** @ignore */
    navigationContentComponent = inject(NavigationContentComponent);

    /** @ignore */
    parentListItemComponent = inject(FdbNavigationListItemComponent, { optional: true });

    /** @ignore */
    parentListComponent = inject(FdbNavigationListComponent, { optional: true, skipSelf: true });

    /** @ignore */
    linkTemplate = computed(() => {
        const homeLinkTemplate = this._navigationComponent.homeLinkTemplate();
        return !this.parentListComponent && homeLinkTemplate;
    });

    /** @ignore */
    elementRef: ElementRef<HTMLElement> = inject(ElementRef);

    /** @ignore */
    isParentGroupChild = computed(() => this.parentListItemComponent?.isGroup() ?? false);

    /** @ignore */
    isInGroup = computed(() => this.isParentGroupChild() || !!this.parentListComponent?.isParentGroupChild());

    /** @ignore */
    level = computed(() => (this.parentListComponent ? this.parentListComponent.level() + 1 : 1));

    /** @ignore */
    normalizedLevel = computed(() => (this.isInGroup() ? this.level() : this.level() + (this.level() === 2 ? 1 : 0)));

    /** @ignore */
    focused = false;

    /** @ignore */
    readonly _navigationComponent = inject(FdbNavigationComponent);

    /** @ignore */
    @applyCssClass
    buildComponentCssClass(): string[] {
        return [
            this.class || '',
            'fd-navigation__list',
            this.isParentGroupChild() ? 'fd-navigation__list--parent-items' : '',
            this.parentListComponent?.isParentGroupChild() ? 'fd-navigation__list--child-items' : ''
        ];
    }

    /** @ignore */
    @HostListener('focusin')
    private _focusIn(): void {
        this.focused = true;
    }

    /** @ignore */
    @HostListener('focusout')
    private _focusOut(): void {
        this.focused = false;
    }

    /** @ignore */
    ngOnChanges(): void {
        this.buildComponentCssClass();
    }

    /** @ignore */
    ngOnInit(): void {
        this.buildComponentCssClass();
    }

    /** @ignore */
    getHomeElementSize(): { width: number; height: number } {
        const sizePlaceholder = { width: 0, height: 0 };
        const homeListItemSize = this._homeListItemElement?.nativeElement.getBoundingClientRect() || sizePlaceholder;
        const homeListSeparatorSize = this._homeListSeparator?.nativeElement.getBoundingClientRect() || sizePlaceholder;
        return {
            width: homeListItemSize.width + homeListSeparatorSize.width,
            height: homeListItemSize.height + homeListSeparatorSize.height
        };
    }
}
