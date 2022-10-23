import buildClient from "../api/build-client";

const Home = ({ currentUser }) => {
  console.log(currentUser)
  return <h1>{currentUser ? "You are Sign In" : "You are not Sign In"}</h1>;
}

Home.getInitialProps = async (context) => {

  const { data } = await buildClient(context).get("/api/users/currentuser");

  // if (typeof window === "undefined") {
  //   const { data } = await axios.get("http://ingress-nginx-controller.ingress-nginx.svc.cluster.local/api/users/currentuser", {
  //     // headers: {
  //     //   Host: "ticketing.dev"
  //     // }
  //     headers: req.headers
  //   });

  //   return data;
  // } else {
  //   const { data } = await axios.get("/api/users/currentuser");
  //   return data;
  // }

  // const response = await axios.get("http://ingress-nginx-controller.ingress-nginx.srv.cluster.local/api/users/currentuser")
  //   .catch(error => {
  //     console.log(error);
  //     return;
  //   }
  //   );
  // console.log(response)
  return data;
};

export default Home;