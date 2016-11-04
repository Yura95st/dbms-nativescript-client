import { DatabaseListComponent } from "./pages/database-list/database-list.component";
import { DatabaseComponent } from "./pages/database/database.component";
import { TableComponent } from "./pages/table/table.component";

export const routes = [
    {
        path: "databases/:dbName/:tableName",
        component: TableComponent
    },
    {
        path: "databases/:dbName",
        component: DatabaseComponent
    },
    {
        path: "",
        component: DatabaseListComponent
    }
];

export const navigatableComponents = [
    DatabaseListComponent,
    DatabaseComponent,
    TableComponent
];
