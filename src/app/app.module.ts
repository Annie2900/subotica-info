import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { Routes, RouterModule } from '@angular/router';
import { ListingComponent } from './listing/listing.component';
import { DetailsComponent } from './details/details.component';
import { HttpClientModule } from '@angular/common/http';

const appRoutes: Routes = [
  { path: '', redirectTo: '/latest', pathMatch: 'full' },
  { path: 'latest', component: ListingComponent },
  { path: 'najava', component: ListingComponent  },
  { path: 'zajednica', component: ListingComponent  },
  { path: 'kultura', component: ListingComponent  },
  { path: 'sport', component: ListingComponent  },
  { path: 'privreda', component: ListingComponent  },
  { path: 'video', component: ListingComponent  },
  { path: 'dailyphoto', component: ListingComponent  },
  { path: 'press', component: ListingComponent  },
  { path: 'intervju', component: ListingComponent  },
  { path: 'tbn', component: ListingComponent  },
  { path: 'panoramica', component: ListingComponent  },
  { path: 'search', component: ListingComponent  },
];

@NgModule({
  declarations: [
    AppComponent,
    ListingComponent,
    DetailsComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
