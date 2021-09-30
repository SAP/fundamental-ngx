import { Provider, forwardRef, Component, Input, ChangeDetectionStrategy } from '@angular/core';

import { InputType } from '../input/input.component';
import { INPUT_GROUP_CHILD_TOKEN } from './constants';

/**
 * fdp-input-group needs it's own input component to
 * register INPUT_GROUP_CHILD in order to render
 * input group content children in the order that they are placed
 *
 */

export const inputGroupInputChildProvider: Provider = {
    provide: INPUT_GROUP_CHILD_TOKEN,
    useExisting: forwardRef(() => InputGroupInputComponent)
};

/**
 * Fundamental input group input component
 *
 * This component is intended to be used inside `<fdp-input-group>`
 *
 * Example:
 * ```
 * <fdp-input-group name="group">
 *   <fdp-input-group-input type="email"></fdp-input-group-input>
 * </fdp-input-group>
 * ```
 *
 */
@Component({
    selector: 'fdp-input-group-input',
    template: '',
    providers: [inputGroupInputChildProvider],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class InputGroupInputComponent {
    /** InputType 'text' | 'number' | 'email' | 'password' */
    @Input()
    type: InputType = 'text';
}
