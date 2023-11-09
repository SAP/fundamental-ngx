import { Directive } from '@angular/core';

/**
 * The component that represents a shellbar logo.
 * The logo is a required element and is used for company branding.
 * ```html
 *   <fd-shellbar-logo>
 *      <a href="#" class="fd-shellbar__logo fd-shellbar__logo--image-replaced" aria-label="SAP"></a>
 *   </fd-shellbar-logo>
 * ```
 */
@Directive({
    // eslint-disable-next-line @angular-eslint/directive-selector
    selector: 'fd-shellbar-logo',
    standalone: true
})
// eslint-disable-next-line @angular-eslint/directive-class-suffix
export class ShellbarLogoComponent {}
