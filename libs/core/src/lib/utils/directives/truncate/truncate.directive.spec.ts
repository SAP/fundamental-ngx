import { Component, DebugElement, Input } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { TruncateDirective } from './truncate.directive';

@Component({
    template: `
        <span fd-truncate [fdTruncateState]="true" [fdTruncateChars]="maxChars" [fdTruncateTargetText]="text">
            This text should be replaced by truncated fdTruncateText
        </span>
        <span fd-truncate [fdTruncateState]="false" [fdTruncateChars]="maxChars">
            This text should not be truncated as fdTruncateState is false
        </span>
        <span fd-truncate [fdTruncateState]="true" [fdTruncateChars]="maxChars">
            This text should be truncated as fdTruncateState is true
        </span>
        <span fd-truncate [fdTruncateState]="true" [fdTruncateWidth]="pixLength">
            This element should by truncated by width as fdTruncateWidth is provided
        </span>
        <span fd-truncate [fdTruncateState]="false" [fdTruncateWidth]="pixLength">
            This element should not be truncated as fdTruncateState is false
        </span>
    `
})
class TestComponent {
    @Input()
    text: string;

    @Input()
    maxChars: number;

    @Input()
    pixLength: number;
}

describe('TruncateDirective', () => {
    let component: TestComponent;
    let fixture: ComponentFixture<TestComponent>;
    let truncate: DebugElement[];

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [TestComponent, TruncateDirective]
        });
        fixture = TestBed.createComponent(TestComponent);
        component = fixture.componentInstance;
        component.maxChars = 20;
        component.text =
            'Long text, you can toggle view with more/less button. Lorem Ipsum is simply dummy text of the printing and typesetting industry.';
        component.pixLength = 100;
        fixture.detectChanges();
        truncate = fixture.debugElement.queryAll(By.directive(TruncateDirective));
    });

    it('should create an instance', () => {
        expect(truncate).toBeTruthy();
    });

    it('Should truncate when fdTruncateState is true', () => {
        expect(truncate[0].nativeElement.textContent.length).toBeLessThanOrEqual(component.maxChars + 3); // 3 is for '...' at the end
        expect(truncate[2].nativeElement.textContent.length).toBeLessThanOrEqual(component.maxChars + 3);
    });

    it('Should not truncate when fdTruncateState is false', () => {
        expect(truncate[1].nativeElement.textContent.length).toBeGreaterThanOrEqual(component.maxChars);
        expect(truncate[4].nativeElement.style.maxWidth).toBe('');
    });

    it('Truncation text should be textContent of an elelment when fdTruncateTargetText not provided', () => {
        expect(truncate[1].nativeElement.textContent.length).toEqual(63); // 63 is the length of the text content in second element in templete example.
    });

    it('Width should be truncated as fdTruncateWidth is provided', () => {
        expect(truncate[3].nativeElement.style.maxWidth).toBe(`${component.pixLength}px`);
    });
});
