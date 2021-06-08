import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Email } from 'src/app/components/shared/email';
import {Globals} from '../../global'

@Component({
  selector: 'app-edit-email',
  templateUrl: './edit-email.component.html',
  styleUrls: ['./edit-email.component.css']
})
export class EditEmailComponent implements OnInit {
  @Input() id: number;

  objeto: any = new Email(0,'', true);
  private apiUrl = '/Emails';
  constructor(
    private activeModal: NgbActiveModal,
	 private http: HttpClient,
    private globals: Globals,
  ) { }

  ngOnInit() {

	this.apiUrl = this.globals.baseUrl+''+this.apiUrl;
	
    this.getEmail(this.id).subscribe(r => {
		this.objeto = r;
    });
	

  }
  
  public accept() {
    this.updateEmail(this.objeto).subscribe(r => {
      
      const res = +r;
      if (res === 1) {
        this.activeModal.close();
      }
      else {
        console.log('No se ha guardado');
      }
    });
  }
  
  
  public updateEmail(o: Email): Observable<object> {
        const url = `${this.apiUrl}`;
        return this.http.put<object>(url, o);
  }
  

  
  public getEmail(idEmail: number): Observable<object> {
        const url = `${this.apiUrl}/${idEmail}`;
		return this.http.get<object[]>(url);
  }



}
