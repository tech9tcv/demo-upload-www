import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule, JsonpModule } from '@angular/http';
import { Ng2UploaderModule } from 'ng2-uploader';

import { AppComponent } from './app.component';
import { UploadComponent } from './upload/upload.component';
import { CarComponent } from './car/car.component';
import { CarService } from './service/car.service';

@NgModule({
  declarations: [
    AppComponent,
    UploadComponent,
    CarComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    JsonpModule,
    Ng2UploaderModule
  ],
  providers: [
    CarService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
