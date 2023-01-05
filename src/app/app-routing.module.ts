import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { VideoCollectionComponent } from './pages/video-collection/video-collection.component';
import { SearchVideoCollectionComponent } from './pages/search-video-collection/search-video-collection.component';
import { VideoComponent } from './pages/video/video.component';
import { AddVideoComponent } from './pages/add-video/add-video.component';
import { ChangePasswordComponent } from './pages/change-password/change-password.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'channel/:subscriptionUserName', component: VideoCollectionComponent},
  {path: 'search/:query', component: SearchVideoCollectionComponent},
  {path: 'video/:videoId', component: VideoComponent},
  {path: 'addVideo', component: AddVideoComponent},
  {path: 'changePassword', component: ChangePasswordComponent},
  {path: '**', component: HomeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
