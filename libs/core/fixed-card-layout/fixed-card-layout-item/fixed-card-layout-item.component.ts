import { FocusableOption } from '@angular/cdk/a11y';
import { afterNextRender, ChangeDetectionStrategy, Component, ElementRef, inject, signal } from '@angular/core';

@Component({
    selector: 'fd-fixed-card-layout-item',
    template: `<ng-content></ng-content>`,
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        '[style.display]': '"block"'
    }
})
export class FixedCardLayoutItemComponent implements FocusableOption {
    /** Card title ID for aria-labelledby, or undefined if no title is present */
    readonly cardTitleId = signal<string | undefined>(undefined);

    /** @hidden */
    private _elementRef = inject(ElementRef);

    /** @hidden */
    constructor() {
        afterNextRender(() => {
            // Query the DOM for the card title element after render
            const titleElement = this._elementRef.nativeElement.querySelector('[fd-card-title]') as HTMLElement;
            const titleId = titleElement?.getAttribute('id');
            this.cardTitleId.set(titleId || undefined);
        });
    }

    /** Set focus on the element. */
    focus(): void {
        const header = this._elementRef.nativeElement.querySelector('.fd-card__header');
        if (header) {
            header.focus();
        }
    }
}
