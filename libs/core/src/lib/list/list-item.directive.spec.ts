import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { ListModule } from './list.module';

@Component({
    template: ` <li #directiveElement fd-list-item [selected]="selected">List Item Test Text</li> `
})
class TestComponent {
    @ViewChild('directiveElement', { static: true })
    ref: ElementRef;

    selected: boolean = false;
}

describe('ListItemDirective', () => {
    let component: TestComponent;
    let fixture: ComponentFixture<TestComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [TestComponent],
            imports: [ListModule]
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

    it('should assign is selected', () => {
        component.selected = true;
        fixture.detectChanges();
        expect(component.ref.nativeElement.classList).toContain('is-selected');
    });
});
