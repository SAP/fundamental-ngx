/* eslint-disable @angular-eslint/no-input-rename,@angular-eslint/no-host-metadata-property */
import { NgIf, NgTemplateOutlet } from '@angular/common';
import {
    ChangeDetectionStrategy,
    Component,
    ContentChild,
    ElementRef,
    Input,
    OnChanges,
    OnInit,
    SimpleChanges,
    TemplateRef,
    ViewChild,
    ViewEncapsulation,
    computed,
    forwardRef,
    inject,
    signal
} from '@angular/core';
import { CssClassBuilder, HasElementRef, applyCssClass } from '@fundamental-ngx/cdk/utils';
import { NavigationHomeDirective } from './directives/navigation-home.directive';
import { FdbNavigationComponent } from './navigation-component.token';
import { NavigationLinkComponent } from './navigation-link.component';
import { NavigationListItemComponent } from './navigation-list/navigation-list-item.component';
import { NavigationListComponent } from './navigation-list/navigation-list.component';
import { FdbNavigationMode, FdbNavigationState, FdbNavigationType } from './navigation.types';

@Component({
    selector: 'fdb-navigation',
    template: `
        <ng-content></ng-content>
        <ng-template #defaultLinkTemplate>
            <a fdb-navigation-link glyph="home"> Home </a>
        </ng-template>
    `,
    styleUrls: ['../../../../node_modules/fundamental-styles/dist/navigation.css'],
    standalone: true,
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        role: 'navigation'
    },
    providers: [
        {
            provide: FdbNavigationComponent,
            useExisting: forwardRef(() => NavigationComponent)
        }
    ],
    imports: [NgIf, NgTemplateOutlet, NavigationListComponent, NavigationListItemComponent, NavigationLinkComponent]
})
export class NavigationComponent
    extends FdbNavigationComponent
    implements OnChanges, OnInit, CssClassBuilder, HasElementRef
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
    set _mode(mode: FdbNavigationMode) {
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
    elementRef: ElementRef<HTMLElement> = inject(ElementRef);

    /** @hidden */
    mode = signal<FdbNavigationMode>('desktop');
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
    @applyCssClass
    buildComponentCssClass(): string[] {
        return [
            this.class,
            'fd-navigation',
            this.type() === 'horizontal' ? 'fd-navigation--horizontal' : 'fd-navigation--vertical',
            `fd-navigation--${this.state()}`
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
