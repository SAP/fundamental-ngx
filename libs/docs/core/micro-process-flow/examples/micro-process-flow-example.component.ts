import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MicroProcessFlowModule } from '@fundamental-ngx/core/micro-process-flow';

@Component({
    selector: 'fd-micro-process-flow-example',
    templateUrl: './micro-process-flow-example.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [MicroProcessFlowModule]
})
export class MicroProcessFlowExampleComponent {}
