import { AfterViewInit, Component, ElementRef, inject, signal, ViewChild } from '@angular/core';
import { DisabledBehaviorDirective, TabbableElementService } from '@fundamental-ngx/cdk/utils';
import { ButtonComponent } from '@fundamental-ngx/core/button';

@Component({
    selector: 'fdk-tabbable-default-example',
    templateUrl: './tabbable-default-example.component.html',
    imports: [ButtonComponent, DisabledBehaviorDirective]
})
export class TabbableDefaultExampleComponent implements AfterViewInit {
    @ViewChild('section')
    section: ElementRef<HTMLElement>;

    /**
     * Class name(s) of the currently detected tabbable element.
     * Populated after view init once host bindings have been applied.
     */
    readonly tabbableElementClass = signal('');

    tabbableElementService = inject(TabbableElementService);

    ngAfterViewInit(): void {
        this._updateTabbableClass();

        // Run a second pass after the current render cycle to catch deferred host updates.
        // DisabledBehaviorDirective applies host bindings (disabled attribute, is-disabled class)
        // in a deferred manner, so the initial ngAfterViewInit pass may detect buttons before
        // their disabled state is fully reflected in the DOM.
        queueMicrotask(() => this._updateTabbableClass());
    }

    private _updateTabbableClass(): void {
        const rootElement = this.section.nativeElement;
        const tabbableElement = this.tabbableElementService.getTabbableElement(rootElement, false, true);

        this.tabbableElementClass.set(tabbableElement?.getAttribute('class') ?? '');
    }
}
