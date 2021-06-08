import { Component, OnInit, Input } from '@angular/core';
import { PoolService } from 'src/app/components/shared/pool.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { DataType } from 'src/app/components/shared/datatype';
import { Property } from 'src/app/components/shared/property';
import { PropertyService } from 'src/app/components/shared/property.service';

@Component({
  selector: 'app-property-pool',
  templateUrl: './edit-property.component.html',
  styleUrls: ['./edit-property.component.css']
})
export class EditPropertyComponent implements OnInit {
  @Input() id: number;
  property = new Property(0,0,'',true);
  private datatypes: any [];

  constructor(
    private poolService: PoolService,
    private propertyService: PropertyService,
    private activeModal: NgbActiveModal
  ) { }

  ngOnInit() {
    this.getPropertyToEdit(this.id);
    this.getDataTypes();
  }
  
  async objChanged(event: any){
    console.log(this.property.idDataType);
    
  }

  accept() {
    this.propertyService.updateProperty(this.property).subscribe(r => {
      const res = +r;
      if (res === 1) {
        this.activeModal.close();
      }
      else {
        console.log('No se ha guardado');
      }
    });
  }

  getPropertyToEdit(idProperty: number) {
    this.propertyService.getProperty(idProperty).subscribe(o => {
      this.property = o;
    })
  }

  getDataTypes() {
    this.propertyService.getDataTypes().subscribe(o => {
      this.datatypes = o;
    })
  }

}
