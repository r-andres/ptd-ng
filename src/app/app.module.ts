import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';

import {AppRoutingModule} from '@/app-routing.module';
import {AppComponent} from './app.component';
import {MainComponent} from '@modules/main/main.component';

import {HeaderComponent} from '@modules/main/header/header.component';
import {FooterComponent} from '@modules/main/footer/footer.component';
import {MenuSidebarComponent} from '@modules/main/menu-sidebar/menu-sidebar.component';
import {BlankComponent} from '@pages/blank/blank.component';
import {ReactiveFormsModule} from '@angular/forms';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {DashboardComponent} from '@pages/dashboard/dashboard.component';
import {ToastrModule} from 'ngx-toastr';
import {MessagesComponent} from '@modules/main/header/messages/messages.component';
import {NotificationsComponent} from '@modules/main/header/notifications/notifications.component';

import {registerLocaleData} from '@angular/common';
import localeEn from '@angular/common/locales/en';
import {MainMenuComponent} from './pages/main-menu/main-menu.component';
import {SubMenuComponent} from './pages/main-menu/sub-menu/sub-menu.component';
import {MenuItemComponent} from './components/menu-item/menu-item.component';
import {ControlSidebarComponent} from './modules/main/control-sidebar/control-sidebar.component';
import {StoreModule} from '@ngrx/store';
import {authReducer} from './store/auth/reducer';
import {uiReducer} from './store/ui/reducer';

import {SidebarSearchComponent} from './components/sidebar-search/sidebar-search.component';
import { ThreeViewerComponent } from './pages/three-viewer/three-viewer.component';
import { PdtSelectorComponent } from './modules/util/pdt-selector/pdt-selector.component';
import { PdtCheckboxComponent } from './modules/util/pdt-checkbox/pdt-checkbox.component';
import { PdtDropdownComponent } from './modules/util/pdt-dropdown/pdt-dropdown.component';


registerLocaleData(localeEn, 'en-EN');

@NgModule({
    declarations: [
        AppComponent,
        MainComponent,
        HeaderComponent,
        FooterComponent,
        MenuSidebarComponent,
        BlankComponent,

        DashboardComponent,
        MessagesComponent,
        NotificationsComponent,
        MainMenuComponent,
        SubMenuComponent,
        MenuItemComponent,
        ControlSidebarComponent,
        SidebarSearchComponent,
        ThreeViewerComponent,
        PdtSelectorComponent,
        PdtCheckboxComponent,
        PdtDropdownComponent
    ],
    imports: [
        BrowserModule,
        StoreModule.forRoot({auth: authReducer, ui: uiReducer}),
        HttpClientModule,
        AppRoutingModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        ToastrModule.forRoot({
            timeOut: 3000,
            positionClass: 'toast-top-right',
            preventDuplicates: true
        })
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {}
