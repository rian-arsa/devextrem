import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { DxTabsModule, DxDataGridModule, DxSelectBoxModule, DxPopupModule, DxButtonModule, DxPopoverModule, DxCheckBoxModule, DxToastModule, DxTextBoxModule, DxLoadPanelModule, DxDropDownButtonModule, DxFormModule, DxCalendarModule, DxDateBoxModule } from 'devextreme-angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-router.module';
import { TabOneComponent } from './tab-one/tab-one.component';
import { TabTwoComponent } from './tab-two/tab-two.component';
import { IndexComponent } from './index/index.component';
import { TabDetailComponent } from './tab-one/tab-detail/tab-detail.component';
import { DatePipe } from './shared/date.pipe';
import { FormsModule } from '@angular/forms';
import { FormComponent } from './form/form/form.component';

@NgModule({
  declarations: [
    AppComponent,
    TabOneComponent,
    TabTwoComponent,
    IndexComponent,
    TabDetailComponent,
    DatePipe,
    FormComponent
  ],
  imports: [
    BrowserModule,
    DxTabsModule,
    AppRoutingModule,
    HttpClientModule,
    DxDataGridModule,
    DxSelectBoxModule,
    DxPopupModule,
    DxButtonModule,
    DxPopoverModule,
    DxCheckBoxModule,
    DxToastModule,
    DxTextBoxModule,
    DxLoadPanelModule,
    DxDropDownButtonModule,
    DxFormModule,
    DxCalendarModule,
    DxDateBoxModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
