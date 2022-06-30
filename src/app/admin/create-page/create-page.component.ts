import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Post} from 'src/app/shared/interfaces';
import {PostService} from "../shared/post.service";
import {AlertService} from '../shared/services/alert.service';

@Component({
	selector: 'app-create-page',
	templateUrl: './create-page.component.html',
	styleUrls: ['./create-page.component.scss']
})
export class CreatePageComponent implements OnInit {
	public form: FormGroup;

	constructor(
		private postService: PostService,
		private alertService: AlertService
	) {

	}

	public ngOnInit(): void {
		this.form = new FormGroup({
			title: new FormControl('', Validators.required),
			text: new FormControl('', Validators.required),
			author: new FormControl('', Validators.required),
		})
	}

	public submit(): void {
		if (this.form.invalid) {
			return
		}
		const post: Post = {
			title: this.form.controls['title'].value,
			text: this.form.controls['text'].value,
			author: this.form.controls['author'].value,
			date: new Date()
		}

		this.postService.create(post).subscribe(() => {
			this.form.reset();
			this.alertService.success('Пост был создан');
		})
	}
}
