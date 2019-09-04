import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TokenComponent } from './token.component';

@NgModule({
    declarations: [TokenComponent],
    imports: [CommonModule],
    exports: [TokenComponent]
})
export class TokenModule {}
