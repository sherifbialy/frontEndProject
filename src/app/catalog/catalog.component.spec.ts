import { ComponentFixture, TestBed, async, fakeAsync, tick } from '@angular/core/testing';

import { CatalogComponent } from './catalog.component';
import { CatalogAPIService } from './catalog-api.service';
import { Movie } from './movie.model';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { environment } from '../../environments/environment';

const mockMovies: Movie[] = [
  {
    adult: false,
    backdrop_path: "https://via.placeholder.com/500x300",
    original_language: "en",
    original_title: "The Adventures of Widget",
    overview: "A heartwarming tale of a widget's journey to find its purpose.",
    popularity: 54.2,
    poster_path: "https://via.placeholder.com/300x450",
    release_date: "2024-01-02",
    title: "Widget's World",
    video: true,
    vote_average: 7.8,
    vote_count: 1254
  },
  {
    adult: false,
    backdrop_path: "https://via.placeholder.com/500x300",
    original_language: "es",
    original_title: "La Vida de un Lápiz",
    overview: "A captivating story of a pencil's quest to create art and inspire others.",
    popularity: 62.7,
    poster_path: "https://via.placeholder.com/300x450",
    release_date: "2023-12-15",
    title: "The Pencil's Journey",
    video: false,
    vote_average: 8.4,
    vote_count: 2589
  },
 
];
describe('CatalogComponent', () => {
  let component: CatalogComponent;
  let fixture: ComponentFixture<CatalogComponent>;

  beforeEach(async () => {
   
    await TestBed.configureTestingModule({
      declarations: [CatalogComponent],
      imports:[HttpClientTestingModule, RouterTestingModule],
      providers:[CatalogAPIService]
      
    })
    .compileComponents();
    
    
  });
  
  

  it('should create my catalog component', () => {
    let fixture = TestBed.createComponent(CatalogComponent);
    let component = fixture.componentInstance;
    
    expect(component).toBeTruthy();
  });
  it('should fetch movies on initialization', () => {
    let fixture = TestBed.createComponent(CatalogComponent);
    let component = fixture.componentInstance;
    let apiService=TestBed.inject(CatalogAPIService);
    spyOn(apiService, 'fetchPopularMovies').and.callThrough();
    component.ngOnInit();
    expect(apiService.fetchPopularMovies).toHaveBeenCalled();
  });

  it('should handle successful movie fetch', fakeAsync(() => {
    const api: CatalogAPIService = TestBed.inject(CatalogAPIService); // Expect the HTTP request
    let fixture = TestBed.createComponent(CatalogComponent);
    let component = fixture.componentInstance;
  
 
  
  
    component.ngOnInit();
    api.moviesSubject.next(mockMovies);
    fixture.whenStable().then(() => {
      expect(component.movies).toEqual(mockMovies);
      expect(component.isLoading).toBeFalsy();
      expect(component.error).toBeFalsy();
    });
    expect(fixture.nativeElement.querySelector('.card-body')).toBeDefined();
  }));

  it('should handle error during movie fetch', fakeAsync(() => {
    let fixture = TestBed.createComponent(CatalogComponent);
    let component = fixture.componentInstance;
    let apiService=TestBed.inject(CatalogAPIService);
    apiService.moviesSubject.error('Failed to fetch movies')
    
    

    component.ngOnInit();
    fixture.whenStable().then(() => {
      expect(component.movies).toBeUndefined();
      expect(component.isLoading).toBeFalsy();
      expect(component.error).toBeTruthy;
    });
  }));

  it('should unsubscribe from service on destruction', () => {
    let fixture = TestBed.createComponent(CatalogComponent);
    let component = fixture.componentInstance;
    
    const subscription = of(null).subscribe();
    component.serviceSub = subscription;
    component.ngOnDestroy();
    expect(subscription.closed).toBeTruthy();
  });

  it('should display loading indicator', () => {
    let fixture = TestBed.createComponent(CatalogComponent);
    let component = fixture.debugElement.componentInstance;
    component.isLoading = true;
    component.error = null;
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.spinner-border')).toBeTruthy();
  });
  
  it('should have the popular movies title', () => {
    let fixture = TestBed.createComponent(CatalogComponent);
    fixture.detectChanges();
    let component=fixture.nativeElement;
    expect(component.querySelector('h1').textContent).toContain(`${environment.catalogTitle}`);

  });
});
  

  



