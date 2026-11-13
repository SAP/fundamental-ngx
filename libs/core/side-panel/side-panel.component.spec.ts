import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Component, signal } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { SidePanelContentDirective } from './side-panel-content.directive';
import { SidePanelItemComponent } from './side-panel-item.component';
import { SidePanelMainComponent } from './side-panel-main.component';
import { SidePanelComponent, SidePanelMode, SidePanelSide } from './side-panel.component';

@Component({
    selector: 'fd-test-host',
    template: `
        <fd-side-panel [side]="side()" [(activeItem)]="activeItem" [(mode)]="mode" ariaLabel="Groups">
            <fd-side-panel-item id="filter" icon="filter" label="Filter">
                <ng-template fdSidePanelContent>Filter content</ng-template>
            </fd-side-panel-item>
            <fd-side-panel-item id="layout" icon="menu2" label="Layout">
                <ng-template fdSidePanelContent>Layout content</ng-template>
            </fd-side-panel-item>
            <fd-side-panel-item id="tasks" icon="task" label="Tasks" [disabled]="true">
                <ng-template fdSidePanelContent>Tasks content</ng-template>
            </fd-side-panel-item>
        </fd-side-panel>
    `,
    imports: [SidePanelComponent, SidePanelItemComponent, SidePanelContentDirective]
})
class TestHostComponent {
    readonly side = signal<SidePanelSide>('right');
    activeItem: string | null = null;
    mode: SidePanelMode = 'collapsed';
}

@Component({
    selector: 'fd-single-action-test-host',
    template: `
        <fd-side-panel [(open)]="open" [(activeItem)]="activeItem" ariaLabel="Single group">
            <fd-side-panel-item id="filter" icon="filter" label="Filter">
                <ng-template fdSidePanelContent>Filter content</ng-template>
            </fd-side-panel-item>
        </fd-side-panel>
    `,
    imports: [SidePanelComponent, SidePanelItemComponent, SidePanelContentDirective]
})
class SingleActionTestHostComponent {
    open = false;
    activeItem: string | null = null;
}

@Component({
    selector: 'fd-counter-badge-test-host',
    template: `
        <fd-side-panel ariaLabel="Groups">
            <fd-side-panel-item id="a" icon="filter" label="Filter" [counter]="counter()">
                <ng-template fdSidePanelContent></ng-template>
            </fd-side-panel-item>
            <fd-side-panel-item id="b" icon="menu2" label="Layout">
                <ng-template fdSidePanelContent></ng-template>
            </fd-side-panel-item>
        </fd-side-panel>
    `,
    imports: [SidePanelComponent, SidePanelItemComponent, SidePanelContentDirective]
})
class CounterBadgeTestHostComponent {
    readonly counter = signal<number | undefined>(undefined);
}

// The interactive element per item is the <li role="option"> (UI5 listbox/option model).
function getOptions(fixture: ComponentFixture<unknown>): HTMLElement[] {
    return Array.from(fixture.nativeElement.querySelectorAll('.fd-side-panel__list [role="option"]'));
}

function getToolbar(fixture: ComponentFixture<unknown>): HTMLElement {
    return fixture.nativeElement.querySelector('.fd-side-panel__toolbar');
}

function getNavArrow(fixture: ComponentFixture<unknown>): HTMLButtonElement {
    return fixture.nativeElement.querySelector('.fd-side-panel__nav-arrow');
}

