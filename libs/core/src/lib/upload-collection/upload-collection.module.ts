import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
    UploadCollectionDescriptionDirective,
    UploadCollectionStatusGroupDirective,
    UploadCollectionTextSeparatorDirective,
    UploadCollectionThumbnailDirective,
    UploadCollectionTitleDirective
} from './upload-collection-simple.directives';
import { ListModule } from '../list/list.module';
import { UploadCollectionComponent } from './upload-collection.component';
import { UploadCollectionButtonGroupComponent } from './upload-collection-button-group.component';
import { ButtonModule } from '../button/button.module';
import { UploadCollectionFormItemComponent } from './upload-collection-form-item.component';
import { LinkModule } from '../link/link.module';
import { FormsModule } from '@angular/forms';
import { FormControlModule } from '@fundamental-ngx/core/form';
import { UploadCollectionItemDirective } from './upload-collection-item.directive';

@NgModule({
    declarations: [
        UploadCollectionComponent,
        UploadCollectionItemDirective,
        UploadCollectionThumbnailDirective,
        UploadCollectionTitleDirective,
        UploadCollectionDescriptionDirective,
        UploadCollectionTextSeparatorDirective,
        UploadCollectionStatusGroupDirective,
        UploadCollectionButtonGroupComponent,
        UploadCollectionFormItemComponent
    ],
    imports: [CommonModule, ListModule, ButtonModule, LinkModule, FormsModule, FormControlModule],
    exports: [
        UploadCollectionComponent,
        UploadCollectionItemDirective,
        UploadCollectionThumbnailDirective,
        UploadCollectionTitleDirective,
        UploadCollectionDescriptionDirective,
        UploadCollectionTextSeparatorDirective,
        UploadCollectionStatusGroupDirective,
        UploadCollectionButtonGroupComponent,
        UploadCollectionFormItemComponent
    ]
})
export class UploadCollectionModule {}
