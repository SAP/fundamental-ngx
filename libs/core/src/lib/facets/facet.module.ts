import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AvatarModule } from '../avatar/avatar.module';
import { ButtonModule } from '../button/button.module';
import { FacetGroupComponent } from './facet-group.component';
import { TitleModule } from '../title/public_api';
import { FacetContentComponent } from './content/facet-content.component';
import { FacetComponent } from './facet/facet.component';

@NgModule({
    declarations: [
        FacetComponent,
        FacetGroupComponent,
        FacetContentComponent
    ],
    imports: [CommonModule, AvatarModule, ButtonModule, TitleModule],
    exports: [
      FacetComponent,
      FacetGroupComponent,
      FacetContentComponent
    ]
})
export class FacetModule { }
