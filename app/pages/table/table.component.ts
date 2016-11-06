import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Page } from "ui/page";

import { DatabaseService } from "../../shared/database.service";
import { Table } from "../../shared/table.model";
import { Attribute } from "../../shared/attribute.model";
import { Row } from "../../shared/row.model";

@Component({
    selector: "my-table",
    templateUrl: "pages/table/table.html",
    styleUrls: ["pages/table/table-common.css", "pages/table/table.css"],
})
export class TableComponent implements OnInit {

    private dbName: string;
    private table: Table;
    private resultTable: Table;
    private projectionAttributes: Map<string, boolean> = new Map<string, boolean>();
    private isLoading = false;

    constructor(private route: ActivatedRoute, private dbService: DatabaseService, private page: Page) {
    }

    public ngOnInit() {
        let routeParams = this.route.snapshot.params;

        this.dbName = routeParams["dbName"];
        let tableName = routeParams["tableName"];

        this.page.actionBar.title = `${this.dbName}.${tableName}`;
        this.loadTable(tableName);
    }

    private getRowStringValue(row: Row): string {
        let rowString = "";

        for (let i = 0; i < this.resultTable.Attributes.length; i++) {
            rowString += `${i > 0 ? "\n" : ""}${this.resultTable.Attributes[i].Name}: ${row.Value[i]}`;
        }

        return rowString;
    }

    private onSwitchChange(attributeName: string, isChecked: boolean) {
        this.projectionAttributes.set(attributeName, isChecked);

        this.loadTableProjection(this.getProjectionAttributes());
    }

    private getProjectionAttributes(): string[] {
        let attributesNames: string[] = [];

        this.projectionAttributes.forEach((value, key) => {
            if (value) {
                attributesNames.push(key);
            }
        });

        if (attributesNames.length == 0) {
            attributesNames = this.table.Attributes.map(attr => attr.Name);
        }

        return attributesNames;
    }

    private loadTable(tableName: string) {
        this.isLoading = true;

        this.dbService.getTable(this.dbName, tableName).subscribe(
            data => {
                this.table = data;
                this.table.Attributes.forEach(attr => {
                    this.projectionAttributes.set(attr.Name, true);
                });
                this.resultTable = data;
            },
            error => {
                this.isLoading = false;
                this.handleError(error);
            },
            () => {
                this.isLoading = false;
                console.log('Table loaded.');
            }
        );
    }

    private loadTableProjection(attributesNames: string[]) {
        this.isLoading = true;
        this.dbService.getTableProjection(this.dbName, this.table.Name, attributesNames).subscribe(
            data => {
                this.resultTable = data
            },
            error => {
                this.isLoading = false;
                this.handleError(error);
            },
            () => {
                this.isLoading = false;
                console.log('Table loaded.');
            }
        );
    }

    private handleError(error: any) {
        alert({
            message: "An error occurred while getting table.",
            okButtonText: "OK"
        });
        console.error(error);
    }
}