describe('SidePanelComponent', () => {
    let host: TestHostComponent;
    let fixture: ComponentFixture<TestHostComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [TestHostComponent]
        }).compileComponents();
    }));

    beforeEach(async () => {
        fixture = TestBed.createComponent(TestHostComponent);
        host = fixture.componentInstance;
        fixture.detectChanges();
        await fixture.whenStable();
    });

    it('should render one option per projected item', () => {
        expect(getOptions(fixture).length).toBe(3);
    });

    it('should position the action bar according to `side`', () => {
        const panel: HTMLElement = fixture.nativeElement.querySelector('.fd-side-panel');
        expect(panel.classList).toContain('fd-side-panel--right');

        host.side.set('left');
        fixture.detectChanges();
        expect(panel.classList).toContain('fd-side-panel--left');
    });

    it('should expose the whole panel as a region labelled "Side Panel"', () => {
        const hostEl: HTMLElement = fixture.nativeElement.querySelector('.fd-side-panel');
        expect(hostEl.getAttribute('role')).toBe('region');
        expect(hostEl.getAttribute('aria-label')).toBe('Side Panel');
    });

    it('should render a vertical toolbar wrapping a single-select listbox with its aria-label', () => {
        const toolbar = getToolbar(fixture);
        expect(toolbar.getAttribute('role')).toBe('toolbar');
        expect(toolbar.getAttribute('aria-orientation')).toBe('vertical');

        const listbox: HTMLElement = fixture.nativeElement.querySelector('.fd-side-panel__list');
        expect(listbox.getAttribute('role')).toBe('listbox');
        expect(listbox.getAttribute('aria-multiselectable')).toBe('false');
        expect(listbox.getAttribute('aria-label')).toBe('Groups');
    });

    it('should expose options with posinset/setsize and the group name', () => {
        const [filter, , tasks] = getOptions(fixture);
        expect(filter.getAttribute('role')).toBe('option');
        expect(filter.getAttribute('aria-label')).toBe('Filter');
        expect(filter.getAttribute('title')).toBe('Filter');
        expect(filter.getAttribute('aria-posinset')).toBe('1');
        expect(filter.getAttribute('aria-setsize')).toBe('3');
        expect(tasks.getAttribute('aria-disabled')).toBe('true');
    });

    it('should activate an item on click and emit activeItemChange via two-way binding', () => {
        const [filter] = getOptions(fixture);
        filter.click();
        fixture.detectChanges();

        expect(host.activeItem).toBe('filter');
        expect(filter.classList).toContain('is-active');
        expect(filter.getAttribute('aria-selected')).toBe('true');
    });

    it('should toggle the active item off when its option is clicked again', () => {
        const [filter] = getOptions(fixture);
        filter.click();
        fixture.detectChanges();
        expect(host.activeItem).toBe('filter');

        filter.click();
        fixture.detectChanges();
        expect(host.activeItem).toBeNull();
        expect(filter.classList).not.toContain('is-active');
        expect(filter.getAttribute('aria-selected')).toBe('false');
    });

    it('should not activate a disabled item', () => {
        const disabled = getOptions(fixture)[2];
        expect(disabled.getAttribute('aria-disabled')).toBe('true');

        disabled.click();
        fixture.detectChanges();

        expect(host.activeItem).toBeNull();
    });

    it('should activate the focused option on Enter', () => {
        const [, layout] = getOptions(fixture);
        getToolbar(fixture).dispatchEvent(
            new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true, cancelable: true })
        );
        fixture.detectChanges();
        getToolbar(fixture).dispatchEvent(
            new KeyboardEvent('keydown', { key: 'Enter', bubbles: true, cancelable: true })
        );
        fixture.detectChanges();

        expect(host.activeItem).toBe('layout');
        expect(layout.getAttribute('aria-selected')).toBe('true');
    });

    it('should use a roving tabindex, defaulting the first item to tabindex 0', () => {
        const [first, second] = getOptions(fixture);
        expect(first.getAttribute('tabindex')).toBe('0');
        expect(second.getAttribute('tabindex')).toBe('-1');
    });

    it('should move roving focus with ArrowDown and skip disabled items', () => {
        const [first, second, disabled] = getOptions(fixture);
        const toolbar = getToolbar(fixture);

        toolbar.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true, cancelable: true }));
        fixture.detectChanges();
        expect(second.getAttribute('tabindex')).toBe('0');
        expect(first.getAttribute('tabindex')).toBe('-1');

        // Wraps past the disabled third item back to the first.
        toolbar.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true, cancelable: true }));
        fixture.detectChanges();
        expect(first.getAttribute('tabindex')).toBe('0');
        expect(disabled.getAttribute('tabindex')).toBe('-1');
    });

    describe('mode toggle (multi-action)', () => {
        it('should default to collapsed mode', () => {
            const panel: HTMLElement = fixture.nativeElement.querySelector('.fd-side-panel');
            expect(panel.classList).not.toContain('fd-side-panel--expanded');
        });

        it('should add expanded class when nav arrow is clicked', () => {
            const navArrow = getNavArrow(fixture);
            navArrow.click();
            fixture.detectChanges();

            const panel: HTMLElement = fixture.nativeElement.querySelector('.fd-side-panel');
            expect(panel.classList).toContain('fd-side-panel--expanded');
            expect(host.mode).toBe('expanded');
        });

        it('should return to collapsed mode on second nav arrow click', () => {
            const navArrow = getNavArrow(fixture);
            navArrow.click();
            fixture.detectChanges();
            navArrow.click();
            fixture.detectChanges();

            const panel: HTMLElement = fixture.nativeElement.querySelector('.fd-side-panel');
            expect(panel.classList).not.toContain('fd-side-panel--expanded');
            expect(host.mode).toBe('collapsed');
        });

        it('should show action labels in icons-label mode', () => {
            const navArrow = getNavArrow(fixture);
            navArrow.click();
            fixture.detectChanges();

            const labels = fixture.nativeElement.querySelectorAll('.fd-side-panel__action-label');
            expect(labels.length).toBeGreaterThan(0);
        });

        it('nav arrow aria-expanded reflects mode state', () => {
            const navArrow = getNavArrow(fixture);
            expect(navArrow.getAttribute('aria-expanded')).toBe('false');

            navArrow.click();
            fixture.detectChanges();
            expect(navArrow.getAttribute('aria-expanded')).toBe('true');
        });

        it('should collapse the bar and open content when an item is clicked in expanded mode', () => {
            const navArrow = getNavArrow(fixture);
            navArrow.click();
            fixture.detectChanges();
            expect(host.mode).toBe('expanded');

            const [filterOption] = getOptions(fixture);
            filterOption.click();
            fixture.detectChanges();

            expect(host.mode).toBe('collapsed');
            expect(host.activeItem).toBe('filter');

            const panel: HTMLElement = fixture.nativeElement.querySelector('.fd-side-panel');
            expect(panel.classList).not.toContain('fd-side-panel--expanded');
        });
    });
});

