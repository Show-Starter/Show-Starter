import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {MatPaginatorModule} from '@angular/material/paginator';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { InventualModule } from './inventual/inventual.module';
import { MatIconModule } from '@angular/material/icon';
import { ProductService } from './product.service';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { EventService } from './event.service';
import { ItemService } from './item.service';


@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatPaginatorModule,
    BrowserAnimationsModule,
    InventualModule,
    MatIconModule,
    FormsModule,
    HttpClientModule,
  ],
  declarations: [
    AppComponent,
  ],
  providers: [ProductService, EventService, ItemService],
  bootstrap: [AppComponent]
})
export class AppModule { }
