import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AboutComponent } from './about.component';
import { ContactComponent } from './components/contact/contact.component';
import { DescriptionComponent } from './components/description/description.component';
import { SubscribeComponent } from './components/subscribe/subscribe.component';
import { AboutRoutingModule } from './about-routing.module';

@NgModule({
  declarations: [
    AboutComponent,
    SubscribeComponent,
    DescriptionComponent,
    ContactComponent,
  ],
  imports: [CommonModule, AboutRoutingModule],
  exports: [],
  providers: [],
})
export class AboutModule {}
