import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InlineHelpDirective } from './inline-help.directive';
import { InlineHelpModule } from './inline-help.module';

describe('InlineHelpComponent', () => {
    let component: InlineHelpDirective;
    let fixture: ComponentFixture<InlineHelpDirective>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [InlineHelpModule]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(InlineHelpDirective);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
