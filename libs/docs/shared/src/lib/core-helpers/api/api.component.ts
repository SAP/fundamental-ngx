import { ChangeDetectionStrategy, Component, effect, inject, signal, viewChild } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { ButtonComponent } from '@fundamental-ngx/core/button';
import { MenuComponent, MenuModule } from '@fundamental-ngx/core/menu';
import { catchError, of, switchMap } from 'rxjs';
import { ApiDocsService } from '../../services/api-docs.service';

@Component({
    selector: 'fd-api',
    templateUrl: './api.component.html',
    styleUrls: ['./api.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [ButtonComponent, MenuModule]
})
export class ApiComponent {
    protected readonly menu = viewChild<MenuComponent>('menu');

    protected readonly _route = inject(ActivatedRoute);
    protected readonly _apiService = inject(ApiDocsService);

    // Source of truth for which file to load
    protected readonly activeFile = signal<string>('');

    // Sorted files from route data
    protected readonly files = signal<string[]>([]);

    // Reactive: automatically fetches HTML when activeFile changes
    protected readonly result = toSignal(
        toObservable(this.activeFile).pipe(
            switchMap((file) => {
                if (!file) {
                    return of('<h2>No API files found.</h2>');
                }
                return this._apiService.getComponentHtml(file).pipe(
                    catchError((error) => {
                        console.warn(`Did not find file ${file}.\nError:`, error);
                        return of(`<h2>Error loading ${file}</h2>`);
                    })
                );
            })
        ),
        { initialValue: '' }
    );

    constructor() {
        // Initialize files from route data
        const routeFiles = this._route.snapshot.data['content'] as string[] | undefined;
        if (routeFiles) {
            const sortedFiles = [...routeFiles].sort();
            this.files.set(sortedFiles);

            if (sortedFiles.length > 0) {
                this.activeFile.set(sortedFiles[0]);
            }
        }

        // Close menu when file changes
        effect(() => {
            this.activeFile(); // Track dependency
            const menuComponent = this.menu();
            if (menuComponent?.isOpen) {
                menuComponent.close();
            }
        });
    }

    protected getFile(file: string): void {
        this.activeFile.set(file);
    }
}
