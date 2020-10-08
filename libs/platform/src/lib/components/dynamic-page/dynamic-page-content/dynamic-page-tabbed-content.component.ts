import { ScrollDispatcher } from '@angular/cdk/scrolling';
import { ChangeDetectionStrategy, Component, ElementRef, NgZone, Renderer2, Input } from '@angular/core';

import { DynamicPageBackgroundType, DynamicPageResponsiveSize, CLASS_NAME } from '../constants';
import { DynamicPageService } from '../dynamic-page.service';
import { addClassNameToElement } from '../utils';

@Component({
    selector: 'fdp-dynamic-page-tabbed-content',
    template: `<div class="fd-dynamic-page__content" [style.margin-top]="contentTop">
        <ng-content></ng-content>
    </div>`,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DynamicPageTabbedContentComponent {
    /**
     * sets background for content to List, Transparent or Solid background color.
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

    /**
     * @hidden
     * used internally to set margin top correctly for the content
     */
    @Input()
    set contentTop(height: string) {
        if (height) {
            this._height = height;
        }
    }
    get contentTop(): string {
        return this._height;
    }

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
     * tracks the height attribute
     */
    private _height: string;

    constructor(
        public _elementRef: ElementRef<HTMLElement>,
        public _renderer: Renderer2,
        public scrollDispatcher: ScrollDispatcher,
        public zone: NgZone,
        public _dynamicPageService: DynamicPageService
    ) {}

    /**
     * @hidden
     * sets the style classes for background property
     * @param background
     */
    private _setBackgroundStyles(background: DynamicPageBackgroundType): void {
        const hostElement = this._elementRef.nativeElement.querySelector('.fd-dynamic-page__content');
        switch (background) {
            case 'transparent':
                this._addClassNameToCustomElement(hostElement, CLASS_NAME.dynamicPageContentTransparentBg);
                break;
            case 'list':
                this._addClassNameToCustomElement(hostElement, CLASS_NAME.dynamicPageContentListBg);
                break;
            case 'solid':
            default:
                this._removeClassNameToHostElement(CLASS_NAME.dynamicPageContentTransparentBg);
                this._removeClassNameToHostElement(CLASS_NAME.dynamicPageContentListBg);
                break;
        }
    }

    /**
     * @hidden
     * sets the padding classes
     * @param sizeType
     */
    private _setSize(sizeType: DynamicPageResponsiveSize): void {
        const hostElement = this._elementRef.nativeElement.querySelector('.fd-dynamic-page__content');

        switch (sizeType) {
            case 'small':
                this._addClassNameToCustomElement(hostElement, CLASS_NAME.dynamicPageContentAreaSmall);
                break;
            case 'medium':
                this._addClassNameToCustomElement(hostElement, CLASS_NAME.dynamicPageContentAreaMedium);
                break;
            case 'large':
                this._addClassNameToCustomElement(hostElement, CLASS_NAME.dynamicPageContentAreaLarge);
                break;
            case 'extra-large':
            default:
                this._addClassNameToCustomElement(hostElement, CLASS_NAME.dynamicPageContentAreaExtraLarge);
                break;
        }
    }
    /**
     * get reference to this element
     */
    getElementRef(): ElementRef<HTMLElement> {
        return this._elementRef;
    }

    /**@hidden */
    private _removeClassNameToHostElement(className: string): void {
        this._renderer.removeClass(this._elementRef.nativeElement, className);
    }

    /**@hidden */
    private _addClassNameToCustomElement(element: Element, className: string): void {
        addClassNameToElement(this._renderer, element, className);
    }
}
