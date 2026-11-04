import { Component, signal } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { SidePanelContentDirective } from './side-panel-content.directive';
import { SidePanelItemComponent } from './side-panel-item.component';
import { SidePanelComponent, SidePanelSide } from './side-panel.component';

@Component({
    selector: 'fd-test-host',
    template: `
        <fd-side-panel [side]="side()" [(activeItem)]="activeItem" ariaLabel="Groups">
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
}

function getButtons(fixture: ComponentFixture<TestHostComponent>): HTMLButtonElement[] {
    return Array.from(fixture.nativeElement.querySelectorAll('.fd-side-panel__action'));
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

    it('should expose the group name through title, aria-label and the tooltip', () => {
        const [filterButton] = getButtons(fixture);
        const tooltip: HTMLElement = fixture.nativeElement.querySelector('.fd-side-panel__action-tooltip');
        expect(filterButton.getAttribute('aria-label')).toBe('Filter');
        expect(filterButton.getAttribute('title')).toBe('Filter');
        expect(tooltip.textContent?.trim()).toBe('Expand side panel');
        expect(tooltip.getAttribute('aria-hidden')).toBe('true');
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
});
