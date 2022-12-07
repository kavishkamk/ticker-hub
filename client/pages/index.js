const Home = ({ currentUser }) => {
  console.log(currentUser)
  return <h1>{currentUser ? "You are Sign In" : "You are not Sign In"}</h1>;
}

Home.getInitialProps = async (context) => {
  return {};
};

export default Home;