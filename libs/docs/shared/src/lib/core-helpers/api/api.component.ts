import { UpperCasePipe } from '@angular/common';
import {
    ChangeDetectionStrategy,
    Component,
    computed,
    effect,
    ElementRef,
    inject,
    signal,
    viewChild
} from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { ButtonComponent } from '@fundamental-ngx/core/button';
import { IconComponent } from '@fundamental-ngx/core/icon';
import { catchError, forkJoin, map, of, switchMap } from 'rxjs';
import { ApiDocsService } from '../../services/api-docs.service';
import { ApiMemberCategory, ApiMethod, ApiModel, SortDirection, UnifiedApiMember } from './api.model';

@Component({
    selector: 'fd-api',
    templateUrl: './api.component.html',
    styleUrls: ['./api.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [ButtonComponent, IconComponent, UpperCasePipe],
    host: {
        '(keydown)': 'onKeydown($event)'
    }
})
export class ApiComponent {
    protected readonly searchInput = viewChild<ElementRef<HTMLInputElement>>('searchInput');

    // File switching
    protected readonly activeFile = signal<string>('');
    protected readonly files = signal<string[]>([]);

    // Filtering & search
    protected readonly activeCategory = signal<ApiMemberCategory>('all');
    protected readonly searchQuery = signal<string>('');
    protected readonly showDeprecated = signal(false);
    protected readonly showInherited = signal(false);

    // Sorting
    protected readonly sortColumn = signal<string | null>(null);
    protected readonly sortDirection = signal<SortDirection>(null);

    // Expand state
    protected readonly expandedRows = signal<Set<string>>(new Set());
    protected readonly focusedRowIndex = signal(-1);

    // Copy toast
    protected readonly copiedName = signal<string | null>(null);

    // API data
    protected readonly apiModel = signal<ApiModel | null>(null);
    protected readonly loadError = signal<string | null>(null);

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
        const methods = this._countVisibleMethods(model.methods);
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

    private readonly _route = inject(ActivatedRoute);
    private readonly _apiService = inject(ApiDocsService);

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

            forkJoin(apiChecks).subscribe((results) => {
                const filesWithApi = results.filter((r) => r.hasApi).map((r) => r.file);
                const sortedFiles = [...filesWithApi].sort();
                this.files.set(sortedFiles);
                if (sortedFiles.length > 0) {
                    this.activeFile.set(sortedFiles[0]);
                }
            });
        }

        // Update apiModel when data arrives
        effect(() => {
            const data = this._apiData();
            this.loadError.set(null);
            this.apiModel.set(data);
            // Reset UI state on file change
            this.expandedRows.set(new Set());
            this.focusedRowIndex.set(-1);
            this.searchQuery.set('');
            this.activeCategory.set('all');
        });
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

    protected get allExpanded(): boolean {
        const filtered = this.filteredMembers();
        if (filtered.length === 0) {
            return false;
        }
        const expanded = this.expandedRows();
        return filtered.every((m) => expanded.has(m.name));
    }

    protected toggleExpandAll(): void {
        if (this.allExpanded) {
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
            this.copiedName.set(member.name);
            setTimeout(() => this.copiedName.set(null), 1500);
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
        // Replace the line number in the URL
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
                event.preventDefault();
                this.focusedRowIndex.update((i) => Math.min(i + 1, members.length - 1));
                break;
            case 'ArrowUp':
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

    private _countVisibleMethods(methods: ApiMethod[]): number {
        if (this.showDeprecated()) {
            return methods.length;
        }
        return methods.filter((m) => !m.deprecated).length;
    }

    private _hasApiMembers(data: ApiModel | null): boolean {
        if (!data) {
            return false;
        }
        return data.inputs.length > 0 || data.outputs.length > 0 || data.methods.length > 0;
    }
}
