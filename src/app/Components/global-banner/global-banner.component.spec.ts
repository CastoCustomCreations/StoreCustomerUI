import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GlobalBannerComponent } from './global-banner.component';

describe('GlobalBannerComponent', () => {
  let component: GlobalBannerComponent;
  let fixture: ComponentFixture<GlobalBannerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GlobalBannerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GlobalBannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
