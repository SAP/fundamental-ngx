import { Directive } from '@angular/core';

@Directive({
    selector: '[fdMicroProcessFlowIntermediaryItem], [fd-micro-process-flow-intermediary-item]',
    host: {
        class: 'fd-micro-process-flow__intermediary-item'
    },
    standalone: true
})
export class MicroProcessFlowIntermediaryItemDirective {}
