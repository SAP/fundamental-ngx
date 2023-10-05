/* eslint-disable @angular-eslint/no-host-metadata-property */
import { Component, ElementRef, inject, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { applyCssClass, CssClassBuilder, HasElementRef, Nullable } from '@fundamental-ngx/cdk/utils';
import { FdbNavigationListComponent } from '../navigation-list-component.token';

@Component({
    selector: 'ul[fdb-navigation-list]',
    template: `<ng-content></ng-content>`,
    standalone: true,
    host: {
        role: 'menubar'
    },
    providers: [
        {
            provide: FdbNavigationListComponent,
            useExisting: NavigationListComponent
        }
    ]
})
export class NavigationListComponent implements OnInit, OnChanges, CssClassBuilder, HasElementRef {
    /** @hidden */
    @Input()
    class: Nullable<string>;

    /** @hidden */
    elementRef: ElementRef<HTMLElement> = inject(ElementRef);

    /** @hidden */
    @applyCssClass
    buildComponentCssClass(): string[] {
        return [this.class || '', 'fd-navigation__list'];
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
