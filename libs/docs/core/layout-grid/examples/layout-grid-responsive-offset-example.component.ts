import { Component } from '@angular/core';
import { LayoutGridModule } from '@fundamental-ngx/core/layout-grid';
import { ExampleLayoutGridBlockComponent } from './example-layout-grid-block.component';

@Component({
    selector: 'fd-layout-grid-responsive-offset-example',
    templateUrl: './layout-grid-responsive-offset-example.component.html',
    imports: [LayoutGridModule, ExampleLayoutGridBlockComponent]
})
export class LayoutGridResponsiveOffsetExampleComponent {}
