import Link from "next/link";

const Home = () => {
  return(
    <div>
      <Link className="btn btn-primary" href="/auth/login">Login</Link>
      <Link className="btn btn-danger" href="/auth/signup">Sign Up</Link>
    </div>
  )
};

export default Home;
