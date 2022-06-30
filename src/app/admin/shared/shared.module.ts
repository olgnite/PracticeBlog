import {NgModule} from "@angular/core";
import {HttpClientModule} from "@angular/common/http";
import {QuillModule} from "ngx-quill";
import QuillType, {Delta} from 'quill';
import {AlertComponent} from './components/alert/alert.component';
import {CommonModule} from "@angular/common";

@NgModule({
	imports: [
		HttpClientModule,
		QuillModule.forRoot(),
		CommonModule

	],
	exports: [
		HttpClientModule,
		QuillModule,
		AlertComponent
	],
	declarations: [
		AlertComponent
	]

})
export class SharedModule {

}