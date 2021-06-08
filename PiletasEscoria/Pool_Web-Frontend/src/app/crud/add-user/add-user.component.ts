import { Component, OnInit } from '@angular/core';
import { Injectable, ModuleWithComponentFactories } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { User } from 'src/app/components/shared/user';
import {Globals} from '../../global'


@Injectable({
    providedIn: 'root'
})

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})

export class AddUserComponent implements OnInit {
	
  private apiUrl = '/Users';
  objeto = new User(0,'', true, false);
  constructor(
    private activeModal: NgbActiveModal,
	 private http: HttpClient,
    private globals: Globals,
  ) { }

  ngOnInit() {
    this.apiUrl = this.globals.baseUrl+''+this.apiUrl;
  }

  public accept() {
    this.addUser(this.objeto).subscribe(r => {
      
      const res = +r;
      if (res === 1) {
        this.activeModal.close();
      }
      else {
        console.log('No se ha guardado');
      }
    });
  }
  
  
  public addUser(o: User): Observable<object> {
        const url = `${this.apiUrl}`;
        return this.http.post<object>(url, o);
  }



}
