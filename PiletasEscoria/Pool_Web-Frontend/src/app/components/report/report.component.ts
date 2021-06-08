import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Globals } from 'src/app/global';
import { UserService } from '../shared/user/user-service.component';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { formatDate, registerLocaleData } from '@angular/common';
import localeES from '@angular/common/locales/es';

registerLocaleData(localeES, 'es');

export interface Tile {
  pool: string;
  estado: string;
  propiedad: string;
  valor: string;
  fecha: string;
  usuario: string;

}

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {
  reportForm: FormGroup;
  submitted = false;
  private userLoged: string;
  private isLoged: boolean;


  dt: Date;

  tiles: Tile[] = [
    // { pool: 'PILETAS', estado: 'ESTADO', propiedad: 'PROPIEDAD', valor: 'VALOR', fecha: 'FECHA', usuario: 'USUARIO' }
  ];


  logout() {

    sessionStorage.removeItem('TenarisMimicoPiletaUser');
    sessionStorage.removeItem('TenarisMimicoPiletaLoged');
    sessionStorage.clear();
    window.location.reload();
    this.router.navigate(['logout']);

  }

  constructor(private formBuilder: FormBuilder, private globals: Globals,
    private userService: UserService,
    private fb: FormBuilder,
    private router: Router,
    private httpClient: HttpClient
  ) {

    this.dt = new Date();
  }

  ngOnInit() {

    this.userLoged = this.userService.getUserLoggedIn();
    this.isLoged = this.userService.getUserLogged();

    this.reportForm = this.formBuilder.group({
      iDate: ['', Validators.required],
      eDate: ['', Validators.required],
    });
  }


  get f() { return this.reportForm.controls; }

  downLoadFile(data: any, type: string) {

    let blob = new Blob([data], { type: type });
    const element = document.createElement('a');
    element.href = URL.createObjectURL(blob);
    const format = 'dd_MM_yyyy_HH_mm_ss';
    const myDate = new Date();
    const locale = 'es';
    const formattedDate = formatDate(myDate, format, locale);

    element.download = "MimicoPiletasEscoriaReport_" + formattedDate + ".xlsx";
    document.body.appendChild(element);
    element.click();

  }

  onSubmit() {
    this.submitted = true;

    if (this.reportForm.invalid) {
      return;
    }
    /*
         var url1 = this.globals.baseUrl + '/poolAction/Download/'+this.reportForm.get("iDate").value+'/'+this.reportForm.get("eDate").value;
   
         this.httpClient.get(url1,{
           responseType: 'arraybuffer'} 
          ).subscribe(response => this.downLoadFile(response, "application/octet-stream"));
    */

    var url1 = this.globals.baseUrl + '/poolAction/ViewReportByDate/' + this.reportForm.get("iDate").value + '/' + this.reportForm.get("eDate").value;

    this.httpClient.get(url1).subscribe((res: any[]) => {
      this.tiles = res;
      console.log(res);
     // console.log(this.tiles);

    });

  }


  //////////////////////////////////////////////////////////////////////
  download() {

    this.submitted = true;

    if (this.reportForm.invalid) {
      return;
    }


    var url1 = this.globals.baseUrl + '/poolAction/Download/' + this.reportForm.get("iDate").value + '/' + this.reportForm.get("eDate").value;

    this.httpClient.get(url1, {
      responseType: 'arraybuffer'
    }
    ).subscribe(response => this.downLoadFile(response, "application/octet-stream"));




  }












}
