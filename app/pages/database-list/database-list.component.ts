import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Page } from "ui/page";

import { DatabaseService } from "../../shared/database.service";

@Component({
    moduleId: module.id,
    selector: "my-app",
    templateUrl: "database-list.html",
    styleUrls: ["database-list-common.css", "database-list.css"],
})
export class DatabaseListComponent implements OnInit {

    private dbNamesList: string[];
    private isLoading = false;

    constructor(private router: Router, private dbService: DatabaseService, private page: Page) {
    }

    public ngOnInit() {
        this.page.actionBar.title = "Databases";

        this.loadDbNames();
    }

    public onItemTap(args) {
        let dbName = this.dbNamesList[args.index];

        this.router.navigate([`/databases/${dbName}`]);
    }

    private loadDbNames() {
        this.isLoading = true;

        this.dbService.getDbNames().subscribe(
            data => { this.dbNamesList = data },
            error => {
                this.isLoading = false;
                this.handleError(error);
            },
            () => {
                this.isLoading = false;
                console.log('DbNames loaded.');
            }
        );
    }

    private handleError(error: any) {
        alert({
            message: "An error occurred while getting databases names.",
            okButtonText: "OK"
        });
        console.error(error);
    }
}