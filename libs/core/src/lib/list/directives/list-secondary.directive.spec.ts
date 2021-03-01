import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { ListModule } from '../list.module';

@Component({
    template: `
        <li
            #componentElement
            fd-list-secondary
        >
            ListSecondaryComponent
        </li>
    `
})
class TestComponent {
    @ViewChild('componentElement', { read: ElementRef })
    ref: ElementRef;
}

describe('ListSecondaryComponent', () => {
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
        expect(component.ref.nativeElement.className).toBe('fd-list__secondary');
    });
});
