import { Directive, ElementRef, inject, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

/**
 * Enables in-app (SPA) navigation for `[routerLink]` on UI5 wrapper components.
 *
 * UI5 replaces the native click with a `CustomEvent` that has no `button` property.
 * Angular's `RouterLink` reads `event.button`, gets `undefined`, and bails — leaving
 * the shadow `<a href>` to navigate natively. This directive intercepts the event in
 * capture phase, handles plain left-clicks via `router.navigateByUrl()`, and blocks
 * RouterLink from seeing modifier/middle clicks via `stopImmediatePropagation()`.
 *
 * Applied automatically via `hostDirectives` on generated wrappers with an `href` input.
 * See `libs/webc-generator/src/executors/generate/component-template.ts`.
 */
@Directive({
    selector: '[ui5RouterLinkBridge]'
})
export class Ui5RouterLinkBridgeDirective implements OnInit {
    private readonly _router = inject(Router);
    private readonly _routerLink = inject(RouterLink, { optional: true, self: true });
    private readonly _elementRef = inject(ElementRef<HTMLElement>);

    ngOnInit(): void {
        const routerLink = this._routerLink;
        if (!routerLink) {
            return;
        }
        this._elementRef.nativeElement.addEventListener('click', (event: Event) => {
            this._handleClick(event as CustomEvent, routerLink);
        }, true);
    }

    private _handleClick(event: CustomEvent, routerLink: RouterLink): void {
        const detail = event.detail ?? {};
        const button = detail.button ?? 0;
        const isModified = detail.ctrlKey || detail.metaKey || detail.shiftKey || detail.altKey;

        if (button !== 0 || isModified) {
            // Prevent RouterLink from seeing this event — RouterLink reads event.button as
            // undefined on UI5 CustomEvents and would navigate regardless of modifier state.
            event.stopImmediatePropagation();
            return;
        }

        const urlTree = routerLink.urlTree;
        if (urlTree === null) {
            return;
        }

        event.preventDefault();
        this._router.navigateByUrl(urlTree);
    }
}
