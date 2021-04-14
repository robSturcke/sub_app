import React, { createContext, useState, useEffect } from 'react';
import OneGraphAuth from 'onegraph-auth';

const AuthContext = createContext();

function AuthProvider(props) {
  const [auth, setAuth] = useState(props.auth);
  const [{ status, headers }, setServiceStatus] = useState({
    status: null,
    headers: null,
  });

  useEffect(() => {
    if (!props.auth) {
      const ourAuth = new OneGraphAuth({
        appId: props.appId,
      });

      setAuth(ourAuth);
    }
  }, [props.auth, props.appId]);

  useEffect(() => {
    async function setAsyncServiceStatus() {
      const status = await auth.servicesStatus();
      setServiceStatus({
        headers: auth.authHeaders(),
        status: Object.keys(status).reduce((out, service) => {
          out[service] = status[service].isLoggedIn;
          return out;
        }, {}),
      });
    }

    if (auth) {
      setAsyncServiceStatus();
    }
  }, [auth]);

  const login = (service, callback) => {
    if (auth) {
      auth.login(service).then(() => {
        auth.isLoggedIn(service).then((isLoggedIn) => {
          callback && callback(isLoggedIn);

          setServiceStatus({
            status: {
              ...status,
              [service]: isLoggedIn,
            },
            headers: auth.authHeaders(),
          });
        });
      });
    }
  };

  const logout = (service, callback) => {
    auth.logout(service).then(() => {
      auth.isLoggedIn(service).then((isLoggedIn) => {
        callback && callback(isLoggedIn);

        setServiceStatus({
          status: {
            ...status,
            [service]: isLoggedIn,
          },
          headers: auth.authHeaders(),
        });
      });
    });
  };

  const authInterface = {
    status,
    headers,
    login,
    logout,
    appId: props.appId,
  };

  return (
    <AuthContext.Provider value={authInterface}>
      {props.children}
    </AuthContext.Provider>
  );
}

const AuthConsumer = AuthContext.Consumer;

export { AuthContext, AuthConsumer, AuthProvider };
