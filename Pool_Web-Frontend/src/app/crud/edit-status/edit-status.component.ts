import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Status } from 'src/app/components/shared/status';
import {Globals} from '../../global'

@Component({
  selector: 'app-edit-status',
  templateUrl: './edit-status.component.html',
  styleUrls: ['./edit-status.component.css']
})
export class EditStatusComponent implements OnInit {
  @Input() id: number;

  objeto: any = new Status(0,'', '', true);
  private apiUrl = '/Status';
  constructor(
    private activeModal: NgbActiveModal,
	 private http: HttpClient,
    private globals: Globals,
  ) { }

  ngOnInit() {

	this.apiUrl = this.globals.baseUrl+''+this.apiUrl;
	
    this.getStatus(this.id).subscribe(r => {
		this.objeto = r;
    });
	

  }
  
  public accept() {
    this.updateStatus(this.objeto).subscribe(r => {
      
      const res = +r;
      if (res === 1) {
        this.activeModal.close();
      }
      else {
        console.log('No se ha guardado');
      }
    });
  }
  
  
  public updateStatus(o: Status): Observable<object> {
        const url = `${this.apiUrl}`;
        return this.http.put<object>(url, o);
  }
  

  
  public getStatus(idStatus: number): Observable<object> {
        const url = `${this.apiUrl}/${idStatus}`;
		return this.http.get<object[]>(url);
  }



}
