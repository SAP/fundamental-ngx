import { Component } from '@angular/core';
import { PlatformObjectMarkerModule } from '@fundamental-ngx/platform/object-marker';

@Component({
    selector: 'fdp-object-marker-example',
    templateUrl: './object-marker-example.component.html',
    styleUrls: ['./object-marker-example.component.scss'],
    standalone: true,
    imports: [PlatformObjectMarkerModule]
})
export class ObjectMarkerExampleComponent {}
