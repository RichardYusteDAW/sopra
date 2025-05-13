import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { FormComponent } from './form.component';
import { FormRoutingModule } from './form-routing.module';
import { SimilarproductComponent } from './components/similarproduct/similarproduct.component';
import { FormConfirmComponent } from './components/form-confirm/form-confirm.component';

@NgModule({
  declarations: [FormComponent, SimilarproductComponent, FormConfirmComponent],
  imports: [CommonModule, FormRoutingModule, ReactiveFormsModule],
})
export class FormModule {}
