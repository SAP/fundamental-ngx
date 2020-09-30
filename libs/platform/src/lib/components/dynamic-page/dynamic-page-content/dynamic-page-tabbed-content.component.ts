import { CdkScrollable, ScrollDispatcher } from '@angular/cdk/scrolling';
import {
    ChangeDetectionStrategy,
    Component,
    ElementRef,
    forwardRef,
    NgZone,
    Renderer2,
    ViewChild,
    Input
} from '@angular/core';
import { DYNAMIC_PAGE_CHILD_TOKEN, BACKGROUND_TYPE, RESPONSIVE_SIZE, CLASS_NAME } from '../constants';
import { DynamicPageService } from '../dynamic-page.service';
import { addClassNameToElement } from '../utils';

@Component({
    selector: 'fdp-dynamic-page-tabbed-content',
    template: '<div class="fd-dynamic-page__content"><ng-content></ng-content></div>',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
        {
            provide: DYNAMIC_PAGE_CHILD_TOKEN,
            useExisting: forwardRef(() => DynamicPageTabbedContentComponent)
        }
    ]
})
export class DynamicPageTabbedContentComponent extends CdkScrollable {
    @ViewChild(CdkScrollable)
    cdkScrollable: CdkScrollable;

    /**
     * tracking the background value
     */
    _background: BACKGROUND_TYPE;

    /**
     * sets background for content to List, Transparent or Solid background color.
     * Default is `solid`.
     */
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

    /**
     * tracks the size for responsive padding
     */
    _size: RESPONSIVE_SIZE;

    /**
     * sets size which in turn adds corresponding padding for the size type.
     * size can be `small`, `medium`, `large`, or `extra-large`.
     */
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

    constructor(
        public _elementRef: ElementRef<HTMLElement>,
        public _renderer: Renderer2,
        public scrollDispatcher: ScrollDispatcher,
        public zone: NgZone,
        public _dynamicPageService: DynamicPageService
    ) {
        super(_elementRef, scrollDispatcher, zone);
    }

    /**
     * sets the style classes for background property
     * @param background
     */
    _setBackgroundStyles(background: BACKGROUND_TYPE): any {
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
     * sets the padding classes
     * @param sizeType
     */
    _setSize(sizeType: RESPONSIVE_SIZE): any {
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

    /**@hidden */
    protected _removeClassNameToHostElement(className: string): void {
        this._renderer.removeClass(this._elementRef.nativeElement, className);
    }
    /**@hidden */
    protected _setAttributeToHostElement(attribute: string, value: any): void {
        this._renderer.setAttribute(this._elementRef.nativeElement, attribute, value);
    }
    /**@hidden */
    protected _setStyleToHostElement(attribute: string, value: any): void {
        this._renderer.setStyle(this._elementRef.nativeElement, attribute, value);
    }

    /**@hidden */
    private _addClassNameToCustomElement(element: Element, className: string): void {
        addClassNameToElement(this._renderer, element, className);
    }
}
