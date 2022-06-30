import {Component, OnDestroy, OnInit} from '@angular/core';
import {PostService} from "../shared/post.service";
import {Post} from "../../shared/interfaces";
import {Subscription} from 'rxjs';
import {AlertService} from '../shared/services/alert.service';

@Component({
	selector: 'app-dashboard-page',
	templateUrl: './dashboard-page.component.html',
	styleUrls: ['./dashboard-page.component.scss']
})
export class DashboardPageComponent implements OnInit, OnDestroy {

	public posts: Post[] = [];
	public pSub: Subscription;
	public dsub: Subscription;
	public searchStr: string = '';

	constructor(
		private postService: PostService,
		private alertService: AlertService
	) {
	}

	public ngOnInit(): void {
		this.pSub = this.postService.getAll().subscribe(post => {
			this.posts = post;
			console.log(post);
		})
	}

	public ngOnDestroy(): void {
		if (this.pSub) {
			this.pSub.unsubscribe();
		}
		if (this.dsub) {
			this.dsub.unsubscribe();
		}
	}

	public remove(id: string): void {
		this.postService.remove(id).subscribe(() => {
			this.posts = this.posts.filter(post => post.id !== id);
			this.alertService.warning('Пост был удалён');
		})
	}
}
