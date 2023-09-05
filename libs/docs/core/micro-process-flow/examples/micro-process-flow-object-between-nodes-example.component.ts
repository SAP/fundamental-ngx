import { ChangeDetectionStrategy, Component } from '@angular/core';
import { IconModule } from '@fundamental-ngx/core/icon';
import { MicroProcessFlowModule } from '@fundamental-ngx/core/micro-process-flow';

@Component({
    selector: 'fd-micro-process-flow-object-between-nodes-example',
    templateUrl: './micro-process-flow-object-between-nodes-example.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [MicroProcessFlowModule, IconModule]
})
export class MicroProcessFlowObjectBetweenNodesExampleComponent {}
