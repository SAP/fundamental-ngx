import 'focus-visible';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExperimentalTagComponent } from './tag.component';

@NgModule({
    declarations: [ExperimentalTagComponent],
    imports: [CommonModule],
    exports: [ExperimentalTagComponent]
})
export class ExperimentalTagModule {}
