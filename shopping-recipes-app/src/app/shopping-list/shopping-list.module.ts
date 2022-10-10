import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { SharedModule } from "../shared/shared.module";
import { ShoppingListEditComponent } from "./shopping-list-edit/shopping-list-edit.component";
import { ShoppingListRoutingModule } from "./shopping-list-routing.module";
import { ShoppingListComponent } from "./shopping-list.component";


@NgModule({
    declarations:[
        ShoppingListComponent,
        ShoppingListEditComponent
    ],
    imports:[SharedModule,FormsModule,ShoppingListRoutingModule],
    exports:[ 
        ShoppingListComponent,
        ShoppingListEditComponent
    ]

})

export class ShoppingListModule{}