import {Component} from 'react'

import {v4} from 'uuid'

import PasswordItem from '../PasswordItem'

import './index.css'

class PasswordManager extends Component {
  state = {
    passwordsList: [],
    websiteInput: '',
    usernameInput: '',
    passwordInput: '',
    showPassword: false,
    searchPassword: '',
  }

  deletePassword = id => {
    const {passwordsList} = this.state
    const updatedPasswordsList = passwordsList.filter(
      eachPassword => id !== eachPassword.id,
    )
    this.setState({passwordsList: updatedPasswordsList})
  }

  onClickShowPassword = () => {
    this.setState(prevState => ({showPassword: !prevState.showPassword}))
  }

  onChangeSearchPassword = event => {
    this.setState({searchPassword: event.target.value})
  }

  onClickAddButton = event => {
    event.preventDefault()
    const {websiteInput, usernameInput, passwordInput} = this.state
    const newPassword = {
      id: v4(),
      website: websiteInput,
      username: usernameInput,
      password: passwordInput,
    }

    this.setState(prevState => ({
      passwordsList: [...prevState.passwordsList, newPassword],
      websiteInput: '',
      usernameInput: '',
      passwordInput: '',
    }))
  }

  onChangeWebsiteInput = event => {
    this.setState({websiteInput: event.target.value})
  }

  onChangeUsernameInput = event => {
    this.setState({usernameInput: event.target.value})
  }

  onChangePasswordInput = event => {
    this.setState({passwordInput: event.target.value})
  }

  render() {
    const {
      passwordsList,
      websiteInput,
      usernameInput,
      passwordInput,
      searchPassword,
      showPassword,
    } = this.state

    const searchResults = passwordsList.filter(eachPassword =>
      eachPassword.website.toLowerCase().includes(searchPassword.toLowerCase()),
    )

    return (
      <div className="bg-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/password-manager-logo-img.png"
          alt="app logo"
          className="app-logo"
        />
        <div className="password-manager-container">
          <form
            className="add-password-container"
            onSubmit={this.onClickAddButton}
          >
            <h1 className="heading">Add New Password</h1>
            <div className="input-container">
              <div className="icon-container">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-website-img.png"
                  alt="website"
                  className="icon"
                />
              </div>
              <input
                type="text"
                placeholder="Enter Website"
                onChange={this.onChangeWebsiteInput}
                value={websiteInput}
              />
            </div>

            <div className="input-container">
              <div className="icon-container">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-username-img.png"
                  alt="username"
                  className="icon"
                />
              </div>
              <input
                type="text"
                placeholder="Enter Username"
                onChange={this.onChangeUsernameInput}
                value={usernameInput}
              />
            </div>

            <div className="input-container">
              <div className="icon-container">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-password-img.png"
                  alt="password"
                  className="icon"
                />
              </div>
              <input
                type="password"
                placeholder="Enter Password"
                onChange={this.onChangePasswordInput}
                value={passwordInput}
              />
            </div>

            <div className="button-container">
              <button type="submit" className="add-button">
                Add
              </button>
            </div>
          </form>
          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-lg-img.png"
            alt="password manager"
            className="image"
          />
        </div>

        <div className="password-show-container">
          <div className="header-container">
            <div className="container">
              <h1 className="heading">Your Passwords</h1>
              <div className="span-count">
                <p className="count">{passwordsList.length}</p>
              </div>
            </div>

            <div className="search-container">
              <div className="icon-container">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-search-img.png"
                  alt="search"
                  className="icon"
                />
              </div>
              <input
                type="search"
                placeholder="Search"
                onChange={this.onChangeSearchPassword}
                value={searchPassword}
              />
            </div>
          </div>
          <hr />

          <div className="show-password-container">
            <div className="container">
              <input
                type="checkbox"
                id="showPassword"
                className="check-input"
                onChange={this.onClickShowPassword}
                value={showPassword}
              />
              <label htmlFor="showPassword">Show Passwords</label>
            </div>
          </div>

          {passwordsList.length === 0 ? (
            <div className="no-password-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/no-passwords-img.png"
                alt="no passwords"
                className="image"
              />
              <p className="heading">No Passwords</p>
            </div>
          ) : (
            <ul className="passwords-container">
              {searchResults.map(eachPassword => (
                <PasswordItem
                  key={eachPassword.id}
                  passwordDetails={eachPassword}
                  deletePassword={this.deletePassword}
                  showPassword={showPassword}
                />
              ))}
            </ul>
          )}
        </div>
      </div>
    )
  }
}

export default PasswordManager