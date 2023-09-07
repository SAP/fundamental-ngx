import { AsyncPipe, JsonPipe, NgFor, NgIf, TitleCasePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CardModule } from '@fundamental-ngx/core/card';
import { ContentDensityDirective } from '@fundamental-ngx/core/content-density';
import { DynamicPageModule } from '@fundamental-ngx/core/dynamic-page';
import { FormGroupModule, FormItemModule, FormLabelModule } from '@fundamental-ngx/core/form';
import { InfoLabelModule } from '@fundamental-ngx/core/info-label';
import { ListModule } from '@fundamental-ngx/core/list';
import { SelectModule } from '@fundamental-ngx/core/select';
import { TableModule } from '@fundamental-ngx/core/table';
import { TabsModule } from '@fundamental-ngx/core/tabs';
import { ToolbarComponent, ToolbarItemDirective, ToolbarSeparatorComponent } from '@fundamental-ngx/core/toolbar';
import { Observable, map, tap } from 'rxjs';
import { CompodocService } from '../../services/compodoc.service';
import { LERNA_JSON } from '../../tokens/lerna-json.token';

@Component({
    selector: 'fd-api',
    templateUrl: './api.component.html',
    styleUrls: ['./api.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [
        NgIf,
        NgFor,
        ContentDensityDirective,
        SelectModule,
        ListModule,
        AsyncPipe,
        FormsModule,
        JsonPipe,
        TitleCasePipe,
        FormGroupModule,
        FormItemModule,
        FormLabelModule,
        CardModule,
        InfoLabelModule,
        DynamicPageModule,
        ToolbarComponent,
        ToolbarItemDirective,
        ToolbarSeparatorComponent,
        TabsModule,
        TableModule
    ]
})
export class ApiComponent {
    docItems: Observable<Array<[string, any[]]>> = inject(CompodocService).docsJson$.pipe(
        tap(([firstItem]) => (this.selectedDocItem = firstItem)),
        tap((r) => console.log(r)),
        map((items) =>
            items.reduce((types: Record<string, any[]>, item: any) => {
                if (!types[item.type]) {
                    types[item.type] = [];
                }
                types[item.type].push(item);
                return types;
            }, {})
        ),
        map((groupedItems) => Object.keys(groupedItems).map((type) => [type, groupedItems[type] as any[]]))
    );
    selectedDocItem: any | null = null;

    version = inject(LERNA_JSON).version;
    githubLink(selectedDocItem: any, line?: number): string {
        return `https://github.com/SAP/fundamental-ngx/blob/v${this.version}/${selectedDocItem.file}${
            line ? `#L${line}` : ''
        }`;
    }
}
