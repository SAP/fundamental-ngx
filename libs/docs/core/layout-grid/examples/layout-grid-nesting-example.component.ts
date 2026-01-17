import { Component } from '@angular/core';
import { LayoutGridColDirective, LayoutGridComponent, LayoutGridRowDirective } from '@fundamental-ngx/core/layout-grid';
import { ExampleLayoutGridBlockComponent } from './example-layout-grid-block.component';

@Component({
    selector: 'fd-layout-grid-nesting-example',
    templateUrl: './layout-grid-nesting-example.component.html',
    imports: [LayoutGridComponent, LayoutGridRowDirective, LayoutGridColDirective, ExampleLayoutGridBlockComponent]
})
export class LayoutGridNestingExampleComponent {}
