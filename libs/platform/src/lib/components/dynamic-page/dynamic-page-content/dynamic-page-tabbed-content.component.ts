import {
    ChangeDetectionStrategy,
    Component,
    ElementRef,
    Renderer2,
    Input,
    ViewEncapsulation,
    AfterViewInit,
    OnDestroy
} from '@angular/core';
import { fromEvent, Subscription } from 'rxjs';
import { debounceTime, throttleTime } from 'rxjs/operators';

import { DynamicPageBackgroundType, DynamicPageResponsiveSize, CLASS_NAME } from '../constants';
import { DynamicPageService } from '../dynamic-page.service';
import { addClassNameToElement } from '../utils';

@Component({
    selector: 'fdp-dynamic-page-tabbed-content',
    template: `<div class="fd-dynamic-page__content content-sticker">
        <ng-content></ng-content>
    </div>`,
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None
})
export class DynamicPageTabbedContentComponent implements AfterViewInit, OnDestroy {
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

    /** @hidden */
    private _subscriptions: Subscription = new Subscription();

    /** @hidden */
    constructor(
        public _elementRef: ElementRef<HTMLElement>,
        public _renderer: Renderer2,
        private _dynamicPageService: DynamicPageService
    ) {}

    /** @hidden */
    ngAfterViewInit(): void {
        const hostElement = this._elementRef.nativeElement.querySelector('.fd-dynamic-page__content');

        this._subscriptions.add(fromEvent(hostElement, 'scroll')
            .pipe(debounceTime(20), throttleTime(20))
            .subscribe(() => {
                if (hostElement.scrollTop > 0) {
                    this._dynamicPageService.collapseHeader();
                } else {
                    this._dynamicPageService.expandHeader();
                }
            }));
    }

    /** @hidden */
    ngOnDestroy(): void {
        this._subscriptions.unsubscribe();
    }

    /**
     * get reference to this element
     */
    getElementRef(): ElementRef<HTMLElement> {
        return this._elementRef;
    }

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

    /**@hidden */
    private _removeClassNameToHostElement(className: string): void {
        this._renderer.removeClass(this._elementRef.nativeElement, className);
    }

    /**@hidden */
    private _addClassNameToCustomElement(element: Element, className: string): void {
        addClassNameToElement(this._renderer, element, className);
    }
}
