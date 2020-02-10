import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlatformLinkDocsComponent } from './platform-link-docs.component';

describe('LinkExampleComponent', () => {
    let component: PlatformLinkDocsComponent;
    let fixture: ComponentFixture<PlatformLinkDocsComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [PlatformLinkDocsComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(PlatformLinkDocsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
