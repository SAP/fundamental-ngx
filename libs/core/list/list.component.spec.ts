import { Component, ElementRef, input, ViewChild } from '@angular/core';
import { ComponentFixture, fakeAsync, flush, TestBed, waitForAsync } from '@angular/core/testing';
import { ContentDensityModule } from '@fundamental-ngx/core/content-density';
import { ListItemComponent } from './list-item/list-item.component';
import { ListComponent } from './list.component';

@Component({
    template: `
        <ul
            #componentElement
            [dropdownMode]="dropdown()"
            [multiInputMode]="multiInput()"
            [hasMessage]="hasMessage()"
            [noBorder]="noBorder()"
            [fdCompact]="compact()"
            [unreadIndicator]="unreadIndicator()"
            fd-list
        >
            Action Bar Title Test Text
        </ul>
    `,
    standalone: true,
    imports: [ListComponent, ContentDensityModule]
})
class TestComponent {
    @ViewChild('componentElement', { read: ElementRef })
    ref: ElementRef;

    readonly dropdown = input(false);

    readonly multiInput = input(false);

    readonly compact = input(false);

    readonly hasMessage = input(false);

    readonly noBorder = input(false);

    readonly unreadIndicator = input(false);
}

describe('ListComponent', () => {
    let component: TestComponent;
    let fixture: ComponentFixture<TestComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [TestComponent]
        }).compileComponents();
    }));

    beforeEach(async () => {
        fixture = TestBed.createComponent(TestComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
        await fixture.whenStable();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should assign class', () => {
        expect(component.ref.nativeElement.className).toContain('fd-list');
    });

    it('should assign additional classes', () => {
        fixture.componentRef.setInput('dropdown', true);
        fixture.componentRef.setInput('compact', true);
        fixture.componentRef.setInput('multiInput', true);
        fixture.componentRef.setInput('hasMessage', true);
        fixture.componentRef.setInput('noBorder', true);
        fixture.detectChanges();
        expect(component.ref.nativeElement.classList).toContain('fd-list--no-border');
        expect(component.ref.nativeElement.classList).toContain('fd-list--has-message');
        expect(component.ref.nativeElement.classList).toContain('is-compact');
        expect(component.ref.nativeElement.classList).toContain('fd-list--multi-input');
        expect(component.ref.nativeElement.classList).toContain('fd-list--dropdown');
    });

    it('should add unread indicator', () => {
        fixture.componentRef.setInput('unreadIndicator', true);
        fixture.detectChanges();

        expect(component.ref.nativeElement.classList).toContain('fd-list--unread-indicator');
    });
});

@Component({
    template: `
        <ul fd-list #list>
            <li fd-list-item #item1>Item 1</li>
            <li fd-list-item #item2>Item 2</li>
            <li fd-list-item #item3>Item 3</li>
        </ul>
    `,
    standalone: true,
    imports: [ListComponent, ListItemComponent]
})
class RovingTabindexTestComponent {
    @ViewChild('list', { read: ListComponent })
    list: ListComponent;

    @ViewChild('item1', { read: ElementRef })
    item1: ElementRef;

    @ViewChild('item2', { read: ElementRef })
    item2: ElementRef;

    @ViewChild('item3', { read: ElementRef })
    item3: ElementRef;
}

describe('ListComponent roving tabindex', () => {
    let component: RovingTabindexTestComponent;
    let fixture: ComponentFixture<RovingTabindexTestComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [RovingTabindexTestComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(RovingTabindexTestComponent);
        component = fixture.componentInstance;
    });

    it('should set tabindex="0" on first item by default', fakeAsync(() => {
        fixture.detectChanges();
        flush();
        fixture.detectChanges();

        expect(component.item1.nativeElement.getAttribute('tabindex')).toBe('0');
        expect(component.item2.nativeElement.getAttribute('tabindex')).toBe('-1');
        expect(component.item3.nativeElement.getAttribute('tabindex')).toBe('-1');
    }));

    it('should move tabindex when setItemActive is called', fakeAsync(() => {
        fixture.detectChanges();
        flush();

        component.list.setItemActive(1);
        fixture.detectChanges();

        expect(component.item1.nativeElement.getAttribute('tabindex')).toBe('-1');
        expect(component.item2.nativeElement.getAttribute('tabindex')).toBe('0');
        expect(component.item3.nativeElement.getAttribute('tabindex')).toBe('-1');
    }));

    it('should move tabindex when an item is clicked', fakeAsync(() => {
        fixture.detectChanges();
        flush();

        component.item3.nativeElement.click();
        fixture.detectChanges();

        expect(component.item1.nativeElement.getAttribute('tabindex')).toBe('-1');
        expect(component.item2.nativeElement.getAttribute('tabindex')).toBe('-1');
        expect(component.item3.nativeElement.getAttribute('tabindex')).toBe('0');
    }));
});
