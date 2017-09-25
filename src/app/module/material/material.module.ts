import { NgModule } from '@angular/core';
import {MdListModule} from '@angular/material/list';
import {MdButtonModule} from '@angular/material/button';
import {MdInputModule} from '@angular/material/input';
import {MdCardModule} from '@angular/material/card';
import {MdSliderModule} from '@angular/material/slider';
@NgModule({
  imports: [],
  declarations: [],
  exports:[
    MdListModule,
    MdButtonModule,
    MdCardModule,
    MdSliderModule,
    MdInputModule
  ]
})
export class MaterialModule { }
