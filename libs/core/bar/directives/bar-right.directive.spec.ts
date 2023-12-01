import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { BarModule } from '../bar.module';

@Component({
    template: ` <div #directiveElement fd-bar-right>Bar Right Area Test</div> `
})
class TestComponent {
    @ViewChild('directiveElement', { static: false })
    ref: ElementRef;
}

describe('BarRightDirective', () => {
    let component: TestComponent;
    let fixture: ComponentFixture<TestComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [TestComponent],
            imports: [BarModule]
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
        expect(component.ref.nativeElement.className).toBe('fd-bar__right');
    });
});
