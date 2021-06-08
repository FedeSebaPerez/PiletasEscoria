import { Injectable, ModuleWithComponentFactories } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Globals } from 'src/app/global';
import { Property } from './property';

@Injectable({
    providedIn: 'root'
})

export class PropertyService {
    private apiUrl = '/api/';

    constructor(
        private http: HttpClient,
        private globals: Globals) 
    {
        this.apiUrl = globals.baseUrl + '/Properties';
    }

    public getDataTypes(): Observable<object[]>{
        const url = `${this.apiUrl}/GetDataType`;
        return this.http.get<object[]>(url);
    }
	public addProperty(property: Property): Observable<object> {
        const url = `${this.apiUrl}/AddProperty`;
        return this.http.post<object>(url, property);  
	}
	
	public updateProperty(property: Property): Observable<object> {
        const url = `${this.apiUrl}/UpdateProperty`;
        return this.http.put<object>(url, property);
    }
	
	public getProperty(idProperty: number): Observable<Property> {
        const url = `${this.apiUrl}/GetPropertyById/${idProperty}`;
        return this.http.get<Property>(url);
    }


}

