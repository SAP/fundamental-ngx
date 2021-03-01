import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { TabsModule } from '../tabs.module';

@Component({
    template: ` <div #directiveElement fd-tab-link>Tab Link Directive</div> `
})
class TestComponent {
    @ViewChild('directiveElement')
    ref: ElementRef;
}

describe('TabLinkDirective', () => {
    let component: TestComponent;
    let fixture: ComponentFixture<TestComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [TestComponent],
            imports: [TabsModule]
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

    it('should create with classes', () => {
        expect(component.ref.nativeElement.className).toBe('fd-tabs__link');
    });
});
