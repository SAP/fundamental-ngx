import { Directive, effect, ElementRef, inject, Renderer2 } from '@angular/core';
import { GlobalContentDensityService } from '../services/global-content-density.service';
import { ContentDensityMode } from '../types/content-density.mode';

/**
 * Directive that applies UI5 Web Components content density markers to a container element.
 *
 * UI5 Web Components look up the DOM tree for `data-ui5-compact-size` attribute.
 * This directive listens to the GlobalContentDensityService and applies the attribute
 * to its host element when the density is compact or condensed.
 *
 * Use this directive on container elements that wrap UI5 Web Component wrappers
 * to enable them to respond to fundamental-ngx content density changes.
 *
 * @example
 * <div fdUi5ContentDensity>
 *   <ui5-button>UI5 Button</ui5-button>
 *   <ui5-input></ui5-input>
 * </div>
 */
@Directive({
    selector: '[fdUi5ContentDensity]'
})
export class Ui5ContentDensityDirective {
    private readonly _globalContentDensityService = inject(GlobalContentDensityService, { optional: true });
    private readonly _renderer = inject(Renderer2);
    private readonly _elementRef = inject(ElementRef);

    constructor() {
        if (this._globalContentDensityService) {
            effect(() => {
                const density = this._globalContentDensityService!.currentDensitySignal();
                this._applyUi5Marker(density);
            });
        }
    }

    private _applyUi5Marker(density: ContentDensityMode): void {
        const nativeElement = this._elementRef.nativeElement;
        const ui5CompactAttribute = 'data-ui5-compact-size';

        // UI5 only has cozy (default) and compact modes
        // Map: COMPACT -> compact, CONDENSED -> compact, COZY -> remove attribute
        const isUi5Compact = density === ContentDensityMode.COMPACT || density === ContentDensityMode.CONDENSED;

        if (isUi5Compact) {
            this._renderer.setAttribute(nativeElement, ui5CompactAttribute, '');
        } else {
            this._renderer.removeAttribute(nativeElement, ui5CompactAttribute);
        }
    }
}
