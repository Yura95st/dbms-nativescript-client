import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Page } from "ui/page";

import { Database } from "../../shared/database.model";
import { DatabaseService } from "../../shared/database.service";

@Component({
    moduleId: module.id,
    selector: "database",
    templateUrl: "database.html",
    styleUrls: ["database-common.css", "database.css"],
})
export class DatabaseComponent implements OnInit {

    private database: Database;
    private isLoading = false;

    constructor(private route: ActivatedRoute, private router: Router, private dbService: DatabaseService, private page: Page) {
    }

    public ngOnInit() {
        let dbName = this.route.snapshot.params["dbName"];

        this.page.actionBar.title = dbName;
        this.loadDatabase(dbName);
    }

    public onItemTap(args) {
        let tableName = this.database.TableNames[args.index];

        this.router.navigate([`/databases/${this.database.Name}/${tableName}`]);
    }

    private loadDatabase(dbName: string) {
        this.isLoading = true;

        this.dbService.getDatabase(dbName).subscribe(
            data => { this.database = data },
            error => {
                this.isLoading = false;
                this.handleError(error);
            },
            () => {
                this.isLoading = false;
                console.log('Database loaded.');
            }
        );
    }

    private handleError(error: any) {
        alert({
            message: "An error occurred while getting database.",
            okButtonText: "OK"
        });
        console.error(error);
    }
}