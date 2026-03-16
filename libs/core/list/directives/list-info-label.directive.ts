import { Directive } from '@angular/core';

@Directive({
    selector: '[fd-list-info-label], [fdListInfoLabel]',
    host: {
        class: 'fd-list__info-label'
    }
})
export class ListInfoLabelDirective {}
