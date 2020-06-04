import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingSpinnerComponent } from './loading-spinner.component';

/**
 * @deprecated
 * LoadingSpinnerModule is deprecated.
 * Consult docs for better alternative.
 */
@NgModule({
    declarations: [LoadingSpinnerComponent],
    exports: [LoadingSpinnerComponent],
    imports: [CommonModule]
})
export class LoadingSpinnerModule {}
