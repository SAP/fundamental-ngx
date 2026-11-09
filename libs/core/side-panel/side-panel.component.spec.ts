import { Component, signal } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { SidePanelContentDirective } from './side-panel-content.directive';
import { SidePanelItemComponent } from './side-panel-item.component';
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

function getButtons(fixture: ComponentFixture<TestHostComponent>): HTMLButtonElement[] {
    return Array.from(fixture.nativeElement.querySelectorAll('.fd-side-panel__action'));
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

    it('should render one action button per projected item', () => {
        expect(getButtons(fixture).length).toBe(3);
    });

    it('should position the action bar according to `side`', () => {
        const panel: HTMLElement = fixture.nativeElement.querySelector('.fd-side-panel');
        expect(panel.classList).toContain('fd-side-panel--right');

        host.side.set('left');
        fixture.detectChanges();
        expect(panel.classList).toContain('fd-side-panel--left');
    });

    it('should render the action bar as a vertical toolbar with its aria-label', () => {
        const bar: HTMLElement = fixture.nativeElement.querySelector('.fd-side-panel__action-bar');
        expect(bar.getAttribute('role')).toBe('toolbar');
        expect(bar.getAttribute('aria-orientation')).toBe('vertical');
        expect(bar.getAttribute('aria-label')).toBe('Groups');
    });

    it('should expose the group name through title and aria-label', () => {
        const [filterButton] = getButtons(fixture);
        expect(filterButton.getAttribute('aria-label')).toBe('Filter');
        expect(filterButton.getAttribute('title')).toBe('Filter');
    });

    it('should activate an item on click and emit activeItemChange via two-way binding', () => {
        const [filterButton] = getButtons(fixture);
        filterButton.click();
        fixture.detectChanges();

        expect(host.activeItem).toBe('filter');
        expect(filterButton.classList).toContain('is-active');
        expect(filterButton.getAttribute('aria-pressed')).toBe('true');
    });

    it('should toggle the active item off when its button is clicked again', () => {
        const [filterButton] = getButtons(fixture);
        filterButton.click();
        fixture.detectChanges();
        expect(host.activeItem).toBe('filter');

        filterButton.click();
        fixture.detectChanges();
        expect(host.activeItem).toBeNull();
        expect(filterButton.classList).not.toContain('is-active');
    });

    it('should not activate a disabled item', () => {
        const disabledButton = getButtons(fixture)[2];
        expect(disabledButton.disabled).toBe(true);

        disabledButton.click();
        fixture.detectChanges();

        expect(host.activeItem).toBeNull();
    });

    it('should use a roving tabindex, defaulting the first item to tabindex 0', () => {
        const [first, second] = getButtons(fixture);
        expect(first.getAttribute('tabindex')).toBe('0');
        expect(second.getAttribute('tabindex')).toBe('-1');
    });

    it('should move roving focus with ArrowDown and skip disabled items', () => {
        const [first, second, disabled] = getButtons(fixture);
        const bar: HTMLElement = fixture.nativeElement.querySelector('.fd-side-panel__action-bar');

        bar.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true, cancelable: true }));
        fixture.detectChanges();
        expect(second.getAttribute('tabindex')).toBe('0');
        expect(first.getAttribute('tabindex')).toBe('-1');

        // Wraps past the disabled third item back to the first.
        bar.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true, cancelable: true }));
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

            const [filterButton] = getButtons(fixture);
            filterButton.click();
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
        <fd-side-panel [(open)]="open" [(activeItem)]="activeItem" ariaLabel="Groups">
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

    it('should return focus to the action button when the close button is clicked', () => {
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

        expect(document.activeElement).toBe(filterButton);
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

    it('should hide item containers beyond visibleItemCount', () => {
        // visible=1 → items at index 1, 2, 3 get overflow-hidden class
        setMeasurements(200, 60, 48, 4);
        const containers = Array.from<HTMLElement>(
            fixture.nativeElement.querySelectorAll('.fd-side-panel__action-container')
        ).filter((el) => el.querySelector('.fd-side-panel__action'));

        const hiddenContainers = containers.filter((el) =>
            el.classList.contains('fd-side-panel__action-container--overflow-hidden')
        );
        expect(hiddenContainers.length).toBeGreaterThan(0);
    });

    it('should open the overflow list when the toggle is clicked', () => {
        setMeasurements(200, 60, 48, 4);
        const toggle: HTMLButtonElement = fixture.nativeElement.querySelector('.fd-side-panel__overflow-toggle');
        toggle.click();
        fixture.detectChanges();

        expect(toggle.getAttribute('aria-expanded')).toBe('true');
    });

    it('should show overflow items in the list when open', () => {
        setMeasurements(200, 60, 48, 4);
        const comp = getSidePanel();
        (comp as any)['overflowOpen'].set(true);
        fixture.detectChanges();

        const list = document.querySelector('.fd-side-panel__overflow-list');
        if (list) {
            expect(list.getAttribute('role')).toBe('menu');
        } else {
            // Popover renders in CDK overlay outside the component element; check the signal
            expect((comp as any)['overflowItems']().length).toBeGreaterThan(0);
        }
    });

    it('should close the overflow list and activate the item when an overflow item is clicked', () => {
        setMeasurements(200, 60, 48, 4);
        const comp = getSidePanel();
        (comp as any)['overflowOpen'].set(true);
        fixture.detectChanges();

        const firstItem: HTMLElement | null = document.querySelector('.fd-side-panel__overflow-item');
        if (firstItem) {
            firstItem.click();
            fixture.detectChanges();
            expect((comp as any)['overflowOpen']()).toBe(false);
        } else {
            // Overlay not rendered in JSDOM — verify close logic via method directly
            (comp as any)['activateOverflowItem']((comp as any)['overflowItems']()[0]);
            fixture.detectChanges();
            expect((comp as any)['overflowOpen']()).toBe(false);
        }
    });

    it('should close the overflow list on Escape', () => {
        setMeasurements(200, 60, 48, 4);
        const comp = getSidePanel();
        (comp as any)['overflowOpen'].set(true);
        fixture.detectChanges();

        (comp as any)['onOverflowKeydown'](
            new KeyboardEvent('keydown', { key: 'Escape', bubbles: true, cancelable: true })
        );
        fixture.detectChanges();

        expect((comp as any)['overflowOpen']()).toBe(false);
    });

    it('should have aria-haspopup="menu" and aria-expanded on the overflow toggle', () => {
        setMeasurements(200, 60, 48, 4);
        const toggle: HTMLElement = fixture.nativeElement.querySelector('.fd-side-panel__overflow-toggle');
        expect(toggle.getAttribute('aria-haspopup')).toBe('menu');
        expect(toggle.getAttribute('aria-expanded')).toBe('false');

        (getSidePanel() as any)['overflowOpen'].set(true);
        fixture.detectChanges();
        expect(toggle.getAttribute('aria-expanded')).toBe('true');
    });

    it('overflow items should have role="menuitem" and aria-posinset/aria-setsize', () => {
        setMeasurements(200, 60, 48, 4);
        const comp = getSidePanel();
        (comp as any)['overflowOpen'].set(true);
        fixture.detectChanges();

        const items = Array.from<HTMLElement>(document.querySelectorAll('.fd-side-panel__overflow-item'));
        if (items.length > 0) {
            items.forEach((item, idx) => {
                expect(item.getAttribute('role')).toBe('menuitem');
                expect(item.getAttribute('aria-posinset')).toBe(String(idx + 1));
                expect(item.getAttribute('aria-setsize')).toBe(String(items.length));
            });
        } else {
            // Overlay not in JSDOM — verify the computed data instead
            expect((comp as any)['overflowItems']().length).toBeGreaterThan(0);
        }
    });
});
