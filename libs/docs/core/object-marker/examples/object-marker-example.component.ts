import { Component } from '@angular/core';
import { ObjectMarkerComponent } from '@fundamental-ngx/core/object-marker';

@Component({
    selector: 'fd-object-marker-example',
    templateUrl: './object-marker-example.component.html',
    imports: [ObjectMarkerComponent]
})
export class ObjectMarkerExampleComponent {}

@Component({
    selector: 'fd-object-marker-icon-text-example',
    templateUrl: './object-marker-Icon-text-example.component.html',
    imports: [ObjectMarkerComponent]
})
export class ObjectMarkerIconAndTextExampleComponent {}

@Component({
    selector: 'fd-object-marker-text-example',
    templateUrl: './object-marker-text-example.component.html',
    imports: [ObjectMarkerComponent]
})
export class ObjectMarkerTextExampleComponent {}
