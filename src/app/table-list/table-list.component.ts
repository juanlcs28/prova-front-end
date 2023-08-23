import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { Field } from 'app/model/field';

@Component({
  selector: 'app-table-list',
  templateUrl: './table-list.component.html',
  styleUrls: ['./table-list.component.css']
})
export class TableListComponent implements OnInit {

  dataSource: MatTableDataSource<any> = new MatTableDataSource();

  name: String;
  displayedColumns: string[] = [
    'id',
    'periodo',
    'frequencia'
  ];

  EmpData: Field[] = [
    {
      id: 1,
      periodo: 'Mellie',
      frequencia: 2
    }
  ];

  constructor(private http: HttpClient, private route: ActivatedRoute) { 
    this.route.params.subscribe(params => this.name = params['name']);
  }

  ngOnInit() {
    // this.dataSource = new MatTableDataSource<Field>();

    // this.dataSource = new MatTableDataSource(this.EmpData);

    this.getData(this.name);
  }

  getData(name) {
    const url = 'https://servicodados.ibge.gov.br/api/v2/censos/nomes/' + name;
    this.http.get(url).subscribe(
      (response) => {
        this.EmpData = response[0].res;

        this.EmpData.forEach(function(objeto, indice) {
            var idUnico = (indice + 1); 
            objeto.id = idUnico;
        });

        this.dataSource = new MatTableDataSource(this.EmpData);

        console.log('Response:', this.dataSource);
      },
      (error) => {
        console.error('Error:', error);
      }
    );
  }
}
