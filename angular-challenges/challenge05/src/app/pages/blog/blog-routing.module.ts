import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BlogComponent } from './blog.component';
import { activateBlogGuard } from 'src/app/guards/activate-blog.guard';
import { blogGuard } from 'src/app/guards/blog.guard';

const routes: Routes = [
  { path: '', component: BlogComponent, canActivate: [blogGuard] },
  {
    path: 'activate',
    component: BlogComponent,
    canActivate: [activateBlogGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BlogRoutingModule {}
