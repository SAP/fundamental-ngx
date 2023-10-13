/* eslint-disable @angular-eslint/no-host-metadata-property */
import { NgIf } from '@angular/common';
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
    imports: [NgIf, NavigationListItemComponent]
})
export class NavigationListComponent
    implements OnInit, OnChanges, CssClassBuilder, HasElementRef, FdbNavigationListComponent
{
    /** @hidden */
    @Input()
    class: Nullable<string>;

    /** @hidden */
    @Input()
    showHome = true;

    /** @hidden */
    @ContentChildren(FdbNavigationListItemComponent)
    readonly listItems: QueryList<FdbNavigationListItemComponent>;

    /** @hidden */
    @ViewChild('homeListItem', { static: false, read: FdbNavigationListItemComponent })
    readonly homeListItem: Nullable<FdbNavigationListItemComponent>;

    /** @hidden */
    @ViewChild('homeListItem', { static: false, read: ElementRef })
    private readonly _homeListItemElement: Nullable<ElementRef<HTMLElement>>;

    /** @hidden */
    @ViewChild('homeListSeparator', { static: false, read: ElementRef })
    private readonly _homeListSeparator: Nullable<ElementRef<HTMLElement>>;

    /** @hidden */
    navigationContentComponent = inject(NavigationContentComponent);

    /** @hidden */
    parentListItemComponent = inject(FdbNavigationListItemComponent, { optional: true });

    /** @hidden */
    parentListComponent = inject(FdbNavigationListComponent, { optional: true, skipSelf: true });

    /** @hidden */
    linkTemplate = computed(() => {
        const homeLinkTemplate = this._navigationComponent.homeLinkTemplate();
        return !this.parentListComponent && homeLinkTemplate;
    });

    /** @hidden */
    elementRef: ElementRef<HTMLElement> = inject(ElementRef);

    /** @hidden */
    isParentGroupChild = computed(() => this.parentListItemComponent?.isGroup() ?? false);

    /** @hidden */
    focused = false;

    /** @hidden */
    readonly _navigationComponent = inject(FdbNavigationComponent);

    /** @hidden */
    @applyCssClass
    buildComponentCssClass(): string[] {
        return [
            this.class || '',
            'fd-navigation__list',
            this.isParentGroupChild() ? 'fd-navigation__list--parent-items' : '',
            this.parentListComponent?.isParentGroupChild() ? 'fd-navigation__list--child-items' : ''
        ];
    }

    /** @hidden */
    @HostListener('focusin')
    private _focusIn(): void {
        this.focused = true;
    }

    /** @hidden */
    @HostListener('focusout')
    private _focusOut(): void {
        this.focused = false;
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
