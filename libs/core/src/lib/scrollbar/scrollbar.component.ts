import { ChangeDetectionStrategy, Component, HostBinding, Input, ViewEncapsulation } from '@angular/core';
import { coerceBooleanProperty } from '@angular/cdk/coercion';

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
    // tslint:disable-next-line:component-selector
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
    noHorizontalScroll = false;

    /** Whether overflow vertical content should be hidden. */
    @Input()
    noVerticalScroll = false;

    /** Whether scrollbars should be visible even if content fits. */
    @Input()
    alwaysVisible = false;

    /** @hidden */
    @HostBinding('style.overflow-x')
    get _noHorizontalScroll(): ScrollbarOverflowOptions {
        if (coerceBooleanProperty(this.noHorizontalScroll)) {
            return 'hidden';
        }

        return this._alwaysVisible;
    }

    /** @hidden */
    @HostBinding('style.overflow-y')
    get _noVerticalScroll(): ScrollbarOverflowOptions {
        if (coerceBooleanProperty(this.noVerticalScroll)) {
            return 'hidden';
        }

        return this._alwaysVisible;
    }

    /** @hidden */
    private get _alwaysVisible(): ScrollbarOverflowOptions {
        if (coerceBooleanProperty(this.alwaysVisible)) {
            return 'scroll';
        }

        return 'auto';
    }
}
