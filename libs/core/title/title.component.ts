import {
    ChangeDetectionStrategy,
    Component,
    ElementRef,
    InjectionToken,
    ViewEncapsulation,
    effect,
    inject,
    input
} from '@angular/core';

/**
 * Valid HTML heading sizes for the title component.
 * Corresponds to h1 through h6 HTML elements.
 */
export type HeaderSizes = 1 | 2 | 3 | 4 | 5 | 6;

/**
 * Injection token for providing a default header size to title components.
 *
 * **How it works:**
 * 1. A parent component (like dialog-header) provides this token with a value (e.g., 5)
 * 2. Child title components automatically receive that value through dependency injection
 * 3. The title uses this default only if no explicit `headerSize` input is provided
 *
 * **Example:**
 * ```typescript
 * // Parent provides the default
 * @Component({
 *   providers: [{ provide: DEFAULT_TITLE_SIZE, useValue: 5 }]
 * })
 * export class DialogHeaderComponent { }
 *
 * // Child receives the default automatically
 * <fd-dialog-header>
 *   <h1 fd-title>Title</h1>  <!-- Will be size 5 -->
 * </fd-dialog-header>
 * ```
 */
export const DEFAULT_TITLE_SIZE = new InjectionToken<HeaderSizes>('DEFAULT_TITLE_SIZE');

/**
 * Abstract token for providing access to the title component's element reference.
 * Used for dependency injection when components need to access the title element.
 */
export abstract class TitleToken {
    abstract elementRef: ElementRef;
}

/**
 * Title component for rendering semantic headings with Fundamental styles.
 *
 * Applied as an attribute directive to heading elements (h1-h6).
 * Automatically detects heading level from the tag name or can be explicitly set via `headerSize`.
 */
@Component({
    // eslint-disable-next-line
    selector: '[fd-title], [fdTitle]',
    exportAs: 'fd-title',
    template: '<ng-content></ng-content>',
    host: {
        class: 'fd-title',
        '[class.fd-title--wrap]': 'wrap()'
    },
    styleUrl: './title.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    providers: [{ provide: TitleToken, useExisting: TitleComponent }]
})
export class TitleComponent extends TitleToken {
    /**
     * Explicit header size (1-6) for the title styling.
     * If not provided, uses the injected DEFAULT_TITLE_SIZE or automatically detected from the host element's tag name.
     * @default null
     */
    readonly headerSize = input<HeaderSizes | null>(null);

    /**
     * Enables text wrapping. When `false`, text truncates with ellipsis.
     * @default false
     */
    readonly wrap = input(false);

    /**
     * Default header size provided by parent component via DI.
     * Will be `null` if no parent provides DEFAULT_TITLE_SIZE.
     * @hidden
     */
    private readonly _defaultHeaderSize = inject(DEFAULT_TITLE_SIZE, { optional: true });

    /**
     * Element reference to the host element.
     * @hidden
     */
    private readonly _elementRef = inject(ElementRef<HTMLElement>);

    /**
     * Tracks the currently applied header size to avoid unnecessary DOM updates.
     * @hidden
     */
    private _appliedHeaderSize: number | undefined;

    /**
     * Returns the element reference for external access via TitleToken.
     */
    get elementRef(): ElementRef {
        return this._elementRef;
    }

    /**
     * @hidden
     * Effect that reactively updates the header size class when headerSize input changes.
     * Runs on initialization and whenever the headerSize signal updates.
     */
    constructor() {
        super();
        effect(() => {
            this._setHeaderSize();
        });
    }

    /**
     * Applies the appropriate header size class to the host element.
     * Priority: explicit headerSize > injected default > element tag name.
     * @hidden
     */
    private _setHeaderSize(): void {
        const headerSize =
            this.headerSize() ?? this._defaultHeaderSize ?? this._elementRef.nativeElement.tagName.charAt(1);

        if (this._appliedHeaderSize !== undefined) {
            this._elementRef.nativeElement.classList.remove(`fd-title--h${this._appliedHeaderSize}`);
        }
        this._elementRef.nativeElement.classList.add(`fd-title--h${headerSize}`);
        this._appliedHeaderSize = Number(headerSize);
    }
}
