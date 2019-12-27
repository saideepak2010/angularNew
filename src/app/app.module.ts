import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { CreateComponent } from './create/create/create.component';
import { DeleteComponent } from './delete/delete/delete.component';
import { ReadComponent } from './read/read/read.component';
import { AppRoutingModule }     from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonComponent } from './commonComponents/button/button.component';
import { InputComponent } from './commonComponents/input/input.component';
import { SubFormComponent } from './subforms/subform.component';

@NgModule({
  declarations: [
    AppComponent,
    CreateComponent,
    DeleteComponent,
    ReadComponent,
    SubFormComponent,
    ButtonComponent,
    InputComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
