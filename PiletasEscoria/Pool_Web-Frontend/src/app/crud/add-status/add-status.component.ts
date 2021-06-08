import { Component, OnInit } from '@angular/core';
import { Injectable, ModuleWithComponentFactories } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Status } from 'src/app/components/shared/status';
import {Globals} from '../../global'


@Injectable({
    providedIn: 'root'
})

@Component({
  selector: 'app-add-status',
  templateUrl: './add-status.component.html',
  styleUrls: ['./add-status.component.css']
})

export class AddStatusComponent implements OnInit {
	
  private apiUrl = '/Status';
  objeto = new Status(0,'','', true);
  constructor(
    private activeModal: NgbActiveModal,
	private http: HttpClient,
    private globals: Globals,
  ) { }

  ngOnInit() {
    this.apiUrl = this.globals.baseUrl+''+this.apiUrl;
  }

  public accept() {
    this.addStatus(this.objeto).subscribe(r => {
      
      const res = +r;
      if (res === 1) {
        this.activeModal.close();
      }
      else {
        console.log('No se ha guardado');
      }
    });
  }
  
  
  public addStatus(o: Status): Observable<object> {
        const url = `${this.apiUrl}`;
        return this.http.post<object>(url, o);
  }



}
