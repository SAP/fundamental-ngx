import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MultiInputComponent } from './multi-input.component';
import { TokenModule } from '../token/token.module';

@NgModule({
    declarations: [MultiInputComponent],
    imports: [CommonModule, TokenModule],
    exports: [MultiInputComponent]
})
export class MultiInputModule {}
