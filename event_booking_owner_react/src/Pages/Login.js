import React, { useEffect, useState } from "react";
import axios from "axios";

function Login() {
  axios.defaults.withCredentials = true;

  function switchSignup() {
    const signupswitch = document.getElementById("signup");
    return signupswitch.classList.add("sign-up-mode");
  }

  function switchSignin() {
    const signinswitch = document.getElementById("signup");
    return signinswitch.classList.remove("sign-up-mode");
  }

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
    role: "1",
  });

  const [regData, setRegData] = useState({
    name: "",
    email: "",
    profilePic: "",
    role: "1",
    phoneNo: "",
    address: "",
    experiance: "",
    category: "",
    password: "",
  });

  const [isLoaded, setLoaded] = useState(true);
  const [categories, setCategories] = useState([]);
  const [showTerms, setShowTerms] = useState(false); // State to manage showing terms and conditions

  useEffect(() => {
    async function fetchCategories() {
      try {
        const response = await axios.get("http://localhost:8000/getCategories");
        setCategories(response.data.categories);
      } catch (error) {
        console.log("Fetch Categories Error:", error);
      }
    }

    fetchCategories();
  }, []);

  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();

    setLoaded(false);
    try {
      const response = await axios.post(
        "http://localhost:8000/login",
        loginData
      );

      const { success } = response.data;
      localStorage.setItem(
        "data",
        JSON.stringify(response.data.userData.session)
      );

      if (success) {
        window.location.reload(false);
        setLoaded(true);
      }
    } catch (error) {
      console.log("Login Err: ", error);
      setLoaded(true);
      if (error.response && error.response.status === 401) {
        alert(error.response.data.message);
      } else {
        alert("Error: Failed to connect to server");
      }
    }
  };

  const handleRegistrationChange = (e) => {
    const { name, value } = e.target;

    setRegData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  //getting profilePic
  const handleFileChange = (e) => {
    //storing profilePic
    setRegData((formData) => ({
      ...formData,
      profilePic: e.target.files[0],
    }));
  };

  const handleRegistrationSubmit = async (e) => {
    e.preventDefault();

    // console.log(regData);
    try {
      const data = new FormData();
      for (const key in regData) {
        data.append(key, regData[key]);
      }

      await axios.post("http://localhost:8000/register", data);
      switchSignin();
    } catch (error) {
      console.log("Reg Error:", error);
      if (error.response && error.response.status === 400) {
        alert(error.response.data.message);
      } else {
        alert("Error: Failed to connect to server");
      }
    }
  };

  const handleCheckboxChange = () => {
    setShowTerms(!showTerms); // Toggle the state to show/hide terms and conditions
  };

  return (
    <>
      {isLoaded ? (
        <div id="signup" className="container">
          <div className="forms-container">
            <div className="signin-signup">
              <form onSubmit={handleLoginSubmit} className="sign-in-form">
                <h2 className="title">Sign in</h2>
                <div className="input-field">
                  <i className="fas fa-user" />
                  <input
                    type="text"
                    placeholder="Username"
                    name="email"
                    value={loginData.email}
                    onChange={handleLoginChange}
                    required
                  />
                </div>
                <div className="input-field">
                  <i className="fas fa-lock" />
                  <input
                    type="password"
                    placeholder="Password"
                    name="password"
                    value={loginData.password}
                    onChange={handleLoginChange}
                    required
                  />
                </div>
                <button type="submit" className="btn btn-primary">
                  Login
                </button>
              </form>
              <form
                encType="multipart/form-data"
                onSubmit={handleRegistrationSubmit}
                className="sign-up-form"
              >
                <h2 className="title">Sign up</h2>
                <div className="input-field">
                  <i className="fa fa-user" />
                  <input
                    type="text"
                    name="name"
                    value={regData.name}
                    onChange={handleRegistrationChange}
                    placeholder="Name"
                    required
                  />
                </div>
                <div className="input-field">
                  <i className="fa fa-envelope"></i>
                  <input
                    type="email"
                    name="email"
                    value={regData.email}
                    onChange={handleRegistrationChange}
                    placeholder="Email"
                    required
                  />
                </div>
                <div className="input-field">
                  <i className="fa fa-phone" />
                  <input
                    type="phone"
                    name="phoneNo"
                    value={regData.phoneNo}
                    onChange={handleRegistrationChange}
                    placeholder="Phone No"
                    required
                  />
                </div>
                <div className="input-field">
                  <i class="fa-solid fa-address-card" />
                  <input
                    type="file"
                    name="profilePic"
                    onChange={handleFileChange}
                    accept="image/*"
                    required
                    style={{ marginTop: "15px" }}
                  />
                </div>
                <div className="input-field">
                  <i className="fa-solid fa-location-dot" />
                  <textarea
                    type="address"
                    name="address"
                    value={regData.address}
                    onChange={handleRegistrationChange}
                    rows="2"
                    placeholder="Address"
                    required
                  />
                </div>
                <div className="input-field">
                  <i className="fa fa-star" />
                  <input
                    type="number"
                    name="experiance"
                    value={regData.experiance}
                    onChange={handleRegistrationChange}
                    placeholder="Experience in Year"
                    required
                  />
                </div>
                <div className="input-field">
                  <i className="fa fa-star" />
                  <select
                    name="category"
                    id="category"
                    required
                    value={regData.category}
                    onChange={handleRegistrationChange}
                  >
                    <option value="">Select Category</option>
                    {categories.map((category) => (
                      <option key={category._id} value={category.category}>
                        {category.category}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="input-field">
                  <i className="fa fa-lock" />
                  <input
                    type="password"
                    name="password"
                    value={regData.password}
                    onChange={handleRegistrationChange}
                    placeholder="Password"
                    required
                  />
                </div>
                <br />
                <div>
                  <h6 className="s-t">Terms & Conditions</h6>
                  <input
                  required
                    type="checkbox"
                    id="show-terms-checkbox"
                    onChange={handleCheckboxChange}
                    checked={showTerms}
                  ></input>
                  <label htmlFor="show-terms-checkbox">
                    I agree to the terms and conditions
                  </label>
                  {showTerms && (
                    <p className="rules-text">
                      By participating in events hosted on our website, you agree
                      to the following terms and conditions: Artists retain full
                      ownership and rights to their submitted artworks. However,
                      upon sale of an artwork during an event, the owner of this
                      website will retain a profit margin of 25% of the final
                      sale price. This profit margin covers operational costs
                      and supports the growth of our platform. Artists will
                      receive payments for sold artworks, with the owner's
                      profit margin deducted, within a reasonable timeframe
                      post-event. We strive to ensure transparency and fairness
                      in all transactions.
                    </p>
                  )}
                </div>

                <button type="submit" className="btn btn-primary">
                  Sign up
                </button>
              </form>
            </div>
          </div>
          <div className="panels-container">
            <div className="panel left-panel">
              <div className="content">
                <h3>New here ?</h3>
                <button
                  onClick={switchSignup}
                  className="btn transparent"
                  id="sign-up-btn"
                >
                  Sign up
                </button>
              </div>

              <img
                src="/images/auth/login-bg.jpg"
                alt="logo"
                className="image"
                style={{ width: "100%" }}
              />
            </div>
            <div className="panel right-panel">
              <div className="content">
                <h3>One of us ?</h3>
                <button
                  onClick={switchSignin}
                  className="btn transparent"
                  id="sign-in-btn"
                >
                  Sign in
                </button>
              </div>
              <img
                src="/images/auth/login-bg.jpg"
                alt="logo"
                className="image"
                style={{ width: "100%" }}
              />
            </div>
          </div>
        </div>
      ) : (
        <h3 className="text-center">Please Wait...</h3>
      )}
    </>
  );
}

export default Login;