describe('SidePanelComponent — single-action', () => {
    let host: SingleActionTestHostComponent;
    let fixture: ComponentFixture<SingleActionTestHostComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [SingleActionTestHostComponent]
        }).compileComponents();
    }));

    beforeEach(async () => {
        fixture = TestBed.createComponent(SingleActionTestHostComponent);
        host = fixture.componentInstance;
        fixture.detectChanges();
        await fixture.whenStable();
    });

    it('should not render action buttons in single-action mode', () => {
        const actionButtons = fixture.nativeElement.querySelectorAll('.fd-side-panel__action');
        expect(actionButtons.length).toBe(0);
    });

    it('should render the nav arrow', () => {
        expect(getNavArrow(fixture)).not.toBeNull();
    });

    it('nav arrow click should open the panel and set activeItem', () => {
        const navArrow = getNavArrow(fixture);
        navArrow.click();
        fixture.detectChanges();

        expect(host.open).toBe(true);
        expect(host.activeItem).toBe('filter');
    });

    it('second nav arrow click should close the panel and clear activeItem', () => {
        const navArrow = getNavArrow(fixture);
        navArrow.click();
        fixture.detectChanges();
        navArrow.click();
        fixture.detectChanges();

        expect(host.open).toBe(false);
        expect(host.activeItem).toBeNull();
    });

    it('nav arrow aria-expanded reflects open state', () => {
        const navArrow = getNavArrow(fixture);
        expect(navArrow.getAttribute('aria-expanded')).toBe('false');

        navArrow.click();
        fixture.detectChanges();
        expect(navArrow.getAttribute('aria-expanded')).toBe('true');
    });

    it('should close the panel on Escape', () => {
        const navArrow = getNavArrow(fixture);
        navArrow.click();
        fixture.detectChanges();
        expect(host.open).toBe(true);

        const sidePanelEl: HTMLElement = fixture.nativeElement.querySelector('fd-side-panel');
        sidePanelEl.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true, cancelable: true }));
        fixture.detectChanges();

        expect(host.open).toBe(false);
        expect(host.activeItem).toBeNull();
    });

    it('should move focus to the close button when the panel opens', async () => {
        const navArrow = getNavArrow(fixture);
        navArrow.click();
        fixture.detectChanges();
        // Focus is moved into the content panel on the next animation frame so Esc keeps working
        // (the action bar — and its nav arrow — is display:none while a single-action panel is open).
        await new Promise<void>((resolve) => requestAnimationFrame(() => resolve()));
        fixture.detectChanges();

        const closeButton = fixture.nativeElement.querySelector('.fd-side-panel__content-panel-close');
        expect(document.activeElement).toBe(closeButton);
    });
});

describe('SidePanelComponent — counter', () => {
    let host: CounterBadgeTestHostComponent;
    let fixture: ComponentFixture<CounterBadgeTestHostComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [CounterBadgeTestHostComponent]
        }).compileComponents();
    }));

    beforeEach(async () => {
        fixture = TestBed.createComponent(CounterBadgeTestHostComponent);
        host = fixture.componentInstance;
        fixture.detectChanges();
        await fixture.whenStable();
    });

    it('should not render counter when counter input is not set', () => {
        const counter = fixture.nativeElement.querySelector('.fd-side-panel__action-counter');
        expect(counter).toBeNull();
    });

    it('should render counter with the given value', () => {
        host.counter.set(5);
        fixture.detectChanges();

        const counter = fixture.nativeElement.querySelector('.fd-side-panel__action-counter');
        expect(counter).not.toBeNull();
        expect(counter.textContent.trim()).toBe('5');
    });

    it('should render 99+ when counter exceeds 99', () => {
        host.counter.set(100);
        fixture.detectChanges();

        const counter = fixture.nativeElement.querySelector('.fd-side-panel__action-counter');
        expect(counter.textContent.trim()).toBe('99+');
    });

    it('should render exactly 99 without capping', () => {
        host.counter.set(99);
        fixture.detectChanges();

        const counter = fixture.nativeElement.querySelector('.fd-side-panel__action-counter');
        expect(counter.textContent.trim()).toBe('99');
    });
});

