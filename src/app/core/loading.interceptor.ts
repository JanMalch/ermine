import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoadingService } from '@core/loading.service';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoadingInterceptor implements HttpInterceptor {
  constructor(private loadingService: LoadingService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (!req.url.startsWith('https://api.github.com/graphql')) {
      return next.handle(req);
    }

    this.loadingService.setLoading(true);
    return next.handle(req).pipe(
      tap(event => {
        if (event instanceof HttpResponse) {
          this.loadingService.setLoading(false);
        }
      }),
      catchError(err => {
        this.loadingService.setLoading(false);
        return throwError(err);
      })
    );
  }
}
