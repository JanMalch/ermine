import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { throttleTime } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  private readonly loading = new BehaviorSubject<boolean>(false);

  get loading$(): Observable<boolean> {
    return this.loading.asObservable().pipe(throttleTime(10));
  }

  setLoading(value: boolean) {
    this.loading.next(value);
  }
}
