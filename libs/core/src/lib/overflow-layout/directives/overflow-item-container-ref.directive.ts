import { Directive, ElementRef, TemplateRef, ViewContainerRef, ViewRef, OnDestroy } from '@angular/core';

/**
 * Directive to hide component without actual destroying of the component instance.
 */
@Directive({
    selector: '[fdOverflowItemContainerRef]',
    standalone: true
})
export class OverflowItemContainerRefDirective implements OnDestroy {
    /** @hidden */
    private _viewRef: ViewRef;

    /** @hidden */
    private _detached = false;

    /** @hidden */
    private _hidden = false;

    /**
     * Shows or hides element without destroying the view itself.
     * @param value
     */
    set hidden(value: boolean) {
        if (this._hidden === value) {
            return;
        }
        this._hidden = value;
        if (value && !this._detached) {
            this._viewRef = this._viewContainerRef.detach()!;
            this._detached = true;
        } else if (!value && this._viewRef && !this._viewRef.destroyed && this._detached) {
            this._viewRef = this._viewContainerRef.insert(this._viewRef);
            this._detached = false;
        }
    }

    /** @hidden */
    constructor(
        private _templateRef: TemplateRef<any>,
        private _viewContainerRef: ViewContainerRef,
        private _elmRef: ElementRef
    ) {
        // Create embedded view right away and manipulate its visibility later.
        this._viewContainerRef.createEmbeddedView(this._templateRef);
    }

    /** @hidden */
    ngOnDestroy(): void {
        this._viewRef?.destroy();
    }
}
