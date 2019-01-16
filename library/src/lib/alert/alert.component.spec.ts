import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlertComponent } from './alert.component';
import { HashService } from '../utils/hash.service';

describe('AlertComponent', () => {
    let component: AlertComponent;
    let fixture: ComponentFixture<AlertComponent>;
    let hashServiceSpy: jasmine.SpyObj<HashService>;

    beforeEach(async(() => {
        const hashSpy = jasmine.createSpyObj('HashService', ['hash']);

        TestBed.configureTestingModule({
            declarations: [AlertComponent],
            providers: [{ provide: HashService, useValue: hashSpy }]
        }).compileComponents();

        hashServiceSpy = TestBed.get(HashService);
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(AlertComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should get an ID and handle the close event for that ID', () => {
        component.ngOnInit();
        expect(component.generatedId).toBeDefined();
        component.close.subscribe(id => expect(id).toBe(component.id));
        component.handleClose();
    });
});
