import { afterNextRender, Component, DestroyRef, ElementRef, inject, signal, viewChild } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { resizeObservable } from '@fundamental-ngx/cdk/utils';
import { TooltipDirective } from '@fundamental-ngx/core/tooltip';

@Component({
    selector: 'fd-tooltip-truncation-example',
    templateUrl: './tooltip-truncation-example.component.html',
    styles: [
        `
            .fd-tooltip-truncation-example {
                width: 10rem;
                min-width: 3rem;
                max-width: 100%;
                padding: 0.5rem;
                border: 1px dashed var(--sapGroup_ContentBorderColor);
                overflow: hidden;
                resize: horizontal;
            }

            .fd-tooltip-truncation-example__text {
                display: block;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
            }
        `
    ],
    imports: [TooltipDirective]
})
export class TooltipTruncationExampleComponent {
    protected readonly truncated = signal(false);

    private readonly _text = viewChild.required<ElementRef<HTMLElement>>('text');

    private readonly _destroyRef = inject(DestroyRef);

    constructor() {
        afterNextRender(() => {
            const element = this._text().nativeElement;
            resizeObservable(element)
                .pipe(takeUntilDestroyed(this._destroyRef))
                .subscribe(() => this.truncated.set(element.scrollWidth > element.clientWidth));
        });
    }
}
