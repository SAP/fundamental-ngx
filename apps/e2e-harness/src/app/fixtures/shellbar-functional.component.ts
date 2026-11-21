import { afterNextRender, Component, computed, inject, signal, viewChild } from '@angular/core';
import { RtlService } from '@fundamental-ngx/cdk/utils';
import { ButtonComponent } from '@fundamental-ngx/core/button';
import { ComboboxComponent } from '@fundamental-ngx/core/combobox';
import { ProductSwitchComponent } from '@fundamental-ngx/core/product-switch';
import {
    FD_SHELLBAR_COMPONENT,
    ShellbarActionComponent,
    ShellbarActionsComponent,
    ShellbarActionsMobileComponent,
    ShellbarComponent,
    ShellbarContextAreaComponent,
    ShellbarNeverHideDirective,
    ShellbarPositionDirective,
    ShellbarSeparatorComponent,
    ShellbarUserMenuComponent
} from '@fundamental-ngx/core/shellbar';
import {
    UserMenuComponent,
    UserMenuControlComponent,
    UserMenuControlElementDirective
} from '@fundamental-ngx/core/user-menu';
import { SearchFieldComponent } from '@fundamental-ngx/platform/search-field';

@Component({
    selector: 'e2e-shellbar-mobile-projection',
    template: `
        <div [hidden]="desktop()" data-testid="mobile-region" style="width: 314px">
            @if (ready()) {
                <fd-shellbar-actions-mobile
                    [shellbarActions]="projected.shellbarActions"
                    [searchExists]="true"
                    [assistiveToolsCallback]="assistiveCallback"
                    (showSearch)="searches.update(increment)"
                ></fd-shellbar-actions-mobile>
            }
        </div>
        <div [hidden]="!desktop()" data-testid="desktop-region">
            <fd-shellbar-actions #projected>
                @for (action of actions(); track action.id) {
                    <fd-shellbar-action
                        [attr.data-action]="action.id"
                        [label]="action.id"
                        [glyph]="'bell'"
                        [notificationCount]="action.count"
                        [callback]="actionCallback"
                    ></fd-shellbar-action>
                }
            </fd-shellbar-actions>
        </div>
        <button data-testid="add-action" (click)="add()">Add count 5</button>
        <button data-testid="remove-five" (click)="removeFive()">Remove count 5</button>
        <button data-testid="remove-all" (click)="actions.set([])">Remove all</button>
        <button data-testid="change-count" (click)="changeCount()">Change count</button>
        <button data-testid="reorder" (click)="actions.update(reverse)">Reverse actions</button>
        <button data-testid="show-desktop" (click)="desktop.set(true)">Desktop</button>
        <pre data-testid="callback-log">{{ eventLog() }}</pre>
        <output data-testid="search-count">{{ searches() }}</output>
        <output data-testid="membership">{{ membership() }}</output>
    `,
    imports: [ShellbarActionComponent, ShellbarActionsComponent, ShellbarActionsMobileComponent],
    providers: [{ provide: FD_SHELLBAR_COMPONENT, useValue: {} }]
})
export class ShellbarMobileProjectionComponent {
    readonly actions = signal([{ id: 'One', count: 1 }]);
    readonly desktop = signal(false);
    readonly ready = signal(false);
    readonly eventLog = signal('[]');
    readonly searches = signal(0);
    readonly projected = viewChild(ShellbarActionsComponent);
    readonly events: MouseEvent[] = [];

    constructor() {
        afterNextRender(() => this.ready.set(true));
    }

    readonly actionCallback = (event: MouseEvent): void => this.record('action', event);
    readonly assistiveCallback = (event: MouseEvent): void => this.record('assistive', event);
    readonly increment = (value: number): number => value + 1;
    readonly reverse = (items: { id: string; count: number }[]): { id: string; count: number }[] =>
        [...items].reverse();

    membership(): string {
        this.actions();
        return (
            this.projected()
                ?.shellbarActions?.map((action) => action.label())
                .join(',') ?? ''
        );
    }

    add(): void {
        this.actions.update((items) => [...items.filter((item) => item.id !== 'Five'), { id: 'Five', count: 5 }]);
    }

    removeFive(): void {
        this.actions.update((items) => items.filter((item) => item.id !== 'Five'));
    }

