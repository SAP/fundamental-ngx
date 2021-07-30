import { AfterViewInit, Directive, Input, Optional } from '@angular/core';

import { DialogConfig } from '../utils/dialog-config.class';

let titleUniqueId = 1;

@Directive({
    // tslint:disable-next-line:directive-selector
    selector: '[fd-dialog-title]',
    host: {
        '[attr.id]': 'id'
    }
})
export class DialogTitleDirective implements AfterViewInit {
    /** Title ID attribute, generated automatically if not provided */
    @Input()
    id = `fd-dialog-title-` + titleUniqueId++;

    /** @hidden */
    constructor(@Optional() public dialogConfig: DialogConfig) { }

    /** @hidden */
    ngAfterViewInit(): void {
        if (this.dialogConfig && !this.dialogConfig.ariaLabelledBy) {
            this.dialogConfig.ariaLabelledBy = this.id;
        }
    }
}
