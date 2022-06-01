import { Component, OnInit } from '@angular/core';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-reporte-final',
  templateUrl: './reporte-final.component.html',
  styleUrls: ['./reporte-final.component.scss'],
})
export class ReporteFinalComponent implements OnInit {
  fecha_actual = new Date();
  n_efectividad = 10;
  n_eficiencia = 10;
  n_confidencialidad = 10;
  n_integridad = 10;
  n_disponibilidad = 10;
  n_cumplimiento = 10;
  n_confiabilidad = 10;

  constructor() {}

  ngOnInit(): void {}

  createPdf() {
    const pdfReporte: any = {
      content: [
        { text: 'Tables', style: 'header' },
        'Official documentation is in progress, this document is just a glimpse of what is possible with pdfmake and its layout engine.',
        {
          text: 'A simple table (no headers, no width specified, no spans, no styling)',
          style: 'subheader',
        },
        'The following table has nothing more than a body array',
        {
          style: 'tableExample',
          table: {
            body: [
              ['Column 1', 'Column 2', 'Column 3'],
              ['One value goes here', 'Another one here', 'OK?'],
            ],
          },
        },
        { text: 'A simple table with nested elements', style: 'subheader' },
        'It is of course possible to nest any other type of nodes available in pdfmake inside table cells',
        {
          style: 'tableExample',
          table: {
            body: [
              ['Column 1', 'Column 2', 'Column 3'],
              [
                {
                  stack: [
                    "Let's try an unordered list",
                    {
                      ul: ['item 1', 'item 2'],
                    },
                  ],
                },
                [
                  'or a nested table',
                  {
                    table: {
                      body: [
                        ['Col1', 'Col2', 'Col3'],
                        ['1', '2', '3'],
                        ['1', '2', '3'],
                      ],
                    },
                  },
                ],
                {
                  text: [
                    'Inlines can be ',
                    { text: 'styled\n', italics: true },
                    { text: 'easily as everywhere else', fontSize: 10 },
                  ],
                },
              ],
            ],
          },
        },
        { text: 'Defining column widths', style: 'subheader' },
        'Tables support the same width definitions as standard columns:',
        {
          bold: true,
          ul: ['auto', 'star', 'fixed value'],
        },
        {
          style: 'tableExample',
          table: {
            widths: [100, '*', 200, '*'],
            body: [
              ['width=100', 'star-sized', 'width=200', 'star-sized'],
              [
                'fixed-width cells have exactly the specified width',
                {
                  text: 'nothing interesting here',
                  italics: true,
                  color: 'gray',
                },
                {
                  text: 'nothing interesting here',
                  italics: true,
                  color: 'gray',
                },
                {
                  text: 'nothing interesting here',
                  italics: true,
                  color: 'gray',
                },
              ],
            ],
          },
        },
      ],
    };
    const pdf = pdfMake.createPdf(pdfReporte);
    pdf.open();
  }
}
