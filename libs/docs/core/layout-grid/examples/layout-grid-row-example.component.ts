import { Component } from '@angular/core';
import { LayoutGridModule } from '@fundamental-ngx/core/layout-grid';
import { ExampleLayoutGridBlockComponent } from './example-layout-grid-block.component';

@Component({
    selector: 'fd-layout-grid-row-example',
    templateUrl: './layout-grid-row-example.component.html',
    imports: [LayoutGridModule, ExampleLayoutGridBlockComponent]
})
export class LayoutGridRowExampleComponent {}
