/* eslint-disable @angular-eslint/no-input-rename */
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
    ViewChild,
    computed,
    effect,
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
            [class.fd-navigation__item--group]="isGroup()"
            [class.fd-navigation__item--child]="parentNavigationListComponent.parentListComponent?.isParentGroupChild()"
            aria-current="page"
            [attr.aria-selected]="(routerLinkActive()?.isActiveChange | async) ? true : null"
            [attr.aria-expanded]="expanded()"
            [attr.aria-level]="level()"
            role="menuitem"
        >
            <ng-container *ngIf="linkTemplate">
                <ng-template [ngTemplateOutlet]="linkTemplate" [ngTemplateOutletInjector]="injector"></ng-template>
            </ng-container>
            <ng-content select="[fdb-navigation-link]"></ng-content>
        </div>
        <ng-container *ngIf="childNavigationListComponent() && navigationComponent.isExpanded()">
            <ng-template [ngTemplateOutlet]="childrenTemplate" [ngTemplateOutletInjector]="injector"></ng-template>
        </ng-container>

        <ng-template #childrenTemplate>
            <ng-template #childNavigationLists>
                <ng-content select="ul[fdb-navigation-list]"></ng-content>
            </ng-template>

            <ng-container *ngIf="isGroup(); else withWrapper">
                <ng-template
                    [ngTemplateOutlet]="childNavigationLists"
                    [ngTemplateOutletInjector]="injector"
                ></ng-template>
            </ng-container>
            <ng-template #withWrapper>
                <div class="fd-navigation__list-container" aria-hidden="true">
                    <div class="fd-navigation__list-wrapper" aria-hidden="true">
                        <ng-template
                            [ngTemplateOutlet]="childNavigationLists"
                            [ngTemplateOutletInjector]="injector"
                        ></ng-template>
                    </div>
                </div>
            </ng-template>
        </ng-template>
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
    set group(group: boolean) {
        this.isGroup.set(group);
    }

    /** @hidden */
    @Input('expanded')
    set _expanded(expanded: boolean) {
        this.expanded.set(expanded);
    }

    /** @hidden */
    @Input()
    linkTemplate: TemplateRef<void>;

    /** @hidden */
    @ContentChild(FdbNavigationListComponent)
    set _navigationListComponent(navigationListComponent: FdbNavigationListComponent) {
        this.childNavigationListComponent.set(navigationListComponent);
    }

    /** @hidden */
    @ContentChild(RouterLinkActive)
    set _routerLinkActive(routerLinkActive: RouterLinkActive) {
        this.routerLinkActive.set(routerLinkActive);
    }

    /** @hidden */
    @ViewChild('childrenTemplate')
    set _childrenTemplate(templateRef: TemplateRef<void>) {
        this.childrenTemplate.set(templateRef);
    }
    /** @hidden */
    navigationComponent = inject(FdbNavigationComponent);

    /** @hidden */
    injector = inject(Injector);

    /** @hidden */
    elementRef: ElementRef<HTMLElement> = inject(ElementRef);

    /** @hidden */
    parentListItemComponent = inject(FdbNavigationListItemComponent, { optional: true, skipSelf: true });

    /** @hidden */
    parentNavigationListComponent = inject(FdbNavigationListComponent);

    /** @hidden */
    override additionalBodyClass = 'fd-navigation__list';
    /** @hidden */
    routerLinkActive = signal<RouterLinkActive | null>(null);
    /** @hidden */
    childNavigationListComponent = signal<FdbNavigationListComponent | null>(null);
    /** @hidden */
    expanded = signal(false);
    /** @hidden */
    isGroup = signal(false);

    /** @hidden */
    childrenTemplate = signal<TemplateRef<void> | null>(null);

    /** @hidden */
    level = computed(() => (this.parentListItemComponent?.level() ? this.parentListItemComponent.level() + 1 : 1));

    /** @hidden */
    private _popoverService: PopoverService = inject(PopoverService);

    /** @hidden */
    constructor() {
        super();
        effect(() => {
            this._popoverService.updateContent(null, this.childrenTemplate());
        });
        effect(() => {
            this.isOpen = this.expanded();
        });
    }
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
