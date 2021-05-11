import { MessagePageComponent } from './message-page.component';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { Component, ViewChild } from '@angular/core';

@Component({
    selector: 'fd-test-tabs',
    template: ` <a fd-link>Test Link</a> `
})
class TestMessagePageComponent {
    @ViewChild(MessagePageComponent, { static: true })
    messagePageComponent: MessagePageComponent;
}

describe('MessagePageComponent', () => {
    let component: MessagePageComponent;
    let fixture: ComponentFixture<TestMessagePageComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [MessagePageComponent, TestMessagePageComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TestMessagePageComponent);
        component = fixture.componentInstance.messagePageComponent;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('Should Add emphasized class', () => {
        component.emphasized = true;
        component.buildComponentCssClass();
        fixture.detectChanges();
        expect(component.elementRef().nativeElement.classList.contains('fd-link--emphasized')).toBe(true);
    });

    it('Should Add inverted class', () => {
        component.inverted = true;
        component.buildComponentCssClass();
        fixture.detectChanges();
        expect(component.elementRef().nativeElement.classList.contains('fd-link--inverted')).toBe(true);
    });

    it('Should Add disabled class', () => {
        component.disabled = true;
        component.buildComponentCssClass();
        fixture.detectChanges();
        expect(component.elementRef().nativeElement.classList.contains('is-disabled')).toBe(true);
    });
});
