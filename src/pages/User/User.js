import React, { useContext, useEffect, useState } from "react";

import "./User.css";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import ErrorModal from "../../components/Modal/ErrorModal";
import Card from "../../components/Card/Card";
import { useHttpClient } from "../../hooks/http-hook";
import { AuthContext } from "../../context/auth-context";

const User = () => {
  const auth = useContext(AuthContext);
  const userId = auth.userId;
  const [loadedUser, setLoadedUser] = useState();
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const responseData = await sendRequest(
          `http://localhost:5000/api/users/${userId}`
        );
        setLoadedUser(responseData.user);
      } catch (err) {}
    };
    fetchUser();
  },[sendRequest, userId]);

  if (isLoading) {
    return (
      <div className="center">
        <LoadingSpinner />
      </div>
    );
  }

  if (!loadedUser && !error) {
    return (
      <div className="center">
        <Card>
          <h2>Could not find user!</h2>
        </Card>
      </div>
    );
  }

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {!isLoading && loadedUser && <p>{loadedUser.email}</p>}
    </React.Fragment>
  );
};

export default User;
