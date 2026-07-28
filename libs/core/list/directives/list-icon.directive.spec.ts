import { Component, ElementRef, ViewChild, input } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ListModule } from '../list.module';

@Component({
    template: ` <span #componentElement fd-list-icon [glyph]="glyph()"> </span> `,
    standalone: true,
    imports: [ListModule]
})
class TestComponent {
    @ViewChild('componentElement', { read: ElementRef })
    ref: ElementRef;

    readonly glyph = input<string | null>(null);
}

describe('ListTitleComponent', () => {
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
        expect(component.ref.nativeElement.className).toBe('fd-list__icon');
    });

    it('should assign additional classes', () => {
        const iconName = 'custom-icon';

        fixture.componentRef.setInput('glyph', iconName);

        fixture.detectChanges();

        expect(component.ref.nativeElement.classList).toContain(`sap-icon--${iconName}`);
    });
});
