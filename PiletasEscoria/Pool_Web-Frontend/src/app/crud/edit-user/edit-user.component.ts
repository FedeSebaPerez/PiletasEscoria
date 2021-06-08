import { Component, OnInit, Input } from '@angular/core';
import { PoolService } from 'src/app/components/shared/pool.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { User } from 'src/app/components/shared/user';
import {Globals} from '../../global'

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {
  @Input() id: number;

  objeto: any = new User(0,'', true, false);
  private apiUrl = '/Users';
  constructor(
    private activeModal: NgbActiveModal,
	 private http: HttpClient,
    private globals: Globals,
  ) { }

  ngOnInit() {

	this.apiUrl = this.globals.baseUrl+''+this.apiUrl;
	
    this.getUser(this.id).subscribe(r => {
		this.objeto = r;
    });
	
	//this.getUser(this.id)
  }
  
  public accept() {
    this.updateUser(this.objeto).subscribe(r => {
      
      const res = +r;
      if (res === 1) {
        this.activeModal.close();
      }
      else {
        console.log('No se ha guardado');
      }
    });
  }
  
  
  public updateUser(o: User): Observable<object> {
        const url = `${this.apiUrl}`;
        return this.http.put<object>(url, o);
  }
  

  
  public getUser(idUser: number): Observable<object> {
        const url = `${this.apiUrl}/${idUser}`;
		return this.http.get<object[]>(url);
  }



}
