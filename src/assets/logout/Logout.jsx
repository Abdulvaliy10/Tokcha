import { Component } from 'react'

class Logout extends Component {
    componentDidMount(){
        authApi.logout()
        window.location.pathname = "/login"
    }

    render() { 
        return null
    }
}
 
export default Logout;