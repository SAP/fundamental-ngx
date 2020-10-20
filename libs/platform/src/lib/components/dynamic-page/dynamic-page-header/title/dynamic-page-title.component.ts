import { FocusMonitor } from '@angular/cdk/a11y';

import {
    AfterViewInit,
    ChangeDetectionStrategy,
    Component,
    ElementRef,
    Input,
    NgZone,
    OnInit,
    Renderer2,
    ViewChild,
    ViewEncapsulation
} from '@angular/core';

import { DynamicPageBackgroundType, CLASS_NAME, DynamicPageResponsiveSize } from '../../constants';
import { DynamicPageService } from '../../dynamic-page.service';
import { addClassNameToElement, removeClassNameFromElement } from '../../utils';

@Component({
    selector: 'fdp-dynamic-page-title',
    templateUrl: './dynamic-page-title.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None
})
export class DynamicPageTitleComponent implements OnInit, AfterViewInit {
    @Input()
    title: string;

    @Input()
    subtitle: string;

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
     * the reference to breadcrumb title container
     */
    @ViewChild('breadcrumbTitleContainer')
    breadcrumbTitleContainer: ElementRef<HTMLElement>;

    /**
     * @hidden
     * the reference to the title element
     */
    @ViewChild('titleRef')
    titleRef: ElementRef<any>;

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
    constructor(
        private _elementRef: ElementRef<HTMLElement>,
        private _renderer: Renderer2,
        private _focusMonitor: FocusMonitor,
        private _dynamicPageService: DynamicPageService,
        private _ngZone: NgZone
    ) {}

    /** @hidden */
    ngOnInit(): void {
        this._addClassNameToHostElement(CLASS_NAME.dynamicPageTitleArea);
        this._setAttributeToHostElement('tabindex', 0);
    }

    /** @hidden */
    ngAfterViewInit(): void {
        this._focusMonitor.monitor(this._elementRef).subscribe((origin) =>
            this._ngZone.run(() => {
                if (origin === 'keyboard') {
                    this._dynamicPageService.expandHeader();
                }
            })
        );

        const breadcrumb = this._elementRef.nativeElement.querySelector('fd-breadcrumb');
        if (breadcrumb) {
            this._addClassNameToCustomElement(breadcrumb, CLASS_NAME.dynamicPageBreadcrumb);
            this.breadcrumbTitleContainer.nativeElement.style.overflow = 'hidden';
        }

        if (this.background) {
            this._setBackgroundStyles(this.background);
        }

        if (this.size) {
            this._setSize(this.size);
        }
    }

    /**
     * get reference to this element
     */
    elementRef(): ElementRef<HTMLElement> {
        return this._elementRef;
    }

    /**
     * @hidden
     * sets the style classes for background property
     * @param background
     */
    private _setBackgroundStyles(background: DynamicPageBackgroundType): any {
        switch (background) {
            case 'transparent':
                this._addClassNameToHostElement(CLASS_NAME.dynamicPageTitleAreaTransparentBg);
                break;
            case 'list':
            case 'solid':
            default:
                removeClassNameFromElement(
                    this._renderer,
                    this._elementRef.nativeElement,
                    CLASS_NAME.dynamicPageTitleAreaTransparentBg
                );
                break;
        }
    }

    /**
     * @hidden
     * sets the padding classes
     * @param sizeType
     */
    private _setSize(sizeType: DynamicPageResponsiveSize): any {
        switch (sizeType) {
            case 'small':
                this._addClassNameToHostElement(CLASS_NAME.dynamicPageTitleAreaSmall);
                break;
            case 'medium':
                this._addClassNameToHostElement(CLASS_NAME.dynamicPageTitleAreaMedium);
                if (this.titleRef) {
                    this._addClassNameToCustomElement(this.titleRef.nativeElement, CLASS_NAME.dynamicPageTitleMedium);
                }
                break;
            case 'large':
                this._addClassNameToHostElement(CLASS_NAME.dynamicPageTitleAreaLarge);
                break;
            case 'extra-large':
            default:
                this._addClassNameToHostElement(CLASS_NAME.dynamicPageTitleAreaExtraLarge);
                break;
        }
    }

    /**@hidden */
    private _setAttributeToHostElement(attribute: string, value: any): void {
        this._renderer.setAttribute(this._elementRef.nativeElement, attribute, value);
    }

    /**@hidden */
    private _addClassNameToHostElement(className: string): void {
        addClassNameToElement(this._renderer, this._elementRef.nativeElement, className);
    }

    /**@hidden */
    private _addClassNameToCustomElement(element: Element, className: string): void {
        addClassNameToElement(this._renderer, element, className);
    }
}