@Component({
    selector: 'fd-content-panel-test-host',
    template: `
        <fd-side-panel [(open)]="open" [(activeItem)]="activeItem" ariaLabel="Groups" [resizable]="true">
            <fd-side-panel-item id="filter" icon="filter" label="Filter">
                <ng-template fdSidePanelContent>Filter content</ng-template>
            </fd-side-panel-item>
            <fd-side-panel-item id="layout" icon="menu2" label="Layout">
                <ng-template fdSidePanelContent>Layout content</ng-template>
            </fd-side-panel-item>
        </fd-side-panel>
    `,
    imports: [SidePanelComponent, SidePanelItemComponent, SidePanelContentDirective]
})
class ContentPanelTestHostComponent {
    open = false;
    activeItem: string | null = null;
}

describe('SidePanelComponent — content panel', () => {
    let host: ContentPanelTestHostComponent;
    let fixture: ComponentFixture<ContentPanelTestHostComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [ContentPanelTestHostComponent]
        }).compileComponents();
    }));

    beforeEach(async () => {
        fixture = TestBed.createComponent(ContentPanelTestHostComponent);
        host = fixture.componentInstance;
        fixture.detectChanges();
        await fixture.whenStable();
    });

    it('should not render content panel when open is false', () => {
        const panel = fixture.nativeElement.querySelector('.fd-side-panel__content-panel');
        expect(panel).toBeNull();
    });

    it('should render content panel when an action is clicked', () => {
        const [filterButton] = Array.from<HTMLButtonElement>(
            fixture.nativeElement.querySelectorAll('.fd-side-panel__action')
        );
        filterButton.click();
        fixture.detectChanges();

        expect(host.open).toBe(true);
        expect(host.activeItem).toBe('filter');

        const panel = fixture.nativeElement.querySelector('.fd-side-panel__content-panel');
        expect(panel).not.toBeNull();
    });

    it('should render the active group content inside the panel body', () => {
        const [filterButton] = Array.from<HTMLButtonElement>(
            fixture.nativeElement.querySelectorAll('.fd-side-panel__action')
        );
        filterButton.click();
        fixture.detectChanges();

        const body = fixture.nativeElement.querySelector('.fd-side-panel__content-panel-body');
        expect(body.textContent).toContain('Filter content');
    });

    it('should show the active group name in the panel header', () => {
        const [filterButton] = Array.from<HTMLButtonElement>(
            fixture.nativeElement.querySelectorAll('.fd-side-panel__action')
        );
        filterButton.click();
        fixture.detectChanges();

        const title = fixture.nativeElement.querySelector('.fd-side-panel__content-panel-title');
        expect(title.textContent.trim()).toBe('Filter');
    });

    it('should close the content panel when clicking the active action button again', () => {
        const [filterButton] = Array.from<HTMLButtonElement>(
            fixture.nativeElement.querySelectorAll('.fd-side-panel__action')
        );
        filterButton.click();
        fixture.detectChanges();
        expect(host.open).toBe(true);

        filterButton.click();
        fixture.detectChanges();
        expect(host.open).toBe(false);
        expect(host.activeItem).toBeNull();

        const panel = fixture.nativeElement.querySelector('.fd-side-panel__content-panel');
        expect(panel).toBeNull();
    });

    it('should close the content panel via the close button', () => {
        const [filterButton] = Array.from<HTMLButtonElement>(
            fixture.nativeElement.querySelectorAll('.fd-side-panel__action')
        );
        filterButton.click();
        fixture.detectChanges();

        const closeButton: HTMLButtonElement = fixture.nativeElement.querySelector(
            '.fd-side-panel__content-panel-close'
        );
        closeButton.click();
        fixture.detectChanges();

        expect(host.open).toBe(false);
        expect(host.activeItem).toBeNull();
        expect(fixture.nativeElement.querySelector('.fd-side-panel__content-panel')).toBeNull();
    });

    it('should return focus to the option when the close button is clicked', () => {
        const [filterOption] = Array.from<HTMLElement>(
            fixture.nativeElement.querySelectorAll('.fd-side-panel__list [role="option"]')
        );
        filterOption.click();
        fixture.detectChanges();

        const closeButton: HTMLButtonElement = fixture.nativeElement.querySelector(
            '.fd-side-panel__content-panel-close'
        );
        closeButton.click();
        fixture.detectChanges();

        expect(document.activeElement).toBe(filterOption);
    });

    it('should switch active group without closing when another action is clicked', () => {
        const [filterButton, layoutButton] = Array.from<HTMLButtonElement>(
            fixture.nativeElement.querySelectorAll('.fd-side-panel__action')
        );
        filterButton.click();
        fixture.detectChanges();
        expect(host.activeItem).toBe('filter');

        layoutButton.click();
        fixture.detectChanges();
        expect(host.open).toBe(true);
        expect(host.activeItem).toBe('layout');

        const body = fixture.nativeElement.querySelector('.fd-side-panel__content-panel-body');
        expect(body.textContent).toContain('Layout content');
    });

    it('should set role="region" and aria-label on the content panel', () => {
        const [filterButton] = Array.from<HTMLButtonElement>(
            fixture.nativeElement.querySelectorAll('.fd-side-panel__action')
        );
        filterButton.click();
        fixture.detectChanges();

        const panel: HTMLElement = fixture.nativeElement.querySelector('.fd-side-panel__content-panel');
        expect(panel.getAttribute('role')).toBe('region');
        expect(panel.getAttribute('aria-label')).toBe('Filter');
    });

    it('should close the content panel when Escape is pressed on the host', () => {
        const [filterButton] = Array.from<HTMLButtonElement>(
            fixture.nativeElement.querySelectorAll('.fd-side-panel__action')
        );
        filterButton.click();
        fixture.detectChanges();
        expect(host.open).toBe(true);

        const sidePanelEl: HTMLElement = fixture.nativeElement.querySelector('fd-side-panel');
        sidePanelEl.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true, cancelable: true }));
        fixture.detectChanges();

        expect(host.open).toBe(false);
        expect(host.activeItem).toBeNull();
        expect(fixture.nativeElement.querySelector('.fd-side-panel__content-panel')).toBeNull();
    });
});

