import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MicroProcessFlowModule } from '@fundamental-ngx/core/micro-process-flow';

@Component({
    selector: 'fd-micro-process-flow-independent-items-example',
    templateUrl: './micro-process-flow-independent-items-example.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [MicroProcessFlowModule]
})
export class MicroProcessFlowIndependentItemsExampleComponent {}
