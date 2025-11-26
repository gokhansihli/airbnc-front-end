import { useState, useContext } from "react";
import "./loginModal.css";
import LoginModal from "./LoginModal";
import UserDrop from "./userDrop";
import ProfileIcon from "../../icons/ProfileIcon";
import outsideClick from "../../utils/outsideClick";
import { AuthContext } from "../../contexts/AuthContext";

export default function Login() {
  const [isModal, setIsModal] = useState(false);
  const [isDrop, setIsDrop] = useState(false);

  const { user, setUser } = useContext(AuthContext);

  const dropRef = outsideClick(() => setIsDrop(false));

  return (
    <div>
      {!user ? (
        <>
          <div
            onClick={() => {
              setIsModal(true);
            }}
          >
            <button className="login-btn">Log in</button>
          </div>

          <LoginModal
            isModal={isModal}
            setIsModal={setIsModal}
            setIsDrop={setIsDrop}
          />
        </>
      ) : (
        <div className="user-section" ref={dropRef}>
          <div
            onClick={() => {
              setIsDrop((current) => !current);
            }}
          >
            <button className="user-btn">
              <ProfileIcon />
            </button>
          </div>

          <UserDrop isDrop={isDrop} setIsDrop={setIsDrop} />
        </div>
      )}
    </div>
  );
}
