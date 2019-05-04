import { Component, Input, OnInit } from '@angular/core';
import { File } from '@graphql/file-oid.query';

@Component({
  selector: 'app-file-renderer[file]',
  templateUrl: './file-renderer.component.html',
  styleUrls: ['./file-renderer.component.scss']
})
export class FileRendererComponent implements OnInit {
  @Input() file: File;

  constructor() {}

  ngOnInit() {}
}