@Component({
    selector: 'fd-overflow-test-host',
    template: `
        <fd-side-panel ariaLabel="Groups">
            <fd-side-panel-item id="filter" icon="filter" label="Filter">
                <ng-template fdSidePanelContent>Filter content</ng-template>
            </fd-side-panel-item>
            <fd-side-panel-item id="layout" icon="menu2" label="Layout">
                <ng-template fdSidePanelContent>Layout content</ng-template>
            </fd-side-panel-item>
            <fd-side-panel-item id="tasks" icon="task" label="Tasks">
                <ng-template fdSidePanelContent>Tasks content</ng-template>
            </fd-side-panel-item>
            <fd-side-panel-item id="settings" icon="action-settings" label="Settings">
                <ng-template fdSidePanelContent>Settings content</ng-template>
            </fd-side-panel-item>
        </fd-side-panel>
    `,
    imports: [SidePanelComponent, SidePanelItemComponent, SidePanelContentDirective]
})
class OverflowTestHostComponent {}

describe('SidePanelComponent — overflow', () => {
    let fixture: ComponentFixture<OverflowTestHostComponent>;

    function getSidePanel(): SidePanelComponent {
        return fixture.debugElement.query(By.directive(SidePanelComponent)).componentInstance as SidePanelComponent;
    }

    function setMeasurements(avail: number, navH: number, itemH: number, gap: number): void {
        const comp = getSidePanel();
        (comp as any)['_availBarHeight'].set(avail);
        (comp as any)['_navContainerH'].set(navH);
        (comp as any)['_itemContainerH'].set(itemH);
        (comp as any)['_itemGapPx'].set(gap);
        fixture.detectChanges();
    }

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [OverflowTestHostComponent]
        }).compileComponents();
    }));

    beforeEach(async () => {
        fixture = TestBed.createComponent(OverflowTestHostComponent);
        fixture.detectChanges();
        await fixture.whenStable();
    });

    it('should not render overflow toggle when all items fit', () => {
        // 4 items each 48px + 4px gap, 60px nav, 300px bar — all fit
        setMeasurements(300, 60, 48, 4);
        const toggle = fixture.nativeElement.querySelector('.fd-side-panel__overflow-toggle');
        expect(toggle).toBeNull();
    });

    it('should render overflow toggle when items exceed available height', () => {
        // avail=200, nav=60, itemH=48, gap=4 → maxFit=Math.floor(140/52)=2, visible=1, overflow toggle shown
        setMeasurements(200, 60, 48, 4);
        const toggle = fixture.nativeElement.querySelector('.fd-side-panel__overflow-toggle');
        expect(toggle).not.toBeNull();
    });

    it('should hide option elements beyond visibleItemCount', () => {
        // visible=1 → options at index 1, 2, 3 get overflow-hidden class
        setMeasurements(200, 60, 48, 4);
        const options = Array.from<HTMLElement>(
            fixture.nativeElement.querySelectorAll('.fd-side-panel__list [role="option"]')
        );
        const hidden = options.filter((el) =>
            el.classList.contains('fd-side-panel__action-container--overflow-hidden')
        );
        expect(hidden.length).toBeGreaterThan(0);
    });

    it('should wire the overflow toggle as an fd-menu trigger', () => {
        setMeasurements(200, 60, 48, 4);
        const toggle: HTMLElement = fixture.nativeElement.querySelector('.fd-side-panel__overflow-toggle');
        // [fdMenuTrigger] sets aria-haspopup; jsdom renders "true", real browsers "menu" — both are valid.
        expect(['menu', 'true']).toContain(toggle.getAttribute('aria-haspopup') ?? '');
        expect(toggle.getAttribute('aria-expanded')).toBe('false');
    });

    it('should activate an overflow item without focusing its hidden option', () => {
        setMeasurements(200, 60, 48, 4);
        const comp = getSidePanel();
        const overflowItems = (comp as any)['overflowItems']();
        expect(overflowItems.length).toBeGreaterThan(0);

        (comp as any)['activateOverflowItem'](overflowItems[0]);
        fixture.detectChanges();

        expect(comp.activeItem()).toBe(overflowItems[0].id());
        expect(comp.open()).toBe(true);
    });

    it('should toggle an overflow item off when activated twice', () => {
        setMeasurements(200, 60, 48, 4);
        const comp = getSidePanel();
        const item = (comp as any)['overflowItems']()[0];

        (comp as any)['activateOverflowItem'](item);
        fixture.detectChanges();
        expect(comp.activeItem()).toBe(item.id());

        (comp as any)['activateOverflowItem'](item);
        fixture.detectChanges();
        expect(comp.activeItem()).toBeNull();
        expect(comp.open()).toBe(false);
    });
});

