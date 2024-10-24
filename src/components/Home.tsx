import { Link } from "react-router-dom"

const Home = () => {
  return (
    <div className="min-h-screen ">

      {/* Hero Section */}
      <section className="hero min-h-[80vh]">
        <div className="hero-content text-center">
          <div className="max-w-lg">
            <h1 className="text-5xl font-bold text-primary">
              Welcome to DevMatch
            </h1>
            <p className="py-6 text-lg text-base-content">
              A platform that connects developers with complementary skills. Find your perfect coding match and work on projects together.
            </p>
            <Link to="/login" className="btn btn-primary mx-2">
              Login
            </Link>
            <Link to="/signup" className="btn btn-primary mx-2">
              Signup
            </Link>
          </div>
        </div>
      </section>
      </div>
        )
}

export default Home