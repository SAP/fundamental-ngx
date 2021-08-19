import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
    UploadCollectionDescriptionDirective,
    UploadCollectionItemDirective,
    UploadCollectionStatusGroupDirective,
    UploadCollectionTextSeparatorDirective,
    UploadCollectionThumbnailDirective,
    UploadCollectionTitleDirective,
    UploadCollectionTitleContainerDirective
} from './upload-collection.directives';
import { ListModule } from '../list/list.module';
import { UploadCollectionComponent } from './upload-collection.component';
import { UploadCollectionButtonGroupComponent } from './upload-collection-button-group.component';
import { ButtonModule } from '../button/button.module';
import { UploadCollectionFormItemComponent } from './upload-collection-form-item.component';
import { LinkModule } from '../link/link.module';

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
        UploadCollectionTitleContainerDirective,
        UploadCollectionFormItemComponent
    ],
    imports: [CommonModule, ListModule, ButtonModule, LinkModule],
    exports: [
        UploadCollectionComponent,
        UploadCollectionItemDirective,
        UploadCollectionThumbnailDirective,
        UploadCollectionTitleDirective,
        UploadCollectionDescriptionDirective,
        UploadCollectionTextSeparatorDirective,
        UploadCollectionStatusGroupDirective,
        UploadCollectionButtonGroupComponent,
        UploadCollectionTitleContainerDirective,
        UploadCollectionFormItemComponent
    ]
})
export class UploadCollectionModule {}
