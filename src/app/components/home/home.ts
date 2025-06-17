import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {

  movies: any[] = [
    {id: 2,name: "movie2", image: "https://th.bing.com/th/id/OIF.IlRglslk4L7nj7RNG5SLbg?rs=1&pid=ImgDetMain", date: "15-7-2001", description: "11111111111111111111111111111111111111111111111111111111111111111111111111", votes: 123},
    {id: 3,name: "movie3", image: "https://th.bing.com/th/id/OIF.IlRglslk4L7nj7RNG5SLbg?rs=1&pid=ImgDetMain", date: "15-7-2001", description: "11111111111111111111111111111111111111111111111111111111111111111111111111", votes: 123},
    {id: 1,name: "movie1", image: "https://th.bing.com/th/id/OIF.IlRglslk4L7nj7RNG5SLbg?rs=1&pid=ImgDetMain", date: "15-7-2001", description: "11111111111111111111111111111111111111111111111111111111111111111111111111", votes: 123},
    {id: 4,name: "movie4", image: "https://th.bing.com/th/id/OIF.IlRglslk4L7nj7RNG5SLbg?rs=1&pid=ImgDetMain", date: "15-7-2001", description: "11111111111111111111111111111111111111111111111111111111111111111111111111", votes: 123},
    {id: 5,name: "movie5", image: "https://th.bing.com/th/id/OIF.IlRglslk4L7nj7RNG5SLbg?rs=1&pid=ImgDetMain", date: "15-7-2001", description: "11111111111111111111111111111111111111111111111111111111111111111111111111", votes: 123}
  ];
  constructor() {}

}
