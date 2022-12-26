import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabOneComponent } from './tab-one/tab-one.component';
import { TabTwoComponent } from './tab-two/tab-two.component';
import { IndexComponent } from './index/index.component';
import { TabDetailComponent } from './tab-one/tab-detail/tab-detail.component';
import { FormComponent } from './form/form/form.component';

const routes: Routes = [
  { path: '', redirectTo: '/home/tab-1', pathMatch: 'full' },
  {
    path: 'home', component: IndexComponent, children: [
      { path: 'tab-1', component: TabOneComponent },
      { path: 'tab-2', component: TabTwoComponent },
    ]
  },
  {
    path: 'home/tab-1/:id', component: TabDetailComponent
  },
  {
    path: 'form', component: FormComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
