import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { AlertComponent } from "./alert/alert.component";
import { DropdownDirective } from "./dropdown.directive";
import { LoadingSpinnerComponent } from "./loading-spinner/loading-spinner.component";
import { PlaceholderDirective } from "./placeholder/placeholder.directive";


@NgModule({
    declarations:[
        DropdownDirective,
        PlaceholderDirective,
        LoadingSpinnerComponent,
        AlertComponent 
    ],
    imports: [CommonModule],
    exports:[
        DropdownDirective,
        PlaceholderDirective,
        LoadingSpinnerComponent,
        AlertComponent,
        CommonModule 
    ]
})

export class SharedModule{}