import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable()
export class LoadingService {
  private loading = new BehaviorSubject<boolean>(false);

  get loading$(): Observable<boolean> {
    return this.loading.asObservable();
  }

  setLoading(value: boolean) {
    this.loading.next(value);
  }
}
