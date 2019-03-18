import React from 'react';
import axios from 'axios';
import { withRouter, Link } from 'react-router-dom'


class User extends React.Component {
  state = {
    user: []
  }

  getSingleUser() {
    let userId = parseInt(this.props.match.params.id)
    axios.get(`/profile/${userId}`)
    .then(res => {
      this.setState({
        user: res.data.user
      })
    })
    .catch(err => {
      console.log(err, "single USER call");
    })
  }

  componentDidMount() {
    this.getSingleUser()
  }
  render() {
    return (
      <div className="songsNprofile">
      <div className="backbutton">
        <Link to="#" onClick={this.props.goBack}><p>Go back</p></Link>
      </div>
      i am one user functional component
      </div>
    )
  }
}


export default withRouter(User)
