import {
    AfterViewInit,
    ChangeDetectionStrategy,
    Component,
    ElementRef,
    EventEmitter,
    Input,
    OnDestroy,
    OnInit,
    Output,
    Renderer2,
    ViewChild,
    ViewEncapsulation,
    HostBinding
} from '@angular/core';
import { Subscription } from 'rxjs';
import { BACKGROUND_TYPE, CLASS_NAME, RESPONSIVE_SIZE } from '../../constants';
import { DynamicPageConfig } from '../../dynamic-page.config';
import { DynamicPageService } from '../../dynamic-page.service';

/** Dynamic Page collapse change event */
export class DynamicPageCollapseChangeEvent {
    constructor(public source: DynamicPageHeaderComponent, public payload: boolean) {}
}

let dynamicPageHeaderId = 0;
@Component({
    selector: 'fdp-dynamic-page-header',
    templateUrl: './dynamic-page-header.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None
})
export class DynamicPageHeaderComponent implements OnInit, AfterViewInit, OnDestroy {
    @Input()
    collapsible = true;

    @Input()
    pinnable = false;

    @Input()
    collapsed = false;

    /**
     * ARIA label for button when the header is collapsed
     */
    @Input()
    expandLabel: string = this._dynamicPageConfig.expandLabel;

    /**
     * ARIA label for button when the header is expanded
     */
    @Input()
    collapseLabel: string = this._dynamicPageConfig.collapseLabel;

    /**
     * @hidden
     * expand/collapse aria label based on the current state
     */
    expandCollapseAriaLabel: string;

    /** Collapse/Expand change event raised */
    @Output()
    collapseChange: EventEmitter<DynamicPageCollapseChangeEvent> = new EventEmitter<DynamicPageCollapseChangeEvent>();

    toggleSubscription: Subscription;
    expandSubscription: Subscription;
    collapseSubscription: Subscription;

    pinned = false;
    //  tracking collapsible for pinning
    _collapsible = this.collapsible;

    _background: BACKGROUND_TYPE;
    /** Reference to page header content */
    @ViewChild('headerContent')
    headerContent: ElementRef<HTMLElement>;

    /** Header role  */
    @Input()
    @HostBinding('attr.role')
    role = 'region';

    @Input()
    @HostBinding('attr.id')
    id = 'fdp-dynamic-page-header-id-' + dynamicPageHeaderId++;

    @Input()
    headerAriaLabel: string;

    /**
     * @hidden
     * pn/unpin aria label based on the current state
     */
    pinUnpinAriaLabel: string;

    @Input()
    pinAriaLabel: string = this._dynamicPageConfig.pinLabel;

    @Input()
    unpinAriaLabel: string = this._dynamicPageConfig.unpinLabel;

    @Input()
    set background(backgroundType: BACKGROUND_TYPE) {
        if (backgroundType) {
            this._background = backgroundType;
            this._setBackgroundStyles(backgroundType);
        }
    }

    get background(): BACKGROUND_TYPE {
        return this._background;
    }

    _size: RESPONSIVE_SIZE;

    @Input()
    set size(sizeType: RESPONSIVE_SIZE) {
        if (sizeType) {
            this._size = sizeType;
            this._setSize(sizeType);
        }
    }

    get size(): RESPONSIVE_SIZE {
        return this._size;
    }

    /** @hidden */
    constructor(
        private _elementRef: ElementRef<HTMLElement>,
        private _renderer: Renderer2,
        protected _dynamicPageConfig: DynamicPageConfig,
        private _dynamicPageService: DynamicPageService
    ) {
        if (this.collapsible) {
            this.toggleSubscription = this._dynamicPageService.$toggle.subscribe((val) => {
                console.log('subscriibied to dyn page serviicee header' + val);
                this.toggleCollapse();
            });
            this.expandSubscription = this._dynamicPageService.$expand.subscribe(() => {
                console.log('subscriibied to expand');
                this.collapseHeader(false);
            });
            this.collapseSubscription = this._dynamicPageService.$collapse.subscribe(() => {
                console.log('subscriibied to collapse');
                this.collapseHeader(true);
            });
        }
    }

