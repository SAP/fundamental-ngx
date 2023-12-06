import { Component, DebugElement, Input } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { TruncateDirective } from './truncate.directive';

@Component({
    template: `
        <span fdkTruncate [fdkTruncateState]="true" [fdkTruncateWidth]="pixLength">
            This element should by truncated by width as fdkTruncateWidth is provided
        </span>
        <span fdkTruncate [fdkTruncateState]="false" [fdkTruncateWidth]="pixLength">
            This element should not be truncated as fdkTruncateState is false
        </span>
        <span style="color:red;" fdkTruncate [fdkTruncateState]="true">
            This element should not be truncated as fdkTruncateState is false
        </span>
    `
})
class TestComponent {
    @Input()
    text: string;

    @Input()
    pixLength: number;
}

describe('TruncateDirective', () => {
    let component: TestComponent;
    let fixture: ComponentFixture<TestComponent>;
    let truncate: DebugElement[];

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [TestComponent],
            imports: [TruncateDirective]
        });
        fixture = TestBed.createComponent(TestComponent);
        component = fixture.componentInstance;
        component.pixLength = 100;
        fixture.detectChanges();
        truncate = fixture.debugElement.queryAll(By.directive(TruncateDirective));
    });

    it('should create an instance', () => {
        expect(truncate).toBeTruthy();
    });

    it('Should truncate when fdkTruncateState is true', () => {
        expect(truncate[0].nativeElement.style.maxWidth).toBe(`${component.pixLength}px`);
        expect(truncate[2].nativeElement.style.maxWidth).toBe(`200px`);
    });

    it('Should not truncate when fdkTruncateState is false', () => {
        expect(truncate[1].nativeElement.style.maxWidth).toBe('');
    });

    it("Should preserve element's default style", () => {
        expect(truncate[2].nativeElement.style.color).toEqual('red');
    });
});
