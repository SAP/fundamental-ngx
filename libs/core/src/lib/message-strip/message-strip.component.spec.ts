import { MessageStripComponent } from './message-strip.component';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, ViewChild } from '@angular/core';
import { ButtonComponent } from '../button/button.component';

@Component({
    template: `
    <fd-message-strip>
        A dismissible normal message strip.
    </fd-message-strip>
    `
})
class TestMessageStripComponent {
    @ViewChild(MessageStripComponent, { static: true })
    messageStripComponent: MessageStripComponent;
}

describe('MessageStripComponent', () => {
    let component: MessageStripComponent;
    let fixture: ComponentFixture<TestMessageStripComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [MessageStripComponent, ButtonComponent, TestMessageStripComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TestMessageStripComponent);
        component = fixture.componentInstance.messageStripComponent;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('Should Add no-icon modifier class', () => {
        component.ngOnInit();
        component.noIcon = true;
        component.ngOnChanges();
        fixture.detectChanges();
        expect(component.elementRef().nativeElement.classList.contains('fd-message-strip--no-icon')).toBe(true);
    });

    it('Should apply a type', () => {
        component.ngOnInit();
        component.type = 'success';
        component.ngOnChanges();
        fixture.detectChanges();
        expect(component.elementRef().nativeElement.classList.contains('fd-message-strip--success')).toBe(true);
    });
});
