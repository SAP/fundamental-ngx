import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { Component, ElementRef, ViewChild } from '@angular/core';

import { InlineHelpDirective } from './inline-help.directive';
import { InlineHelpModule } from './inline-help.module';

@Component({
    template: ` <div #directiveElement fd-inline-help="123"></div> `
})
class TestComponent {
    @ViewChild('directiveElement', { static: false })
    ref: ElementRef;
}
describe('InlineHelpDirective', () => {
    let component: TestComponent;
    let fixture: ComponentFixture<TestComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [InlineHelpModule],
            declarations: [TestComponent]
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
});
