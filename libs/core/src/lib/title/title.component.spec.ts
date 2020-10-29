import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { TitleModule } from './title.module';

@Component({
    template: `<h5 fd-title [wrap]="true">Test Title</h5>`
})
class TestComponent {
    @ViewChild('directiveElement')
    ref: ElementRef;
}

describe('TitleTitleComponent', () => {
    let component: TestComponent;
    let fixture: ComponentFixture<TestComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [TestComponent],
            imports: [TitleModule]
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
        expect(component.ref.nativeElement.className).toContain('fd-title');
        expect(component.ref.nativeElement.className).toContain('fd-title--h5');
        expect(component.ref.nativeElement.className).toContain('fd-title--wrap');
    });
});
