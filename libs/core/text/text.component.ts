import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    EventEmitter,
    Input,
    Output,
    ViewEncapsulation
} from '@angular/core';
import { LineClampDirective, LineClampTargetDirective, Nullable } from '@fundamental-ngx/cdk/utils';
import { LinkComponent } from '@fundamental-ngx/core/link';
import { FdTranslatePipe } from '@fundamental-ngx/i18n';

/** Type of hyphenation */
export type HyphenationType = 'none' | 'manual' | 'auto' | null;

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
     * Text for render
     */
    @Input()
    text: string;

    /**
     * Max visible lines of text
     */
    @Input()
    maxLines: Nullable<number> = null;

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
     * Option to set text collapsed or expand on render
     */
    @Input()
    isCollapsed = true;

    /**
     * Event, notifying about collapse state changes
     */
    @Output()
    isCollapsedChange = new EventEmitter<boolean>();

    /** @hidden */
    get _isCollapsed(): boolean {
        return this.isCollapsed && !!this.maxLines && this.maxLines > 0;
    }

    /** @hidden */
    get _expandable(): boolean {
        return this.expandable && !!this.maxLines && this.maxLines > 0;
    }

    /** @hidden */
    _hasMore = false;

    /** @hidden */
    constructor(private readonly _changeDetectorRef: ChangeDetectorRef) {}

    /** @hidden */
    toggleTextView(): void {
        this.isCollapsed = !this.isCollapsed;
        this.isCollapsedChange.emit(this.isCollapsed);
    }

    /** @hidden */
    checkLineCount(count: number): void {
        this._hasMore = !!this.maxLines && count > this.maxLines;
        this._changeDetectorRef.detectChanges();
    }
}
