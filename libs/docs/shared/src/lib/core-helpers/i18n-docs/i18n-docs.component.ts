import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FocusableGridDirective } from '@fundamental-ngx/cdk/utils';
import { BusyIndicatorComponent } from '@fundamental-ngx/core/busy-indicator';
import { TableModule } from '@fundamental-ngx/core/table';
import { FD_LANGUAGE, FdLanguage } from '@fundamental-ngx/i18n';
import { Observable, OperatorFunction, combineLatest, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { I18nDocsLoaderService } from './i18n-docs-loader.service';

@Component({
    selector: 'fd-i18n-docs',
    templateUrl: './i18n-docs.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [BusyIndicatorComponent, FocusableGridDirective, TableModule, AsyncPipe]
})
export class I18nDocsComponent {
    status = LoadStatus.Loading;
    readonly loadStatus = LoadStatus;
    readonly data$: Observable<TranslationProperty[]>;
    private lang$ = inject(FD_LANGUAGE);

    constructor(
        private _route: ActivatedRoute,
        private i18nDocsLoader: I18nDocsLoaderService
    ) {
        this.data$ = this._getData();
    }

    private _getData(): Observable<TranslationProperty[]> {
        const data = this._route.snapshot.data as I18nRouteData;
        if (!data?.i18nKey) {
            this.status = LoadStatus.Loaded;
            return of([]);
        }
        return combineLatest([this.lang$, this.i18nDocsLoader.typeDoc$]).pipe(
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
    ): OperatorFunction<[FdLanguage, Record<string, any>], TranslationProperty[]> {
        return map(([lang, doc]) => {
            this.status = LoadStatus.Loaded;
            const fdLangData = doc?.['children']?.find((c) => c.name === 'FdLanguage');
            const componentTranslations = fdLangData?.children?.find((c) => c.name === componentName);
            return componentTranslations?.type?.declaration?.children.map(
                (c): TranslationProperty => ({
                    key: c.name,
                    translation: lang[componentName][c.name],
                    params:
                        c.comment?.blockTags?.reduce((acc: string[], { tag, name }) => {
                            if (tag === '@param') {
                                acc.push(name);
                            }
                            return acc;
                        }, []) ?? []
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
    translation: string;
    params: string[];
}

interface I18nRouteData {
    i18nKey: keyof FdLanguage;
}
