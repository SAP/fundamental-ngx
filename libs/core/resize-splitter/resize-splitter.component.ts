import { Component, inject, ViewEncapsulation } from '@angular/core';
import { SplitterDirective } from '@fundamental-ngx/cdk/utils';
import { IconComponent } from '@fundamental-ngx/core/icon';

/**
 * A styled, accessible resize separator. Renders the grip affordance and applies the
 * cdk `fdkSplitter` behaviour/ARIA via `hostDirectives`, so all of `fdkSplitter`'s
 * inputs/outputs (`size`, `min`, `max`, `step`, `largeStep`, `grows`, `defaultSize`,
 * `orientation`, `disabled`, `sizeChange`, `resizeStart`, `resizeEnd`) are available on
 * `<fd-resize-splitter>`.
 *
 * Set `aria-label` on `<fd-resize-splitter>` so the `role="separator"` has an accessible
 * name — neither the component nor the directive can know what it resizes.
 */
@Component({
    selector: 'fd-resize-splitter',
    template: `
        <span class="fd-resize-splitter__line-before" aria-hidden="true"></span>
        <span class="fd-resize-splitter__grip" aria-hidden="true">
            <fd-icon class="fd-resize-splitter__grip-icon" glyph="vertical-grip" [ariaHidden]="true" />
        </span>
        <span class="fd-resize-splitter__line-after" aria-hidden="true"></span>
    `,
    styleUrl: './resize-splitter.component.scss',
    encapsulation: ViewEncapsulation.None,
    imports: [IconComponent],
    hostDirectives: [
        {
            directive: SplitterDirective,
            inputs: ['orientation', 'size', 'min', 'max', 'step', 'largeStep', 'grows', 'defaultSize', 'disabled'],
            outputs: ['sizeChange', 'resizeStart', 'resizeEnd']
        }
    ],
    host: {
        class: 'fd-resize-splitter',
        '[class.fd-resize-splitter--horizontal]': "splitter.orientation() === 'horizontal'"
    }
})
export class ResizeSplitterComponent {
    /** @hidden Host directive instance, used to react to orientation for styling. */
    protected readonly splitter = inject(SplitterDirective);
}
