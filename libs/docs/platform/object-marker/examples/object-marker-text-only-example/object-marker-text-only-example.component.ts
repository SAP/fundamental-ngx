import { Component } from '@angular/core';
import { PlatformObjectMarkerModule } from '@fundamental-ngx/platform/object-marker';

@Component({
    selector: 'fdp-object-marker-text-only-example',
    templateUrl: './object-marker-text-only-example.component.html',
    styleUrls: ['./object-marker-text-only-example.component.scss'],
    standalone: true,
    imports: [PlatformObjectMarkerModule]
})
export class ObjectMarkerTextOnlyExampleComponent {}
