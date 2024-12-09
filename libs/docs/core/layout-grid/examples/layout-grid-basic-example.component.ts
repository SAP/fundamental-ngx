import { Component } from '@angular/core';
import { LayoutGridModule } from '@fundamental-ngx/core/layout-grid';
import { ExampleLayoutGridBlockComponent } from './example-layout-grid-block.component';

@Component({
    selector: 'fd-layout-grid-basic-example',
    templateUrl: './layout-grid-basic-example.component.html',
    imports: [LayoutGridModule, ExampleLayoutGridBlockComponent]
})
export class LayoutGridBasicExampleComponent {}
