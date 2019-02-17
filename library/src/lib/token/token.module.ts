import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TokenComponent } from './token.component';
import { UtilsModule } from '../utils/utils.module';

@NgModule({
    declarations: [TokenComponent],
    imports: [CommonModule, UtilsModule],
    exports: [TokenComponent]
})
export class TokenModule {}
