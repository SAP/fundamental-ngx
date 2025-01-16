import { Component } from '@angular/core';
import { PlatformObjectMarkerModule } from '@fundamental-ngx/platform/object-marker';

@Component({
    selector: 'fdp-object-marker-text-only-example',
    templateUrl: './object-marker-text-only-example.component.html',
    styleUrls: ['./object-marker-text-only-example.component.scss'],
    imports: [PlatformObjectMarkerModule]
})
export class ObjectMarkerTextOnlyExampleComponent {}
