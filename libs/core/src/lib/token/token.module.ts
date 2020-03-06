import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TokenComponent } from './token.component';
import { TokenizerComponent } from './tokenizer.component';
import { TokenizerInputDirective } from './token-input.directive';
import { PopoverModule } from '../popover/popover.module';
import { ListModule } from '../list/list.module';

@NgModule({
    declarations: [TokenComponent, TokenizerComponent, TokenizerInputDirective],
    imports: [CommonModule, PopoverModule, ListModule],
    exports: [TokenComponent, TokenizerComponent, TokenizerInputDirective]
})
export class TokenModule {}
