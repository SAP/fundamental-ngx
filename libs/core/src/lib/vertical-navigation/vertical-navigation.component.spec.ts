import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { Component, ElementRef, ViewChild } from '@angular/core';
import { VerticalNavigationComponent } from './vertical-navigation.component';
import { LinkComponent } from '../link/link.component';

@Component({
    selector: 'fd-test-vertical-navigation',
    template: ` <fd-vertical-navigation> </fd-vertical-navigation> `
})
class TestVerticalNavigationComponent {
    @ViewChild('objectRef', { read: ElementRef })
    verticalNavigationElementRef: ElementRef;
}

describe('VerticalNavigationComponent', () => {
    let verticalNavigationElementRef: ElementRef;
    let testComponent: TestVerticalNavigationComponent;
    let fixture: ComponentFixture<TestVerticalNavigationComponent>;

    beforeEach(
        waitForAsync(() => {
            TestBed.configureTestingModule({
                declarations: [VerticalNavigationComponent, TestVerticalNavigationComponent, LinkComponent]
            }).compileComponents();
        })
    );

    beforeEach(() => {
        fixture = TestBed.createComponent(TestVerticalNavigationComponent);
        testComponent = fixture.componentInstance;
        fixture.detectChanges();
        verticalNavigationElementRef = fixture.componentInstance.verticalNavigationElementRef;
    });

    it('Should create', () => {
        expect(testComponent).toBeTruthy();
    });
});
