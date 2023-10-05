import { AsyncPipe, NgIf, NgTemplateOutlet } from '@angular/common';
import {
    Component,
    ContentChild,
    ElementRef,
    Injector,
    Input,
    OnChanges,
    OnInit,
    TemplateRef,
    inject,
    signal
} from '@angular/core';
import { RouterLinkActive } from '@angular/router';
import { CssClassBuilder, HasElementRef, Nullable, applyCssClass } from '@fundamental-ngx/cdk/utils';
import { BasePopoverClass, PopoverService } from '@fundamental-ngx/core';
import { FdbNavigationComponent } from '../navigation-component.token';
import { FdbNavigationListComponent } from '../navigation-list-component.token';
import { FdbNavigationListItemComponent } from '../navigation-list-item-component.token';

@Component({
    selector: 'li[fd-navigation-list-item]',
    template: `
        <div
            class="fd-navigation__item"
            aria-current="page"
            [attr.aria-selected]="(routerLinkActive()?.isActiveChange | async) ? true : null"
            [attr.aria-expanded]="expanded() ? true : null"
            role="menuitem"
        >
            <ng-container *ngIf="linkTemplate">
                <ng-template [ngTemplateOutlet]="linkTemplate" [ngTemplateOutletInjector]="injector"></ng-template>
            </ng-container>
            <ng-content select="[fd-navigation-link]"></ng-content>
        </div>
        <div class="fd-navigation__list-container" aria-hidden="true" *ngIf="navigationListComponent()">
            <div class="fd-navigation__list-wrapper" aria-hidden="true">
                <ng-content select="ul[fdb-navigation-list]"></ng-content>
            </div>
        </div>
    `,
    providers: [
        PopoverService,
        {
            provide: FdbNavigationListItemComponent,
            useExisting: NavigationListItemComponent
        }
    ],
    imports: [AsyncPipe, NgIf, NgTemplateOutlet],
    standalone: true
})
export class NavigationListItemComponent
    extends BasePopoverClass
    implements OnInit, OnChanges, CssClassBuilder, HasElementRef, FdbNavigationListItemComponent
{
    /** @hidden */
    @Input()
    class: Nullable<string>;

    /** @hidden */
    @Input()
    linkTemplate: TemplateRef<void>;

    /** @hidden */
    @ContentChild(FdbNavigationListComponent)
    set _navigationListComponent(navigationListComponent: FdbNavigationListComponent) {
        this.navigationListComponent.set(navigationListComponent);
    }

    /** @hidden */
    @ContentChild(RouterLinkActive)
    set _routerLinkActive(routerLinkActive: RouterLinkActive) {
        this.routerLinkActive.set(routerLinkActive);
    }

    /** @hidden */
    injector = inject(Injector);

    /** @hidden */
    elementRef: ElementRef<HTMLElement> = inject(ElementRef);
    /** @hidden */
    override additionalBodyClass = 'fd-navigation__list';
    /** @hidden */
    routerLinkActive = signal<RouterLinkActive | null>(null);
    /** @hidden */
    navigationListComponent = signal<FdbNavigationListComponent | null>(null);
    /** @hidden */
    expanded = signal(false);
    /** @hidden */
    private _popoverService: PopoverService = inject(PopoverService);
    /** @hidden */
    private _navigationComponent = inject(FdbNavigationComponent);

    /** @hidden */
    @applyCssClass
    buildComponentCssClass(): string[] {
        return [this.class || '', 'fd-navigation__list-item'];
    }

    /** @hidden */
    ngOnChanges(): void {
        this.buildComponentCssClass();
        this._popoverService.refreshConfiguration(this);
    }

    /** @hidden */
    ngOnInit(): void {
        this.buildComponentCssClass();
    }

    /** @hidden */
    collapse(): void {
        this.expanded.set(false);
    }

    /** @hidden */
    expand(): void {
        this.expanded.set(true);
    }

    /** @hidden */
    toggle(): void {
        this.expanded.set(!this.expanded());
    }
}
