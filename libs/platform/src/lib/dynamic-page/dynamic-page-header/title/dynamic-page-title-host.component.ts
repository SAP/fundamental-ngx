import { FocusMonitor } from '@angular/cdk/a11y';

import {
    ChangeDetectionStrategy,
    Component,
    ElementRef,
    Input,
    NgZone,
    OnInit,
    Renderer2,
    ContentChild,
    ViewEncapsulation,
    AfterViewInit
} from '@angular/core';

import { DynamicPageBackgroundType, CLASS_NAME, DynamicPageResponsiveSize } from '../../constants';
import { DynamicPageService } from '../../dynamic-page.service';
import { addClassNameToElement, removeClassNameFromElement } from '../../utils';

/**
 * The Title Host Component.
 * Adds some styles to title host element.
 * For internal usage only.
 *
 */

@Component({
    selector: 'fdp-dynamic-page-title-host',
    template: '<ng-content></ng-content>',
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None
})
export class DynamicPageTitleHostComponent implements OnInit, AfterViewInit {
    /**
     * sets background for content to `list`, `transparent`, or `solid` background color.
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

    /** @hidden */
    @ContentChild('actionsContainer')
    _actionsContainer: ElementRef<any>;

    /** @hidden */
    @ContentChild('breadcrumbTitleContainer')
    set setBreadcrumbTitleContainer(elementRef: ElementRef<HTMLElement>) {
        if (!elementRef) {
            return;
        }
        elementRef.nativeElement.style.overflow = 'hidden';
    }

    /** @hidden */
    _globalActionsContainer: ElementRef<HTMLElement> | undefined;
    /** @hidden */
    _globalActionsToolbarEl: HTMLElement | undefined | null;

    /** @hidden */
    @ContentChild('globalActionsContainer')
    set _setGlobalActionsContainer(globalActionsContainer: ElementRef<HTMLElement>) {
        this._globalActionsContainer = globalActionsContainer;
        if (!globalActionsContainer) {
            return;
        }
        this._globalActionsToolbarEl = globalActionsContainer.nativeElement.querySelector<HTMLElement>('.fd-toolbar');
        if (this._globalActionsToolbarEl) {
            addClassNameToElement(this._renderer, this._globalActionsToolbarEl, CLASS_NAME.dynamicPageGlobalActions);
        }
    }

    /** @hidden */
    _layoutActionsContainer: ElementRef<HTMLElement> | undefined;
    /** @hidden */
    _layoutActionsToolbarEl: HTMLElement | undefined | null;

    /** @hidden */
    @ContentChild('layoutActionsContainer')
    set _setLayoutActionsContainer(layoutActionsContainer: ElementRef<HTMLElement>) {
        this._layoutActionsContainer = layoutActionsContainer;
        if (!layoutActionsContainer) {
            return;
        }
        this._layoutActionsToolbarEl = layoutActionsContainer.nativeElement.querySelector<HTMLElement>('.fd-toolbar');
        if (this._layoutActionsToolbarEl) {
            addClassNameToElement(this._renderer, this._layoutActionsToolbarEl, CLASS_NAME.dynamicPageLayoutActions);
        }
    }

    /** @hidden */
    @ContentChild('titleRef')
    _titleRef: ElementRef<any>;

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

        this._addClassesToBreadcrumb();

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
    private _setBackgroundStyles(background: DynamicPageBackgroundType): void {
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
                if (this._titleRef) {
                    this._addClassNameToCustomElement(this._titleRef.nativeElement, CLASS_NAME.dynamicPageTitleMedium);
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

        this._setToolbarsSize(sizeType);
    }

    /** @hidden */
    private _setToolbarsSize(sizeType: DynamicPageResponsiveSize): void {
        const actionsContainer = this._actionsContainer?.nativeElement;
        const globalActionsToolbar = this._globalActionsToolbarEl;
        const layoutActionsToolbar = this._layoutActionsToolbarEl;
        const globalActionsContainerEl = this._globalActionsContainer?.nativeElement;
        const layoutActionsContainerEl = this._layoutActionsContainer?.nativeElement;

        switch (sizeType) {
            case 'small':
                if (globalActionsToolbar) {
                    this._addClassNameToCustomElement(
                        globalActionsToolbar,
                        CLASS_NAME.dynamicPageGlobalActionsToolbarSmall
                    );
                }
                break;
            case 'medium':
                if (actionsContainer) {
                    this._addClassNameToCustomElement(actionsContainer, CLASS_NAME.dynamicPageActionsContainerMedium);
                    if (globalActionsContainerEl) {
                        globalActionsContainerEl.style.order = '2';
                    }

                    if (layoutActionsContainerEl) {
                        layoutActionsContainerEl.style.order = '1';
                    }
                }
                if (globalActionsToolbar) {
                    this._addClassNameToCustomElement(
                        globalActionsToolbar,
                        CLASS_NAME.dynamicPageGlobalActionsToolbarMedium
                    );
                }
                if (layoutActionsToolbar) {
                    this._addClassNameToCustomElement(
                        layoutActionsToolbar,
                        CLASS_NAME.dynamicPageLayoutActionsToolbarMedium
                    );
                }
                break;
            case 'large':
            case 'extra-large':
            default:
                break;
        }
    }

    /** @hidden */
    private _addClassesToBreadcrumb(): void {
        const breadcrumb = this._elementRef.nativeElement.querySelector('fd-breadcrumb');
        if (breadcrumb) {
            this._addClassNameToCustomElement(breadcrumb, CLASS_NAME.dynamicPageBreadcrumb);
        }
    }

    /** @hidden */
    private _setAttributeToHostElement(attribute: string, value: any): void {
        this._renderer.setAttribute(this._elementRef.nativeElement, attribute, value);
    }

    /** @hidden */
    private _addClassNameToHostElement(className: string): void {
        addClassNameToElement(this._renderer, this._elementRef.nativeElement, className);
    }

    /** @hidden */
    private _addClassNameToCustomElement(element: Element, className: string): void {
        addClassNameToElement(this._renderer, element, className);
    }
}
