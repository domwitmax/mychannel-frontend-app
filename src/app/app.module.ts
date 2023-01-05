import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SearchBarComponent } from './layoutComponents/search-bar/search-bar.component';
import { NavComponent } from './layoutComponents/nav/nav.component';
import { HomeComponent } from './pages/home/home.component';
import { FormsModule } from '@angular/forms';
import { NavItemComponent } from './layoutComponents/nav/nav-item/nav-item.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AccountService } from './services/account.service';
import { LoginComponent } from './pages/login/login.component';
import { VideoCollectionComponent } from './pages/video-collection/video-collection.component';
import { VideoCardComponent } from './pages/video-collection/video-card/video-card.component';
import { SearchVideoCollectionComponent } from './pages/search-video-collection/search-video-collection.component';
import { VideoComponent } from './pages/video/video.component';
import { AddVideoComponent } from './pages/add-video/add-video.component';
import { CommentItemComponent } from './pages/video/comment-item/comment-item.component';
import { ChangePasswordComponent } from './pages/change-password/change-password.component';

@NgModule({
  declarations: [
    AppComponent,
    SearchBarComponent,
    NavComponent,
    HomeComponent,
    NavItemComponent,
    LoginComponent,
    VideoCollectionComponent,
    VideoCardComponent,
    SearchVideoCollectionComponent,
    VideoComponent,
    AddVideoComponent,
    CommentItemComponent,
    ChangePasswordComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule
  ],
  providers: [AccountService],
  bootstrap: [AppComponent]
})
export class AppModule { }
