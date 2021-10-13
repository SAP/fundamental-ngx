import 'focus-visible';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExperimentalSearchComponent } from './search.component';
import { FormsModule } from '@angular/forms';

@NgModule({
    declarations: [ExperimentalSearchComponent],
    imports: [CommonModule, FormsModule],
    exports: [ExperimentalSearchComponent]
})
export class ExperimentalSearchModule {}
