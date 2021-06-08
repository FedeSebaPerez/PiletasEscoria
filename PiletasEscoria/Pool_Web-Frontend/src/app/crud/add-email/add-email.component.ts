import { Component, OnInit } from '@angular/core';
import { Injectable, ModuleWithComponentFactories } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Email } from 'src/app/components/shared/email';
import {Globals} from '../../global'


@Injectable({
    providedIn: 'root'
})

@Component({
  selector: 'app-add-email',
  templateUrl: './add-email.component.html',
  styleUrls: ['./add-email.component.css']
})

export class AddEmailComponent implements OnInit {
	private mensaje="";
  private apiUrl = '/Emails';
  objeto = new Email(0,'', true);
  constructor(
    private activeModal: NgbActiveModal,
	private http: HttpClient,
    private globals: Globals,
  ) { }

  ngOnInit() {
    this.apiUrl = this.globals.baseUrl+''+this.apiUrl;
  }

  public accept() {
    this.addEmail(this.objeto).subscribe(r => {
    // console.log(r);

      const res = +r;
      if (res === 1) {
        this.activeModal.close();
      }
      else {
       console.log('No se ha guardado');
        if (res === -5) {
        this.mensaje="El email ya existe";
        }

        if (res === -6) {
          this.mensaje="Ingresar formato email";
          }

      }
    
      });
  
    }
  
  
  public  addEmail(o: Email): Observable<object> {
        //const url = `${this.apiUrl}/AddEmail`;
        const url = `${this.apiUrl}`;
        if (/^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i.test(o.emailAddress)){
          var a = this.http.post<object>(url, o);
          console.log(a)
          return a;
         } else {
           o.emailAddress="";
          var a = this.http.post<object>(url, o);


       return a;
         }

  }



}
