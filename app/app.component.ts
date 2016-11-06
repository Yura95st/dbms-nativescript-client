import { Component } from "@angular/core";
import { DatabaseService } from "./shared/database.service";

@Component({
  selector: "main",
  template: "<page-router-outlet></page-router-outlet>",
  providers: [DatabaseService]
})
export class AppComponent { }
