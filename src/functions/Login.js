

export const roleBasedRedirect = (res) => {
  let intended = history.location.state;
  if (intended) {
    history.push(intended.from);
  } else {
    if (res.data.role === "admin") {
      history.push("/admin/dashboard");
    } else {
      history.push("/property");
    }
  }
};


export const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);
  try {
    const result = await auth.signInWithEmailAndPassword(email, password);
    const { user } = result;
    const idTokenResult = await user.getIdTokenResult();

    currentUser(idTokenResult.token)
      .then((res) => {
        dispatch({
          type: "LOGGED_IN_USER",
          payload: {
            name: res.data.name,
            email: res.data.email,
            token: idTokenResult.token,
            propertys: res.data.property,
            role: res.data.role,
            _id: res.data._id,
          },
        });
        roleBasedRedirect(res);
      })
      .catch((err) => console.log(err));
  } catch (error) {
    toast.error(error.message);
    setLoading(false);
  }
};

export const googleLogin = async () => {
  let dispatch = useDispatch();
  auth
    .signInWithPopup(googleAuthProvider)
    .then(async (result) => {
      const { user } = result;
      const idTokenResult = await user.getIdTokenResult();
      createOrUpdateUser(idTokenResult.token)
        .then((res) => {
          dispatch({
            type: "LOGGED_IN_USER",
            payload: {
              name: res.data.name,
              email: res.data.email,
              token: idTokenResult.token,
              role: res.data.role,
              propertys: res.data.property,
              _id: res.data._id,
            },
          });
          roleBasedRedirect(res);
        })
        .catch((err) => console.log(err));
    })
    .catch((err) => {
      console.log(err);
      toast.error(err.message);
    });
};

export const loginForm = () => (
  <form onSubmit={handleSubmit}>
    <div className="form-group">
      <input
        type="email"
        className="form-control"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Your email"
        autoFocus
      />
    </div>

    <div className="form-group">
      <input
        type="password"
        className="form-control"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Your password"
      />
    </div>
    <br />
    <Button
      onClick={handleSubmit}
      type="primary"
      className="mb-3"
      block
      shape="round"
      icon={<MailOutlined />}
      size="large"
      disabled={!email || password.length < 6}
    >
      Login with Email/Password
    </Button>
  </form>
);