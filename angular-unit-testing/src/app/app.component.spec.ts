import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { Router, provideRouter, RouterOutlet } from '@angular/router';
import { AppComponent } from './app.component';
import { CatDummyComponent } from './mocks/cat-dummy/cat-dummy.component';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let router: Router;
  const testRoutes = [
    { path: 'cat', component: CatDummyComponent },
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent, RouterOutlet],
      providers: [provideRouter(testRoutes)]
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    router = TestBed.inject(Router);
  });

  it('should create the app', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should navigate to cat page', fakeAsync(() => {
    // Act
    router.navigate(['/cat']);
    tick();
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;

    // Assert
    expect(router.url).toBe('/cat');
    expect(compiled.textContent).toContain('Cat dummy works!');
  }));
});