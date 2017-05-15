import { ErrorHandler, Injectable, Injector } from '@angular/core';
import { LocationStrategy, PathLocationStrategy } from '@angular/common';
import { LogService } from './log.service';
import * as StackTrace from 'stacktrace-js';
@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
constructor(private injector: Injector) { debugger;}
handleError(error) {
    console.log("error");
  //   const loggingService = this.injector.get(LogService);
  //   const location = this.injector.get(LocationStrategy);
  //   const message = error.message ? error.message : error.toString();
  //   const url = location instanceof PathLocationStrategy
  //     ? location.path() : '';
  //  //get the stack trace, lets grab the last 10 stacks only
  //   StackTrace.fromError(error).then(stackframes => {
  //     const stackString = stackframes
  //       .splice(0, 20)
  //       .map(function(sf) {
  //         return sf.toString();
  //       }).join('\n');
  //     loggingService.error({ message, url, stack: stackString });
  //   });
   
throw error;
  }
  
}