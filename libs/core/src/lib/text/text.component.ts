import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, ViewEncapsulation } from '@angular/core';

/** Type of hyphenation */
export type HyphenationType = 'none' | 'manual' | 'auto' | null;

@Component({
    selector: 'fd-text',
    templateUrl: './text.component.html',
    styleUrls: ['./text.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TextComponent {
    /**
     * Text for render
     */
    @Input()
    text: string;

    /**
     * Max visible lines of text
     */
    @Input()
    maxLines = null;

    /**
     * Property allowing browsers to render whitespace and tabs
     */
    @Input()
    whitespaces = false;

    /**
     * Property for managing hyphenation, using css rule hyphens.
     */
    @Input()
    hyphenation: HyphenationType = null;

    /**
     * Option that adds more and less buttons to expand/collapse text
     */
    @Input()
    expandable = false;

    /**
     * Text for more button
     */
    @Input()
    moreLabel = 'More';

    /**
     * Text for less button
     */
    @Input()
    lessLabel = 'Less';

    /**
     * Option to set text collapsed or expand on render
     */
    @Input()
    isCollapsed = true;

    /** @hidden */
    get _isCollapsed(): boolean {
        return this.isCollapsed && this.maxLines > 0;
    }

    /** @hidden */
    get _expandable(): boolean {
        return this.expandable && this.maxLines > 0;
    }

    /** @hidden */
    _hasMore = false;

    /** @hidden */
    constructor(private readonly _changeDetectorRef: ChangeDetectorRef) {}

    /** @hidden */
    toggleTextView(): void {
        this.isCollapsed = !this.isCollapsed;
    }

    /** @hidden */
    checkLineCount(count: number): void {
        this._hasMore = count > this.maxLines;
        this._changeDetectorRef.detectChanges();
    }
}
