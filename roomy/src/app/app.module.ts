import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AngularFireModule} from '@angular/fire/compat';
import {AngularFireAuthModule} from '@angular/fire/compat/auth';
import {AngularFirestoreModule} from '@angular/fire/compat/firestore';
import {NgxJsonViewerModule} from 'ngx-json-viewer';
import {SlickCarouselModule} from 'ngx-slick-carousel';
import {environment} from '../environments/environment';

import {AppComponent} from './app.component';
import {AboutComponent} from './components/about/about.component';
import {SupportComponent} from './components/support/support.component';
import {BlogComponent} from './components/blog/blog.component';
import {FaqsComponent} from './components/faqs/faqs.component';
import {RulesComponent} from './components/rules/rules.component';
import {ProductCardComponent} from './components/product-card/product-card.component';
import {HeaderComponent} from './components/header/header.component';
import {RouterModule} from '@angular/router';
import {AppRoutingModule} from './app-routing.module';
import {BlogItemComponent} from './components/blog/blog-item/blog-item.component';
import {BlogListComponent} from './components/blog/blog-list/blog-list.component';
import {EventRentalsComponent} from './components/event-rentals/event-rentals.component';
import {MonthlyRentalsComponent} from './components/monthly-rentals/monthly-rentals.component';
import {AdminComponent} from './components/admin/admin.component';
import {LoginComponent} from './components/login/login.component';
import {RegistrationComponent} from './components/registration/registration.component';
import {HomeComponent} from './components/home/home.component';
import {FooterComponent} from './components/footer/footer.component';
import {PropertiesComponent} from './components/properties/properties.component';
import {PropertiesItemComponent} from './components/properties/properties-item/properties-item.component';
import {GoogleMapsModule} from "@angular/google-maps";
import {ReviewCardComponent} from './components/review-card/review-card.component';
import {StarsComponent} from './components/stars/stars.component';
import {AsideFormComponent} from './components/aside-form/aside-form.component';
import {TermsOfUseComponent} from './components/terms-of-use/terms-of-use.component';
import {PrivacyPolicyComponent} from './components/privacy-policy/privacy-policy.component';
import {BsDatepickerModule} from "ngx-bootstrap/datepicker";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {TooltipModule} from "ngx-bootstrap/tooltip";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {ReviewCarouselComponent} from './components/review-carousel/review-carousel.component';
import {HttpClientModule} from "@angular/common/http";
import {DateFormatPipe} from './shared/pipes/date-format.pipe';
import {PreloaderComponent} from './components/preloader/preloader.component';
import {HostOfferPageComponent} from './components/host-offer-page/host-offer-page.component';
import {ModalModule} from "ngx-bootstrap/modal";
import {AlertModule} from "ngx-bootstrap/alert";
import { NgxStripeModule } from "ngx-stripe";
import {AccordionModule} from "ngx-bootstrap/accordion";
import {CountUpModule} from "ngx-countup";

@NgModule({
  declarations: [
    AppComponent,
    AboutComponent,
    SupportComponent,
    BlogComponent,
    FaqsComponent,
    RulesComponent,
    ProductCardComponent,
    HeaderComponent,
    BlogItemComponent,
    BlogListComponent,
    EventRentalsComponent,
    MonthlyRentalsComponent,
    AdminComponent,
    LoginComponent,
    RegistrationComponent,
    HomeComponent,
    FooterComponent,
    PropertiesComponent,
    PropertiesItemComponent,
    ReviewCardComponent,
    StarsComponent,
    AsideFormComponent,
    TermsOfUseComponent,
    PrivacyPolicyComponent,
    ReviewCarouselComponent,
    DateFormatPipe,
    PreloaderComponent,
    HostOfferPageComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebase),
    NgxJsonViewerModule,
    SlickCarouselModule,
    AngularFireAuthModule,
    AngularFirestoreModule,
    RouterModule,
    AppRoutingModule,
    GoogleMapsModule,
    BsDatepickerModule,
    FormsModule,
    TooltipModule.forRoot(),
    ModalModule.forRoot(),
    AccordionModule.forRoot(),
    ReactiveFormsModule,
    HttpClientModule,
    AlertModule,
    CountUpModule,
    ModalModule.forRoot(),
    HttpClientModule,
    ModalModule.forRoot(),
    NgxStripeModule.forRoot('pk_test_51KWF4MC5GNPWFcdAY1OSUg7DkPniZ6QVGYeiOHpAz06QROcAnAc7sb9Ls22M07orb8qazhB7GeeRsbomMxprbLNy00RM5zAqVP')
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {
}