describe('SidePanelComponent — keyboard shortcuts & announcements', () => {
    let fixture: ComponentFixture<TestHostComponent>;

    function getHostEl(): HTMLElement {
        return fixture.nativeElement.querySelector('fd-side-panel');
    }

    function getOptionEls(): HTMLElement[] {
        return Array.from(fixture.nativeElement.querySelectorAll('.fd-side-panel__list [role="option"]'));
    }

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [TestHostComponent]
        }).compileComponents();
    }));

    beforeEach(async () => {
        fixture = TestBed.createComponent(TestHostComponent);
        fixture.detectChanges();
        await fixture.whenStable();
    });

    it('should toggle expanded mode on a global Shift+Ctrl/Cmd+P (focus outside the panel)', () => {
        const host = fixture.componentInstance;
        expect(host.mode).toBe('collapsed');

        // Dispatched from document.body — focus is NOT inside the panel — to prove the
        // shortcut is global (handled by the document listener, not the host listener).
        document.body.dispatchEvent(
            new KeyboardEvent('keydown', { key: 'P', code: 'KeyP', shiftKey: true, ctrlKey: true, bubbles: true })
        );
        fixture.detectChanges();
        expect(host.mode).toBe('expanded');

        document.body.dispatchEvent(
            new KeyboardEvent('keydown', { key: 'P', code: 'KeyP', shiftKey: true, metaKey: true, bubbles: true })
        );
        fixture.detectChanges();
        expect(host.mode).toBe('collapsed');
    });

    it('should announce the new state when toggling via the nav arrow', () => {
        const announcer = TestBed.inject(LiveAnnouncer);
        const spy = jest.spyOn(announcer, 'announce');

        const navArrow: HTMLButtonElement = fixture.nativeElement.querySelector('.fd-side-panel__nav-arrow');
        navArrow.click();
        fixture.detectChanges();
        expect(spy).toHaveBeenCalledWith('Side panel expanded');

        navArrow.click();
        fixture.detectChanges();
        expect(spy).toHaveBeenCalledWith('Side panel collapsed');
    });

    it('should move focus between the active option and the open content panel with F6', () => {
        const [, layout] = getOptionEls();
        layout.click(); // activates "layout" and opens the content panel
        fixture.detectChanges();

        const contentPanel: HTMLElement = fixture.nativeElement.querySelector('.fd-side-panel__content-panel');
        expect(contentPanel).not.toBeNull();

        // F6 → into the content panel
        getHostEl().dispatchEvent(new KeyboardEvent('keydown', { key: 'F6', bubbles: true, cancelable: true }));
        fixture.detectChanges();
        expect(document.activeElement).toBe(contentPanel);

        // F6 again → back to the active option
        getHostEl().dispatchEvent(new KeyboardEvent('keydown', { key: 'F6', bubbles: true, cancelable: true }));
        fixture.detectChanges();
        expect(document.activeElement).toBe(layout);
    });
});

