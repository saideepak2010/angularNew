import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateComponent } from './create/create/create.component';
import { DeleteComponent } from './delete/delete/delete.component';
import { ReadComponent } from './read/read/read.component';

const routes: Routes = [
    { path: 'create', component: CreateComponent },
    { path: 'read', component: ReadComponent },    
    { path: 'delete', component: DeleteComponent }
  ];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }