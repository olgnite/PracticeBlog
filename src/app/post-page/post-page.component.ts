import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {PostService} from '../admin/shared/post.service';
import {Observable, switchMap} from "rxjs";
import {Post} from "../shared/interfaces";

@Component({
	selector: 'app-post-page',
	templateUrl: './post-page.component.html',
	styleUrls: ['./post-page.component.scss']
})
export class PostPageComponent implements OnInit {

	public post$: Observable<Post>

	constructor(
		private route: ActivatedRoute,
		private postService: PostService
	) {
	}

	public ngOnInit(): void {
		this.post$ = this.route.params
			.pipe(
				switchMap((params: Params) => {
					return this.postService.getById(params['id']);
				})
			)

	}

}
