import React from 'react'
import { connect } from 'react-redux'
import { Button, message } from 'antd'
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from 'material-ui/Dialog'
import { Loading, LoadingSuccess } from '../../../redux/loading/actions'
import { updateDeleteId, toggleDialog, updateAllCandidates } from '../../../redux/candidates/actions'
import firebase from 'firebase'
import Axios from 'axios'
import { baseUrl } from '../../../libs/url/baseUrl'

class ConfirmDelete extends React.Component {

  deleteCandidate = async () => {
    this.props.Loading()
    const test = await firebase.auth().onAuthStateChanged(async (data) => {
      if (data) {
        try {
          const getIdToken = await firebase.auth().currentUser.getIdToken()
          const { positionId, deleteId, allCandidatesData } = this.props
          const uid = localStorage.getItem('loginToken')
          const url = `${baseUrl}/users/${uid}/candidates/${deleteId}`
          const result = await Axios.delete(url, {
            headers: { Authorization: "Bearer " + getIdToken }
          })
          const updateDataAfterDelete = Object.values(allCandidatesData).filter((candidate) => {
            return candidate.candidateId !== deleteId
          })
          console.log("after Delete Candidate Data: ", {...updateDataAfterDelete})
          // allPosition
          this.props.updateAllCandidates({...updateDataAfterDelete})
          this.props.toggleDialog()
          this.props.LoadingSuccess()
          message.success('Delete candidate success', 10)
        } catch (err) {
          this.props.LoadingSuccess()
          message.error('Fail to delete candidate', 10)
          console.log(err)
        }
      } else {
        this.props.LoadingSuccess()
        console.log("ไม่มี")
      }
    })
  }
  render() {
    // const { toggleDialog } = this.props
    return (
      <Dialog
        open={true}
        onClose={this.handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Are you sure to delete</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">

          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button style={{ float: 'left' }} onClick={() => this.props.toggleDialog()}>
            Disagree
          </Button>
          <Button style={{ float: 'right' }} onClick={this.deleteCandidate}>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    )
  }
}

const mapStateToProps = state => ({
  allCandidatesData: state.Candidates.allCandidatesData,
  deleteId: state.Candidates.deleteId,
  positionId: state.Candidates.positionId,
  toggleDialog: state.Candidates.toggleDialog
})

export default connect(mapStateToProps, {
  Loading,
  LoadingSuccess,
  updateDeleteId,
  toggleDialog,
  updateAllCandidates
})(ConfirmDelete)