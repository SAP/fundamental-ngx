import { ChangeDetectionStrategy, Component, HostBinding, ViewEncapsulation } from '@angular/core';

/**
 * Represents a form group element.
 *
 * ```html
 * <fd-form-group>
 *     <div fd-form-item [isCheck]="true">
 *         <input fd-form-control type="radio" checked>
 *         <fd-form-label>Option One</fd-form-label>
 *     </div>
 * </fd-form-group>
 * ```
 */
@Component({
    selector: 'fd-form-group',
    templateUrl: './form-group.component.html',
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['./form-group.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormGroupComponent {

    /** @hidden */
    @HostBinding('class.fd-form-group')
    fdFormGroupClass: boolean = true;
}
