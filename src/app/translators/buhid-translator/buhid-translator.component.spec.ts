import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuhidTranslatorComponent } from './buhid-translator.component';

describe('BuhidTranslatorComponent', () => {
  let component: BuhidTranslatorComponent;
  let fixture: ComponentFixture<BuhidTranslatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BuhidTranslatorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BuhidTranslatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
