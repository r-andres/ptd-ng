import {
    Component,
    OnChanges,
    OnInit,
    SimpleChanges,
    ViewChild
} from '@angular/core';
import {MENU} from '@modules/main/menu-sidebar/menu-sidebar.component';
import { PdtDropdownComponent } from '@modules/util/pdt-dropdown/pdt-dropdown.component';


@Component({
    selector: 'app-sidebar-search',
    templateUrl: './sidebar-search.component.html',
    styleUrls: ['./sidebar-search.component.scss']
})
export class SidebarSearchComponent implements OnInit {
    public searchText: string = '';
    public foundMenuItems = [];
    @ViewChild('dropdown') dropdown: PdtDropdownComponent;

    constructor() {}

    ngOnInit(): void {}

    handleSearchTextChange(event) {
        this.foundMenuItems = [];

        if (event.target.value) {
            this.searchText = event.target.value;
            this.findMenuItems(MENU);
            return;
        } else {
            this.searchText = '';
            this.dropdown.expanded = false;
        }
    }

    handleIconClick() {
        this.searchText = '';
        this.dropdown.expanded = false;
    }

    handleMenuItemClick() {
        this.searchText = '';
        this.dropdown.expanded = false;
    }

    findMenuItems(menu) {
        if (!this.searchText) {
            return;
        }

        menu.forEach((menuItem) => {
            if (
                menuItem.path &&
                menuItem.name
                    .toLowerCase()
                    .includes(this.searchText.toLowerCase())
            ) {
                this.foundMenuItems.push(menuItem);
            }
            if (menuItem.children) {
                return this.findMenuItems(menuItem.children);
            }
        });

        if (this.foundMenuItems.length > 0) {
            this.dropdown.expanded = true;
        }
    }

    boldString(str, substr) {
        return str.replaceAll(
            this.capitalizeFirstLetter(substr),
            `<strong class="text-light">${this.capitalizeFirstLetter(
                substr
            )}</strong>`
        );
    }

    capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
}
