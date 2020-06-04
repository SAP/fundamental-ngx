import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TokenComponent } from './token.component';
import { TokenizerComponent } from './tokenizer.component';
import { TokenizerInputDirective } from './token-input.directive';
import { InputGroupModule } from '../input-group/input-group.module';
import { ButtonModule } from '../button/button.module';

@NgModule({
    declarations: [TokenComponent, TokenizerComponent, TokenizerInputDirective],
    imports: [CommonModule, InputGroupModule, ButtonModule],
    exports: [TokenComponent, TokenizerComponent, TokenizerInputDirective]
})
export class TokenModule {}
