import { Component } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ObjectAttributeComponent } from './object-attribute.component';


@Component({
    selector: 'fdp-object-attribute-test',
    template: ` <fdp-object-attribute [label]="'label1'"></fdp-object-attribute> `
})
class TestComponent {
    constructor() { }
}

describe('ObjectAttributeComponent', () => {
    let component: TestComponent;
    let fixture: ComponentFixture<TestComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ObjectAttributeComponent, TestComponent],
            providers: []
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

    /** check if element css class attached */
    it('should have fd-object-list__object-attribute class', () => {
        const divElement = fixture.debugElement.query(By.css('div'));
        expect(divElement.nativeElement.classList.contains('fd-object-list__object-attribute')).toBe(true);
    });

    /** check if element should have title */
    it('should have title label1', () => {
        const divElement = fixture.debugElement.query(By.css('div'));
        expect(divElement.nativeElement.title).toContain('label1');
    });

    /** check if element should have inner content as label1 */
    it('should have label1', () => {
        const divElement = fixture.debugElement.query(By.css('div'));
        expect(divElement.nativeElement.innerHTML).toContain('label1');
    });
});
