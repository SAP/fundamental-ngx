import { Component } from '@angular/core';
import { ExampleLayoutGridBlockComponent } from './example-layout-grid-block.component';
import { LayoutGridModule } from '@fundamental-ngx/core/layout-grid';

@Component({
    selector: 'fd-layout-grid-offset-example',
    templateUrl: './layout-grid-offset-example.component.html',
    standalone: true,
    imports: [LayoutGridModule, ExampleLayoutGridBlockComponent]
})
export class LayoutGridOffsetExampleComponent {}
