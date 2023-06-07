import { ChangeDetectionStrategy, Component, ElementRef, HostBinding, Input, OnInit, Renderer2 } from '@angular/core';

import { DynamicPageBackgroundType, CLASS_NAME, DynamicPageResponsiveSize } from '../constants';
import { addClassNameToElement } from '../utils';

/**
 * Dynamic Page Content Host Component.
 *
 * Adds some styles to host element.
 * For internal usage only.
 *
 */

@Component({
    selector: 'fdp-dynamic-page-content-host',
    template: '<ng-content></ng-content>',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DynamicPageContentHostComponent implements OnInit {
    /**
     * a unique identifier for this content
     */
    @Input()
    @HostBinding('attr.id')
    id: string;

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
    constructor(public readonly elementRef: ElementRef<HTMLElement>, protected _renderer: Renderer2) {}

    /** @hidden */
    ngOnInit(): void {
        this._addClassNameToHostElement(CLASS_NAME.dynamicPageContent);

        this._addClassNameToHostElement('content-sticker');

        if (this.background) {
            this._setBackgroundStyles(this.background);
        }

        if (this.size) {
            this._setSize(this.size);
        }
    }

    /**
     * @hidden
     * sets the style classes for background property
     * @param background
     */
    private _setBackgroundStyles(background: DynamicPageBackgroundType): void {
        switch (background) {
            case 'transparent':
                this._addClassNameToHostElement(CLASS_NAME.dynamicPageContentTransparentBg);
                break;
            case 'list':
                this._addClassNameToHostElement(CLASS_NAME.dynamicPageContentListBg);
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
        switch (sizeType) {
            case 'small':
                this._addClassNameToHostElement(CLASS_NAME.dynamicPageContentAreaSmall);
                break;
            case 'medium':
                this._addClassNameToHostElement(CLASS_NAME.dynamicPageContentAreaMedium);
                break;
            case 'large':
                this._addClassNameToHostElement(CLASS_NAME.dynamicPageContentAreaLarge);
                break;
            case 'extra-large':
            default:
                this._addClassNameToHostElement(CLASS_NAME.dynamicPageContentAreaExtraLarge);
                break;
        }
    }

    /** @hidden */
    private _removeClassNameToHostElement(className: string): void {
        this._renderer.removeClass(this.elementRef.nativeElement, className);
    }

    /** @hidden */
    private _addClassNameToHostElement(className: string): void {
        addClassNameToElement(this._renderer, this.elementRef.nativeElement, className);
    }
}
