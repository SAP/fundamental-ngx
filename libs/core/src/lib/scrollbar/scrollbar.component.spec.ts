import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { Component, ElementRef, ViewChild } from '@angular/core';

import { ScrollbarModule } from './scrollbar.module';

@Component({
    template: `
        <div
            #componentElement
            fd-scrollbar
            [noHorizontalScroll]="noHorizontalScroll"
            [noVerticalScroll]="noVerticalScroll"
            [alwaysVisible]="alwaysVisible"
        ></div>
    `
})
class TestComponent {
    @ViewChild('componentElement', { read: ElementRef })
    ref: ElementRef;

    noHorizontalScroll = false;
    noVerticalScroll = false;
    alwaysVisible = false;
}

describe('Scrollbar Host Component', () => {
    let component: TestComponent;
    let fixture: ComponentFixture<TestComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [TestComponent],
            imports: [ScrollbarModule]
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
        expect(component.ref.nativeElement.className).toBe('fd-scrollbar');
    });

    it('should hide horizontal overflow content', () => {
        component.noHorizontalScroll = true;
        fixture.detectChanges();

        expect(component.ref.nativeElement.style.overflowX).toEqual('hidden');
    });

    it('should hide vertical overflow content', () => {
        component.noVerticalScroll = true;
        fixture.detectChanges();

        expect(component.ref.nativeElement.style.overflowY).toEqual('hidden');
    });

    it('should make scrollbars always visible', () => {
        component.alwaysVisible = true;
        fixture.detectChanges();

        expect(component.ref.nativeElement.style.overflowX).toEqual('scroll');
        expect(component.ref.nativeElement.style.overflowY).toEqual('scroll');
    });
});
