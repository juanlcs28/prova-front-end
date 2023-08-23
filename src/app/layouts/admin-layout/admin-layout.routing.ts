import { Routes } from '@angular/router';

import { SearchComponent } from '../../search/search.component';
import { TableListComponent } from '../../table-list/table-list.component';

export const AdminLayoutRoutes: Routes = [
    { path: 'search',   component: SearchComponent },
    { path: 'table-list/:name',     component: TableListComponent },
];
