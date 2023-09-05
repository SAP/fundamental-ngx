import { Component } from '@angular/core';
import { LayoutGridModule } from '@fundamental-ngx/core/layout-grid';
import { ExampleLayoutGridBlockComponent } from './example-layout-grid-block.component';

@Component({
    selector: 'fd-layout-grid-growing-example',
    templateUrl: './layout-grid-growing-example.component.html',
    standalone: true,
    imports: [LayoutGridModule, ExampleLayoutGridBlockComponent]
})
export class LayoutGridGrowingExampleComponent {}
