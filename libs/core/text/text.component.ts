import { ChangeDetectionStrategy, Component, ViewEncapsulation, computed, input, model, signal } from '@angular/core';
import { LineClampDirective, LineClampTargetDirective } from '@fundamental-ngx/cdk/utils';
import { LinkComponent } from '@fundamental-ngx/core/link';
import { FdTranslatePipe } from '@fundamental-ngx/i18n';

/**
 * Type of hyphenation to apply to text using CSS hyphens property.
 * - `'none'` - Disables hyphenation
 * - `'manual'` - Only breaks at explicit hyphenation points
 * - `'auto'` - Browser automatically hyphenates
 * - `null` - No hyphenation applied
 */
export type HyphenationType = 'none' | 'manual' | 'auto' | null;

/**
 * Text component for displaying text content with optional line clamping, hyphenation, and expand/collapse functionality.
 */
@Component({
    selector: 'fd-text',
    templateUrl: './text.component.html',
    styleUrl: './text.component.scss',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [LineClampDirective, LineClampTargetDirective, LinkComponent, FdTranslatePipe]
})
export class TextComponent {
    /**
     * The text content to render.
     * @default ''
     */
    readonly text = input<string>('');

    /**
     * Maximum number of visible lines before text is clamped. Set to `null` to disable.
     * @default null
     */
    readonly maxLines = input<number | null>(null);

    /**
     * Preserves whitespace and line breaks using CSS `white-space: pre-wrap`.
     * @default false
     */
    readonly whitespaces = input(false);

    /**
     * Controls hyphenation behavior using CSS `hyphens` property.
     * @default null
     */
    readonly hyphenation = input<HyphenationType>(null);

    /**
     * Displays "more"/"less" links to expand/collapse text. Requires `maxLines` to be set.
     * @default false
     */
    readonly expandable = input(false);

    /**
     * Controls collapsed/expanded state. Two-way bindable via `[(isCollapsed)]`.
     * @default true
     */
    readonly isCollapsed = model(true);

    /**
     * Computed signal that checks if maxLines is set to a valid positive number.
     * @hidden
     */
    protected readonly _hasValidMaxLines = computed(() => (this.maxLines() ?? 0) > 0);

    /**
     * Computed signal determining if text should display in collapsed state.
     * @hidden
     */
    protected readonly _isCollapsed = computed(() => this.isCollapsed() && this._hasValidMaxLines());

    /**
     * Computed signal determining if expand/collapse functionality is enabled.
     * @hidden
     */
    protected readonly _expandable = computed(() => this.expandable() && this._hasValidMaxLines());

    /**
     * Tracks whether text content exceeds maximum lines.
     * @hidden
     */
    protected readonly _hasMore = signal(false);

    /**
     * Toggles collapsed/expanded state and notifies parent components.
     * @hidden
     */
    protected toggleTextView(): void {
        this.isCollapsed.update((collapsed) => !collapsed);
    }

    /**
     * Updates `_hasMore` signal based on actual line count from line clamp directive.
     * Signal update automatically triggers change detection.
     * @hidden
     */
    protected checkLineCount(count: number): void {
        const max = this.maxLines();
        this._hasMore.set(!!max && count > max);
    }
}
