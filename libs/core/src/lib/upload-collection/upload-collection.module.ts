import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
    UploadCollectionDescriptionDirective,
    UploadCollectionStatusGroupDirective,
    UploadCollectionStatusItemDirective,
    UploadCollectionTextSeparatorDirective,
    UploadCollectionThumbnailDirective,
    UploadCollectionTitleContainerDirective,
    UploadCollectionTitleDirective
} from './upload-collection-simple.directives';
import { ListModule } from '@fundamental-ngx/core/list';
import { UploadCollectionComponent } from './upload-collection.component';
import { UploadCollectionButtonGroupComponent } from './upload-collection-button-group/upload-collection-button-group.component';
import { ButtonModule } from '@fundamental-ngx/core/button';
import { UploadCollectionFormItemComponent } from './upload-collection-form-item/upload-collection-form-item.component';
import { LinkModule } from '@fundamental-ngx/core/link';
import { I18nModule } from '@fundamental-ngx/i18n';
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
        UploadCollectionStatusItemDirective,
        UploadCollectionButtonGroupComponent,
        UploadCollectionFormItemComponent,
        UploadCollectionTitleContainerDirective
    ],
    imports: [CommonModule, ListModule, ButtonModule, LinkModule, FormsModule, FormControlModule, I18nModule],
    exports: [
        UploadCollectionComponent,
        UploadCollectionItemDirective,
        UploadCollectionThumbnailDirective,
        UploadCollectionTitleDirective,
        UploadCollectionDescriptionDirective,
        UploadCollectionTextSeparatorDirective,
        UploadCollectionStatusGroupDirective,
        UploadCollectionStatusItemDirective,
        UploadCollectionButtonGroupComponent,
        UploadCollectionFormItemComponent,
        UploadCollectionTitleContainerDirective
    ]
})
export class UploadCollectionModule {}
