import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TokenComponent } from './token.component';
import { TokenizerComponent } from './tokenizer.component';

@NgModule({
    declarations: [TokenComponent, TokenizerComponent],
    imports: [CommonModule],
    exports: [TokenComponent, TokenizerComponent]
})
export class TokenModule {}
