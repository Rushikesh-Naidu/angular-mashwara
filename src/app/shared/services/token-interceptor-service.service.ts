import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { LoaderService } from '../loader/loader.service';
import { Observable } from 'rxjs';

/**
 * This interceptor automatically adds the token header needed by our backend API if such token is present
 * in the current state of the application.
 */
@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {

  activeRequests: number = 0;

  constructor(
    private loader: LoaderService,
  ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.activeRequests++;

    let newHeaders = req.headers;
    newHeaders = newHeaders.append('authtoken', '12345');

    const authReq = req.clone({ headers: newHeaders });

    return next.handle(authReq).pipe(
      finalize(() => {
        this.activeRequests--;
      })
    )

  }
}