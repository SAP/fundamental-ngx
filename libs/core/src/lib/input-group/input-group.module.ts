import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { InputGroupComponent } from './input-group.component';
import { ButtonModule } from '@fundamental-ngx/core/button';
import { IconModule } from '@fundamental-ngx/core/icon';
import {
    InputGroupAddOnDirective,
    InputGroupInputDirective,
    InputGroupTextareaDirective
} from './input-group-directives';
import { DeprecatedInputGroupCompactDirective } from './deprecated-input-group-compact.directive';
import { ContentDensityModule } from '@fundamental-ngx/core/content-density';

@NgModule({
    declarations: [
        InputGroupComponent,
        InputGroupInputDirective,
        InputGroupTextareaDirective,
        InputGroupAddOnDirective,
        DeprecatedInputGroupCompactDirective
    ],
    imports: [CommonModule, ButtonModule, IconModule, FormsModule, ContentDensityModule],
    exports: [
        InputGroupComponent,
        InputGroupInputDirective,
        InputGroupTextareaDirective,
        InputGroupAddOnDirective,
        DeprecatedInputGroupCompactDirective,
        ContentDensityModule
    ]
})
export class InputGroupModule {}
