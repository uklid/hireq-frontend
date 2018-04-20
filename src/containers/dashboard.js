import React, { Component } from 'react'
import LayoutContentWrapper from '../components/utility/layoutWrapper'
import LayoutContent from '../components/utility/layoutContent'
import Grid from 'material-ui/Grid'
import Card from '../components/uielements/card'
import { Table } from 'antd'

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
}];

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
}];

export default class extends Component {
  render() {
    return (
      <LayoutContentWrapper style={{ height: '100vh' }}>
        {/* <LayoutContent>
        </LayoutContent> */}
        <Grid container spacing={8}>
          <Grid item md={4}>
            <Card
              style={{ width: '100%', textAlign: 'center' }}
            >
              <h4>Total Positions</h4>
              <h1 style={{ fontSize: 50 }}>50</h1>
            </Card>
            <Card
              style={{ width: '100%', textAlign: 'center' }}
            >
              <h4>Total Candidates</h4>
              <h1 style={{ fontSize: 50 }}>50</h1>
            </Card>
            <Card
              style={{ width: '100%', textAlign: 'center' }}
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
              <Table dataSource={dataSource} columns={columns} />
            </Card>
          </Grid>
        </Grid>
      </LayoutContentWrapper>
    )
  }
}
