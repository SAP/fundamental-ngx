import { NgModule } from '@angular/core';
import { ManageVariantItemComponent } from './components/manage-variant-item/manage-variant-item.component';
import { ManageVariantsDialogComponent } from './components/manage-variants-dialog/manage-variants-dialog.component';
import { VariantManagementWrapperComponent } from './components/variant-management-wrapper/variant-management-wrapper.component';
import { VariantManagementDirtyLabelDirective } from './directives/variant-management-dirty-label.directive';
import { VariantManagementComponent } from './variant-management.component';

/**
 * @deprecated
 * Use direct imports of components and directives.
 */
@NgModule({
    imports: [
        VariantManagementComponent,
        VariantManagementDirtyLabelDirective,
        ManageVariantItemComponent,
        VariantManagementWrapperComponent,
        ManageVariantsDialogComponent
    ],
    exports: [
        VariantManagementComponent,
        VariantManagementDirtyLabelDirective,
        ManageVariantItemComponent,
        VariantManagementWrapperComponent,
        ManageVariantsDialogComponent
    ]
})
export class VariantManagementModule {}
