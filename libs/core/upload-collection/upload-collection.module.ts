import { NgModule } from '@angular/core';
import { UploadCollectionButtonGroupComponent } from './upload-collection-button-group/upload-collection-button-group.component';
import { UploadCollectionFormItemComponent } from './upload-collection-form-item/upload-collection-form-item.component';
import { UploadCollectionItemDirective } from './upload-collection-item.directive';
import {
    UploadCollectionDescriptionDirective,
    UploadCollectionStatusGroupDirective,
    UploadCollectionStatusItemDirective,
    UploadCollectionTextSeparatorDirective,
    UploadCollectionThumbnailDirective,
    UploadCollectionTitleContainerDirective,
    UploadCollectionTitleDirective
} from './upload-collection-simple.directives';
import { UploadCollectionComponent } from './upload-collection.component';

/**
 * @deprecated
 * Use direct imports of components and directives.
 */
@NgModule({
    imports: [
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
