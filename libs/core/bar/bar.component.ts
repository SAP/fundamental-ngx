import {
    booleanAttribute,
    ChangeDetectionStrategy,
    Component,
    computed,
    ElementRef,
    input,
    ViewEncapsulation
} from '@angular/core';
import {
    ContentDensityMode,
    ContentDensityObserver,
    contentDensityObserverProviders
} from '@fundamental-ngx/core/content-density';

export type SizeType = '' | 's' | 'm_l' | 'xl';
export type BarDesignType = 'header' | 'subheader' | 'header-with-subheader' | 'footer' | 'floating-footer';

/**
 * The Bar component is a container that holds titles, buttons and input controls.
 * Its content is distributed in three areas - left, middle and right.
 * The Bar has 2 modes - Desktop (default) and Tablet/Mobile (cozy).
 */
@Component({
    // eslint-disable-next-line @angular-eslint/component-selector
    selector: '[fd-bar]',
    templateUrl: './bar.component.html',
    styleUrl: './bar.component.scss',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
        contentDensityObserverProviders({
            defaultContentDensity: ContentDensityMode.COMPACT
        })
    ],
    host: {
        '[attr.role]': 'role()',
        '[class]': 'cssClass()'
    }
})
export class BarComponent {
    /** Whether the Bar component is used as a header, subheader, header-with-subheader,
     * footer or floating-footer.
     * Types available: 'header' | 'subheader' | 'header-with-subheader' | 'footer' | 'floating-footer' */
    readonly barDesign = input<BarDesignType>();

    /** Whether the Bar component is used in Page Layout. */
    readonly inPage = input(false, { transform: booleanAttribute });

    /** Whether the Bar component is used in Home Page Layout. */
    readonly inHomePage = input(false, { transform: booleanAttribute });

    /** Whether the Bar component should remove the box-shadow on the bottom. */
    readonly clear = input(false, { transform: booleanAttribute });

    /** The size of the Page in Page responsive design.
     * Available sizes: 's' | 'm_l' | 'xl'
     */
    readonly size = input<SizeType>('');

    /** Whether this bar is to be used for the search results initial suggestion title. */
    readonly initialSuggestionTitle = input(false, { transform: booleanAttribute });

    /** Whether this bar is to be used for the search results initial suggestion subline. */
    readonly initialSuggestionSubline = input(false, { transform: booleanAttribute });

    /** Aria role for the Bar
     * default is toolbar
     */
    readonly role = input('toolbar');

    /** @hidden */
    protected readonly cssClass = computed(() => {
        const barDesign = this.barDesign();
        const inPage = this.inPage();
        const inHomePage = this.inHomePage();
        const size = this.size();

        return [
            'fd-bar',
            this._contentDensityObserver.isCompactSignal() || this._contentDensityObserver.isCondensedSignal()
                ? ''
                : 'fd-bar--cozy', // TODO: fix in styles
            barDesign && `fd-bar--${barDesign}`,
            inPage && `fd-bar--page${size ? `-${size}` : ''}`,
            inHomePage && `fd-bar--home-page${size ? `-${size}` : ''}`,
            this.clear() && 'fd-bar--clear',
            this.initialSuggestionTitle() && 'fd-bar--initial-suggestion-title',
            this.initialSuggestionSubline() && 'fd-bar--initial-suggestion-subline'
        ]
            .filter(Boolean)
            .join(' ');
    });

    /** @hidden */
    constructor(
        public readonly elementRef: ElementRef,
        private _contentDensityObserver: ContentDensityObserver
    ) {
        this._contentDensityObserver.subscribe();
    }
}
