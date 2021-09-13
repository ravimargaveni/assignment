import { Component } from "react";

import UserItem from "../UserItem";

import "./index.css";

class Admin extends Component {
  state = {
    userList: [],
    searchInput: "",
  };

  deleteUser = (id) => {
    const { userList } = this.state;
    const updatedUserList = userList.filter((eachuser) => eachuser.id !== id);

    this.setState({
      userList: updatedUserList,
    });
  };
  componentDidMount = () => {
    this.getUserList();
  };

  getUserList = async () => {
    const url =
      " https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json";
    const options = {
      method: "GET",
    };
    const responce = await fetch(url, options);
    const userList = await responce.json();
    for (let x of userList) {
      x["isChecked"] = false;
    }

    this.setState({ userList: userList });
  };

  onChangeSearchInput = (event) => {
    this.setState({ searchInput: event.target.value });
  };

  changeAllStatus = () => {
    this.setState((prevState) => ({
      userList: prevState.userList.map((eachUser) => {
        return { ...eachUser, isChecked: !eachUser.isChecked };
      }),
    }));
  };

  userListHeader = () => (
    <div className="user-list-container">
      <div className="userlist-header">
        <div className="input-container">
          <input type="checkbox" onChange={this.changeAllStatus} />
        </div>
        <h1 className="name">Name</h1>
        <h1 className="email">Email</h1>
        <h1 className="role">Role</h1>
        <h1 className="actions">Actions</h1>
      </div>
      <hr />
    </div>
  );
  checkBoxChange = (id) => {
    this.setState((prevState) => ({
      userList: prevState.userList.map((eachUser) => {
        if (id === eachUser.id) {
          const checkBoxStatus = !eachUser.isChecked;
          return { ...eachUser, isChecked: checkBoxStatus };
        }
        return eachUser;
      }),
    }));
  };

  updatedUserlist = () => {
    const { userList } = this.state;
    const updatedList = userList.filter(
      (eachUser) => eachUser.isChecked !== true
    );
    this.setState({ userList: updatedList });
  };

  render() {
    const { userList, searchInput } = this.state;
    console.log(userList);
    const searchResults = userList.filter((eachUser) =>
      eachUser.name.toLowerCase().includes(searchInput.toLowerCase())
    );
    return (
      <div className="app-container">
        <div className="search-input-container">
          <input
            type="search"
            className="search-input"
            placeholder="Search"
            value={searchInput}
            onChange={this.onChangeSearchInput}
          />
          <img
            src="https://assets.ccbp.in/frontend/react-js/destinations-search-icon-img.png"
            alt="search icon"
            className="search-icon"
          />
        </div>
        <div className="user-container">
          {this.userListHeader()}

          <ul className="user-list">
            {searchResults.map((eachUser) => (
              <UserItem
                key={eachUser.id}
                userDetails={eachUser}
                deleteUser={this.deleteUser}
                checkBoxChange={this.checkBoxChange}
              />
            ))}
          </ul>
        </div>

        <button className="delete-button" onClick={this.updatedUserlist}>
          Delete Selected
        </button>
      </div>
    );
  }
}

export default Admin;
