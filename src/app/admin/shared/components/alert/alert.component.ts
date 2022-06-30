import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {AlertService} from '../../services/alert.service';

@Component({
	selector: 'app-alert',
	templateUrl: './alert.component.html',
	styleUrls: ['./alert.component.scss']
})
export class AlertComponent implements OnInit, OnDestroy {
	@Input() delay = 5000;
	public text: string;
	public type: string = 'success';
	public aSub: Subscription;

	constructor(private alertService: AlertService) {
	}

	public ngOnInit(): void {
		this.aSub = this.alertService.alert$.subscribe(alert => {
			this.text = alert.text;
			this.type = alert.type;

			const timeOut = setTimeout(() => {
				clearTimeout(timeOut);
				this.text = '';
			}, this.delay)
		})
	}

	public ngOnDestroy() {
		if (this.aSub) {
			this.aSub.unsubscribe()
		}
	}
}
