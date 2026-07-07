import { Component, ElementRef, ViewChild, input } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ButtonComponent } from '@fundamental-ngx/core/button';
import { CheckboxComponent } from '@fundamental-ngx/core/checkbox';
import { ListModule } from '../list.module';

@Component({
    template: `
        <li #directiveElement fd-list-item [noData]="noData()" [action]="action()" [selected]="selected()">
            @if (link()) {
                <a #linkElement fd-list-link>link</a>
            }
            <button fd-button #button></button>
            List Item Test Text
        </li>
    `,
    standalone: true,
    imports: [ListModule, ButtonComponent]
})
class TestComponent {
    @ViewChild('directiveElement', { read: ElementRef })
    ref: ElementRef;

    @ViewChild('linkElement', { read: ElementRef })
    linkRef: ElementRef;

    @ViewChild('button', { read: ElementRef })
    buttonRef: ElementRef;

    readonly selected = input(false);
    readonly link = input(false);
    readonly noData = input(false);
    readonly action = input(false);
}

@Component({
    template: `
        <ul fd-list [selection]="true">
            <li #listItem fd-list-item [selected]="selected">
                <fd-checkbox #checkbox [(ngModel)]="checked"></fd-checkbox>
                List item with checkbox
            </li>
        </ul>
    `,
    standalone: true,
    imports: [ListModule, CheckboxComponent]
})
class SelectionListTestComponent {
    @ViewChild('listItem', { read: ElementRef })
    listItemRef: ElementRef;

    @ViewChild('checkbox')
    checkbox: CheckboxComponent;

    selected = false;
    checked = false;
}

describe('ListItemComponent', () => {
    let component: TestComponent;
    let fixture: ComponentFixture<TestComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [TestComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TestComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should assign class', () => {
        expect(component.ref.nativeElement.className).toBe('fd-list__item');
    });

    it('should assign classes', () => {
        fixture.componentRef.setInput('selected', true);
        fixture.componentRef.setInput('noData', true);
        fixture.componentRef.setInput('action', true);
        fixture.detectChanges();
        expect(component.ref.nativeElement.classList).toContain('is-selected');
        expect(component.ref.nativeElement.classList).toContain('fd-list__item--no-data');
        expect(component.ref.nativeElement.classList).toContain('fd-list__item--action');
    });

    it('should assign link class', () => {
        fixture.componentRef.setInput('link', true);
        fixture.detectChanges();
        expect(component.ref.nativeElement.classList).toContain('fd-list__item--link');
    });

    it('should assign button class', () => {
        fixture.detectChanges();
        expect(component.buttonRef.nativeElement.classList).toContain('fd-list__button');
    });

    it('should handle keyboard events for the link', () => {
        fixture.componentRef.setInput('link', true);
        fixture.detectChanges();
        const downEvent = new KeyboardEvent('keydown', {
            key: 'Space'
        });
        component.ref.nativeElement.dispatchEvent(downEvent);

        expect(component.linkRef.nativeElement.classList).toContain('is-active');

        const upEvent = new KeyboardEvent('keyup', {
            key: 'Space'
        });
        component.ref.nativeElement.dispatchEvent(upEvent);

        expect(component.linkRef.nativeElement.classList).not.toContain('is-active');
    });

    it('should not render selection span for non-selectable items', () => {
        const span = component.ref.nativeElement.querySelector('.fd-list__item--sr-only');
        expect(span).toBeNull();
    });

    it('should not set aria-describedby for non-selectable items', () => {
        expect(component.ref.nativeElement.getAttribute('aria-describedby')).toBeNull();
    });
});

describe('ListItemComponent in selection mode', () => {
    let fixture: ComponentFixture<SelectionListTestComponent>;
    let component: SelectionListTestComponent;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [SelectionListTestComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(SelectionListTestComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should render the sr-only selection span', () => {
        const span = component.listItemRef.nativeElement.querySelector('.fd-list__item--sr-only');
        expect(span).toBeTruthy();
    });

    it('should set aria-describedby pointing to the sr-only span', () => {
        const span = component.listItemRef.nativeElement.querySelector('.fd-list__item--sr-only');
        const describedById = component.listItemRef.nativeElement.getAttribute('aria-describedby');
        expect(describedById).toBe(span.id);
    });

    it('should show "Not Selected" in the sr-only span when item is not selected', () => {
        const span = component.listItemRef.nativeElement.querySelector('.fd-list__item--sr-only');
        expect(span.textContent.trim()).toBe('Not Selected');
    });

    it('should show "Selected" in the sr-only span when item is selected', () => {
        component.selected = true;
        fixture.detectChanges();
        const span = component.listItemRef.nativeElement.querySelector('.fd-list__item--sr-only');
        expect(span.textContent.trim()).toBe('Selected');
    });

    it('should update sr-only span to "Selected" when list item is clicked to check', () => {
        component.listItemRef.nativeElement.dispatchEvent(new MouseEvent('click', { bubbles: true }));
        fixture.detectChanges();
        const span = component.listItemRef.nativeElement.querySelector('.fd-list__item--sr-only');
        expect(span.textContent.trim()).toBe('Selected');
    });

    it('should update sr-only span to "Not Selected" when list item is clicked to uncheck', () => {
        component.listItemRef.nativeElement.dispatchEvent(new MouseEvent('click', { bubbles: true }));
        fixture.detectChanges();
        component.listItemRef.nativeElement.dispatchEvent(new MouseEvent('click', { bubbles: true }));
        fixture.detectChanges();
        const span = component.listItemRef.nativeElement.querySelector('.fd-list__item--sr-only');
        expect(span.textContent.trim()).toBe('Not Selected');
    });
});
