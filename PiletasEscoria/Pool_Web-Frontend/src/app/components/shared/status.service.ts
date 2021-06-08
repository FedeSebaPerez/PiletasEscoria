import { Injectable, ModuleWithComponentFactories } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Globals } from 'src/app/global';
import { Pool } from './pool';

@Injectable({
    providedIn: 'root'
})

export class StatusService {
    private apiUrl = '/api/';

    constructor(
        private http: HttpClient,
        private globals: Globals) 
    {
        this.apiUrl = globals.baseUrl + '/Status';
    }

    public getStatuses(): Observable<object[]>{
        const url = `${this.apiUrl}/GetAllStatus`;
        return this.http.get<object[]>(url);
      }

    // public getPool(idPool: number): Observable<object> {
    //     const url = `${this.apiUrl}/GetPoolById/${idPool}`;
    //     return this.http.get<object[]>(url);
    // }

    // public getPools(): Observable<object[]> {
    //     const url = `${this.apiUrl}/GetAllPools`;
    //     return this.http.get<object[]>(url);
    // }

    // public addPool(pool: Pool): Observable<object> {
    //     const url = `${this.apiUrl}/AddPool`;
    //     return this.http.post<object>(url, pool);
    // }

    // public updatePool(pool: Pool): Observable<object> {
    //     const url = `${this.apiUrl}/UpdatePool`;
    //     return this.http.put<object>(url, pool);
    // }

    // public deactivatePool(idPool: number): Observable<object> {
    //     const url = `${this.apiUrl}/DeactivatePool`;
    //     return this.http.put<object>(url, idPool);
    // }
}

