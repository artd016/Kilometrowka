import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule, MatToolbarModule, MatIconModule,
        MatSidenavModule, MatDialogModule, MatFormFieldModule,
        MatInputModule, MatGridListModule, MatCardModule,
        MatMenuModule, MatExpansionModule, MatTableModule,
        MatDatepickerModule, MatNativeDateModule, MatSelectModule } from '@angular/material';


// import { MatToolbarModule } from '@angular/material';

@NgModule({
  imports: [MatButtonModule, MatToolbarModule, MatIconModule, 
            MatSidenavModule, MatDialogModule, MatFormFieldModule,
            MatInputModule, MatGridListModule, MatCardModule,
            MatMenuModule, MatExpansionModule, MatTableModule,
            MatDatepickerModule, MatNativeDateModule, MatSelectModule],
  exports: [MatButtonModule, MatToolbarModule, MatIconModule,
            MatSidenavModule, MatDialogModule, MatFormFieldModule,
            MatInputModule, MatGridListModule, MatCardModule,
            MatMenuModule, MatExpansionModule, MatTableModule,
            MatDatepickerModule, MatNativeDateModule, MatSelectModule],
})

export class MaterialModule { }