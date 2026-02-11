import { Directive, input } from '@angular/core';
import { ButtonType } from '@fundamental-ngx/core/button';
import { ButtonTypeGuard } from './button-type-guard';

@Directive({
    selector: '[fd-button][fdbToolHeaderButton]'
})
export class ToolHeaderButtonDirective extends ButtonTypeGuard {
    /** Type of the button. In case of fdbToolHeaderButton it is always a `tool-header` */
    readonly fdType = input('tool-header' as ButtonType);
}
