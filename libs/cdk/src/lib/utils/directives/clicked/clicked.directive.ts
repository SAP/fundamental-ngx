import { Directive, EventEmitter, Output } from '@angular/core';

@Directive({
    selector: '[fdkClicked]'
})
export class ClickedDirective {
    /**
     * Event name.
     */
    static eventName = 'fdkClicked';
    /**
     * FdkClicked output. The sole purpose of the existence of this directive is to just silence Angular Language Service.
     * This is the only viable solution, since NO_ERRORS_SCHEMA silences everything and valuable exception might slip
     * through your eyes.
     */
    @Output() fdkClicked = new EventEmitter<MouseEvent | KeyboardEvent>();
}
