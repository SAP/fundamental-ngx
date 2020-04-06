import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Component } from '@angular/core';
import { DIALOG_CONFIG, DialogConfig } from '../dialog-utils/dialog-config.class';
import { DIALOG_REF, DialogRef } from '../dialog-utils/dialog-ref.class';
import { DialogContainerComponent } from '../dialog-container/dialog-container.component';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';

@Component({
    selector: 'fd-content-test-component',
    template: 'Hello there'
})
class ContentTestComponent {}

describe('DialogContainerComponent', () => {
    let component: DialogContainerComponent;
    let fixture: ComponentFixture<DialogContainerComponent>;
    const dialogConfig = { ...new DialogConfig(), componentClass: 'test-class'};

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [DialogContainerComponent, ContentTestComponent],
            providers: [
                {provide: DIALOG_CONFIG, useValue: dialogConfig},
                {provide: DIALOG_REF, useClass: DialogRef}
            ]
        }).overrideModule(BrowserDynamicTestingModule, {
            set: {entryComponents: [ContentTestComponent]}
        });
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(DialogContainerComponent);
        component = fixture.componentInstance;
        component.childContent = ContentTestComponent;
    });

    async function wait(componentFixture: ComponentFixture<any>) {
        componentFixture.detectChanges();
        await componentFixture.whenStable();
    }

    it('should create', () => {
        fixture.detectChanges();

        expect(component).toBeTruthy();
    });

    it('should create embedded content', async () => {
        await wait(fixture);

        const childComponentEl = fixture.nativeElement.querySelector('fd-content-test-component');
        expect(childComponentEl).toBeTruthy();
        expect(childComponentEl.textContent).toContain('Hello there');
    });
});