    changeCount(): void {
        this.actions.update((items) => items.map((item) => ({ ...item, count: item.count + 1 })));
    }

    private record(target: string, event: MouseEvent): void {
        this.events.push(event);
        const entries = JSON.parse(this.eventLog());
        entries.push({
            target,
            type: event.type,
            constructor: event.constructor.name,
            mouse: event instanceof MouseEvent,
            button: event.button,
            clientX: event.clientX,
            clientY: event.clientY
        });
        this.eventLog.set(JSON.stringify(entries));
    }
}

@Component({
    selector: 'e2e-shellbar-functional',
    templateUrl: './shellbar-functional.component.html',
    imports: [
        ShellbarComponent,
        ShellbarContextAreaComponent,
        ShellbarActionComponent,
        ButtonComponent,
        ShellbarActionsComponent,
        ShellbarNeverHideDirective,
        ShellbarPositionDirective,
        ShellbarSeparatorComponent,
        ShellbarUserMenuComponent,
        ComboboxComponent,
        ProductSwitchComponent,
        UserMenuComponent,
        UserMenuControlComponent,
        UserMenuControlElementDirective,
        SearchFieldComponent,
        ShellbarMobileProjectionComponent
    ]
})
export class ShellbarFunctionalComponent {
    readonly geometryWidth = signal(600);
    readonly hidden = signal<string[]>([]);
    readonly shown = signal<string[]>([]);
    readonly aggregate = signal<string[]>([]);
    readonly semanticActions = signal(0);
    readonly semanticButtons = signal(0);
    readonly semanticAssistiveTools = signal(false);
    readonly semanticCompositeStable = signal(false);
    readonly semanticSearch = signal(false);
    readonly semanticUser = { initials: 'RU', fullName: 'Recovery User' };
    readonly realOverflowWidth = signal(500);
    readonly semanticActionItems = computed(() => Array.from({ length: this.semanticActions() }));
    readonly semanticButtonItems = computed(() => Array.from({ length: this.semanticButtons() }));
    readonly geometryBar = viewChild.required<ShellbarComponent>('geometryBar');
    readonly area = viewChild.required<ShellbarContextAreaComponent>('geometryArea');
    protected readonly _rtl = inject(RtlService);

    noteHidden(element: HTMLElement): void {
        this.hidden.update((items) => [...items, element.id]);
    }

    noteShown(element: HTMLElement): void {
        this.shown.update((items) => [...items, element.id]);
    }

    noteAggregate(elements: HTMLElement[]): void {
        this.aggregate.set(elements.map((element) => element.id));
    }

    setSemanticActions(count: number): void {
        this.semanticActions.set(count);
    }

    setSemanticButtons(count: number): void {
        this.semanticButtons.set(count);
    }

    setRealOverflowWidth(width: number): void {
        this.realOverflowWidth.set(width);
    }

    async setResidual(residual: number): Promise<void> {
        const shellbarElement = this.area().el.nativeElement.closest('.fd-shellbar') as HTMLElement;
        const style = getComputedStyle(shellbarElement);
        const groups = Array.from(shellbarElement.querySelectorAll('.fd-shellbar__group')) as HTMLElement[];
        const otherGroupsWidth = groups
            .filter((group) => !group.classList.contains('fd-shellbar__group--context-area'))
            .reduce((total, group) => total + group.getBoundingClientRect().width, 0);
        const overhead =
            parseFloat(style.paddingInlineStart) +
            parseFloat(style.paddingInlineEnd) +
            parseFloat(style.columnGap) * (groups.length - 1) +
            otherGroupsWidth;
        this.geometryWidth.set(residual + overhead);
        this.hidden.set([]);
        this.shown.set([]);
        // Overflow changes the actions group's width; calibrate after the real resize pass.
        await new Promise<void>((resolve) => setTimeout(resolve, 60));
        const contextGroups = groups.filter((group) => group.classList.contains('fd-shellbar__group--context-area'));
        const contextSpace = contextGroups.reduce(
            (total, group) =>
                total +
                group.getBoundingClientRect().width +
                (parseFloat(getComputedStyle(group).marginInlineStart) || 0),
            0
        );
        const available = this.geometryBar()._getShellbarEnd() - this.geometryBar()._getActionsEnd() + contextSpace;
        this.geometryWidth.update((width) => width + residual - available);
    }
}
