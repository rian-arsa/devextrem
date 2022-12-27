import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

export interface Employee {
  id: number,
  name: string,
  totalTask: number,
  position: string,
  descTask: string,
  joinDate: string
}

const employees: Employee[] = [
  {
    id: 1,
    name: "Rian",
    totalTask: 10,
    position: 'Developer',
    descTask: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloremque veniam nesciunt unde quam ab velit exercitationem tempora non recusandae ut?',
    joinDate: "2022-02-19T18:25:43.511Z",
  },
  {
    id: 2,
    name: "Burhan",
    totalTask: 10,
    position: 'Developer',
    descTask: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloremque veniam nesciunt unde quam ab velit exercitationem tempora non recusandae ut?',
    joinDate: "2022-01-19T18:25:43.511Z",
  },
  {
    id: 3,
    name: "Barjop",
    totalTask: 10,
    position: 'Developer',
    descTask: 'Lorem ipsum dolor sit ',
    joinDate: "2022-03-19T18:25:43.511Z",
  },
  {
    id: 4,
    name: "Toni",
    totalTask: 10,
    position: 'Developer',
    descTask: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloremque veniam nesciunt unde quam ab velit exercitationem tempora non recusandae ut? Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloremque veniam nesciunt unde quam ab velit exercitationem tempora non recusandae ut? Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloremque veniam nesciunt unde quam ab velit exercitationem tempora non recusandae ut?',
    joinDate: "2022-06-19T18:25:43.511Z",
  },
  {
    id: 5,
    name: "Jokomi",
    totalTask: 30,
    position: 'Developer',
    descTask: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloremque veniam nesciunt unde quam ab velit exercitationem tempora non recusandae ut? Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloremque veniam nesciunt unde quam ab velit exercitationem tempora non recusandae ut? Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloremque veniam nesciunt unde quam ab velit exercitationem tempora non recusandae ut?',
    joinDate: "2022-09-19T18:25:43.511Z",
  },
]


@Injectable({
  providedIn: 'root'
})
export class DummyService {
  private employees: Employee[] = employees

  get employeesData(): Employee[] {
    return this.employees
  }

  get employeesFilterData(): Employee[] {
    // * ForEach
    // const employeesFilter: Employee[] = []
    // this.employees.forEach((item) => {
    //   if (item.name.length >= 5) {
    //     employeesFilter.push(item)
    //   }
    // })
    // return employeesFilter

    // *Filter
    return this.employees.filter(data => data.name.length >= 5)
  }

  getSum() {
    let sum = 0
    this.employees.forEach((item) => {
      sum += item.totalTask
    })
    return sum
  }

}
