/* eslint-disable @angular-eslint/no-host-metadata-property */
import { Component, computed, ElementRef, inject, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { applyCssClass, CssClassBuilder, HasElementRef, Nullable } from '@fundamental-ngx/cdk/utils';
import { FdbNavigationListComponent } from '../navigation-list-component.token';
import { FdbNavigationListItemComponent } from '../navigation-list-item-component.token';

@Component({
    selector: 'ul[fdb-navigation-list]',
    template: `<ng-content></ng-content>`,
    standalone: true,
    host: {
        role: 'menubar',
        '[attr.aria-hidden]': 'true'
    },
    providers: [
        {
            provide: FdbNavigationListComponent,
            useExisting: NavigationListComponent
        }
    ]
})
export class NavigationListComponent
    implements OnInit, OnChanges, CssClassBuilder, HasElementRef, FdbNavigationListComponent
{
    /** @hidden */
    @Input()
    class: Nullable<string>;

    /** @hidden */
    parentListItemComponent = inject(FdbNavigationListItemComponent, { optional: true });

    /** @hidden */
    parentListComponent = inject(FdbNavigationListComponent, { optional: true, skipSelf: true });

    /** @hidden */
    elementRef: ElementRef<HTMLElement> = inject(ElementRef);

    /** @hidden */
    isParentGroupChild = computed(() => this.parentListItemComponent?.isGroup() ?? false);

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
    ngOnChanges(changes: SimpleChanges): void {
        this.buildComponentCssClass();
    }

    /** @hidden */
    ngOnInit(): void {
        this.buildComponentCssClass();
    }
}
