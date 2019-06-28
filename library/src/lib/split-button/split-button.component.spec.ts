import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SplitButtonComponent } from './split-button.component';
import { SplitButtonModule } from './split-button.module';

describe('SplitButtonComponent', () => {
    let component: SplitButtonComponent;
    let fixture: ComponentFixture<SplitButtonComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [SplitButtonModule]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(SplitButtonComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
