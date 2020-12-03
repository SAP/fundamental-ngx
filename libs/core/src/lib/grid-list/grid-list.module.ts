import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { COMPONENTS } from './components';
import { ToolbarModule, ToolbarSpacerComponent } from '../toolbar/public_api';
import { ButtonModule } from '../button/public_api';
import { ObjectStatusModule } from '../object-status/public_api';

@NgModule({
    declarations: [...COMPONENTS],
    imports: [
        CommonModule,
        ToolbarModule,
        ButtonModule,
        ObjectStatusModule,
        FormsModule
    ],
    exports: [...COMPONENTS, ToolbarSpacerComponent]
})
export class GridListModule {}
