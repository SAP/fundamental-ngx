import { NgTemplateOutlet } from '@angular/common';
import {
    AfterViewInit,
    ChangeDetectionStrategy,
    Component,
    ContentChild,
    EventEmitter,
    inject,
    input,
    Input,
    OnChanges,
    OnDestroy,
    OnInit,
    Output,
    signal,
    SimpleChanges,
    TemplateRef,
    ViewEncapsulation
} from '@angular/core';
import { ButtonComponent } from '@fundamental-ngx/core/button';
import { ContentDensityDirective } from '@fundamental-ngx/core/content-density';
import { IconComponent } from '@fundamental-ngx/core/icon';
import { fromEvent, Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import {
    ColumnSeparatorValue,
    FD_FLEXIBLE_LAYOUT_CONFIG,
    FlexibleColumnLayout,
    FlexibleColumnLayoutDefinition,
    LG_SCREEN_SIZE,
    MD_SCREEN_SIZE,
    ONE_COLUMN_END_FULL_SCREEN,
    ONE_COLUMN_MID_FULL_SCREEN,
    ONE_COLUMN_START_FULL_SCREEN,
    ScreenSize,
    SM_SCREEN_SIZE,
    THREE_COLUMNS_END_EXPANDED,
    THREE_COLUMNS_END_MINIMIZED,
    THREE_COLUMNS_MID_EXPANDED,
    THREE_COLUMNS_START_MINIMIZED,
    TWO_COLUMNS_END_EXPANDED,
    TWO_COLUMNS_MID_EXPANDED,
    TWO_COLUMNS_START_EXPANDED
} from './constants';
import { FD_FLEXIBLE_COLUMN_LAYOUT_COMPONENT } from './tokens';

@Component({
    selector: 'fd-flexible-column-layout',
    templateUrl: './flexible-column-layout.component.html',
    styleUrl: './flexible-column-layout.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    providers: [
        {
            provide: FD_FLEXIBLE_COLUMN_LAYOUT_COMPONENT,
            useExisting: FlexibleColumnLayoutComponent
        }
    ],
    imports: [NgTemplateOutlet, ButtonComponent, ContentDensityDirective, IconComponent]
})
export class FlexibleColumnLayoutComponent implements AfterViewInit, OnChanges, OnDestroy, OnInit {
    /**
     * The template that provides the content of the first/start/left column
     */
    @ContentChild('startColumn')
    startColumn: TemplateRef<any>;

    /**
     * The template that provides the content of the middle column
     */
    @ContentChild('midColumn')
    midColumn: TemplateRef<any>;

    /**
     * The template that provides the content of the last/end/right column
     */
    @ContentChild('endColumn')
    endColumn: TemplateRef<any>;

    /**
     * The background design of the component
     * Options include: 'solid' | 'translucent' | 'transparent'
     * The default is set to 'solid'
     */
    @Input()
    backgroundDesign: 'solid' | 'translucent' | 'transparent' = 'solid';

    /**
     * Mapping of the layout name and the column layout in %
     */
    @Input()
    layoutDefinitions: FlexibleColumnLayoutDefinition = inject(FD_FLEXIBLE_LAYOUT_CONFIG).layouts;

    /**
     * The event emitted on layout value change.
     */
    @Output()
    layoutChange: EventEmitter<FlexibleColumnLayout> = new EventEmitter<FlexibleColumnLayout>();

    /**
     * User defined break point for SM screens
     * Default (Fiori 3) value is 960
     */
    @Input()
    smBreakPoint = 960;

    /**
     * User-defined break point for LG screens
     * the default (Fiori 3) value is 1280
     */
    @Input()
    lgBreakPoint = 1280;

    /**
     * User-defined onResize function
     */
    @Input()
    customOnResizeFunction: () => void;

    /** aria-label for separator */
    @Input()
    separatorAriaLabel: string;

    /** title for expanded button */
    @Input()
    expandTitle: string;

    /** title for collapsed button */
    @Input()
    collapseTitle: string;

