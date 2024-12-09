import { ChangeDetectionStrategy, Component } from '@angular/core';
import { IconComponent } from '@fundamental-ngx/core/icon';
import { MicroProcessFlowModule } from '@fundamental-ngx/core/micro-process-flow';

@Component({
    selector: 'fd-micro-process-flow-object-between-nodes-example',
    templateUrl: './micro-process-flow-object-between-nodes-example.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [MicroProcessFlowModule, IconComponent]
})
export class MicroProcessFlowObjectBetweenNodesExampleComponent {}
