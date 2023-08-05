import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TokenComponent } from './token.component';
import { TokenizerComponent } from './tokenizer.component';
import { TokenizerInputDirective } from './token-input.directive';
import { InputGroupModule } from '@fundamental-ngx/core/input-group';
import { ButtonModule } from '@fundamental-ngx/core/button';
import { PopoverModule } from '@fundamental-ngx/core/popover';
import { ListModule } from '@fundamental-ngx/core/list';
import { ContentDensityModule } from '@fundamental-ngx/core/content-density';
import { I18nModule } from '@fundamental-ngx/i18n';

@NgModule({
    declarations: [
        TokenComponent,
        TokenizerComponent,
        TokenizerInputDirective,
            ],
    imports: [
        CommonModule,
        InputGroupModule,
        ButtonModule,
        PopoverModule,
        ListModule,
        ContentDensityModule,
        I18nModule
    ],
    exports: [
        TokenComponent,
        TokenizerComponent,
        TokenizerInputDirective,
                ContentDensityModule
    ]
})
export class TokenModule {}
