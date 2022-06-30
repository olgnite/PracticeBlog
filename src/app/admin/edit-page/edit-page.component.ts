import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {PostService} from '../shared/post.service';
import {switchMap} from "rxjs/operators";
import {Post} from "../../shared/interfaces";
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Subscription} from 'rxjs';
import {AlertService} from '../shared/services/alert.service';

@Component({
	selector: 'app-edit-page',
	templateUrl: './edit-page.component.html',
	styleUrls: ['./edit-page.component.scss']
})
export class EditPageComponent implements OnInit, OnDestroy {
	public form: FormGroup;
	public post: Post
	public submitted: boolean = false;
	public uSub: Subscription;

	constructor(
		private router: ActivatedRoute,
		private postService: PostService,
		private alertService: AlertService
	) {
	}

	public ngOnInit(): void {
		this.router.params
			.pipe(
				switchMap((params: Params) => {
					return this.postService.getById(params['id']);
				})
			).subscribe((post: Post) => {
			this.post = post;
			this.form = new FormGroup({
				title: new FormControl(post.title, Validators.required),
				text: new FormControl(post.text, Validators.required)
			})
		})
	}

	public ngOnDestroy() {
		if (this.uSub) {
			this.uSub.unsubscribe();
		}
	}

	public submit(): void {
		if (this.form.invalid) {
			return
		}
		this.submitted = true;

		this.uSub = this.postService.update({
			...this.post,
			text: this.form.value.text,
			title: this.form.value.title,
			author: this.post.author,
		}).subscribe(() => {
			this.submitted = false;
			this.alertService.success('Пост был обновлён');
		})
	}
}
