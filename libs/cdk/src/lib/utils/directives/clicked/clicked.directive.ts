import { Directive, EventEmitter, Output } from '@angular/core';
import { Observable } from 'rxjs';

@Directive({
    selector: '[fdClicked]'
})
export class ClickedDirective {
    /**
     * FnClicked output. Sole purpose of existence of this directive is to just silence Angular Language Service.
     * This is only viable solution, since NO_ERRORS_SCHEMA silences everything and valuable exception might slip
     * through your eyes.
     */
    @Output() fnClicked: Observable<MouseEvent | KeyboardEvent> = new EventEmitter();
}