describe('SidePanelComponent — resize state & splitter', () => {
    let host: ContentPanelTestHostComponent;
    let fixture: ComponentFixture<ContentPanelTestHostComponent>;
    let component: SidePanelComponent;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [ContentPanelTestHostComponent]
        }).compileComponents();
    }));

    beforeEach(async () => {
        fixture = TestBed.createComponent(ContentPanelTestHostComponent);
        host = fixture.componentInstance;
        host.open = true;
        host.activeItem = 'filter';
        fixture.detectChanges();
        await fixture.whenStable();
        component = fixture.debugElement.query(By.directive(SidePanelComponent))
            .componentInstance as SidePanelComponent;
    });

    describe('resize state', () => {
        it('contentPanelWidthStyle uses content-panel default (15.75rem) when panel is open, before any resize', () => {
            // open = true is set in beforeEach; collapsed bar (4.25rem) + 15.75rem = 20rem total footprint.
            expect(component['contentPanelWidthStyle']()).toBe('15.75rem');
        });

        it('contentPanelWidthStyle falls back to defaultWidth when panel is closed (expanded action bar mode)', () => {
            component.open.set(false);
            fixture.detectChanges();
            expect(component['contentPanelWidthStyle']()).toBe(component.defaultWidth());
        });

        it('contentPanelWidthStyle returns px once resized', () => {
            component['contentPanelWidthPx'].set(260);
            expect(component['contentPanelWidthStyle']()).toBe('260px');
        });
    });

    describe('splitter bar', () => {
        beforeEach(() => {
            // The splitter only renders in push mode (host ≥ 1024px); clientWidth is 0 in jsdom.
            (component as any)._hostWidthPx.set(1600);
            fixture.detectChanges();
        });

        it('renders a separator at the side panel edge (outside the content panel)', () => {
            const bar = fixture.nativeElement.querySelector('.fd-side-panel > fd-resize-splitter');
            expect(bar).toBeTruthy();
            expect(bar.getAttribute('role')).toBe('separator');
            // the splitter is a host-level sibling of the content panel, not a child of it
            expect(fixture.nativeElement.querySelector('.fd-side-panel__content-panel fd-resize-splitter')).toBeNull();
        });

        it('updates contentPanelWidthPx when the splitter emits a new size', () => {
            const bar = fixture.nativeElement.querySelector('fd-resize-splitter') as HTMLElement;
            component['measureBounds']();
            bar.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowLeft', bubbles: true }));
            fixture.detectChanges();
            expect(component['contentPanelWidthPx']()).not.toBeNull();
        });
    });

    describe('width menu', () => {
        beforeEach(() => {
            // The splitter only renders in push mode (host ≥ 1024px); clientWidth is 0 in jsdom.
            (component as any)._hostWidthPx.set(1600);
            fixture.detectChanges();
            component['measureBounds']();
            component['resizeMinPx'].set(150);
            component['resizeMaxPx'].set(500);
        });

        it('right-click opens the menu and suppresses the native menu', () => {
            const bar = fixture.nativeElement.querySelector('fd-resize-splitter') as HTMLElement;
            const evt = new MouseEvent('contextmenu', { bubbles: true, cancelable: true });
            bar.dispatchEvent(evt);
            fixture.detectChanges();
            expect(evt.defaultPrevented).toBe(true);
            expect(component['widthMenu']()?.isOpen()).toBe(true);
        });

        it('expandToMax sets width to the max bound', () => {
            component['setWidthToMax']();
            expect(component['contentPanelWidthPx']()).toBe(500);
        });

        it('collapseToMin sets width to the min bound', () => {
            component['setWidthToMin']();
            expect(component['contentPanelWidthPx']()).toBe(150);
        });

        it('resetToDefault reverts to the resolved default px value', () => {
            component['contentPanelWidthPx'].set(300);
            component['resetWidthToDefault']();
            const defaultPx = component['resizeDefaultPx']();
            expect(component['contentPanelWidthPx']()).toBe(defaultPx);
            expect(component['contentPanelWidthStyle']()).toBe(`${defaultPx}px`);
        });

        it('Shift+F10 on the bar opens the menu', () => {
            const bar = fixture.nativeElement.querySelector('fd-resize-splitter') as HTMLElement;
            bar.dispatchEvent(new KeyboardEvent('keydown', { key: 'F10', shiftKey: true, bubbles: true }));
            fixture.detectChanges();
            expect(component['widthMenu']()?.isOpen()).toBe(true);
        });
    });
});

@Component({
    selector: 'fd-main-slot-test-host',
    template: `
        <fd-side-panel ariaLabel="Groups" [resizable]="true">
            <fd-side-panel-main><p id="page">Page body</p></fd-side-panel-main>
            <fd-side-panel-item id="filter" icon="filter" label="Filter">
                <ng-template fdSidePanelContent>Filter content</ng-template>
            </fd-side-panel-item>
            <fd-side-panel-item id="layout" icon="menu2" label="Layout">
                <ng-template fdSidePanelContent>Layout content</ng-template>
            </fd-side-panel-item>
        </fd-side-panel>
    `,
    imports: [SidePanelComponent, SidePanelItemComponent, SidePanelMainComponent, SidePanelContentDirective]
})
class MainSlotTestHostComponent {}

