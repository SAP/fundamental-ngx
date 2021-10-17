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
    HostBinding,
    ChangeDetectorRef
} from '@angular/core';
import { Subscription } from 'rxjs';

import { DynamicPageBackgroundType, CLASS_NAME, DynamicPageResponsiveSize } from '../../constants';
import { DynamicPageService } from '../../dynamic-page.service';
import { addClassNameToElement, removeClassNameFromElement } from '../../utils';

/**
 * The Header Component.
 * For internal usage only.
 * This is not a part of Public API
 */

@Component({
    selector: 'fdp-dynamic-page-header-internal',
    templateUrl: './dynamic-page-header-internal.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None
})
export class DynamicPageHeaderInternalComponent implements OnInit, AfterViewInit, OnDestroy {
    /**
     * whether the header can be collapsed. True by default. If set to false, both pin/collapse buttons disappear
     * and the header stays visible
     */
    @Input()
    collapsible;

    /**
     * whether the header should be allowed to be pinned or unpinned. When set, the pin button shows up.
     * Pinning the header will make the header stay visible and the collapse button(if present) will disappear until unpinned.
     */
    @Input()
    pinnable;

    /**
     * the initial state of the header. Set to true if header should be collapsed.
     */
    @Input()
    set collapsed(collapsed: boolean) {
        this._collapsed = collapsed;
        this._dynamicPageService?.setCollapseValue(collapsed);
    }

    get collapsed(): boolean {
        return this._collapsed;
    }

    /**
     * ARIA label for button when the header is collapsed
     */
    @Input()
    expandLabel: string;

    /**
     * ARIA label for button when the header is expanded
     */
    @Input()
    collapseLabel: string;

    /** Header role  */
    @Input()
    @HostBinding('attr.role')
    role = 'region';

    /**
     * id for header
     */
    @Input()
    @HostBinding('attr.id')
    id: string;

    /**
     * aria label for header
     */
    @Input()
    headerAriaLabel: string;

    /**
     * aria label for pin state of pin button
     */
    @Input()
    pinAriaLabel: string;

    /**
     * aria label for unpin state of pin button
     */
    @Input()
    unpinAriaLabel: string;

    /**
     * sets background for content to `list`, `transparent`, or `solid` background color.
     * Default is `solid`.
     */
    @Input()
    set background(backgroundType: DynamicPageBackgroundType) {
        if (backgroundType) {
            this._background = backgroundType;
            this._setBackgroundStyles(backgroundType);
        }
    }

    get background(): DynamicPageBackgroundType {
        return this._background;
    }

    /**
     * sets size which in turn adds corresponding padding for the size type.
     * size can be `small`, `medium`, `large`, or `extra-large`.
     */
    @Input()
    set size(sizeType: DynamicPageResponsiveSize) {
        if (sizeType) {
            this._size = sizeType;
            this._setSize(sizeType);
        }
    }

    get size(): DynamicPageResponsiveSize {
        return this._size;
    }

    /** Collapse/Expand change event raised */
    @Output()
    collapseChange: EventEmitter<boolean> = new EventEmitter<boolean>();

    /** Reference to page header content */
    @ViewChild('headerContent')
    headerContent: ElementRef<HTMLElement>;

    /**
     * tracking if pin button is pinned
     */
    _pinned = false;

    /**
     * @hidden
     * pn/unpin aria label based on the current state
     */
    _pinUnpinAriaLabel: string;

    /**
     * @hidden
     * expand/collapse aria label based on the current state
     */
    _expandCollapseAriaLabel: string;

    /**
     * @hidden
     * tracking expand/collapse button
     */
    private _collapsed = false;

    /**
     * @hidden
     * tracking collapsible for pinning
     */
    private _collapsible: boolean;

    /**
     * @hidden
     * tracking the background value
     */
    private _background: DynamicPageBackgroundType;

    /**
     * @hidden
     * tracks the size for responsive padding
     */
    private _size: DynamicPageResponsiveSize;

    /**
     * @hidden
     * subscription for when toggle header is called
     */
    private _toggleSubscription: Subscription;

    /**
     * @hidden
     * subscription for when expand header is called
     */
    private _expandSubscription: Subscription;

    /**
     * @hidden
     * subscription for when collapse header is called
     */
    private _collapseSubscription: Subscription;

    /** @hidden */
    constructor(
        private _cd: ChangeDetectorRef,
        private _elementRef: ElementRef<HTMLElement>,
        private _renderer: Renderer2,
        private _dynamicPageService: DynamicPageService
    ) {}

