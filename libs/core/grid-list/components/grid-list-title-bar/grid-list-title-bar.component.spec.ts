import { Component, input } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { GridListTitleBarComponent } from './grid-list-title-bar.component';

@Component({
    template: `<fd-grid-list-title-bar [title]="title"></fd-grid-list-title-bar>`,
    imports: [GridListTitleBarComponent]
})
class GridListTitleBarDefaultTestComponent {
    title = 'Products';
}

@Component({
    template: `<fd-grid-list-title-bar [title]="title()" [headingLevel]="headingLevel()"></fd-grid-list-title-bar>`,
    imports: [GridListTitleBarComponent]
})
class GridListTitleBarTestComponent {
    readonly title = input('Products');
    readonly headingLevel = input<any>(2);
}

@Component({
    template: `
        <fd-grid-list-title-bar [title]="'Products'" [headingLevel]="3">
            <span fd-grid-list-title-bar-additional-title-item>Extra info</span>
        </fd-grid-list-title-bar>
    `,
    imports: [GridListTitleBarComponent]
})
class GridListTitleBarWithProjectionTestComponent {}

describe('GridListTitleBarComponent', () => {
    let fixture: ComponentFixture<GridListTitleBarTestComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [GridListTitleBarTestComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(GridListTitleBarTestComponent);
        fixture.detectChanges();
    });

    it('should create', () => {
        const titleBar = fixture.debugElement.query(By.directive(GridListTitleBarComponent));
        expect(titleBar).toBeTruthy();
    });

    it('should render role="heading" on the title label', () => {
        const label = fixture.debugElement.query(By.css('[fd-toolbar-label]'));
        expect(label.nativeElement.getAttribute('role')).toBe('heading');
    });

    it('should update aria-level when explicitly set to 2', () => {
        const label = fixture.debugElement.query(By.css('[fd-toolbar-label]'));
        expect(label.nativeElement.getAttribute('aria-level')).toBe('2');
    });

    it('should update aria-level when headingLevel input changes', () => {
        fixture.componentRef.setInput('headingLevel', 3);
        fixture.detectChanges();
        const label = fixture.debugElement.query(By.css('[fd-toolbar-label]'));
        expect(label.nativeElement.getAttribute('aria-level')).toBe('3');
    });

    it('should render the title in a span element, not a label', () => {
        const el = fixture.debugElement.query(By.css('[fd-toolbar-label]'));
        expect(el.nativeElement.tagName.toLowerCase()).toBe('span');
    });

    it('should normalize string heading level "h4" to numeric aria-level "4"', () => {
        fixture.componentRef.setInput('headingLevel', 'h4');
        fixture.detectChanges();
        const el = fixture.debugElement.query(By.css('[fd-toolbar-label]'));
        expect(el.nativeElement.getAttribute('aria-level')).toBe('4');
    });

    it('should pass through numeric string "3" as aria-level "3"', () => {
        fixture.componentRef.setInput('headingLevel', '3');
        fixture.detectChanges();
        const el = fixture.debugElement.query(By.css('[fd-toolbar-label]'));
        expect(el.nativeElement.getAttribute('aria-level')).toBe('3');
    });

    it('should fallback to aria-level "2" for invalid string input', () => {
        fixture.componentRef.setInput('headingLevel', 'invalid');
        fixture.detectChanges();
        const el = fixture.debugElement.query(By.css('[fd-toolbar-label]'));
        expect(el.nativeElement.getAttribute('aria-level')).toBe('2');
    });

    it('should fallback to aria-level "2" for "h0" string input', () => {
        fixture.componentRef.setInput('headingLevel', 'h0');
        fixture.detectChanges();
        const el = fixture.debugElement.query(By.css('[fd-toolbar-label]'));
        expect(el.nativeElement.getAttribute('aria-level')).toBe('2');
    });

    it('should parse "h7" string as aria-level "7"', () => {
        fixture.componentRef.setInput('headingLevel', 'h7');
        fixture.detectChanges();
        const el = fixture.debugElement.query(By.css('[fd-toolbar-label]'));
        expect(el.nativeElement.getAttribute('aria-level')).toBe('7');
    });

    it('should accept level 1 and render aria-level "1"', () => {
        fixture.componentRef.setInput('headingLevel', 1);
        fixture.detectChanges();
        const el = fixture.debugElement.query(By.css('[fd-toolbar-label]'));
        expect(el.nativeElement.getAttribute('aria-level')).toBe('1');
    });

    it('should accept level 6 and render aria-level "6"', () => {
        fixture.componentRef.setInput('headingLevel', 6);
        fixture.detectChanges();
        const el = fixture.debugElement.query(By.css('[fd-toolbar-label]'));
        expect(el.nativeElement.getAttribute('aria-level')).toBe('6');
    });
});

describe('GridListTitleBarComponent — default heading level', () => {
    let fixture: ComponentFixture<GridListTitleBarDefaultTestComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [GridListTitleBarDefaultTestComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(GridListTitleBarDefaultTestComponent);
        fixture.detectChanges();
    });

    it('should default to aria-level "2" when no headingLevel is provided', () => {
        const label = fixture.debugElement.query(By.css('[fd-toolbar-label]'));
        expect(label.nativeElement.getAttribute('aria-level')).toBe('2');
    });

    it('should render role="heading" when no headingLevel is provided', () => {
        const label = fixture.debugElement.query(By.css('[fd-toolbar-label]'));
        expect(label.nativeElement.getAttribute('role')).toBe('heading');
    });
});

describe('GridListTitleBarComponent — content projection', () => {
    let fixture: ComponentFixture<GridListTitleBarWithProjectionTestComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [GridListTitleBarWithProjectionTestComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(GridListTitleBarWithProjectionTestComponent);
        fixture.detectChanges();
    });

    it('should project content inside the heading span', () => {
        const projected = fixture.debugElement.query(By.css('[fd-grid-list-title-bar-additional-title-item]'));
        expect(projected).toBeTruthy();
        expect(projected.nativeElement.textContent).toContain('Extra info');
    });

    it('should keep projected content within the element that has role="heading"', () => {
        const heading = fixture.debugElement.query(By.css('[role="heading"]'));
        const projected = heading.nativeElement.querySelector('[fd-grid-list-title-bar-additional-title-item]');
        expect(projected).toBeTruthy();
    });
});
