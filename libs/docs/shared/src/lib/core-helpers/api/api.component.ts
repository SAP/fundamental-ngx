import { LowerCasePipe, UpperCasePipe } from '@angular/common';
import {
    ChangeDetectionStrategy,
    Component,
    computed,
    DestroyRef,
    ElementRef,
    inject,
    linkedSignal,
    signal,
    viewChild
} from '@angular/core';
import { takeUntilDestroyed, toObservable, toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { ButtonComponent } from '@fundamental-ngx/core/button';
import { IconComponent } from '@fundamental-ngx/core/icon';
import { catchError, forkJoin, map, of, switchMap } from 'rxjs';

import { ApiDocsService } from '../../services/api-docs.service';
import { ApiMemberCategory, ApiModel, SortDirection, UnifiedApiMember } from './api.model';

@Component({
    selector: 'fd-api',
    templateUrl: './api.component.html',
    styleUrls: ['./api.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [ButtonComponent, IconComponent, LowerCasePipe, UpperCasePipe],
    host: {
        '(keydown)': 'onKeydown($event)'
    }
})
export class ApiComponent {
    protected readonly searchInput = viewChild<ElementRef<HTMLInputElement>>('searchInput');

    // File switching
    protected readonly activeFile = signal<string>('');
    protected readonly files = signal<string[]>([]);

    // Sorting
    protected readonly sortColumn = signal<string | null>(null);
    protected readonly sortDirection = signal<SortDirection>(null);

    // Copy toast
    protected readonly copiedName = signal<string | null>(null);

    // Error state
    protected readonly loadError = signal<string | null>(null);

    // API data (derived from reactive fetch)
    protected readonly apiModel = computed(() => this._apiData());

    // UI state that resets when API data changes
    protected readonly activeCategory = linkedSignal<ApiModel | null, ApiMemberCategory>({
        source: this.apiModel,
        computation: () => 'all'
    });
    protected readonly searchQuery = linkedSignal<ApiModel | null, string>({
        source: this.apiModel,
        computation: () => ''
    });
    protected readonly showDeprecated = linkedSignal<ApiModel | null, boolean>({
        source: this.apiModel,
        computation: () => false
    });
    protected readonly showInherited = linkedSignal<ApiModel | null, boolean>({
        source: this.apiModel,
        computation: () => false
    });
    protected readonly expandedRows = linkedSignal<ApiModel | null, Set<string>>({
        source: this.apiModel,
        computation: () => new Set()
    });
    protected readonly focusedRowIndex = linkedSignal<ApiModel | null, number>({
        source: this.apiModel,
        computation: () => -1
    });

    // Files grouped by kind for the chip rail
    protected readonly groupedFiles = computed(() => {
        const files = this.files();
        const groups: { label: string; kind: string; files: string[] }[] = [];
        const components: string[] = [];
        const directives: string[] = [];
        const services: string[] = [];
        const pipes: string[] = [];
        const other: string[] = [];

        for (const file of files) {
            if (file.endsWith('Component')) {
                components.push(file);
            } else if (file.endsWith('Directive')) {
                directives.push(file);
            } else if (file.endsWith('Service')) {
                services.push(file);
            } else if (file.endsWith('Pipe')) {
                pipes.push(file);
            } else {
                other.push(file);
            }
        }

        if (components.length) {
            groups.push({ label: 'Components', kind: 'component', files: components });
        }
        if (directives.length) {
            groups.push({ label: 'Directives', kind: 'directive', files: directives });
        }
        if (services.length) {
            groups.push({ label: 'Services', kind: 'service', files: services });
        }
        if (pipes.length) {
            groups.push({ label: 'Pipes', kind: 'pipe', files: pipes });
        }
        if (other.length) {
            groups.push({ label: 'Other', kind: 'other', files: other });
        }

        return groups;
    });

    // Whether the current model has any signal-based inputs/outputs
    protected readonly hasSignals = computed(() => {
        const model = this.apiModel();
        if (!model) {
            return false;
        }
        return model.inputs.some((i) => i.isSignal) || model.outputs.some((o) => o.isSignal);
    });

    // Category counts
    protected readonly categoryCounts = computed(() => {
        const model = this.apiModel();
        if (!model) {
            return { all: 0, inputs: 0, outputs: 0, methods: 0 };
        }
        const inputs = this._countVisible(model.inputs);
        const outputs = this._countVisible(model.outputs);
        const methods = this._countVisible(model.methods);
        return { all: inputs + outputs + methods, inputs, outputs, methods };
    });

    // Unified member list (inputs + outputs + methods flattened)
    protected readonly allMembers = computed<UnifiedApiMember[]>(() => {
        const model = this.apiModel();
        if (!model) {
            return [];
        }

        const members: UnifiedApiMember[] = [];

        for (const input of model.inputs) {
            members.push({
                name: input.name,
                kind: 'input',
                type: input.type,
                default: input.default,
                description: input.description,
                isSignal: input.isSignal,
                deprecated: input.deprecated,
                sourceLine: input.sourceLine,
                since: input.since
            });
        }

        for (const output of model.outputs) {
            members.push({
                name: output.name,
                kind: 'output',
                type: output.type,
                default: output.default,
                description: output.description,
                isSignal: output.isSignal,
                deprecated: output.deprecated,
                sourceLine: output.sourceLine,
                since: output.since
            });
        }

        for (const method of model.methods) {
            members.push({
                name: method.name,
                kind: 'method',
                type: method.signature,
                default: null,
                description: method.description,
                isSignal: false,
                deprecated: method.deprecated,
                sourceLine: method.sourceLine,
                since: method.since,
                parameters: method.parameters,
                returnType: method.returnType
            });
        }

        return members;
    });

    // Filtered + sorted members
    protected readonly filteredMembers = computed<UnifiedApiMember[]>(() => {
        let members = this.allMembers();
        const category = this.activeCategory();
        const query = this.searchQuery().toLowerCase();
        const showDepr = this.showDeprecated();

        // Category filter
        if (category !== 'all') {
            const kindMap: Record<string, string> = { inputs: 'input', outputs: 'output', methods: 'method' };
            members = members.filter((m) => m.kind === kindMap[category]);
        }

        // Deprecated filter
        if (!showDepr) {
            members = members.filter((m) => !m.deprecated);
        }

        // Search filter
        if (query) {
            members = members.filter(
                (m) =>
                    m.name.toLowerCase().includes(query) ||
                    m.type.toLowerCase().includes(query) ||
                    (m.default?.toLowerCase().includes(query) ?? false) ||
                    m.description.toLowerCase().includes(query)
            );
        }

        // Sorting
        const col = this.sortColumn();
        const dir = this.sortDirection();
        if (col && dir) {
            members = [...members].sort((a, b) => {
                let valA: string;
                let valB: string;
                switch (col) {
                    case 'name':
                        valA = a.name;
                        valB = b.name;
                        break;
                    case 'type':
                        valA = a.type;
                        valB = b.type;
                        break;
                    case 'default':
                        valA = a.default || '';
                        valB = b.default || '';
                        break;
                    default:
                        return 0;
                }
                const cmp = valA.localeCompare(valB);
                return dir === 'asc' ? cmp : -cmp;
            });
        }

        return members;
    });

    // Inherited members (unified)
    protected readonly inheritedMembers = computed<UnifiedApiMember[]>(() => {
        const model = this.apiModel();
        if (!model?.inherited) {
            return [];
        }
        const members: UnifiedApiMember[] = [];
        for (const input of model.inherited.inputs) {
            members.push({
                name: input.name,
                kind: 'input',
                type: input.type,
                default: input.default,
                description: input.description,
                isSignal: input.isSignal,
                deprecated: input.deprecated,
                sourceLine: input.sourceLine,
                since: input.since
            });
        }
        for (const method of model.inherited.methods) {
            members.push({
                name: method.name,
                kind: 'method',
                type: method.signature,
                default: null,
                description: method.description,
                isSignal: false,
                deprecated: method.deprecated,
                sourceLine: method.sourceLine,
                since: method.since,
                parameters: method.parameters,
                returnType: method.returnType
            });
        }
        return members;
    });

    protected readonly allExpanded = computed(() => {
        const filtered = this.filteredMembers();
        if (filtered.length === 0) {
            return false;
        }
        const expanded = this.expandedRows();
        return filtered.every((m) => expanded.has(m.name));
    });

    private readonly _route = inject(ActivatedRoute);
    private readonly _apiService = inject(ApiDocsService);
    private readonly _destroyRef = inject(DestroyRef);
    private _copyTimeout: ReturnType<typeof setTimeout> | null = null;

    // Reactive fetch: loads API JSON whenever activeFile changes
    private readonly _apiData = toSignal(
        toObservable(this.activeFile).pipe(
            switchMap((file) => {
                if (!file) {
                    return of(null);
                }
                return this._apiService.getComponentApi(file).pipe(
                    catchError(() =>
                        // Class has no public inputs/outputs/methods — show empty state
                        of(null)
                    )
                );
            })
        ),
        { initialValue: null }
    );

    constructor() {
        // Initialize files from route data
        const routeFiles = this._route.snapshot.data['content'] as string[] | undefined;
        if (routeFiles && routeFiles.length > 0) {
            // Check each file for API data and filter out empty ones
            const apiChecks = routeFiles.map((file) =>
                this._apiService.getComponentApi(file).pipe(
                    map((data) => ({ file, hasApi: this._hasApiMembers(data) })),
                    catchError(() => of({ file, hasApi: false }))
                )
            );

            forkJoin(apiChecks)
                .pipe(takeUntilDestroyed(this._destroyRef))
                .subscribe((results) => {
                    const filesWithApi = results.filter((r) => r.hasApi).map((r) => r.file);
                    const sortedFiles = [...filesWithApi].sort();
                    this.files.set(sortedFiles);
                    if (sortedFiles.length > 0) {
                        this.activeFile.set(sortedFiles[0]);
                    }
                });
        }
    }

    protected getFile(file: string): void {
        this.activeFile.set(file);
    }

    protected setCategory(category: ApiMemberCategory): void {
        this.activeCategory.set(category);
    }

    protected onSearchInput(event: Event): void {
        const value = (event.target as HTMLInputElement).value;
        this.searchQuery.set(value);
    }

    protected clearSearch(): void {
        this.searchQuery.set('');
    }

    protected toggleSort(column: string): void {
        const currentCol = this.sortColumn();
        const currentDir = this.sortDirection();
        if (currentCol === column) {
            if (currentDir === 'asc') {
                this.sortDirection.set('desc');
            } else if (currentDir === 'desc') {
                this.sortColumn.set(null);
                this.sortDirection.set(null);
            }
        } else {
            this.sortColumn.set(column);
            this.sortDirection.set('asc');
        }
    }

    protected toggleRow(name: string): void {
        this.expandedRows.update((set) => {
            const next = new Set(set);
            if (next.has(name)) {
                next.delete(name);
            } else {
                next.add(name);
            }
            return next;
        });
    }

    protected isExpanded(name: string): boolean {
        return this.expandedRows().has(name);
    }

    protected expandAll(): void {
        const allNames = this.filteredMembers().map((m) => m.name);
        this.expandedRows.set(new Set(allNames));
    }

    protected collapseAll(): void {
        this.expandedRows.set(new Set());
    }

    protected toggleExpandAll(): void {
        if (this.allExpanded()) {
            this.collapseAll();
        } else {
            this.expandAll();
        }
    }

    protected toggleDeprecated(): void {
        this.showDeprecated.update((v) => !v);
    }

    protected toggleInherited(): void {
        this.showInherited.update((v) => !v);
    }

    protected async copyBinding(member: UnifiedApiMember): Promise<void> {
        let text: string;
        switch (member.kind) {
            case 'input':
                text = `[${member.name}]=""`;
                break;
            case 'output':
                text = `(${member.name})=""`;
                break;
            case 'method':
                text = member.name + '()';
                break;
        }

        try {
            await navigator.clipboard.writeText(text);
            if (this._copyTimeout) {
                clearTimeout(this._copyTimeout);
            }
            this.copiedName.set(member.name);
            this._copyTimeout = setTimeout(() => this.copiedName.set(null), 1500);
        } catch {
            // clipboard API not available
        }
    }

    protected getKindBadgeClass(kind: string): string {
        switch (kind) {
            case 'input':
                return 'api-badge--input';
            case 'output':
                return 'api-badge--output';
            case 'method':
                return 'api-badge--method';
            default:
                return '';
        }
    }

    protected getSourceUrl(member: UnifiedApiMember): string {
        const model = this.apiModel();
        if (!model?.sourceUrl) {
            return '';
        }
        return model.sourceUrl.replace(/#L\d+$/, `#L${member.sourceLine}`);
    }

    protected getUsageSnippet(member: UnifiedApiMember): string {
        const model = this.apiModel();
        const selector = model?.selector || 'fd-component';
        switch (member.kind) {
            case 'input':
                return `<${selector} [${member.name}]="value"></${selector}>`;
            case 'output':
                return `<${selector} (${member.name})="onEvent($event)"></${selector}>`;
            case 'method': {
                const ref = selector.replace(/^fd-/, '').replace(/-/g, '');
                return `<${selector} #${ref}></${selector}>\n<!-- In component: -->\n@ViewChild('${ref}') comp;\ncomp.${member.name}();`;
            }
            default:
                return '';
        }
    }

    protected onKeydown(event: KeyboardEvent): void {
        const members = this.filteredMembers();
        if (members.length === 0) {
            return;
        }

        switch (event.key) {
            case '/':
                event.preventDefault();
                this.searchInput()?.nativeElement?.focus();
                break;
            case 'ArrowDown':
                if ((event.target as HTMLElement).tagName === 'INPUT') {
                    return;
                }
                event.preventDefault();
                this.focusedRowIndex.update((i) => Math.min(i + 1, members.length - 1));
                break;
            case 'ArrowUp':
                if ((event.target as HTMLElement).tagName === 'INPUT') {
                    return;
                }
                event.preventDefault();
                this.focusedRowIndex.update((i) => Math.max(i - 1, 0));
                break;
            case 'Enter': {
                const idx = this.focusedRowIndex();
                if (idx >= 0 && idx < members.length) {
                    this.toggleRow(members[idx].name);
                }
                break;
            }
            case 'Escape': {
                const expanded = this.expandedRows();
                if (expanded.size > 0) {
                    this.collapseAll();
                } else if (this.searchQuery()) {
                    this.clearSearch();
                }
                break;
            }
        }
    }

    protected getSortIcon(column: string): string {
        if (this.sortColumn() !== column) {
            return 'sort';
        }
        return this.sortDirection() === 'asc' ? 'sort-ascending' : 'sort-descending';
    }

    private _countVisible(members: { deprecated: string | null }[]): number {
        if (this.showDeprecated()) {
            return members.length;
        }
        return members.filter((m) => !m.deprecated).length;
    }

    private _hasApiMembers(data: ApiModel | null): boolean {
        if (!data) {
            return false;
        }
        return data.inputs.length > 0 || data.outputs.length > 0 || data.methods.length > 0 || !!data.selector;
    }
}
