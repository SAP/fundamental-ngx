import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InlineHelpComponent } from './inline-help.component';
import { InlineHelpModule } from './inline-help.module';

describe('InlineHelpComponent', () => {
    let component: InlineHelpComponent;
    let fixture: ComponentFixture<InlineHelpComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [InlineHelpModule]
        }).compileComponents();

    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(InlineHelpComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
