import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TokenComponent } from './token.component';
import { TokenizerComponent } from './tokenizer.component';
import { TokenizerInputDirective } from './token-input.directive';
import { InputGroupModule } from '@fundamental-ngx/core/input-group';
import { ButtonModule } from '@fundamental-ngx/core/button';

@NgModule({
    declarations: [TokenComponent, TokenizerComponent, TokenizerInputDirective],
    imports: [CommonModule, InputGroupModule, ButtonModule],
    exports: [TokenComponent, TokenizerComponent, TokenizerInputDirective]
})
export class TokenModule {}
