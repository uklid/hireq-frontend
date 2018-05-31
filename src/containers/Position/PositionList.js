import React from 'react'
import { connect } from 'react-redux'
import TextField from 'material-ui/TextField'
import Grid from 'material-ui/Grid'
import { LayoutContentWrapper } from '../../components/utility/layoutWrapper.style'
import Card from '../../components/uielements/card'
import Ionicon from 'react-ionicons'
import styled from 'styled-components'
import { FormGroup, FormControlLabel } from 'material-ui/Form'
// import Checkbox from 'material-ui/Checkbox'
import Checkbox from '../HireQComponent/Checkbox'
import Button from '../HireQComponent/Button'
import Tables from './components/Table'
import firebase from 'firebase'
import Axios from 'axios'
import { Loading, LoadingSuccess } from '../../redux/loading/actions'
import {
  searchPosition,
  updatePositionData
} from '../../redux/position/actions'
import { baseUrl } from '../../libs/url/baseUrl'

const columns = [{
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

const InputWrapper = styled.div`
    position: relative;
    // width: 80%;

    .floating-icon {
        position: absolute;
    }
    .floating-textfield {
        margin-top: 0px;
        padding-left: 40px;
        width: 100%;
    }
`

const FilterField = ({ checked, onChange, value, label }) => (
  <FormControlLabel
    control={
      <Checkbox
        checked={checked}
        onChange={onChange}
        value={value}
        style={{ color: '#954590' }}
      />
    }
    label={label}
  />
)

class PositionList extends React.Component {

  state = {
    showAll: false,
    showOpen: false,
    showFinished: false,
    positionData: []
  }

  searchPoisition = (event) => {
    const filter = event.target.value.toUpperCase()
    const { positionData } = this.props
    const searchResult = Object.values(positionData).filter((obj) => {
      const category = obj['category'].toUpperCase().includes(filter)
      const descriptions = obj['descriptions'].toUpperCase().includes(filter)
      const name = obj['name'].toUpperCase().includes(filter)
      const tags = obj['tags'].toUpperCase().includes(filter)
      if (category || descriptions || tags || name) {
        return obj
      }
    })
    console.log("search result:" , searchResult)
    this.setState({
      positionData: searchResult
    })
  }
  goToSettingPosition = () => {
    this.props.history.push({
      pathname: '/dashboard/create-position/create-setting',
      state: { positionSetting: this.props.prepareCreate }
    })
  }

  filterOnChange = (name) => (event) => {
    this.setState({
      [name]: !this.state[name],
    })
  }
  componentDidMount = async () => {
    try {
      this.props.Loading()
      await firebase.auth().onAuthStateChanged(async (data) => {
        if (data) {
          const getIdToken = await firebase.auth().currentUser.getIdToken()
          const uid = localStorage.getItem('loginToken')
          //get all position and keep it to redux store
          const url = `${baseUrl}/users/${uid}/positions`
          const result = await Axios.get(url, {
            headers: { Authorization: "Bearer " + getIdToken }
          })
          this.setState({ positionData: result.data })
          this.props.updatePositionData(result.data)
          //  end position data get here
          this.props.LoadingSuccess()
        } else {
          this.props.LoadingSuccess()
        }
      })
    } catch (err) {
      this.props.LoadingSuccess()
      console.log(err)
    }
  }
  render() {
    console.log("positiondata::" , this.props.positionData)
    return (
      <LayoutContentWrapper>
        <Grid container spacing={0}>
          <Grid item sm={12} xs={12}>
            <Card>
              <InputWrapper>
                <Ionicon className="floating-icon" icon="ios-search-outline" fontSize="35px" />
                <TextField
                  placeholder="Search Position or detail here"
                  margin="normal"
                  className="floating-textfield"
                  onChange={this.searchPoisition}
                />
              </InputWrapper>
              {/* <ButtonWrapper>
                <Button
                  style={{ marginRight: 45 }}
                  onClick={this.searchPositionData}>Search</Button>
              </ButtonWrapper> */}
              <FormGroup style={{  marginLeft: 40, marginTop: 10 }} row>
                <FilterField
                  checked={this.state.showAll}
                  onChange={this.filterOnChange('showAll')}
                  value="All"
                  label="All"
                />
                <FilterField
                  checked={this.state.showOpen}
                  onChange={this.filterOnChange('showOpen')}
                  value="Open"
                  label="Open"
                />
                <FilterField
                  checked={this.state.showFinished}
                  onChange={this.filterOnChange('showFinished')}
                  value="Finished"
                  label="Finished"
                />
              </FormGroup>
            </Card>
          </Grid>
        </Grid>
        <Grid style={{ marginTop: 30 }} container spacing={0}>
          <Grid item sm={12} xs={12}>
            <Card
              title="Position List"
              style={{ overflowX: 'auto' }}
            >
              <Tables
                key={`myTables`}
                tableId="myTable"
                dataSource={Object.values(this.state.positionData)}
                columns={columns}
                rowPerPage={7}
                ellipsis={10}
              />
            </Card>
          </Grid>
        </Grid>
        <Grid style={{ marginTop: 20 }} container spacing={0}>
          <Grid item>
            {/* <Button
							onClick={this.goToSettingPosition}
							style={{
								color: '#fff',
								backgroundColor: '#954590',
								borderColor: '#954590',
							}}>Create position</Button> */}
          </Grid>
        </Grid>
        <Grid container spacing={0}>
					<Grid item>
						<Button
							type="primary"
							onClick={() => { this.props.history.push('/dashboard/create-position') }}
							width="160px"
							marginTop="15px"
						>
							Add new Candidate.
						</Button>
					</Grid>
				</Grid>
      </LayoutContentWrapper>
    )
  }
}

const mapStateToProps = (state) => ({
  searchPosition: state.Positions.searchPoisition,
  positionData: state.Positions.positionData,
  prepareCreate: state.Positions.prepareCreate,
  headerToken: state.Auth.headerToken
})

export default connect(mapStateToProps,
  {
    searchPosition,
    updatePositionData,
    Loading,
    LoadingSuccess,
  })(PositionList)