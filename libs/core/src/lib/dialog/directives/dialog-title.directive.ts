import { AfterViewInit, Directive, Input, Optional } from '@angular/core';

import { DialogConfig } from '../utils/dialog-config.class';

let titleUniqueId = 1;

@Directive({
    // eslint-disable-next-line @angular-eslint/directive-selector
    selector: '[fd-dialog-title]',
    host: {
        '[attr.id]': 'id'
    },
    standalone: true
})
export class DialogTitleDirective implements AfterViewInit {
    /** Title ID attribute, generated automatically if not provided */
    @Input()
    id = `fd-dialog-title-` + titleUniqueId++;

    /** @hidden */
    constructor(@Optional() public dialogConfig: DialogConfig) {}

    /** @hidden */
    ngAfterViewInit(): void {
        if (this.dialogConfig && !this.dialogConfig.ariaLabelledBy) {
            this.dialogConfig.ariaLabelledBy = this.id;
        }
    }
}
