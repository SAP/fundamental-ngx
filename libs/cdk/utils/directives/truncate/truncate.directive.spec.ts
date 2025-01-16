import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { TruncateDirective } from './truncate.directive';

@Component({
    standalone: true,
    imports: [TruncateDirective],
    template: `
        <span id="truncate-true" fdkTruncate [fdkTruncateState]="true" [fdkTruncateWidth]="pixLength">
            Truncated by width
        </span>
        <span id="truncate-false" fdkTruncate [fdkTruncateState]="false" [fdkTruncateWidth]="pixLength">
            Not truncated
        </span>
        <span id="retain-color" [style.color]="'red'" fdkTruncate [fdkTruncateState]="true">
            Retain color
        </span>
    `
})
class TestComponent {
    pixLength = 100;
}

describe('TruncateDirective', () => {
    let component: TestComponent;
    let fixture: ComponentFixture<TestComponent>;
    let truncateTrue: DebugElement;
    let truncateFalse: DebugElement;
    let retainColor: DebugElement;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [TestComponent, TruncateDirective]
        });

        fixture = TestBed.createComponent(TestComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();

        truncateTrue = fixture.debugElement.query(By.css('#truncate-true'));
        truncateFalse = fixture.debugElement.query(By.css('#truncate-false'));
        retainColor = fixture.debugElement.query(By.css('#retain-color'));
    });

    it('should create an instance', () => {
        expect(truncateTrue).toBeTruthy();
        expect(truncateFalse).toBeTruthy();
        expect(retainColor).toBeTruthy();
    });

    it('should apply truncation style when fdkTruncateState is true', () => {
        expect(truncateTrue.nativeElement.style.maxWidth).toBe(`${component.pixLength}px`);
    });

    it('should not apply truncation style when fdkTruncateState is false', () => {
        expect(truncateFalse.nativeElement.style.maxWidth).toBe('');
    });

    it("should retain element's original style when truncating", () => {
        expect(retainColor.nativeElement.style.color).toBe('red');
        expect(retainColor.nativeElement.style.maxWidth).toBe('200px');
    });
});
