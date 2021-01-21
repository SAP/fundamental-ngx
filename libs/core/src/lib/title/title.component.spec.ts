import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { TitleComponent } from './title.component';
import { TitleModule } from './title.module';

describe('TitleComponent', () => {
    let component: TitleComponent;
    let fixture: ComponentFixture<TitleComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [TitleComponent],
            imports: [TitleModule]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TitleComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
        expect(component).toBeDefined();
    });

    it('should assign class', () => {
        component.headerSize = 5;
        component.ngOnInit();
        expect(fixture.nativeElement.classList).toContain('fd-title');
        expect(fixture.nativeElement.classList).toContain('fd-title--h5');
    });
});
