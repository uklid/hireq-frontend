import React, { Component } from 'react'
import LayoutContentWrapper from '../components/utility/layoutWrapper'
import LayoutContent from '../components/utility/layoutContent'
import Grid from 'material-ui/Grid'
import Card from '../components/uielements/card'
import { Table, Progress } from 'antd'
import Tables from './Position/components/Table'
import { GoogleChart } from '../containers/Charts/googleChart'
// import IsoWidgetsWrapper from '../components/uielements/progress'

const dataSource = [{
  key: '1',
  name: 'Mike',
  age: 32,
  address: '10 Downing Street'
}, {
  key: '2',
  name: 'John',
  age: 42,
  address: '10 Downing Street'
}]

const columns = [{
  title: 'Name',
  dataIndex: 'name',
  key: 'name',
}, {
  title: 'Age',
  dataIndex: 'age',
  key: 'age',
}, {
  title: 'Address',
  dataIndex: 'address',
  key: 'address',
}]

const ProgressBarWithTitle = ({ title, percent, status }) => (
  <div style={{ marginBottom: 20 }}>
    <p style={{ marginBottom: 0 }}>{title}</p>
    <Progress percent={percent} status={status} />
  </div>
)

const ConfigartionBarChart = {
  title: 'BarChart',
  key: 'BarChart',
  chartType: 'BarChart',
  width: '100%',
  height: '350px',
  data: [
    ['Year', 'Trafic', {
      role: 'style',
    }],
    ['2010', 10000, 'fill-color: #48A6F2; fill-opacity: 0.4'],
    ['2012', 21500, 'fill-color: #f64744; fill-opacity: 0.4'],
    ['2014', 56598, 'fill-color: #ffbf00; fill-opacity: 0.4'],
    ['2016', 85256, 'fill-color: #511E78; fill-opacity: 0.4'],
  ], options: {
    title: 'Visitor statistics from 2010 to 2016',
    titleTextStyle: {
      color: '#788195',
    },
    bar: {
      groupWidth: '95%',
    }, legend: {
      position: 'none',
    },
    animation: {
      duration: 1000,
      easing: 'in',
      startup: true,
    }, hAxis: {
      textStyle: {
        color: '#788195',
      },
    },
    vAxis: {
      textStyle: {
        color: '#788195',
      },
    },
    tooltip: {
      textStyle: {
        color: '#788195',
      }
    }
  },
  chartEvents: [{
    eventName: 'onmouseover',
  }],
}

const Histogram = {
  title: 'Histogram',
  key: 'Histogram',
  chartType: 'Histogram',
  width: '100%',
  height: '350px',
  data: [
    ['Dinosaur', 'Length'],
    ['Acrocanthosaurus (top-spined lizard)', 12.2],
    ['Albertosaurus (Alberta lizard)', 9.1],
    ['Allosaurus (other lizard)', 12.2],
    ['Apatosaurus (deceptive lizard)', 22.9],
    ['Archaeopteryx (ancient wing)', 0.9],
    ['Argentinosaurus (Argentina lizard)', 36.6],
    ['Baryonyx (heavy claws)', 9.1],
    ['Brachiosaurus (arm lizard)', 30.5],
    ['Ceratosaurus (horned lizard)', 6.1],
    ['Coelophysis (hollow form)', 2.7],
    ['Compsognathus (elegant jaw)', 0.9],
    ['Deinonychus (terrible claw)', 2.7],
    ['Diplodocus (double beam)', 27.1],
    ['Dromicelomimus (emu mimic)', 3.4],
    ['Gallimimus (fowl mimic)', 5.5],
    ['Mamenchisaurus (Mamenchi lizard)', 21],
    ['Megalosaurus (big lizard)', 7.9],
    ['Microvenator (small hunter)', 1.2],
    ['Ornithomimus (bird mimic)', 4.6],
    ['Oviraptor (egg robber)', 1.5],
    ['Plateosaurus (flat lizard)', 7.9],
    ['Sauronithoides (narrow-clawed lizard)', 2],
    ['Seismosaurus (tremor lizard)', 45.7],
    ['Spinosaurus (spiny lizard)', 12.2],
    ['Supersaurus (super lizard)', 30.5],
    ['Tyrannosaurus (tyrant lizard)', 15.2],
    ['Ultrasaurus (ultra lizard)', 30.5],
    ['Velociraptor (swift robber)', 1.8],
  ],
  options: {
    title: 'Lengths of dinosaurs, in meters',
    titleTextStyle: {
      color: '#788195',
    },
    legend: {
      textStyle: {
        color: '#788195',
      },
    },
    colors: ['#511E78'],
    dataOpacity: 0.6,
    animation: {
      duration: 1000,
      easing: 'in',
      startup: true,
    },
    hAxis: {
      textStyle: {
        color: '#788195',
      },
    },
    vAxis: {
      textStyle: {
        color: '#788195',
      },
    },
    tooltip: {
      textStyle: {
        color: '#788195',
      },
    },
  },
}

export default class extends Component {
  render() {
    return (
      <LayoutContentWrapper
      // style={{ height: '100vh' }}
      >
        {/* <LayoutContent>
        </LayoutContent> */}
        <Grid container spacing={8}>
          <Grid item md={4}>
            <Card
              style={{ marginBottom: 20, width: '100%', textAlign: 'center' }}
            >
              <h4>Total Positions</h4>
              <h1 style={{ fontSize: 50 }}>50</h1>
            </Card>
            <Card
              style={{ marginBottom: 20, width: '100%', textAlign: 'center' }}
            >
              <h4>Total Candidates</h4>
              <h1 style={{ fontSize: 50 }}>50</h1>
            </Card>
            <Card
              style={{ marginBottom: 20, width: '100%', textAlign: 'center' }}
            >
              <h4>Remaining Positions</h4>
              <h1 style={{ fontSize: 50 }}>50</h1>
            </Card>
          </Grid>
          <Grid item md={8}>
            <Card
              title="Opened Positions"
              style={{ width: '100%', textAlign: 'center' }}
            >
              <Tables
                dataSource={dataSource}
                columns={columns}
                rowPerPage={10}
                ellipsis={10}
              />
            </Card>
          </Grid>
        </Grid>
        <Grid container spacing={8}>
          <Grid item md={4}>
            <Card
              title="Income"
            >
              <ProgressBarWithTitle title="Progress 1" percent={50} status="active" />
              <ProgressBarWithTitle title="Progress 1" percent={50} status="active" />
              <ProgressBarWithTitle title="Progress 1" percent={50} status="active" />
            </Card>
          </Grid>
          <Grid item md={8}>
            <Card
              title="Opened Positions"
              style={{ width: '100%', textAlign: 'center' }}
            >
              <Tables
                dataSource={dataSource}
                columns={columns}
                rowPerPage={10}
                ellipsis={10}
              />
            </Card>
          </Grid>
        </Grid>
        <Grid style={{ padding: 15 }} container spacing={8} justify="space-between">
          <Grid item sm={6}>
            <Card
              title="Candidate's Q-Score"
              style={{ width: '100%' }}
            >
              <GoogleChart {...ConfigartionBarChart} />
            </Card>
          </Grid>
          <Grid item sm={6}>
            <Card
              title="Q-Score comparison"
              style={{ width: '100%' }}
            >
              <GoogleChart {...Histogram} />
            </Card>
          </Grid>
        </Grid>
      </LayoutContentWrapper>
    )
  }
}
