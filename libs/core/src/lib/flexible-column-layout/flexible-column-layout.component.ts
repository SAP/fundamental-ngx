import {
    AfterViewInit,
    ChangeDetectionStrategy,
    ContentChild,
    Component,
    EventEmitter,
    Input,
    OnChanges,
    OnDestroy,
    OnInit,
    Output,
    SimpleChanges,
    TemplateRef
} from '@angular/core';
import { fromEvent, Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import {
    ONE_COLUMN_START_FULL_SCREEN,
    ONE_COLUMN_MID_FULL_SCREEN,
    ONE_COLUMN_END_FULL_SCREEN,
    TWO_COLUMNS_START_EXPANDED,
    TWO_COLUMNS_MID_EXPANDED,
    TWO_COLUMNS_END_EXPANDED,
    THREE_COLUMNS_MID_EXPANDED,
    THREE_COLUMNS_END_EXPANDED,
    THREE_COLUMNS_START_MINIMIZED,
    THREE_COLUMNS_END_MINIMIZED,
    SM_SCREEN_SIZE,
    MD_SCREEN_SIZE,
    LG_SCREEN_SIZE,
    ScreenSize,
    FlexibleColumnLayout,
    FlexibleColumnSettings,
    ColumnSeparatorValue
} from './constants';

@Component({
    selector: 'fd-flexible-column-layout',
    templateUrl: './flexible-column-layout.component.html',
    styleUrls: ['./flexible-column-layout.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class FlexibleColumnLayoutComponent implements AfterViewInit, OnChanges, OnDestroy, OnInit {
    /**
     * the template that provides the content of the first/start/left column
     */
    @ContentChild('startColumn')
    startColumn: TemplateRef<any>;

    /**
     * the template that provides the content of the middle column
     */
    @ContentChild('midColumn')
    midColumn: TemplateRef<any>;

    /**
     * the template that provides the content of the last/end/right column
     */
    @ContentChild('endColumn')
    endColumn: TemplateRef<any>;

    /**
     * the background design of the component
     * Options include: 'solid' | 'translucent' | 'transparent'
     * The default is set to 'solid'
     */
    @Input()
    backgroundDesign: 'solid' | 'translucent' | 'transparent' = 'solid';

    /**
     * the layout of the component
     * Options include: 'OneColumnStartFullScreen' | 'OneColumnMidFullScreen' |
     * 'OneColumnEndFullScreen' | 'TwoColumnsStartExpanded' | 'TwoColumnsMidExpanded' |
     * 'TwoColumnsEndExpanded' | 'ThreeColumnsMidExpanded' | 'ThreeColumnsEndExpanded' |
     * 'ThreeColumnsStartMinimized' | 'ThreeColumnsEndMinimized'
     */
    @Input()
    layout: FlexibleColumnLayout = ONE_COLUMN_START_FULL_SCREEN;

    /**
     * the event emitted on layout value cchange
     */
    @Output()
    layoutChange: EventEmitter<FlexibleColumnLayout> = new EventEmitter<FlexibleColumnLayout>();

    /**
     * user defined break point for SM screens
     * the default (Fiori 3) value is 960
     */
    @Input()
    smBreakPoint = 960;

    /**
     * user defined break point for LG screens
     * the default (Fiori 3) value is 1280
     */
    @Input()
    lgBreakPoint = 1280;

    /**
     * user defined onResize function
     */
    @Input()
    customOnResizeFunction: () => void;

    /**
     * left column separator value (between start and middle columns)
     * that specifies the direction of the arrow and
     * if the separator is visible
     * Options include: 'left', 'right' and null
     */
    _leftColumnSeparator: ColumnSeparatorValue = null;

    /**
     * right column separator value (between middle and end columns)
     * that speccifies the direction of the arrow and
     * if the separator is visible
     * Options include: 'left', 'right' and null
     */
    _rightColumnSeparator: ColumnSeparatorValue = null;

    /**
     * @hidden
     * allows to keep track of the previos layout
     * so we can go back to it on window resize
     */
    private _previousLayout: FlexibleColumnLayout = this.layout;

    /** @hidden */
    private _screenSize: ScreenSize = LG_SCREEN_SIZE;

    /** @hidden */
    private _subscriptions = new Subscription();

    /**
     * @hidden
     * mappting of the layout name and the column layout in %
     */
    private _layouts: { [key: string]: FlexibleColumnSettings } = {
        OneColumnStartFullScreen: { start: 100, mid: 0, end: 0 },
        OneColumnMidFullScreen: { start: 0, mid: 100, end: 0 },
        OneColumnEndFullScreen: { start: 0, mid: 0, end: 100 },
        TwoColumnsStartExpanded: { start: 67, mid: 33, end: 0 },
        TwoColumnsMidExpanded: { start: 33, mid: 67, end: 0 },
        TwoColumnsEndExpanded: { start: 0, mid: 33, end: 67 },
        ThreeColumnsMidExpanded: { start: 25, mid: 50, end: 25 },
        ThreeColumnsEndExpanded: { start: 25, mid: 25, end: 50 },
        ThreeColumnsStartMinimized: { start: 0, mid: 67, end: 33 },
        ThreeColumnsEndMinimized: { start: 33, mid: 67, end: 0 }
    };

    /**
     * the column layout representing the distribution of the width
     * between the first (start), the middle and the last(end) column
     */
    _columnLayout: { start: number; mid: number; end: number } = this._layouts[this.layout];

    /**
     * @hidden
     * set to 'true' if the layout is changed to fullscreen on window resize
     * this will allow the layout to switch to previous mode on SM->MD transition
     * if a layout is set by the user to fullscreen, it should persist on window resize
     */
    private _responsiveFullscreenLayout = false;

    /**
     * function that handles the click events on the left separator
     * and updates the layout
     */
    _handleLeftColumnSeparatorClick(): void {
        switch (this.layout) {
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
     * function that handles the click events on the right separator
     * and updates the layout
     */
    _handleRightColumnSeparatorClick(): void {
        switch (this.layout) {
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

        switch (this.layout) {
            case ONE_COLUMN_MID_FULL_SCREEN:
            case ONE_COLUMN_END_FULL_SCREEN: {
                if (
                    this._screenSize !== SM_SCREEN_SIZE &&
                    this.layout !== this._previousLayout &&
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
    private _getLeftColumnSeparatorValue(): ColumnSeparatorValue {
        switch (this.layout) {
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
    private _getRightColumnSeparatorValue(): ColumnSeparatorValue {
        switch (this.layout) {
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
    private _updateColumnLayoutParameters(): void {
        this._columnLayout = this._layouts[this.layout];
        this._leftColumnSeparator = this._getLeftColumnSeparatorValue();
        this._rightColumnSeparator = this._getRightColumnSeparatorValue();
    }

    /**
     * @hidden
     * updates the layout
     * emits an event
     * makes a call to the helper function that will update the column layout and the separators
     */
    private _updateCurrentLayout(newLayout: FlexibleColumnLayout): void {
        this.layout = newLayout;
        this._updateColumnLayoutParameters();

        // setTimeout fixes "ExpressionChangedAfterItHasBeenCheckedError"
        setTimeout(() => {
            this.layoutChange.emit(this.layout);
        });
    }

    /** @hidden */
    ngOnInit(): void {
        this._updateColumnLayoutParameters();
        this._previousLayout = this.layout;
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
}
