/* eslint-disable @angular-eslint/no-host-metadata-property */
import { AsyncPipe, NgIf } from '@angular/common';
import { Component, ElementRef, HostListener, Input, OnChanges, OnInit, SimpleChanges, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { RouterLinkActive } from '@angular/router';
import { CssClassBuilder, HasElementRef, applyCssClass } from '@fundamental-ngx/cdk/utils';
import { IconComponent } from '@fundamental-ngx/core/icon';
import { FdbNavigationListItemComponent } from './navigation-list-item-component.token';

@Component({
    selector: 'a[fdb-navigation-link]',
    template: `
        <ng-container *ngIf="glyph">
            <fd-icon
                [glyph]="glyph"
                class="fd-navigation__icon"
                [attr.role]="'presentation'"
                [ariaHidden]="true"
            ></fd-icon>
        </ng-container>
        <span class="fd-navigation__text"><ng-content></ng-content></span>
        <span
            class="fd-navigation__selection-indicator"
            role="presentation"
            aria-hidden="true"
            aria-label="selection indicator"
        >
        </span>
        <span
            *ngIf="navigationListItemComponent?.childNavigationListComponent()"
            class="fd-navigation__has-children-indicator"
            role="presentation"
            aria-hidden="true"
            aria-label="has children indicator, expanded"
        >
        </span>
    `,
    imports: [NgIf, IconComponent, AsyncPipe],
    hostDirectives: [RouterLinkActive],
    standalone: true,
    host: {
        role: 'link'
    }
})
export class NavigationLinkComponent implements OnInit, OnChanges, CssClassBuilder, HasElementRef {
    /** @hidden */
    @Input()
    class: string;

    /** @hidden */
    @Input()
    glyph: string;

    /** @hidden */
    elementRef: ElementRef<HTMLElement> = inject(ElementRef);

    /**
     * If user applies RouterLink, we need to check if the link is active
     * @hidden
     **/
    protected isActive = toSignal(inject(RouterLinkActive).isActiveChange);

    /** @hidden */
    protected navigationListItemComponent = inject(FdbNavigationListItemComponent);

    /** @hidden */
    @HostListener('click', ['$event'])
    onClick(event: MouseEvent): void {
        if (this.navigationListItemComponent.childNavigationListComponent()) {
            this.navigationListItemComponent.toggle();
        }
    }

    /** @hidden */
    @applyCssClass
    buildComponentCssClass(): string[] {
        return [this.class || '', 'fd-navigation__link'];
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
