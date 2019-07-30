import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { prismLanguages } from '../../prism/prism.languages';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  readonly languages = [...prismLanguages].sort((a, b) =>
    a.name.toLowerCase().localeCompare(b.name.toLowerCase())
  );

  constructor(private title: Title) {}

  ngOnInit() {
    this.title.setTitle('Ermine');
  }
}
