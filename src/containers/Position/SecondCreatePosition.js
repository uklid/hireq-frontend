import React from 'react'
import {connect} from 'react-redux'
import { LayoutContentWrapper } from '../../components/utility/layoutWrapper.style'
import Grid from 'material-ui/Grid'
import Card from '../../components/uielements/card'
import styled from 'styled-components'
import { Table, DatePicker, Slider, Button } from 'antd'
import Tables from './components/Table'
import CriticalSoftSkills from './CriticalSoftSkills'
import moment from 'moment'
import WorkPreference from './WorkPreference'
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from 'material-ui/Dialog'
import { Loading,LoadingSuccess } from '../../redux/loading/actions'
import {
  preCreatePosition
} from '../../redux/position/actions'

const SliderStyled = styled(Slider) `
  .ant-slider-handle {
	border: solid 2px #954590;
  }
  .ant-slider-track {
	background-color: #954590;
  }
`
const Span = styled.span`
	font-weight: 800;
	margin-right: 5px;
`

const WhiteWrapper = styled.div`
		background-color: #fff;
		padding: 20px;

		h4 {
			display: inline;
		}
`

const onChange = (date, dateString) => {
  console.log("date =", date)
  console.log("data String =", dateString)
}

class SecondCreatePosition extends React.Component {
  state = {
    open: false,
    showEdit: true,
  }
  componentWillMount = () => {
    if (Object.keys(this.props.prepareCreate).length === 0) {
      this.props.history.push('/dashboard/create-position')
    }
  }

  render() {
    const { prepareCreate } = this.props
    console.log("length = ",Object.keys(prepareCreate.info).length)
    return (
      <LayoutContentWrapper>
        <Grid container spacing={24}>
          <Grid item sm={4} xs={12}>
            <Card>
              <p> <Span>Position Name: </Span> {prepareCreate.name} </p>
              <p> <Span>Category: </Span> {prepareCreate.category} </p>
              <p> <Span>Info: </Span> {prepareCreate.info.tags} </p>
            </Card>
            {/* <Card title="Candidate" >
						</Card> */}
          </Grid>
          <Grid item sm={8} xs={12}>
          </Grid>
        </Grid>
        <Grid style={{ marginTop: 10 }} container spacing={24}>
          <Grid item sm={12} xs={12}>
            <Card>
              <h3 style={{ marginBottom: 30, cursor: 'pointer' }}>Edit Position Detail.</h3>
                <Grid container spacing={0}>
                  <Grid item sm={12} xs={12}>
                    {/* <p>
											<span> Start Date: {`${moment(new Date()).format("DD/MM/YY")}`}</span>
											<span style={{ marginLeft:70}}>
												End Date: <DatePicker onChange={onChange} />
											</span>
										</p>
										<Grid container style={{ marginTop: 30 }}>
											<Grid item sm={2} xs={12}> Cognative Skill: </Grid>
											<Grid item sm={4} xs={12}><SliderStyled range defaultValue={[30, 50]} /></Grid>
										</Grid> */}
                  </Grid>
                  <Grid style={{ paddingTop: 60 }} container spaceing={24}>
                    <Grid item sm={6} xs={12}>
                      <CriticalSoftSkills 
                        slideData={prepareCreate.info}
                      />
                    </Grid>
                    <Grid item sm={6} xs={12}>
                      <WorkPreference />
                    </Grid>
                  </Grid>
                </Grid>
                <Grid container spacing={0}>
                  <Grid item>
                    <Button
                      type="primary"
                      // onClick={modalShow}
                      onClick={this.handleOpen}
                      style={{ backgroundColor: '#954590', marginTop: 30, borderColor: '#954590' }}
                    >
                      Create Position.
									</Button>
                  </Grid>
                </Grid>
            </Card>
          </Grid>
        </Grid>
        {/* Dialog modal from material ui */}
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{"Use Google's location service?"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Let Google help apps determine location. This means sending anonymous location data to
              Google, even when no apps are running.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button style={{ float: 'left' }} onClick={this.handleClose}>
              Disagree
            </Button>
            <Button style={{ float: 'right' }} onClick={this.handleClose}>
              Agree
            </Button>
          </DialogActions>
        </Dialog>
        {/* end dialog modal */}
      </LayoutContentWrapper>
    )
  }
}

const mapStateToProps = state => ({
  prepareCreate: state.Positions.prepareCreate,
})

export default connect(mapStateToProps,
  { 
    Loading,
    LoadingSuccess,
    preCreatePosition
  })(SecondCreatePosition)