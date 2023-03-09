import { Directive, OnDestroy, TemplateRef, ViewContainerRef, ViewRef } from '@angular/core';

@Directive({
    selector: '[fdpSettingsGeneratorSection]'
})
export class SettingsGeneratorSectionDirective implements OnDestroy {
    /** @hidden */
    private _viewRef: ViewRef | null;

    /** @hidden */
    private _detached = false;

    /** @hidden */
    private _hidden = true;

    /** @hidden */
    private _embeddedViewCreated = false;

    /**
     * Shows or hides element without destroying the view itself.
     * @param value
     */
    set hidden(value: boolean) {
        if (this._hidden === value) {
            return;
        }
        this._hidden = value;

        if (!this._hidden && !this._embeddedViewCreated) {
            this._viewContainerRef.createEmbeddedView(this._templateRef);
            this._embeddedViewCreated = true;
        }

        if (value && !this._detached) {
            this._viewRef = this._viewContainerRef.detach();
            this._detached = true;
        } else if (!value && this._viewRef && !this._viewRef.destroyed && this._detached) {
            this._viewRef = this._viewContainerRef.insert(this._viewRef);
            this._detached = false;
        }
    }

    /** @hidden */
    constructor(private _templateRef: TemplateRef<any>, private _viewContainerRef: ViewContainerRef) {
        this._viewContainerRef.createEmbeddedView(this._templateRef);
        this._embeddedViewCreated = true;
        this._viewRef = this._viewContainerRef.detach();
        this._detached = true;
    }

    /** @hidden */
    ngOnDestroy(): void {
        this._viewRef?.destroy();
    }
}
