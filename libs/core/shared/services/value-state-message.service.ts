import { Injectable } from '@angular/core';

/**
 *
 * This service holds default
 * value state aria messages
 * that are needed for accessibility purposes.
 *
 * It's intendant to be used with form controls
 * which supports different value states
 *
 */
@Injectable({
    providedIn: 'root'
})
export class ValueStateAriaMessageService {
    /** Value state "success" message */
    readonly success = 'Value State Success';

    /** Value state "information" message */
    readonly information = 'Value State Information';

    /** Value state "warning" message */
    readonly warning = 'Value State Warning';

    /** Value state "error" message */
    readonly error = 'Value State Error';
}
