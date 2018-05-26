import React, { Component } from 'react'
import firebase from 'firebase'
import LayoutContentWrapper from '../components/utility/layoutWrapper'
import LayoutContent from '../components/utility/layoutContent'
import Grid from 'material-ui/Grid'
import Card from '../components/uielements/card'
import {
  Table,
  Progress,
  Checkbox
} from 'antd'
import Tables from './Position/components/Table'
import CandidatesTable from './Candidates/components/Table'
import { GoogleChart } from '../containers/Charts/googleChart'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { Loading, LoadingSuccess } from '../redux/loading/actions'
import { updateCreatedAllPosition } from '../redux/position/actions'
import { updateAllCandidates, updateAllChecked } from '../redux/candidates/actions'
import Axios from 'axios'
import { baseUrl } from '../libs/url/baseUrl'

const positionColumns = [{
  title: 'Name',
  dataIndex: 'name',
  key: 'name',
}, {
  title: 'category',
  dataIndex: 'category',
  key: 'category',
}, {
  title: 'ACTIONS',
  dataIndex: 'buttonAction',
  key: 'buttonAction'
}]

const ProgressBarWithTitle = ({ title, percent, status }) => (
  <div style={{ marginBottom: 20 }}>
    <p style={{ marginBottom: 0 }}>{title}</p>
    <ProgressStyled percent={percent} status={status} />
  </div>
)

const ProgressStyled = styled(Progress) `
  .ant-progress-bg {
    background-color: #954590;
  }
`

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

