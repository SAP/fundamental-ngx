import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IllustratedMessageComponent } from './illustrated-message.component';
import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
    template: `
       <figure fd-illustrated-message [type]="type">
          <figcaption fd-illustrated-message-figcaption>
              <h3 fd-illustrated-message-title>Unable to load data</h3>
              <p fd-illustrated-message-text>Check your internet connection. If that's not it, try refereshing the page. If that still doesn't help, check with your administratior.</p>
          </figcaption>
      </figure>
    `
})
class TestIllustratedMessageComponent {
    @ViewChild(IllustratedMessageComponent, {static: true, read: ElementRef})
    illustratedMessageElementRef: ElementRef;

    type = 'scene';
}

describe('IllustratedMessageComponent', () => {
    let illustratedMessageElementRef: ElementRef;
    let testComponent: TestIllustratedMessageComponent;
    let fixture: ComponentFixture<TestIllustratedMessageComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [IllustratedMessageComponent, TestIllustratedMessageComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TestIllustratedMessageComponent);
        illustratedMessageElementRef = fixture.componentInstance.illustratedMessageElementRef;
        testComponent = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('Should create', () => {
        expect(testComponent).toBeTruthy();
        expect(illustratedMessageElementRef).toBeTruthy();
    });

    it('Should have scene type by default', () => {
      expect(illustratedMessageElementRef.nativeElement.classList.contains('fd-illustrated-message--scene')).toBeTrue();
    });

    it('Should add dialog type', () => {
        testComponent.type = 'dialog';
        fixture.detectChanges();
        expect(illustratedMessageElementRef.nativeElement.classList.contains('fd-illustrated-message--dialog')).toBeTrue();
    });

    it('Should add spot type', () => {
      testComponent.type = 'spot';
      fixture.detectChanges();
      expect(illustratedMessageElementRef.nativeElement.classList.contains('fd-illustrated-message--spot')).toBeTrue();
    });
});