describe('SidePanel main-content slot', () => {
    it('projects fd-side-panel-main content', () => {
        TestBed.configureTestingModule({ imports: [MainSlotTestHostComponent] });
        const fixture = TestBed.createComponent(MainSlotTestHostComponent);
        fixture.detectChanges();
        expect(fixture.nativeElement.querySelector('#page')?.textContent).toBe('Page body');
        expect(fixture.nativeElement.querySelector('.fd-side-panel__main-container')).toBeTruthy();
    });

    it('toggles the --push host class with host width (pushMode)', () => {
        TestBed.configureTestingModule({ imports: [MainSlotTestHostComponent] });
        const fixture = TestBed.createComponent(MainSlotTestHostComponent);
        fixture.detectChanges();
        const panel = fixture.debugElement.query(By.directive(SidePanelComponent))
            .componentInstance as SidePanelComponent;
        const hostEl = fixture.debugElement.query(By.directive(SidePanelComponent)).nativeElement as HTMLElement;

        (panel as any)._hostWidthPx.set(1600);
        fixture.detectChanges();
        expect(hostEl.classList.contains('fd-side-panel--push')).toBe(true);

        (panel as any)._hostWidthPx.set(1000);
        fixture.detectChanges();
        expect(hostEl.classList.contains('fd-side-panel--push')).toBe(false);
    });
});

@Component({
    selector: 'fd-main-slot-not-resizable-test-host',
    template: `
        <fd-side-panel ariaLabel="Groups" [resizable]="false">
            <fd-side-panel-main><p>Page body</p></fd-side-panel-main>
            <fd-side-panel-item id="filter" icon="filter" label="Filter">
                <ng-template fdSidePanelContent>Filter content</ng-template>
            </fd-side-panel-item>
            <fd-side-panel-item id="layout" icon="menu2" label="Layout">
                <ng-template fdSidePanelContent>Layout content</ng-template>
            </fd-side-panel-item>
        </fd-side-panel>
    `,
    imports: [SidePanelComponent, SidePanelItemComponent, SidePanelMainComponent, SidePanelContentDirective]
})
class MainSlotNotResizableTestHostComponent {}

describe('SidePanel resizable splitter', () => {
    function openPush(fixture: ComponentFixture<unknown>, width: number): SidePanelComponent {
        const panel = fixture.debugElement.query(By.directive(SidePanelComponent))
            .componentInstance as SidePanelComponent;
        (panel as any)._hostWidthPx.set(width);
        panel.activeItem.set('filter');
        panel.open.set(true);
        fixture.detectChanges();
        return panel;
    }

    it('renders fd-resize-splitter when resizable, push mode, and open', () => {
        TestBed.configureTestingModule({ imports: [MainSlotTestHostComponent] });
        const fixture = TestBed.createComponent(MainSlotTestHostComponent);
        fixture.detectChanges();
        openPush(fixture, 1600);
        expect(fixture.nativeElement.querySelector('fd-resize-splitter')).toBeTruthy();
    });

    it('does NOT render the splitter in overlay mode (<1024)', () => {
        TestBed.configureTestingModule({ imports: [MainSlotTestHostComponent] });
        const fixture = TestBed.createComponent(MainSlotTestHostComponent);
        fixture.detectChanges();
        openPush(fixture, 1000);
        expect(fixture.nativeElement.querySelector('fd-resize-splitter')).toBeFalsy();
    });

    it('does NOT render the splitter when resizable=false', () => {
        TestBed.configureTestingModule({ imports: [MainSlotNotResizableTestHostComponent] });
        const fixture = TestBed.createComponent(MainSlotNotResizableTestHostComponent);
        fixture.detectChanges();
        openPush(fixture, 1600);
        expect(fixture.nativeElement.querySelector('fd-resize-splitter')).toBeFalsy();
    });

    it('seeds separator ARIA as soon as the splitter appears (before any interaction)', () => {
        TestBed.configureTestingModule({ imports: [MainSlotTestHostComponent] });
        const fixture = TestBed.createComponent(MainSlotTestHostComponent);
        fixture.detectChanges();
        openPush(fixture, 1600);
        const splitter = fixture.nativeElement.querySelector('fd-resize-splitter');
        expect(splitter.getAttribute('aria-valuenow')).not.toBeNull();
    });

    it('double-click cycles default -> max -> min -> default', () => {
        TestBed.configureTestingModule({ imports: [MainSlotTestHostComponent] });
        const fixture = TestBed.createComponent(MainSlotTestHostComponent);
        fixture.detectChanges();
        const panel = openPush(fixture, 1600);
        // cycleWidth() re-measures from the DOM; jsdom has no layout, so stub measureBounds
        // to keep the bounds we set below. The cycle logic is what this test verifies.
        jest.spyOn(panel as any, 'measureBounds').mockImplementation(() => {});
        (panel as any).resizeDefaultPx.set(250);
        (panel as any).resizeMaxPx.set(400);
        (panel as any).resizeMinPx.set(100);

        (panel as any).cycleWidth(); // 1st -> max
        expect((panel as any).contentPanelWidthPx()).toBe(400);
        (panel as any).cycleWidth(); // 2nd -> min
        expect((panel as any).contentPanelWidthPx()).toBe(100);
        (panel as any).cycleWidth(); // 3rd -> default
        expect((panel as any).contentPanelWidthPx()).toBe(250);
    });
});
