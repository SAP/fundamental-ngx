import { Component, ElementRef, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { GenericTagComponent, GenericTagState } from './generic-tag.component';
import { GenericTagModule } from './generic-tag.module';

@Component({
    selector: 'fn-test-generic-tag',
    template: `
        <fn-generic-tag
            [disabled]="disabled"
            [state]="state"
            label="Disabled"
            [number]="suffix"
            [glyph]="glyph"
        ></fn-generic-tag>
    `
})
class TestObjectStatusComponent {
    @ViewChild(GenericTagComponent, { static: true, read: ElementRef })
    genericTagElementRef: ElementRef;

    state: GenericTagState;

    disabled = false;

    glyph: string;

    suffix: string;
}

describe('GenericTagComponent', () => {
    let genericTagElmRef: ElementRef;
    let testComponent: TestObjectStatusComponent;
    let fixture: ComponentFixture<TestObjectStatusComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [TestObjectStatusComponent],
            imports: [GenericTagModule]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TestObjectStatusComponent);
        genericTagElmRef = fixture.componentInstance.genericTagElementRef;
        testComponent = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('Should create', () => {
        expect(testComponent).toBeTruthy();
        expect(genericTagElmRef).toBeTruthy();
    });

    it('Should change status', () => {
        const statuses: GenericTagState[] = ['positive', 'critical', 'negative', 'info'];

        statuses.forEach((state) => {
            testComponent.state = state;
            fixture.detectChanges();
            expect(genericTagElmRef.nativeElement.classList.contains(`fn-generic-tag--${state}`)).toBeTrue();
        });
    });

    it('Should render icon and suffix text', () => {
        testComponent.glyph = 'information';
        fixture.detectChanges();

        expect(fixture.nativeElement.querySelector('.sap-icon--information')).toBeTruthy();

        testComponent.suffix = '42K';
        fixture.detectChanges();

        expect(fixture.nativeElement.querySelector('.fn-generic-tag__number')).toBeTruthy();
        expect(fixture.nativeElement.querySelector('.fn-generic-tag__number').innerText).toEqual(testComponent.suffix);
    });
});
