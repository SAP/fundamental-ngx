import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { ListModule } from '../list.module';

@Component({
    template: `
        <span
            #componentElement
            fd-list-icon
            [glyph]="glyph">
        </span>
    `
})
class TestComponent {
    @ViewChild('componentElement', { read: ElementRef })
    ref: ElementRef;

    glyph: string = null;

}

describe('ListTitleComponent', () => {
    let component: TestComponent;
    let fixture: ComponentFixture<TestComponent>;

    beforeEach(waitForAsync(() => {
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
        expect(component.ref.nativeElement.className).toBe('fd-list__icon');
    });

    it('should assign additional classes', () => {
        const iconName = 'custom-icon';

        component.glyph = iconName;

        fixture.detectChanges();

        expect(component.ref.nativeElement.classList).toContain(`sap-icon--${iconName}`);
    });
});
