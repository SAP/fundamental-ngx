import { NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation } from '@angular/core';
import { Nullable } from '@fundamental-ngx/cdk/utils';

/**
 * The component that represents a shellbar logo.
 * The logo is a required element and is used for company branding.
 * ```html
 *   <fd-shellbar-logo>
 *      <a href="#" class="fd-shellbar__logo fd-shellbar__logo--image-replaced" aria-label="SAP"></a>
 *   </fd-shellbar-logo>
 * ```
 */
@Component({
    selector: 'fd-shellbar-logo',
    template: `
        <span class="fd-shellbar__logo">
            @if (src) {
                <img [ngSrc]="src" [srcset]="srcset" [width]="width" [height]="height" [alt]="alt" />
            } @else {
                <ng-content></ng-content>
            }
        </span>
    `,
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [NgOptimizedImage],
    standalone: true
})
export class ShellbarLogoComponent {
    /** Source of the logo image */
    @Input() src: Nullable<string>;

    /** Srcset for responsive images */
    @Input()
    srcset: Nullable<string>;

    /** Width of the logo */
    @Input() width: Nullable<number | string>;

    /** Height of the logo */
    @Input() height: Nullable<number | string>;

    /** Alt text for the image */
    @Input() alt: Nullable<string>;
}
