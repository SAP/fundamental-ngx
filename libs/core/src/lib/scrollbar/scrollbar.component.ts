import { ChangeDetectionStrategy, Component, HostBinding, Input, ViewEncapsulation } from '@angular/core';
import { BooleanInput, coerceBooleanProperty } from '@angular/cdk/coercion';

export type ScrollbarOverflowOptions = 'auto' | 'scroll' | 'hidden';

/**
 * The scrollbar directive.
 *
 * Children usage:
 * ```html
 * <div fd-scrollbar>
 * <div fd-scrollbar noVerticalScroll>
 * <div fd-scrollbar [noVerticalScroll]="true">
 * <div fd-scrollbar noHorizontalScroll>
 * <div fd-scrollbar [noHorizontalScroll]="true">
 * ```
 */
@Component({
    // eslint-disable-next-line @angular-eslint/component-selector
    selector: '[fd-scrollbar]',
    template: ` <ng-content></ng-content>`,
    host: {
        class: 'fd-scrollbar'
    },
    styleUrls: ['./scrollbar.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ScrollbarComponent {
    /** Whether overflow horizontal content should be hidden. */
    @Input()
    set noHorizontalScroll(value: BooleanInput) {
        this._noHorizontalScroll = coerceBooleanProperty(value);
    }
    get noHorizontalScroll(): boolean {
        return this._noHorizontalScroll;
    }

    /** Whether overflow vertical content should be hidden. */
    @Input()
    set noVerticalScroll(value: BooleanInput) {
        this._noVerticalScroll = coerceBooleanProperty(value);
    }
    get noVerticalScroll(): boolean {
        return this._noVerticalScroll;
    }

    /** Whether scrollbars should be visible even if content fits. */
    @Input()
    set alwaysVisible(value: BooleanInput) {
        this._alwaysVisible = coerceBooleanProperty(value);
    }
    get alwaysVisible(): boolean {
        return this._alwaysVisible;
    }

    /** @hidden */
    @HostBinding('attr.tabindex')
    _tabindex = 0;

    /** @hidden */
    @HostBinding('style.overflow-x')
    get _overflowX(): ScrollbarOverflowOptions {
        if (this.noHorizontalScroll) {
            return 'hidden';
        }

        return this._overflow;
    }

    /** @hidden */
    @HostBinding('style.overflow-y')
    get _overflowY(): ScrollbarOverflowOptions {
        if (this.noVerticalScroll) {
            return 'hidden';
        }

        return this._overflow;
    }

    /** @hidden */
    private _noHorizontalScroll = false;

    /** @hidden */
    private _noVerticalScroll = false;

    /** @hidden */
    private _alwaysVisible = false;

    /** @hidden */
    private get _overflow(): ScrollbarOverflowOptions {
        if (this.alwaysVisible) {
            return 'scroll';
        }

        return 'auto';
    }
}
