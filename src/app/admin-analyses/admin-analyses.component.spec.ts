import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAnalysesComponent } from './admin-analyses.component';

describe('AdminAnalysesComponent', () => {
  let component: AdminAnalysesComponent;
  let fixture: ComponentFixture<AdminAnalysesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminAnalysesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminAnalysesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