    /** title for expanded state of the button between start and mid column */
    @Input()
    expandTitleStartBtn: string;

    /** title for collapsed state of the button between start and mid column */
    @Input()
    collapseTitleStartBtn: string;

    /** title for expanded state of the button between mid and end column */
    @Input()
    expandTitleEndBtn: string;

    /** title for collapsed state of the button between mid and end column */
    @Input()
    collapseTitleEndBtn: string;

    /**
     * The layout of the component
     * Options include: 'OneColumnStartFullScreen' | 'OneColumnMidFullScreen' |
     * 'OneColumnEndFullScreen' | 'TwoColumnsStartExpanded' | 'TwoColumnsMidExpanded' |
     * 'TwoColumnsEndExpanded' | 'ThreeColumnsMidExpanded' | 'ThreeColumnsEndExpanded' |
     * 'ThreeColumnsStartMinimized' | 'ThreeColumnsEndMinimized'
     */
    readonly layout = input<FlexibleColumnLayout>(ONE_COLUMN_START_FULL_SCREEN);

    /**
     * @hidden
     * the column layout representing the distribution of the width
     * between the first (start), the middle and the last(end) column
     */
    _columnLayout: { start: number; mid: number; end: number };

    /** @hidden */
    protected readonly _leftColumnSeparator = signal<ColumnSeparatorValue>(null);

    /**
     * @hidden
     * right column separator value (between middle and end columns)
     * that specifies the direction of the arrow and
     * if the separator is visible
     * Options include: 'left', 'right' and null
     */
    protected readonly _rightColumnSeparator = signal<ColumnSeparatorValue>(null);

    /**
     * @hidden
     * allows to keep track of the previos layout
     * so we can go back to it on window resize
     */
    private _previousLayout: FlexibleColumnLayout = this.layout();

    /** @hidden */
    private _screenSize: ScreenSize = LG_SCREEN_SIZE;

    /** @hidden */
    private _subscriptions = new Subscription();

    /**
     * @hidden
     * set to 'true' if the layout is changed to fullscreen on window resize
     * this will allow the layout to switch to previous mode on SM->MD transition
     * if a layout is set by the user to fullscreen, it should persist on window resize
     */
    private _responsiveFullscreenLayout = false;

    /**
     * @hidden
     * function that handles the click events on the left separator
     * and updates the layout
     */
    _handleLeftColumnSeparatorClick(): void {
        switch (this.layout()) {
            case TWO_COLUMNS_START_EXPANDED:
                this._updateCurrentLayout(TWO_COLUMNS_MID_EXPANDED);
                break;
            case TWO_COLUMNS_MID_EXPANDED:
                this._updateCurrentLayout(TWO_COLUMNS_START_EXPANDED);
                break;
            case THREE_COLUMNS_MID_EXPANDED:
                this._updateCurrentLayout(THREE_COLUMNS_END_MINIMIZED);
                break;
            case THREE_COLUMNS_END_MINIMIZED:
                this._updateCurrentLayout(TWO_COLUMNS_START_EXPANDED);
                break;
            case THREE_COLUMNS_START_MINIMIZED:
                this._updateCurrentLayout(THREE_COLUMNS_END_MINIMIZED);
                break;
        }
    }

    /**
     * @hidden
     * function that handles the click events on the right separator
     * and updates the layout
     */
    _handleRightColumnSeparatorClick(): void {
        switch (this.layout()) {
            case TWO_COLUMNS_END_EXPANDED:
                this._updateCurrentLayout(THREE_COLUMNS_START_MINIMIZED);
                break;
            case THREE_COLUMNS_MID_EXPANDED:
                this._updateCurrentLayout(THREE_COLUMNS_END_EXPANDED);
                break;
            case THREE_COLUMNS_END_EXPANDED:
                this._updateCurrentLayout(THREE_COLUMNS_MID_EXPANDED);
                break;
            case THREE_COLUMNS_END_MINIMIZED:
                this._updateCurrentLayout(THREE_COLUMNS_MID_EXPANDED);
                break;
            case THREE_COLUMNS_START_MINIMIZED:
                this._updateCurrentLayout(TWO_COLUMNS_END_EXPANDED);
                break;
        }
    }

