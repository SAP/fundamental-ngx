import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MultiInputComponent } from './multi-input.component';
import { TokenModule } from '../token/token.module';
import { FormsModule } from '@angular/forms';
import { MenuModule } from '../menu/menu.module';

@NgModule({
    declarations: [MultiInputComponent],
    imports: [CommonModule, TokenModule, FormsModule, MenuModule],
    exports: [MultiInputComponent]
})
export class MultiInputModule {}
