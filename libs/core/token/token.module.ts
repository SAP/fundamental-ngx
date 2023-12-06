import { NgModule } from '@angular/core';
import { TokenizerInputDirective } from './token-input.directive';
import { TokenComponent } from './token.component';
import { TokenizerComponent } from './tokenizer.component';

/**
 * @deprecated
 * Use direct imports of `TokenComponent`, `TokenizerComponent`, `TokenizerInputDirective` instead
 */
@NgModule({
    imports: [TokenComponent, TokenizerComponent, TokenizerInputDirective],
    exports: [TokenComponent, TokenizerComponent, TokenizerInputDirective]
})
export class TokenModule {}
