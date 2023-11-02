import { Directive, Input } from '@angular/core';
import { ButtonTypeGuard } from './button-type-guard';

@Directive({
    selector: '[fd-button][fdbToolHeaderButton]',
    standalone: true
})
export class ToolHeaderButtonDirective extends ButtonTypeGuard {
    /** Type of the button. In case of fdbToolHeaderButton it is always a `tool-header` */
    @Input()
    fdType: 'tool-header' = 'tool-header' as const;
}
