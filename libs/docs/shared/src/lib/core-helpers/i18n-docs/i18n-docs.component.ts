import { AsyncPipe, NgFor, NgIf, NgSwitch, NgSwitchCase } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FocusableGridDirective } from '@fundamental-ngx/cdk/utils';
import { BusyIndicatorComponent } from '@fundamental-ngx/core/busy-indicator';
import { TableModule } from '@fundamental-ngx/core/table';
import { FD_LANGUAGE_ENGLISH, FdLanguage } from '@fundamental-ngx/i18n';
import { Observable, OperatorFunction, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { I18nDocsLoaderService } from './i18n-docs-loader.service';

/** utility function to provide type safe FdLanguage key as route data, wrapped in an object needed for I18nDocsComponent */
export function getI18nKey(i18nKey: keyof FdLanguage): I18nRouteData {
    return { i18nKey };
}

@Component({
    selector: 'fd-i18n-docs',
    templateUrl: './i18n-docs.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [
        NgIf,
        NgSwitch,
        NgSwitchCase,
        BusyIndicatorComponent,
        FocusableGridDirective,
        TableModule,
        NgFor,
        AsyncPipe
    ]
})
export class I18nDocsComponent {
    status = LoadStatus.Loading;
    readonly loadStatus = LoadStatus;
    readonly data$ = this._getData();

    constructor(private _route: ActivatedRoute, private i18nDocsLoader: I18nDocsLoaderService) {}

    private _getData(): Observable<TranslationProperty[]> {
        const data = this._route.snapshot.data as I18nRouteData;
        if (!data?.i18nKey) {
            this.status = LoadStatus.Loaded;
            return of([]);
        }
        return this.i18nDocsLoader.typeDoc$.pipe(
            this._parseTypedoc(data.i18nKey),
            catchError((error) => {
                console.error(error);
                this.status = LoadStatus.Error;
                return of([]);
            })
        );
    }

    private _parseTypedoc(
        componentName: keyof FdLanguage
    ): OperatorFunction<Record<string, any>, TranslationProperty[]> {
        return map((doc) => {
            this.status = LoadStatus.Loaded;
            const fdLangData = doc?.['children']?.find((c) => c.name === 'FdLanguage');
            const componentTranslations = fdLangData?.children?.find((c) => c.name === componentName);
            return componentTranslations?.type?.declaration?.children.map(
                (c): TranslationProperty => ({
                    key: c.name,
                    englishTranslation: FD_LANGUAGE_ENGLISH[componentName][c.name],
                    params: c.comment?.tags?.filter((t) => t.tag === 'param').map((t) => t.param) ?? []
                })
            );
        });
    }
}

enum LoadStatus {
    Loading = 1,
    Loaded,
    Error
}

interface TranslationProperty {
    key: string;
    englishTranslation: string;
    params: string[];
}

interface I18nRouteData {
    i18nKey: keyof FdLanguage;
}