    /** @hidden */
    ngOnInit(): void {
        this._updateColumnLayoutParameters();
        this._previousLayout = this.layout();
    }

    /** @hidden */
    ngAfterViewInit(): void {
        this._screenSize = this._getScreenSize(window.innerWidth);
        this._listenOnWindowResize();
    }

    /** @hidden */
    ngOnChanges(changes: SimpleChanges): void {
        this._updateColumnLayoutParameters();

        if (changes && changes.layout.previousValue) {
            this._previousLayout = changes.layout.previousValue;
        }

        if (changes && changes.layout) {
            this._responsiveLayoutChangeHandler();
        }
    }

    /** @hidden */
    ngOnDestroy(): void {
        this._subscriptions.unsubscribe();
    }

    /**
     * @hidden
     * function to determine the screen size in 'sm' | 'md' | 'lg' | 'xl'
     * format depending on the window size in px
     */
    private _getScreenSize(size: number): ScreenSize {
        if (size > this.lgBreakPoint) {
            return LG_SCREEN_SIZE;
        } else if (size > this.smBreakPoint && size <= this.lgBreakPoint) {
            return MD_SCREEN_SIZE;
        } else {
            return SM_SCREEN_SIZE;
        }
    }

    /**
     * @hidden
     * handles the change of the layouts on reaching a break point
     */
    private _responsiveLayoutChangeHandler(): void {
        this._screenSize = this._getScreenSize(window.innerWidth);

        switch (this.layout()) {
            case ONE_COLUMN_MID_FULL_SCREEN:
            case ONE_COLUMN_END_FULL_SCREEN: {
                if (
                    this._screenSize !== SM_SCREEN_SIZE &&
                    this.layout() !== this._previousLayout &&
                    this._responsiveFullscreenLayout
                ) {
                    this._responsiveFullscreenLayout = false;
                    this._updateCurrentLayout(this._previousLayout);
                }
                break;
            }

            case TWO_COLUMNS_START_EXPANDED:
            case TWO_COLUMNS_MID_EXPANDED: {
                if (this._screenSize === SM_SCREEN_SIZE) {
                    this._responsiveFullscreenLayout = true;
                    this._updateCurrentLayout(ONE_COLUMN_MID_FULL_SCREEN);
                }
                break;
            }

            case TWO_COLUMNS_END_EXPANDED: {
                if (this._screenSize === SM_SCREEN_SIZE) {
                    this._responsiveFullscreenLayout = true;
                    this._updateCurrentLayout(ONE_COLUMN_END_FULL_SCREEN);
                }

                if (this._screenSize === LG_SCREEN_SIZE) {
                    this._updateCurrentLayout(THREE_COLUMNS_END_EXPANDED);
                }
                break;
            }

            case THREE_COLUMNS_START_MINIMIZED: {
                if (this._screenSize === SM_SCREEN_SIZE) {
                    this._responsiveFullscreenLayout = true;
                    this._updateCurrentLayout(ONE_COLUMN_END_FULL_SCREEN);
                }

                if (this._screenSize === LG_SCREEN_SIZE) {
                    this._updateCurrentLayout(THREE_COLUMNS_MID_EXPANDED);
                }
                break;
            }

            case THREE_COLUMNS_END_MINIMIZED: {
                if (this._screenSize === SM_SCREEN_SIZE) {
                    this._responsiveFullscreenLayout = true;
                    this._updateCurrentLayout(ONE_COLUMN_END_FULL_SCREEN);
                }

                if (this._screenSize === LG_SCREEN_SIZE) {
                    this._updateCurrentLayout(THREE_COLUMNS_END_MINIMIZED);
                }
                break;
            }

            case THREE_COLUMNS_MID_EXPANDED: {
                if (this._screenSize === SM_SCREEN_SIZE) {
                    this._responsiveFullscreenLayout = true;
                    this._updateCurrentLayout(ONE_COLUMN_END_FULL_SCREEN);
                }

                if (this._screenSize === MD_SCREEN_SIZE) {
                    this._updateCurrentLayout(THREE_COLUMNS_START_MINIMIZED);
                }
                break;
            }

            case THREE_COLUMNS_END_EXPANDED: {
                if (this._screenSize === SM_SCREEN_SIZE) {
                    this._responsiveFullscreenLayout = true;
                    this._updateCurrentLayout(ONE_COLUMN_END_FULL_SCREEN);
                }

                if (this._screenSize === MD_SCREEN_SIZE) {
                    this._updateCurrentLayout(TWO_COLUMNS_END_EXPANDED);
                }
                break;
            }
        }
    }

