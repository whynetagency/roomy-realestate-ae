import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AboutComponent} from './components/about/about.component';
import {BlogComponent} from './components/blog/blog.component';
import {FaqsComponent} from './components/faqs/faqs.component';
import {RulesComponent} from './components/rules/rules.component';
import {SupportComponent} from './components/support/support.component';
import {BlogListComponent} from './components/blog/blog-list/blog-list.component';
import {BlogItemComponent} from './components/blog/blog-item/blog-item.component';
import {EventRentalsComponent} from './components/event-rentals/event-rentals.component';
import {MonthlyRentalsComponent} from './components/monthly-rentals/monthly-rentals.component';
import {AdminComponent} from './components/admin/admin.component';
import {AdminGuard} from './shared/guards/admin.guard';
import {LoginComponent} from './components/login/login.component';
import {RegistrationComponent} from "./components/registration/registration.component";
import {HomeComponent} from "./components/home/home.component";
import {PropertiesComponent} from "./components/properties/properties.component";
import {TermsOfUseComponent} from "./components/terms-of-use/terms-of-use.component";
import {PrivacyPolicyComponent} from "./components/privacy-policy/privacy-policy.component";
import {PropertiesItemComponent} from "./components/properties/properties-item/properties-item.component";
import {HostOfferPageComponent} from "./components/host-offer-page/host-offer-page.component";

export const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent},
  {path: 'about', component: AboutComponent},
  {path: 'how-it-works', component: FaqsComponent},
  {path: 'rules', component: RulesComponent},
  {path: 'terms-of-use', component: TermsOfUseComponent},
  {path: 'list-a-property', component: HostOfferPageComponent},
  {path: 'privacy-policy', component: PrivacyPolicyComponent},
  {path: 'contacts', component: SupportComponent},
  {path: 'event-rentals', component: EventRentalsComponent},
  {path: 'monthly-rentals', component: MonthlyRentalsComponent},
  {path: 'login', component: LoginComponent}, //TODO: return LoginGuard
  {path: 'admin', component: AdminComponent, canActivate: [AdminGuard]},
  {path: 'registration', component: RegistrationComponent}, //TODO: return LoginGuard
  {
    path: 'properties', component: PropertiesComponent, data: {PageName: 'Properties'}, children: [
      {path: ':id', component: PropertiesItemComponent, data: {pageName: 'Properties Item'}},
    ]
  },
  {
    path: 'blog', component: BlogComponent, data: {PageName: 'Blog'}, children: [
      {path: '', component: BlogListComponent, data: {PageName: 'Blog list'}},
      {path: ':id', component: BlogItemComponent, data: {pageName: 'Blog Item'}},
    ]
  },
]

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    scrollPositionRestoration: 'top'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
