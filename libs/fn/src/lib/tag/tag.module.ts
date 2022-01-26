import 'focus-visible';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TagComponent } from './tag.component';

@NgModule({
    declarations: [TagComponent],
    imports: [CommonModule],
    exports: [TagComponent]
})
export class TagModule {}
