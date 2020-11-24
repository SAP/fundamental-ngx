import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { ObjectAttributeComponent } from './object-attribute.component';

@NgModule({
    imports: [CommonModule, RouterModule],
    exports: [ObjectAttributeComponent],
    declarations: [ObjectAttributeComponent]
})
export class PlatformObjectAttributeModule { }
