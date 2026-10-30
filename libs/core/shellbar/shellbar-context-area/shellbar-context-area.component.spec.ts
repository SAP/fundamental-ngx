import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ShellbarNeverHideDirective } from '../shellbar-never-hide.directive';
import { ShellbarPositionDirective } from '../shellbar-position.directive';
import { ShellbarComponent } from '../shellbar.component';
import { ShellbarContextAreaComponent } from './shellbar-context-area.component';

@Component({
    template: `
        <fd-shellbar>
            <fd-shellbar-context-area
                (elementHidden)="onElementHidden($event)"
                (elementShown)="onElementShown($event)"
                (contentItemVisibilityChange)="onVisibilityChange($event)"
            >
                <button id="item1" [fdShellbarHidePriority]="1">Item 1</button>
                <button id="item2" [fdShellbarHidePriority]="2">Item 2</button>
                <button id="item3" fdShellbarNeverHide>Never Hide</button>
            </fd-shellbar-context-area>
        </fd-shellbar>
    `,
    imports: [ShellbarComponent, ShellbarContextAreaComponent, ShellbarNeverHideDirective]
})
class ContextAreaTestComponent {
    hiddenElements: HTMLElement[] = [];
    shownElements: HTMLElement[] = [];
    visibilityChangeItems: HTMLElement[] = [];

    onElementHidden(el: HTMLElement): void {
        this.hiddenElements.push(el);
    }

    onElementShown(el: HTMLElement): void {
        this.shownElements.push(el);
    }

    onVisibilityChange(items: HTMLElement[]): void {
        this.visibilityChangeItems = items;
    }
}

@Component({
    template: `
        <fd-shellbar>
            <fd-shellbar-context-area>
                <button fdShellbarPosition="left" id="left1">Left 1</button>
                <button fdShellbarPosition="left" id="left2">Left 2</button>
                <button fdShellbarPosition="right" id="right1">Right 1</button>
                <button fdShellbarPosition="right" id="right2">Right 2</button>
            </fd-shellbar-context-area>
        </fd-shellbar>
    `,
    imports: [ShellbarComponent, ShellbarContextAreaComponent, ShellbarPositionDirective]
})
class ContextAreaPositionTestComponent {}

describe('ShellbarContextAreaComponent', () => {
    let component: ContextAreaTestComponent;
    let fixture: ComponentFixture<ContextAreaTestComponent>;
    let contextArea: ShellbarContextAreaComponent;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [ContextAreaTestComponent]
        }).compileComponents();

        fixture = TestBed.createComponent(ContextAreaTestComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();

        const contextAreaDebugEl = fixture.debugElement.query(
            (de) => de.componentInstance instanceof ShellbarContextAreaComponent
        );
        contextArea = contextAreaDebugEl?.componentInstance as ShellbarContextAreaComponent;
    });

    it('should create', () => {
        expect(component).toBeTruthy();
        expect(contextArea).toBeTruthy();
    });

    it('should emit elementHidden when an element is hidden', () => {
        expect(component.hiddenElements).toHaveLength(0);

        // Manually call hideElementsIfNeeded to test emission
        // First we need to spy on the shellbar method to force hiding
        const shellbar = (contextArea as any)._shellbar;
        jest.spyOn(shellbar, '_actionsExceedShellbarWidth').mockReturnValue(true);

        // Hide elements
        contextArea.hideElementsIfNeeded();
        fixture.detectChanges();

        // elementHidden should have been emitted
        expect(component.hiddenElements.length).toBeGreaterThan(0);
    });

    it('should emit elementShown when an element is shown', () => {
        expect(component.shownElements).toHaveLength(0);

        // First hide an element
        const item1 = fixture.nativeElement.querySelector('#item1') as HTMLElement;
        item1.style.display = 'none';

        // Call showElements
        contextArea.showElements();
        fixture.detectChanges();

        // elementShown should have been emitted for the previously hidden item
        expect(component.shownElements.length).toBeGreaterThan(0);
        expect(component.shownElements).toContain(item1);
    });

    it('should call showElements method and emit events for shown elements', () => {
        // First hide an element manually
        const item2 = fixture.nativeElement.querySelector('#item2') as HTMLElement;
        item2.style.display = 'none';

        // Clear any previous emissions
        component.shownElements = [];

        // Call showElements
        contextArea.showElements();
        fixture.detectChanges();

        // Element should be visible again
        expect(item2.style.display).toBe('');
        // elementShown should have been emitted
        expect(component.shownElements).toContain(item2);
    });

    it('should not hide elements with fdShellbarNeverHide directive', () => {
        const neverHideItem = fixture.nativeElement.querySelector('#item3');
        expect(neverHideItem).toBeTruthy();
        expect(neverHideItem.hasAttribute('fdShellbarNeverHide')).toBe(true);

        // The never-hide element should have the class
        expect(neverHideItem.classList.contains('fd-shellbar-never-hide')).toBe(true);
    });

    it('should emit contentItemVisibilityChange when hidden items change', () => {
        expect(component.visibilityChangeItems).toHaveLength(0);

        // Spy on the shellbar method to force hiding
        const shellbar = (contextArea as any)._shellbar;
        jest.spyOn(shellbar, '_actionsExceedShellbarWidth').mockReturnValue(true);

        // Hide elements
        contextArea.hideElementsIfNeeded();
        fixture.detectChanges();

        // contentItemVisibilityChange should have been emitted with array of hidden items
        expect(component.visibilityChangeItems.length).toBeGreaterThan(0);
    });
});

describe('ShellbarContextAreaComponent with positioning', () => {
    let component: ContextAreaPositionTestComponent;
    let fixture: ComponentFixture<ContextAreaPositionTestComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [ContextAreaPositionTestComponent]
        }).compileComponents();

        fixture = TestBed.createComponent(ContextAreaPositionTestComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should separate left and right positioned items into different groups', () => {
        const groups = fixture.nativeElement.querySelectorAll('.fd-shellbar__group--context-area');
        expect(groups.length).toBe(2);

        const leftGroup = fixture.nativeElement.querySelector('[data-position="left"]');
        const rightGroup = fixture.nativeElement.querySelector('[data-position="right"]');

        expect(leftGroup).toBeTruthy();
        expect(rightGroup).toBeTruthy();
    });

    it('should place left-positioned items in the left group', () => {
        const leftGroup = fixture.nativeElement.querySelector('[data-position="left"]');
        const leftItems = leftGroup.querySelectorAll('[fdShellbarPosition="left"]');
        expect(leftItems.length).toBe(2);
    });

    it('should place right-positioned items in the right group', () => {
        const rightGroup = fixture.nativeElement.querySelector('[data-position="right"]');
        const rightItems = rightGroup.querySelectorAll('[fdShellbarPosition="right"]');
        expect(rightItems.length).toBe(2);
    });

    it('should add role="group" to context area groups', () => {
        const groups = fixture.nativeElement.querySelectorAll('.fd-shellbar__group--context-area');
        groups.forEach((group: HTMLElement) => {
            expect(group.getAttribute('role')).toBe('group');
        });
    });
});
