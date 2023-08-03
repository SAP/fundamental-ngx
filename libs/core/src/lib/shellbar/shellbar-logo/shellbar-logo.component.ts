import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

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
    templateUrl: './shellbar-logo.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true
})
export class ShellbarLogoComponent {}