    /** @hidden */
    ngOnInit(): void {
        // this._addClassNameToHostElement(CLASS_NAME.dynamicPageHeader); // not getting this to work right
        // this._addClassNameToHostElement(CLASS_NAME.dynamicPageHeaderExtraLarge);
        if (this._isCollapsibleCollapsed()) {
            this._setStyleToHostElement('z-index', 1);
        }
        this._calculateExpandCollapseAriaLabel();
        this._calculatePinUnpinAriaLabel();
    }
    /** @hidden */
    ngAfterViewInit(): void {
        if (this._background) {
            this._setBackgroundStyles(this._background);
        }
        if (this.size) {
            this._setSize(this.size);
        }
    }
    collapseHeader(val: any): any {
        if (this._isPinned()) {
            return;
        }
        this.collapsed = val;
        this.expandCollapseActions();
    }
    /** Handles expanded/collapsed event */
    public toggleCollapse(): void {
        if (this._isPinned()) {
            return;
        }
        this.collapsed = !this.collapsed;
        this.expandCollapseActions();
        // this._calculateExpandAriaLabel();
    }
    private expandCollapseActions(): void {
        if (this._isCollapsibleCollapsed()) {
            this._setStyleToHostElement('z-index', 1);
        } else {
            this._removeStyleFromHostElement('z-index');
            // reset the styles TODO not working correctly
            if (this._background) {
                this._setBackgroundStyles(this._background);
            }
            if (this.size) {
                this._setSize(this.size);
            }
        }
        const event = new DynamicPageCollapseChangeEvent(this, this.collapsed);
        // this._dynamicPageService.toggleHeader(this.collapsed);
        this.collapseChange.emit(event);
        this._calculateExpandCollapseAriaLabel();
    }

    // scenarioi where collapsible = false and pinnable = true is buggy due to html viisibility
    private _isCollapsibleCollapsed(): boolean {
        return this.collapsible && this.collapsed && this._collapsible;
    }

    private _isPinned(): boolean {
        return !this._collapsible && this.pinned;
    }

    onPinned(): void {
        this.pinned = !this.pinned; // true false
        // const collapsible = this.collapsible; // false true
        // this._collapsible = !this.pinned; // should be false, and pinend should be true
        // collapsible should be true pinend should be false,
        if (this.pinned) {
            this._collapsible = false;
        } else {
            this._collapsible = this.collapsible; // reset
        }
        this._calculatePinUnpinAriaLabel();

        // else {
        //     // this.collapsible = collapsible;
        // }
    }

    elementRef(): ElementRef<any> {
        return this._elementRef;
    }

    ngOnDestroy(): void {
        console.log('calling ngdestroy');

        this.toggleSubscription.unsubscribe();
        this.expandSubscription.unsubscribe();
        this.collapseSubscription.unsubscribe();
    }

    _setBackgroundStyles(background: BACKGROUND_TYPE): any {
        switch (background) {
            case 'transparent':
                // this._addClassNameToHostElement(CLASS_NAME.dynamicPageHeaderTransparentBg);
                if (this.headerContent) {
                    this._addClassNameToElement(CLASS_NAME.dynamicPageHeaderTransparentBg, this.headerContent);
                }
                break;
            case 'list':
            case 'solid':
            default:
                if (this.headerContent) {
                    this._removeClassNameFromElement(CLASS_NAME.dynamicPageHeaderTransparentBg, this.headerContent);
                }
                // this._removeClassNameToHostElement(CLASS_NAME.dynamicPageHeaderTransparentBg);
                break;
        }
    }

    _setSize(sizeType: RESPONSIVE_SIZE): any {
        if (this.headerContent) {
            switch (sizeType) {
                case 'small':
                    this._addClassNameToElement(CLASS_NAME.dynamicPageHeaderSmall, this.headerContent);
                    break;
                case 'medium':
                    this._addClassNameToElement(CLASS_NAME.dynamicPageHeaderMedium, this.headerContent);

                    break;
                case 'large':
                    this._addClassNameToElement(CLASS_NAME.dynamicPageHeaderLarge, this.headerContent);

                    break;
                case 'extra-large':
                default:
                    this._addClassNameToElement(CLASS_NAME.dynamicPageHeaderExtraLarge, this.headerContent);

                    break;
            }
        }
    }

    /**
     * @hidden
     * Calculate expandAriaLabel based on header
     */
    private _calculateExpandCollapseAriaLabel(): void {
        this.expandCollapseAriaLabel = this.collapsed ? this.expandLabel : this.collapseLabel;
    }

    /**
     * @hidden
     * Calculate pinUnpinAriaLabel based on header
     */
    private _calculatePinUnpinAriaLabel(): void {
        this.pinUnpinAriaLabel = this._isPinned() ? this.unpinAriaLabel : this.pinAriaLabel;
    }

    /**@hidden */
    private _addClassNameToHostElement(className: string): void {
        this._renderer.addClass(this._elementRef.nativeElement, className);
    }
    /**@hidden */
    private _removeClassNameToHostElement(className: string): void {
        this._renderer.removeClass(this._elementRef.nativeElement, className);
    }
    /**@hidden */
    private _setStyleToHostElement(attribute: string, value: any): void {
        this._renderer.setStyle(this._elementRef.nativeElement, attribute, value);
    }
    /**@hidden */
    private _removeStyleFromHostElement(styleName: string): void {
        this._renderer.removeStyle(this._elementRef.nativeElement, styleName);
    }

    private _addClassNameToElement(className: string, element: ElementRef<HTMLElement>): void {
        this._renderer.addClass(element.nativeElement, className);
    }

    private _removeClassNameFromElement(className: string, element: ElementRef<HTMLElement>): void {
        this._renderer.removeClass(element.nativeElement, className);
    }
}
