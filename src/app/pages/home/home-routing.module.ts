import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutDefaultComponent } from 'src/app/layouts/layouts.module';
import { HomeIndexComponent } from './index/index.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutDefaultComponent,
    children: [{ path: '', component: HomeIndexComponent }],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule {}
