import { NgModule } from '@angular/core';

import { ContentDensityModule } from '@fundamental-ngx/core/content-density';

import { MoveToComponent } from './dialogs/move-to/move-to.component';
import { NewFolderComponent } from './dialogs/new-folder/new-folder.component';
import { UploadCollectionDragnDropDirective } from './directives/upload-collection-dragndrop.directive';
import { UploadCollectionComponent } from './upload-collection/upload-collection.component';

@NgModule({
    imports: [
        ContentDensityModule,
        UploadCollectionComponent,
        NewFolderComponent,
        MoveToComponent,
        UploadCollectionDragnDropDirective
    ],
    exports: [UploadCollectionComponent, ContentDensityModule]
})
export class PlatformUploadCollectionModule {}
