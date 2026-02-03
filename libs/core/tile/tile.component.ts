import {
    ChangeDetectionStrategy,
    Component,
    ElementRef,
    ViewEncapsulation,
    booleanAttribute,
    computed,
    effect,
    inject,
    input,
    output
} from '@angular/core';

type TileType = null | 'kpi' | 'launch' | 'feed';
type TileSize = null | 's';

@Component({
    selector: 'fd-tile, [fd-tile]',
    templateUrl: './tile.component.html',
    styleUrl: './tile.component.scss',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [],
    host: {
        '[class]': 'cssClass()',
        '[attr.tabindex]': 'tabindex()',
        '[attr.role]': 'roleValue()',
        '[attr.aria-label]': 'ariaLabel()',
        '[attr.aria-labelledby]': 'ariaLabelledby()',
        '[attr.id]': 'id()',
        '(click)': 'tileClick.emit()',
        '(keyup.enter)': 'handleKeyboard()',
        '(keydown.space)': '$event.preventDefault()',
        '(keyup.space)': 'handleKeyboard()'
    }
})
export class TileComponent {
    /** Size modifier. Options are 's' or null (default). */
    readonly size = input<TileSize | null | undefined>();

    /** Doubles the tile width. */
    readonly double = input(false, { transform: booleanAttribute });

    /** Type of tile. Options are 'kpi', 'launch', 'feed', or null (default). */
    readonly type = input<TileType | null | undefined>();

    /** Whether the tile is in action mode. */
    readonly action = input(false, { transform: booleanAttribute });

    /** Whether tile is focusable and clickable. */
    readonly clickable = input(false, { transform: booleanAttribute });

    /** The role for the tile. */
    readonly role = input<string | null | undefined>();

    /** Aria-label for accessibility. */
    readonly ariaLabel = input<string | null | undefined>();

    /** Aria-labelledby for accessibility. */
    readonly ariaLabelledby = input<string | null | undefined>();

    /** Unique identifier for the Tile. */
    readonly id = input<string | null | undefined>();

    /** Emitted when tile is clicked or activated via space/enter keys. */
    readonly tileClick = output<void>();

    /**
     * @hidden
     * Computed tabindex - native links manage their own, custom elements use clickable
     */
    protected readonly tabindex = computed(() => {
        if (this._isNativeLink()) {
            return null; // Native <a> manages its own tabindex
        }
        return this.clickable() ? 0 : -1;
    });

    /** @hidden Computed role - don't override native link semantics */
    protected readonly roleValue = computed(() => {
        if (this._isNativeLink()) {
            return null; // Native <a> has implicit role
        }
        return this.role() ?? null;
    });

    /** @hidden */
    protected readonly cssClass = computed(() => {
        const classes: string[] = ['fd-tile'];

        const sizeValue = this.size();
        if (sizeValue) {
            classes.push(`fd-tile--${sizeValue}`);
        }

        if (this.double()) {
            classes.push('fd-tile--double');
        }

        const typeValue = this.type();
        if (typeValue) {
            classes.push(`fd-tile--${typeValue}`);
        }

        if (this.action()) {
            classes.push('fd-tile--action');
        }

        return classes.join(' ');
    });

    /** @hidden */
    private readonly _elementRef = inject(ElementRef<HTMLElement>);

    /** @hidden */
    private readonly _isNativeLink = computed(() => this._elementRef.nativeElement.tagName === 'A');

    constructor() {
        // Warn if href is used on custom element (should use <a> instead)
        effect(() => {
            const element = this._elementRef.nativeElement;
            if (!this._isNativeLink() && element.hasAttribute('href')) {
                console.warn(
                    'Using href attribute on <fd-tile> is not supported. Use <a fd-tile href="..."> instead for link behavior.'
                );
            }
        });
    }

    /** @hidden Handle keyboard activation for non-link tiles */
    protected handleKeyboard(): void {
        // For native links, browser handles keyboard activation
        // For custom elements, only emit if clickable
        if (!this._isNativeLink() && this.clickable()) {
            this.tileClick.emit();
        }
    }
}
