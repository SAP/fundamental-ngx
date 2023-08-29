import { Component } from '@angular/core';
import { ObjectMarkerModule } from '@fundamental-ngx/core/object-marker';

@Component({
    selector: 'fd-object-marker-example',
    templateUrl: './object-marker-example.component.html',
    standalone: true,
    imports: [ObjectMarkerModule]
})
export class ObjectMarkerExampleComponent {}

@Component({
    selector: 'fd-object-marker-icon-text-example',
    templateUrl: './object-marker-Icon-text-example.component.html',
    standalone: true,
    imports: [ObjectMarkerModule]
})
export class ObjectMarkerIconAndTextExampleComponent {}

@Component({
    selector: 'fd-object-marker-text-example',
    templateUrl: './object-marker-text-example.component.html',
    standalone: true,
    imports: [ObjectMarkerModule]
})
export class ObjectMarkerTextExampleComponent {}
