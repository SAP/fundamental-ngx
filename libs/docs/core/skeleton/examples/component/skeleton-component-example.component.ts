import { Component } from '@angular/core';
import { SkeletonModule } from '@fundamental-ngx/core/skeleton';

@Component({
    selector: 'fd-skeleton-component-example',
    templateUrl: './skeleton-component-example.component.html',
    standalone: true,
    imports: [SkeletonModule]
})
export class SkeletonComponentExampleComponent {}
