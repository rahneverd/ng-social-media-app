import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

//Firebase
import { FirebaseTSApp } from 'firebasets/firebasetsApp/firebaseTSApp'
import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { environment } from 'src/environments/environment';

// Material
import { MatButtonModule } from '@angular/material/button'
import { MatBottomSheetModule } from '@angular/material/bottom-sheet'
import { MatCardModule } from '@angular/material/card';

import { HomeComponent } from './pages/home/home.component';
import { AuthenticatorComponent } from './tools/authenticator/authenticator.component'

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AuthenticatorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatBottomSheetModule,
    MatCardModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor() {
    // FirebaseTSApp.init(environment.firebaseConfig)
    const auth = getAuth(initializeApp(environment.firebaseConfig))
  }
}
