import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';



@Component({
  selector: 'app-add-product-dialog',
  templateUrl: './add-product-dialog.component.html',
  styleUrls: ['./add-product-dialog.component.scss']
})
export class AddProductDialogComponent {
  constructor(public dialog: MatDialog) {}

openAddProductDialog(): void {
  const dialogRef = this.dialog.open(AddProductDialogComponent, {
    width: '1000px', // Set your desired width
    // data: {name: this.name, animal: this.animal} // Optional: if you want to pass data to the dialog
  });

  dialogRef.afterClosed().subscribe(result => {
    console.log('The dialog was closed');
    // Handle your result here
  });
}

}
