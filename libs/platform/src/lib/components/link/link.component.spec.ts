import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { LinkComponent } from './link.component';
import { Component, ViewChild, Input } from '@angular/core';
import { By } from '@angular/platform-browser';

@Component({
    selector: 'fdp-link-test-component',
    template: `
        <fdp-link [href]="href" [toolTipText]="toolTipText">RegularLink</fdp-link>
    `
})
class TestComponent {
    @ViewChild(LinkComponent, { static: false }) link: LinkComponent;
    @Input() href = 'https://www.google.com/';

    @Input() toolTipText = 'my tooltip text';

    constructor() {}
}

describe('LinkComponent', () => {
    let component: LinkComponent;
    let fixture: ComponentFixture<LinkComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [LinkComponent],
            providers: []
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(LinkComponent);
        component = fixture.componentInstance;

        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should have fd-link class', () => {
        const linkElement = fixture.debugElement.query(By.css('fd-link'));
        console.log('linkElement: ' + linkElement);
    });
});
