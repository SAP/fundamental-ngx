import { NgModule } from '@angular/core';

import {
    LineClampTargetDirective,
    LineClampDirective,
    DeprecatedLineClampDirective,
    DeprecatedLineClampTargetDirective
} from './line-clamp.directive';

@NgModule({
    imports: [
        LineClampTargetDirective,
        LineClampDirective,
        DeprecatedLineClampDirective,
        DeprecatedLineClampTargetDirective
    ],
    exports: [
        LineClampTargetDirective,
        LineClampDirective,
        DeprecatedLineClampDirective,
        DeprecatedLineClampTargetDirective
    ]
})
export class LineClampModule {}
