import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BaybayinTranslatorComponent } from './baybayin-translator.component';

describe('BaybayinTranslatorComponent', () => {
  let component: BaybayinTranslatorComponent;
  let fixture: ComponentFixture<BaybayinTranslatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BaybayinTranslatorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BaybayinTranslatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
