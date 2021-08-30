import { NgModule } from '@angular/core';
import { TimelineDocsComponent } from './timeline-docs.component';
import { TimelineHeaderDocsComponent } from './timeline-header-docs/timeline-header-docs.component';
import { TimelineBasicExampleComponent } from './examples/timeline-basic-example/timeline-basic-example.component';
import { RouterModule, Routes } from '@angular/router';
import { ApiComponent } from '../../../documentation/core-helpers/api/api.component';
import { API_FILES } from '../../api-files';
import { SharedDocumentationPageModule } from '../../../documentation/shared-documentation-page.module';
import { TimelineModule } from '@fundamental-ngx/core/timeline';
import { AvatarModule } from '@fundamental-ngx/core/avatar';

const routes: Routes = [
  {
    path: '',
    component: TimelineHeaderDocsComponent,
    children: [
      { path: '', component: TimelineDocsComponent },
      { path: 'api', component: ApiComponent, data: { content: API_FILES.timeline } }
    ]
  }
];

@NgModule({
  declarations: [TimelineDocsComponent, TimelineHeaderDocsComponent, TimelineBasicExampleComponent],
  imports: [RouterModule.forChild(routes), SharedDocumentationPageModule, TimelineModule, AvatarModule],
  exports: [RouterModule],
})
export class TimelineDocsModule { }
