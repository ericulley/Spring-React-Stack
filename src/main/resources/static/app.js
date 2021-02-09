// Components
/////////////

// NavBar
class NavBar extends React.Component {
    render = () => {
        return (
            <div id="nav">
                <div id="left-nav">
                    <p className="logo">Coin Purse</p>
                    <h6>Market</h6>
                    <h6>Portfolio</h6>
                </div>
                <div id="right-nav">
                    <p>Log In</p>
                    <button>Get Started</button>
                </div>
            </div>
        )
    }
}

// New User Sign Up
class SignUp extends React.Component {
    state = {
        firstName: '',
        email: '',
        password: '',
        users: []
    }
    handleChange = (event) => {
        this.setState({
            [event.target.id]: event.target.value,
        })
    }
    createUser = (event) => {
        event.preventDefault();
        axios.post(
            '/clients',
            {
                firstName: this.state.firstName,
                email: this.state.email,
                password: this.state.password,
            }
        ).then(
            (res) => {
                console.log(res.data)
                this.setState({
                    users: res.data
                })
            }
        )
        document.getElementById('sign-up-form').reset()
    }
    getUsers = () => {
        axios.get('/clients').then(
            (res) => {
                this.setState({
                    users: res.data
                })
            }
        )
    }
    render = () => {
        return (
            <div id="sign-up-cont">
            <h2>Sign Up</h2>
            <form id="sign-up-form" onSubmit={this.createUser}>
                <label htmlFor="firstName">First Name:</label>
                <input id="firstName" onKeyUp={this.handleChange} type="text" />
                <br/>
                <label htmlFor="email">Email:</label>
                <input id="email" onKeyUp={this.handleChange} type="text" />
                <br/>
                <label htmlFor="password">Password:</label>
                <input id="password" onKeyUp={this.handleChange} type="password" />
                <br/>
                <input type="submit" value="Create New User"/>
            </form>
            </div>
        )
    }
}


// App / Parent Component
class App extends React.Component {
    state = {
        people:[]
    }

    getUsers = () => {
        axios.get('/people').then(
            (response) => {
                this.setState({
                    people: response.data
                })
            }
        )
    }
    componentDidMount = () => {

    }
    createPerson = (event) => {
        event.preventDefault();
        axios.post(
            '/people',
            {
                name:this.state.newPersonName,
                age:this.state.newPersonAge,
            }
        ).then(
            (response) => {
                this.setState({
                    people:response.data
                })
            }
        )
    }

    changeNewPersonAge = (event) => {
        this.setState({
            newPersonAge:event.target.value
        });
    }

    changeNewPersonName = (event) => {
        this.setState({
            newPersonName:event.target.value
        });
    }

    deletePerson = (event) => {
        axios.delete('/people/' + event.target.value).then(
            (response) => {
                this.setState({
                    people:response.data
                })
            }
        )

    }

    updatePerson = (event) => {
        event.preventDefault();
        const id = event.target.getAttribute('id');
        axios.put(
            '/people/' + id,
            {
                name:this.state.updatePersonName,
                age:this.state.updatePersonAge,
            }
        ).then(
            (response) => {
                this.setState({
                    people:response.data,
                    name:'',
                    age:null,
                })
            }
        )
    }

    changeUpdatePersonName = (event) => {
        this.setState(
            {
                updatePersonName:event.target.value
            }
        )
    }

    changeUpdatePersonAge = (event) => {
        this.setState(
            {
                updatePersonAge:event.target.value
            }
        )
    }

    render = () => {
        return <div>
            <NavBar />
            <SignUp />
            <h2>Create Person</h2>
            <form onSubmit={this.createPerson}>
                <input onKeyUp={this.changeNewPersonName} type="text" placeholder="name" /><br/>
                <input onKeyUp={this.changeNewPersonAge} type="number" placeholder="age" /><br/>
                <input type="submit" value="Create Person" />
            </form>
            <h2>List of People</h2>
            <ul>
                {
                    this.state.people.map(
                        (person, index) => {
                            return <li key={index}>

                                {person.name}: {person.age}

                                <button value={person.id} onClick={this.deletePerson}>DELETE</button>

                                <form id={person.id} onSubmit={this.updatePerson}>
                                    <input onKeyUp={this.changeUpdatePersonName} type="text" placeholder="name"/><br/>
                                    <input onKeyUp={this.changeUpdatePersonAge} type="number" placeholder="age"/><br/>
                                    <input type="submit" value="Update Person"/>
                                </form>
                            </li>
                        }
                    )
                }
            </ul>
        </div>
    }
}

// Mounting the App to the DOM
ReactDOM.render(
    <App></App>,
    document.querySelector('main')
)
