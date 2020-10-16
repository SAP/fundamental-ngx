import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlatformObjectMarkerComponent } from './object-marker.component';
import { ObjectMarkerModule } from '@fundamental-ngx/core';

@NgModule({
    declarations: [PlatformObjectMarkerComponent],
    imports: [CommonModule, ObjectMarkerModule],
    exports: [PlatformObjectMarkerComponent]
})
export class PlatformObjectMarkerModule {}
