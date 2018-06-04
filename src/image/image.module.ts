import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ImageComponent } from './image.component';

@NgModule({
    imports: [CommonModule],
    exports: [ImageComponent],
    declarations: [ImageComponent]
})
export class ImageModule {}
