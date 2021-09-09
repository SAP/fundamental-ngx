import { Component, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IconBarDndContainerDirective } from './icon-bar-dnd-container.directive';

@Component({
    template: `
        <div #directiveElement fdIconBarDndContainer>IconBarDndContainerDirective Test</div> `
})
class TestComponent {
    @ViewChild(IconBarDndContainerDirective)
    directive: IconBarDndContainerDirective;
}

describe('IconBarDndContainerDirective', () => {
    let component: TestComponent;
    let fixture: ComponentFixture<TestComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [
                TestComponent,
                IconBarDndContainerDirective
            ],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TestComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component.directive).toBeTruthy();
    });
});
