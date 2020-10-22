import { Component, DebugElement, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { FeedInputButtonDirective, FeedInputModule, FeedInputTextareaDirective } from '@fundamental-ngx/core';
import { FeedInputComponent } from './feed-input.component';

@Component({
    template: `
        <fd-feed-input [disabled]="disabled">
            <textarea fdFeedInputTextarea></textarea>
            <button fdFeedInputButton></button>
        </fd-feed-input>
    `
})
class TestComponent {
    @ViewChild(FeedInputTextareaDirective)
    textareaDirective: FeedInputTextareaDirective;

    @ViewChild(FeedInputButtonDirective)
    buttonDirective: FeedInputButtonDirective;

    disabled = false;
}

describe('FeedInputComponent', () => {
    let component: TestComponent;
    let fixture: ComponentFixture<TestComponent>;
    let hostEl: DebugElement;
    let textareaEl: DebugElement;
    let buttonEl: DebugElement;
    let textareaDirective;
    let buttonDirective;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [FeedInputModule],
            declarations: [FeedInputComponent, TestComponent, FeedInputTextareaDirective, FeedInputButtonDirective]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(TestComponent);
        component = fixture.componentInstance;
        textareaEl = fixture.debugElement.query(By.css('textarea'));
        hostEl = fixture.debugElement.query(By.css('.fd-feed-input'));
        buttonEl = fixture.debugElement.query(By.css('button'));
        fixture.detectChanges();

        textareaDirective = component.textareaDirective;
        buttonDirective = component.buttonDirective;
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should disable component by class', () => {
        component.disabled = true;
        fixture.detectChanges();

        expect(hostEl.classes['is-disabled']).toBeTrue();
    })

    it('should disabled button by default', () => {
        expect(buttonEl.classes['is-disabled']).toBeTrue();
    });

    it('should button enable when textarea have a value', () => {
        textareaEl.triggerEventHandler('keyup', { target: { value: 'Feed message' } });
        fixture.detectChanges();

        expect((<any>buttonDirective)._elementRef.nativeElement.disabled).toBeFalse();
    });

    it('should button enable when textarea have not a value', () => {

        textareaEl.triggerEventHandler('keyup', { target: { value: '' } });
        fixture.detectChanges();

        expect((<any>buttonDirective)._elementRef.nativeElement.disabled).toBeTrue();
    });

    it('should emit value properly', () => {
        spyOn(textareaDirective.valueChange, 'emit');
        const event: any = { target: { value: '' } };
        textareaDirective.onKeyup(event);
        fixture.detectChanges();

        expect(textareaDirective.valueChange.emit).toHaveBeenCalledWith(event.target.value)
    });

    it('should textarea grow by default', () => {
        textareaEl.nativeElement.value = '1 \n 2 \n 3 \n 4 \n';
        textareaDirective.resize();
        fixture.detectChanges();

        expect(textareaEl.nativeElement.style.height).toEqual('87px');
    });
});
