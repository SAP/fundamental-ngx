import { Component, DebugElement, Input } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { TruncateDirective, TruncateTargetDirective } from './truncate.directive';

@Component({
    template: `
        <div fd-truncate [fdTruncateState]="true" [fdTruncateChars]="maxChars">
            <div fd-truncate-target [fdTruncateTargetText]="text"></div>
        </div>
    `
})
class TestComponent {
    @Input()
    text: string;

    @Input()
    maxChars: number;
}

describe('TruncateDirective', () => {
    let component: TestComponent;
    let fixture: ComponentFixture<TestComponent>;
    let truncate: DebugElement;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [TestComponent, TruncateDirective, TruncateTargetDirective]
        });
        fixture = TestBed.createComponent(TestComponent);
        component = fixture.componentInstance;
        component.maxChars = 500;
        component.text =
            'Long text, you can toggle view with more/less button. Lorem Ipsum is simply dummy text of the printing and typesetting industry.';
        fixture.detectChanges();
        truncate = fixture.debugElement.query(By.directive(TruncateDirective));
    });

    it('should create an instance', () => {
        expect(truncate).toBeTruthy();
    });
});
