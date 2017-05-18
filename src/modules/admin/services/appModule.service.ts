/** Angular Dependencies */
import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Router } from '@angular/router';
/** Third Party Dependencies */
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
/** Module Level Dependencies */
import { BaseService } from '../../../app/core/services/index';
import { MessageService } from '../../../app/core/services/index';
/** Context for service calls */
const CONTEXT = 'appmodules/';

/** Service Definition */
@Injectable()
export class AppModuleService extends BaseService {
    constructor(public http: Http, router: Router,messageService: MessageService) {
        super(http,CONTEXT, router,messageService);
    }
    getModules() {
        return this.getList$(CONTEXT, 0, 0, true).map(res => res.json());
    }
}
