import { Component } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { PostService } from 'src/app/tab-one/post.service';
import { DummyService, Employee } from './dummy.service';

@Component({
  selector: 'app-tab-detail',
  templateUrl: './tab-detail.component.html',
  styleUrls: ['./tab-detail.component.css']
})
export class TabDetailComponent {
  defaultVisible!: boolean;
  title!: string

  employees: Employee[] = []
  employeesFilter: Employee[] = []
  sumTotalTask = 0

  popupVisible = false
  panelVisible = false
  contentDataPopUp = ''

  // ! Constructor
  constructor(private router: Router, private activatedRoute: ActivatedRoute, private dummyService: DummyService, private postService: PostService) { }

  // ! ngOninit
  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.postService.getPost(params['id']).subscribe(res => {
        this.title = Object.values(res)[1]
      }, err => {
        this.title = "Not Found"
      })
    })

    this.employees = this.dummyService.employeesData
    this.employeesFilter = this.dummyService.employeesFilterData
    this.sumTotalTask = this.dummyService.getSum()

    this.defaultVisible = false
  }

  //! Back to Tab One
  back() {
    this.router.navigate(['../'], { relativeTo: this.activatedRoute })
  }

  //! Popover
  toggleEnter() {
    this.defaultVisible = true
  }
  toggleLeave() {
    this.defaultVisible = false
  }

  // ! Show popup
  popupDate(e: any) {
    this.panelVisible = true
    setTimeout(() => {
      this.panelVisible = false
      this.popupVisible = true

      const coba = e.data.joinDate.split('-')
      console.log(coba);


      this.popupVisible = true
      this.contentDataPopUp = e.data.joinDate
    }, 1000);
  }

  onSaving(e: any) {
    console.log(e);

    // const change = e.changes[0];

    // if (change) {
    //   this.dummyService.insert(change.data)
    // }
  }
}