    /**
     * @hidden
     * Listen on window resize and update the layout
     * call user defined custom function if provided
     */
    private _listenOnWindowResize(): void {
        if (this.customOnResizeFunction) {
            this.customOnResizeFunction();
        } else {
            this._subscriptions.add(
                fromEvent(window, 'resize')
                    .pipe(debounceTime(100))
                    .subscribe(() => this._responsiveLayoutChangeHandler())
            );
        }
    }

    /**
     * @hidden
     * determines if the left separator should be visible
     * and the value that will specify the direction of the arrow
     */
    private _getLeftColumnSeparatorValue(layout?: FlexibleColumnLayout): ColumnSeparatorValue {
        const currentLayout = layout ?? this.layout();
        switch (currentLayout) {
            case TWO_COLUMNS_START_EXPANDED:
                return 'left';
            case TWO_COLUMNS_MID_EXPANDED:
            case THREE_COLUMNS_MID_EXPANDED:
            case THREE_COLUMNS_END_MINIMIZED:
            case THREE_COLUMNS_START_MINIMIZED:
                return 'right';
            default:
                return null;
        }
    }

    /**
     * @hidden
     * determines if the right separator should be visible
     * and the value that will specify the direction of the arrow
     */
    private _getRightColumnSeparatorValue(layout?: FlexibleColumnLayout): ColumnSeparatorValue {
        const currentLayout = layout ?? this.layout();
        switch (currentLayout) {
            case TWO_COLUMNS_END_EXPANDED:
            case THREE_COLUMNS_END_EXPANDED:
                return 'right';
            case THREE_COLUMNS_MID_EXPANDED:
            case THREE_COLUMNS_END_MINIMIZED:
            case THREE_COLUMNS_START_MINIMIZED:
                return 'left';
            default:
                return null;
        }
    }

    /**
     * @hidden
     * updates the column layout based on the layout name
     * makes a call to determine the new value of the left separator
     * makes a call to determine the new value of the right separator
     */
    private _updateColumnLayoutParameters(layout?: FlexibleColumnLayout): void {
        const currentLayout = layout ?? this.layout();
        this._columnLayout = this.layoutDefinitions[currentLayout];
        this._leftColumnSeparator.set(this._getLeftColumnSeparatorValue(currentLayout));
        this._rightColumnSeparator.set(this._getRightColumnSeparatorValue(currentLayout));
    }

    /**
     * @hidden
     * updates the layout
     * emits an event
     * makes a call to the helper function that will update the column layout and the separators
     *
     * NOTE: setTimeout defers the emit to the next event loop tick to prevent
     * ExpressionChangedAfterItHasBeenCheckedError when consumers update bound state
     * in layoutChange handlers (zone-based mode). Safe in both zone.js and zoneless modes.
     * Can be removed once the library drops zone.js support entirely.
     */
    private _updateCurrentLayout(newLayout: FlexibleColumnLayout): void {
        setTimeout(() => {
            this.layoutChange.emit(newLayout);
        });
        this._updateColumnLayoutParameters(newLayout);
    }
}
