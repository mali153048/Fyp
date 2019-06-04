import { Component, OnInit } from '@angular/core';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';
import { SprintService } from '../_services/sprint.service';

am4core.useTheme(am4themes_animated);
@Component({
  selector: 'app-report',
  templateUrl: './Report.component.html',
  styleUrls: ['./Report.component.css']
})
export class ReportComponent implements OnInit {
  projectId: string;
  sprints: any = [];
  // private chart: am4charts.XYChart;
  constructor(private spritService: SprintService) {
    this.projectId = localStorage.getItem('projectId');
  }
  /* public chartOptions: ChartOptions = {
    responsive: true,
    scales: { xAxes: [{}], yAxes: [{}] },
    plugins: {
      datalabels: {
        anchor: 'end',
        align: 'end'
      }
    }
  };
  public chartLabels: Label = ['Sprint 1', 'Sprint 2', 'Sprint 3', 'Sprint 4'];
  public chartLegend = true;
  public type: ChartType = 'horizontalBar';
  public chartData: ChartDataSets[] = [
    {
      data: [10, 20, 30, 40],
      label: 'Sprint 1',
      backgroundColor: '#8e5ea2'
    },
    {
      data: [100, 200, 300, 400],
      label: 'Sprint 2',
      backgroundColor: '#3e95cd'
    }
  ]; */

  ngOnInit() {
    this.getSprints();
    const chart = am4core.create('chartdiv', am4charts.XYChart);
    chart.hiddenState.properties.opacity = 0; // this creates initial fade-in

    chart.paddingRight = 30;
    chart.dateFormatter.inputDateFormat = 'yyyy-MM-dd HH:mm';

    const colorSet = new am4core.ColorSet();
    colorSet.saturation = 0.4;
    /* this.sprints.forEach(sprint => {
      const obj = {
        name: sprint.sprintName.toString(),
        fromDate: sprint.startDate.toString(),
        toDate: sprint.endDate.toString(),
        color: colorSet.getIndex(0).brighten(0)
      };
      chart.data.push(obj);
    }); */
    let i = 0;
    this.sprints.forEach(sprint => {
      chart.data[i]['name'] = sprint.sprintName + '';
      chart.data[i]['fromDate'] = new Date(sprint.startDate);
      chart.data[i]['toDate'] = new Date(sprint.endDate);
      chart.data[i]['color'] = colorSet.getIndex(0).brighten(0);
      i = i + 1;
    });

    /* chart.data = [
      {
        name: 'Hello',
        fromDate: '2018-01-01 08:00',
        toDate: '2018-01-01 10:00',
        color: colorSet.getIndex(0).brighten(0)
      },
      {
        name: 'John',
        fromDate: '2018-01-01 12:00',
        toDate: '2018-01-01 15:00',
        color: colorSet.getIndex(0).brighten(0.4)
      },
      {
        name: 'John',
        fromDate: '2018-01-01 15:30',
        toDate: '2018-01-01 21:30',
        color: colorSet.getIndex(0).brighten(0.8)
      },

      {
        name: 'Jane',
        fromDate: '2018-01-01 09:00',
        toDate: '2018-01-01 12:00',
        color: colorSet.getIndex(2).brighten(0)
      },
      {
        name: 'Jane',
        fromDate: '2018-01-01 13:00',
        toDate: '2018-01-01 17:00',
        color: colorSet.getIndex(2).brighten(0.4)
      },

      {
        name: 'Peter',
        fromDate: '2018-01-01 11:00',
        toDate: '2018-01-01 16:00',
        color: colorSet.getIndex(4).brighten(0)
      },
      {
        name: 'Peter',
        fromDate: '2018-01-01 16:00',
        toDate: '2018-01-01 19:00',
        color: colorSet.getIndex(4).brighten(0.4)
      },

      {
        name: 'Melania',
        fromDate: '2018-01-01 16:00',
        toDate: '2018-01-01 20:00',
        color: colorSet.getIndex(6).brighten(0)
      },
      {
        name: 'Melania',
        fromDate: '2018-01-01 20:30',
        toDate: '2018-01-01 24:00',
        color: colorSet.getIndex(6).brighten(0.4)
      },

      {
        name: 'Donald',
        fromDate: '2018-01-01 13:00',
        toDate: '2018-01-01 24:00',
        color: colorSet.getIndex(8).brighten(0)
      }
    ]; */

    const categoryAxis = chart.yAxes.push(new am4charts.CategoryAxis());
    categoryAxis.dataFields.category = 'name';
    categoryAxis.renderer.grid.template.location = 0;
    categoryAxis.renderer.inversed = true;

    const dateAxis = chart.xAxes.push(new am4charts.DateAxis());
    dateAxis.dateFormatter.dateFormat = 'yyyy-MM-dd HH:mm';
    dateAxis.renderer.minGridDistance = 70;
    dateAxis.baseInterval = { count: 1, timeUnit: 'day' };
    // dateAxis.max = new Date(2018, 0, 1, 24, 0, 0, 0).getTime();

    dateAxis.strictMinMax = true;
    dateAxis.renderer.tooltipLocation = 0;

    const series1 = chart.series.push(new am4charts.ColumnSeries());
    series1.columns.template.width = am4core.percent(80);
    series1.columns.template.tooltipText = '{name}: {openDateX} - {dateX}';

    series1.dataFields.openDateX = 'fromDate';
    series1.dataFields.dateX = 'toDate';
    series1.dataFields.categoryY = 'name';
    series1.columns.template.propertyFields.fill = 'color'; // get color from data
    series1.columns.template.propertyFields.stroke = 'color';
    series1.columns.template.strokeOpacity = 1;

    chart.scrollbarX = new am4core.Scrollbar();
  }

  getSprints() {
    this.spritService.getSprints(this.projectId).subscribe(
      next => {
        this.sprints = next;
        console.log(this.sprints);
      },
      error => {
        console.log(error.message);
      }
    );
  }
}
