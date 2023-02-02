import React from "react";
import { Login } from "widgets";
import { Registration } from "widgets";
import { useNavigate } from "react-router-dom";

const Index: React.FC = () => {
  const navigate = useNavigate();
  const [auth, setAuth] = React.useState<boolean>(true);

  React.useEffect(() => {
    auth ? navigate('/login') : navigate('/registration')
  }, [auth, navigate])

  return (
    auth ? <Login setAuth={setAuth} /> : <Registration setAuth={setAuth}/>
  );
};

export default Index;