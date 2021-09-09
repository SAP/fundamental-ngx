import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ObjectMarkerModule } from '@fundamental-ngx/core/object-marker';
import { PlatformObjectMarkerComponent } from './object-marker.component';

@NgModule({
    declarations: [PlatformObjectMarkerComponent],
    imports: [CommonModule, ObjectMarkerModule],
    exports: [PlatformObjectMarkerComponent]
})
export class PlatformObjectMarkerModule {}
