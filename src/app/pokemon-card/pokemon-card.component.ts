import { Component, Input } from '@angular/core';
import { Pokemon } from '../models/pokemon';
import { MatDialog } from '@angular/material/dialog';
import { PokemonDetailsComponent } from '../pokemon-details/pokemon-details.component';
import { ColorsService } from '../colors.service';

@Component({
  selector: 'app-pokemon-card',
  templateUrl: './pokemon-card.component.html',
  styleUrl: './pokemon-card.component.css'
})
export class PokemonCardComponent {
  @Input() pokemon!: Pokemon;

  typeColors: { [key: string]: string } = {};

  ngOnInit(): void {
    this.typeColors = this.colorService.typeColors;
  }
  
  getBackground(){
    return this.colorService.getBackground(this.pokemon);
  }

  constructor(private dialog: MatDialog, private colorService: ColorsService) { }

  openDetails() {
    const dialogRef = this.dialog.open(PokemonDetailsComponent, {
      width: '600px',
      height: '500px',
      data: { pokemon: this.pokemon }
    });  

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