class Dashboard extends Component {
  componentDidMount = async () => {
    try {
      this.props.Loading()
      const test = await firebase.auth().onAuthStateChanged(async (data) => {
        if (data) {
          const getIdToken = await firebase.auth().currentUser.getIdToken()
          const uid = localStorage.getItem('loginToken')
          //get all position and keep it to redux store
          console.log("get Id Token = ", getIdToken)
          const url = `${baseUrl}/users/${uid}/positions`
          const result = await Axios.get(url, {
            headers: { Authorization: "Bearer " + getIdToken }
          })
          this.props.updateCreatedAllPosition(result.data)
          //  end position data get here
          // start get all candidates here
          const candidatesURL = `${baseUrl}/users/${uid}/candidates`
          const candidatesResult = await Axios.get(candidatesURL, {
            headers: { Authorization: "Bearer " + getIdToken }
          })
          console.log("Candidates: ", candidatesResult)
          this.props.updateAllCandidates(candidatesResult.data)
          // end all candidate here
          this.props.LoadingSuccess()
        } else {
          this.props.LoadingSuccess()
          console.log("ไม่มี")
        }
      })
      // console.log(test)

    } catch (err) {
      this.props.LoadingSuccess()
      console.log(err)
    }
  }
  onCheckAllChange = () => {
    this.props.updateAllChecked()
  }
  newObject = () => {
    // ฟังชั่นนี้ รีกรุ๊บของ array ใหม่ ให้มี positionId เข้าไปด้วย
    return Object.values(this.props.allPositionCreated).map((data, index) => {
      return {
        ...data,
        positionId: Object.keys(this.props.allPositionCreated)[index]
      }
    })
  }
  newObjectCandidate = () => {
    // ฟังชั่นนี้ รีกรุ๊บของ array ใหม่ ให้มี candidateId เข้าไปด้วย
    return Object.values(this.props.allCandidatesData).map((data, index) => {
      return {
        ...data,
        checked: false
      }
    })
  }
  onCheckAllChange = (event) => {
		console.log(" ติด all check ", event.target)
    // console.log("Props s s s s: " , this.props)
    const allCheckBox = document.getElementsByClassName("ant-checkbox")
    if(event.target.checked === true) {
      for(let i = 1; i < allCheckBox.length; i++) {
        console.log("ติดแล้วในลูป" , allCheckBox[i])
        allCheckBox[i].classList.add("ant-checkbox-checked")
        allCheckBox[i].click()
      }
    } else {
      for(let i = 1; i < allCheckBox.length; i++) {
        console.log("ติดแล้วในลูป" , allCheckBox[i])
        allCheckBox[i].classList.remove("ant-checkbox-checked")
        allCheckBox[i].click()        
      }
    }
   
		this.props.updateAllChecked()
	}
	candidatesColumn = [
		{
			title: <Checkbox onChange={this.onCheckAllChange}>Check all</Checkbox>,
			dataIndex: 'checkbox',
			key: 'checkbox'
		},
		{
			title: 'Name',
			dataIndex: 'name',
			key: 'name',
		},
		{
			title: 'Email',
			dataIndex: 'email',
			key: 'email',
		},
		{
			title: 'ACTIONS',
			dataIndex: 'buttonAction',
			key: 'buttonAction'
		}
	]
  render() {
    const { allPositionCreated, allCandidatesData } = this.props
    // console.log('All candidates: ', allCandidateData)
    // console.log('candidate after regroup: ', Object.values(allPositionCreated))
    // {console.log(this.newObject())}    
    // console.log("result = ", { ...Object.values(allPositionCreated), positionId: allPositionCreated })
    return (
      <LayoutContentWrapper
      // style={{ height: '100vh' }}
      >
        {/* <LayoutContent>
        </LayoutContent> */}
        <Grid container spacing={8}>
          <Grid item md={4} xs={12}>
            <Card
              style={{ marginBottom: 20, width: '100%', textAlign: 'center' }}
            >
              <h3>Total Positions</h3>
              <h1 style={{ fontSize: 50, color: '#954590' }}>{Object.keys(allPositionCreated).length}</h1>
            </Card>
            <Card
              style={{ marginBottom: 20, width: '100%', textAlign: 'center' }}
            >
              <h3>Total Candidates</h3>
              <h1 style={{ fontSize: 50, color: '#954590' }}>{Object.keys(allCandidatesData).length}</h1>
            </Card>
            <Card
              style={{ marginBottom: 20, width: '100%', textAlign: 'center' }}
            >
              <h3>Remaining Positions</h3>
              <h1 style={{ fontSize: 50, color: '#954590' }}>50</h1>
            </Card>
          </Grid>
          <Grid item md={8} xs={12}>
            <Card
              title="Opened Positions"
              style={{ width: '100%', textAlign: 'center' }}
            >
              <Tables
                // oldDataSource={Object.keys()}
                dataSource={Object.values(this.newObject())}
                columns={positionColumns}
                rowPerPage={10}
                ellipsis={10}
              />
            </Card>
          </Grid>
        </Grid>
        <Grid container style={{ marginTop: 12 }} spacing={8}>
          <Grid item md={4} xs={12}>
            <Card
              title="Income"
            >
              <ProgressBarWithTitle title="Progress 1" percent={50} status="active" />
              <ProgressBarWithTitle title="Progress 1" percent={50} status="active" />
              <ProgressBarWithTitle title="Progress 1" percent={50} status="active" />
            </Card>
          </Grid>
          <Grid item md={8} xs={12}>
            <Card
              title="Opened Positions"
              style={{ width: '100%', textAlign: 'center' }}
            >
              <CandidatesTable
                dataSource={Object.values(this.newObjectCandidate())}
                columns={this.candidatesColumn}
                rowPerPage={10}
                ellipsis={10}
              />
            </Card>
          </Grid>
        </Grid>
        <Grid style={{ marginTop: 20 }} container spacing={8} justify="space-between">
          <Grid item sm={6} xs={12}>
            <Card
              title="Candidate's Q-Score"
              style={{ width: '100%' }}
            >
              <GoogleChart {...ConfigartionBarChart} />
            </Card>
          </Grid>
          <Grid item sm={6} xs={12}>
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

const mapStateToProps = state => ({
  allPositionCreated: state.Positions.allPositionCreated,
  allCandidatesData: state.Candidates.allCandidatesData
})

export default connect(mapStateToProps, {
  updateCreatedAllPosition,
  updateAllCandidates,
  Loading,
  LoadingSuccess,
  updateAllChecked
})(Dashboard)