import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
} from "@angular/common/http";

import { Injectable, Injector } from "@angular/core";

import { Observable } from "rxjs";

//  import { serverErrorLogService } from '../services/error-log.service';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {
  public onlineFlag = navigator.onLine;

  constructor(private injector: Injector) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request);
  }
}