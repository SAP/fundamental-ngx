import { Component, ElementRef } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { closestElement } from './closest-element';

@Component({
    template: `
        <article class="article-class">
            <div id="div-01" class="div-class">
                Here is div-01
                <div id="div-02" class="div-class">
                    Here is div-02
                    <div id="div-03">Here is div-03</div>
                </div>
            </div>
        </article>
    `
})
class TestComponent {
    constructor(public elementRef: ElementRef) {}
}

describe('closestElement', () => {
    let component: TestComponent;
    let fixture: ComponentFixture<TestComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
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

    it('should return proper HTML Element', () => {
        const element = component.elementRef.nativeElement.querySelector('#div-03');

        expect(element).toBeTruthy();
        expect(closestElement('#div-03', element)).toEqual(fixture.nativeElement.querySelector('#div-03'));
        expect(closestElement('.article-class', element)).toEqual(fixture.nativeElement.querySelector('article'));
        expect(closestElement('.div-class', element)).toEqual(fixture.nativeElement.querySelector('#div-02'));
        expect(closestElement('article > div', element)).toEqual(fixture.nativeElement.querySelector('#div-01'));
    });
});
