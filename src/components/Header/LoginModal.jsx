import { useState, useContext } from "react";
import Modal from "../Search-Filter/Filter/Modal";
import { AuthContext } from "../../contexts/AuthContext";
import { login, signup } from "../../utils/api";
import "./loginModal.css";
import CloseButtonIcon from "../../icons/CloseButtonIcon";

export default function LoginModal({ isModal, setIsModal, setIsDrop }) {
  const [isSignup, setIsSignup] = useState(false);
  const [isHost, setIsHost] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { user, setUser } = useContext(AuthContext);

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const signupData = {
        first_name: firstName,
        surname: surname,
        email: email,
        is_host: isHost,
        password: password,
      };
      const userData = await signup(signupData);
      setUser(userData);
      setIsModal(false);
      setIsDrop(false);
    } catch (error) {
      console.log("Signup error:", error);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const userData = await login({ email: email, password: password });
      setUser(userData);
      setIsModal(false);
      setIsDrop(false);
    } catch (error) {
      console.log("Login error:", error);
    }
  };

  const EmailInput = (
    <>
      <h2>Email</h2>
      <input
        type="email"
        value={email}
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
      />
    </>
  );

  const PasswordInput = (
    <>
      <h2>Password</h2>
      <input
        type="password"
        value={password}
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      />
    </>
  );

  const closeModal = () => {
    setIsModal(false);
    setIsSignup(false);
    setEmail("");
    setPassword("");
    setFirstName("");
    setSurname("");
    setIsHost(false);
  };

  const switchSignup = () => {
    setIsSignup(true);
    setEmail("");
    setPassword("");
  };

  return (
    <div>
      {isModal && (
        <Modal onClick={closeModal}>
          <div className="auth-header">
            <div>{!isSignup ? "Login" : "Signup"}</div>
            <div className="close-btn" onClick={() => setIsModal(false)}>
              <CloseButtonIcon />
            </div>
          </div>
          <form
            className="auth-form"
            onSubmit={isSignup ? handleSignup : handleLogin}
          >
            {!isSignup && (
              <>
                <div className="form-group">
                  {EmailInput}
                  {PasswordInput}
                  <button type="submit" className="submit-btn">
                    Login
                  </button>
                  <div className="or-divider">
                    <span>Or</span>
                  </div>
                </div>
                <div className="signup-option">
                  <a href="#" onClick={switchSignup}>
                    Sign Up
                  </a>
                </div>
              </>
            )}
            {isSignup && (
              <>
                <div className="form-group">
                  <h2>Name</h2>
                  <div className="name-inputs">
                    <input
                      type="text"
                      value={firstName}
                      placeholder="First name"
                      onChange={(e) => setFirstName(e.target.value)}
                    />
                    <input
                      type="text"
                      value={surname}
                      placeholder="Surname"
                      onChange={(e) => setSurname(e.target.value)}
                    />
                  </div>

                  {EmailInput}
                  {PasswordInput}
                  <h2>Account Type</h2>
                  <section
                    className={`section ${isHost === "Host" ? "active" : ""}`}
                  >
                    <button
                      type="button"
                      className={!isHost ? "active" : ""}
                      onClick={() => setIsHost(false)}
                    >
                      Guest
                    </button>
                    <button
                      type="button"
                      className={isHost ? "active" : ""}
                      onClick={() => setIsHost(true)}
                    >
                      Host
                    </button>
                  </section>
                  <button type="submit" className="submit-btn">
                    Sign up
                  </button>
                  <div className="or-divider">
                    <span>Or</span>
                  </div>
                </div>
                <div className="signup-option">
                  <a href="#" onClick={() => setIsSignup(false)}>
                    Back to Login
                  </a>
                </div>
              </>
            )}
          </form>
        </Modal>
      )}
    </div>
  );
}
