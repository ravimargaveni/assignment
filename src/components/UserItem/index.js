import "./index.css";
import { AiOutlineDelete } from "react-icons/ai";
import { FiEdit } from "react-icons/fi";

const UserItem = (props) => {
  const { userDetails, deleteUser, checkBoxChange } = props;
  const { id, name, email, role, isChecked } = userDetails;

  const onDeleteUser = () => {
    deleteUser(id);
  };
  const onChangeCheckBox = () => {
    checkBoxChange(id);
  };

  return (
    <div>
      <li className="user-item">
        <div className="input-container">
          <input
            type="checkbox"
            checked={isChecked}
            className="input"
            onChange={onChangeCheckBox}
          />
        </div>
        <p className="name">{name}</p>
        <p className="email">{email}</p>
        <p className="role">{role}</p>
        <div className="action-container">
          <FiEdit />
          <AiOutlineDelete onClick={onDeleteUser} />
        </div>
      </li>
      <hr />
    </div>
  );
};

export default UserItem;