    /** @hidden */
    ngOnInit(): void {
        this._collapsible = this.collapsible;

        if (this.collapsible) {
            this._toggleSubscription = this._dynamicPageService.$toggle.subscribe(() => {
                this.toggleCollapse();
            });
            this._expandSubscription = this._dynamicPageService.$expand.subscribe(() => {
                this.collapseHeader(false);
            });
            this._collapseSubscription = this._dynamicPageService.$collapse.subscribe(() => {
                this.collapseHeader(true);
            });
        }

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

    /**@hidden */
    ngOnDestroy(): void {
        this._toggleSubscription?.unsubscribe();
        this._expandSubscription?.unsubscribe();
        this._collapseSubscription?.unsubscribe();
    }

    /**
     * collapse or expand the header
     * @param val the collapse/expand value
     */
    collapseHeader(val: boolean): any {
        if (this._isPinned()) {
            return;
        }
        if (this.collapsed !== val) {
            this.collapsed = val;
            this._expandCollapseActions();
        }
    }

    /**
     * toggles the state of the header and
     * handles expanded/collapsed event
     */
    toggleCollapse(): void {
        this._pinned = false;

        this.collapsed = !this._dynamicPageService.getIsCollapsed();
        this._expandCollapseActions();
    }

    /**
     * return the element reference.
     */
    elementRef(): ElementRef<any> {
        return this._elementRef;
    }

    /**
     * @hidden
     * click action on pin button
     */
    _onPinned(): void {
        this._pinned = !this._pinned;
        if (this._pinned) {
            this._collapsible = false;
        } else {
            this._collapsible = this.collapsible; // reset
        }
        this._calculatePinUnpinAriaLabel();
    }

    /**
     * handles actions like style changes and emit methods on expand/collapse
     */
    private _expandCollapseActions(): void {
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
        this.collapseChange.emit(this.collapsed);
        this._calculateExpandCollapseAriaLabel();
        this._cd.detectChanges();
        this._dynamicPageService?.setCollapseValue(this._dynamicPageService.getIsCollapsed());
    }

    /**
     * return whether this collapse/expand button is collapsed
     */
    private _isCollapsibleCollapsed(): boolean {
        return this.collapsible && this.collapsed && this._collapsible;
    }

    /**
     * return whether the pin button is pinned
     */
    private _isPinned(): boolean {
        return !this._collapsible && this._pinned;
    }

    /**
     * @hidden
     * sets the style classes for background property
     * @param background
     */
    private _setBackgroundStyles(background: DynamicPageBackgroundType): any {
        if (this.headerContent) {
            switch (background) {
                case 'transparent':
                    this._addClassNameToCustomElement(
                        this.headerContent.nativeElement,
                        CLASS_NAME.dynamicPageCollapsibleHeaderTransparentBg
                    );
                    break;
                case 'list':
                case 'solid':
                default:
                    removeClassNameFromElement(
                        this._renderer,
                        this.headerContent.nativeElement,
                        CLASS_NAME.dynamicPageCollapsibleHeaderTransparentBg
                    );
                    break;
            }
        }
    }

    /**
     * @hidden
     * sets the padding classes
     * @param sizeType
     */
    private _setSize(sizeType: DynamicPageResponsiveSize): any {
        if (this.headerContent) {
            switch (sizeType) {
                case 'small':
                    this._addClassNameToCustomElement(
                        this.headerContent.nativeElement,
                        CLASS_NAME.dynamicPageCollapsibleHeaderSmall
                    );
                    break;
                case 'medium':
                    this._addClassNameToCustomElement(
                        this.headerContent.nativeElement,
                        CLASS_NAME.dynamicPageCollapsibleHeaderMedium
                    );

                    break;
                case 'large':
                    this._addClassNameToCustomElement(
                        this.headerContent.nativeElement,
                        CLASS_NAME.dynamicPageCollapsibleHeaderLarge
                    );

                    break;
                case 'extra-large':
                default:
                    this._addClassNameToCustomElement(
                        this.headerContent.nativeElement,
                        CLASS_NAME.dynamicPageCollapsibleHeaderExtraLarge
                    );
                    break;
            }
        }
    }

    /**
     * @hidden
     * Calculate expandAriaLabel based on header
     */
    private _calculateExpandCollapseAriaLabel(): void {
        this._expandCollapseAriaLabel = this.collapsed ? this.expandLabel : this.collapseLabel;
    }

    /**
     * @hidden
     * Calculate pinUnpinAriaLabel based on header
     */
    private _calculatePinUnpinAriaLabel(): void {
        this._pinUnpinAriaLabel = this._isPinned() ? this.unpinAriaLabel : this.pinAriaLabel;
    }

    /**@hidden */
    private _setStyleToHostElement(attribute: string, value: any): void {
        this._renderer.setStyle(this._elementRef.nativeElement, attribute, value);
    }

    /**@hidden */
    private _removeStyleFromHostElement(styleName: string): void {
        this._renderer.removeStyle(this._elementRef.nativeElement, styleName);
    }

    /**@hidden */
    private _addClassNameToCustomElement(element: Element, className: string): void {
        addClassNameToElement(this._renderer, element, className);
    }
}
