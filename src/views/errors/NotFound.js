import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet'

const NotFound = () => {
  return (
    <>
      <Helmet>
        <title>404 - Page Not Found.</title>
      </Helmet>
      <div className="d-flex align-items-center justify-content-center flex-column">
        <img className="img-fluid" src="/page-not-found.svg" alt="page-not-found" />
        <div className="d-flex align-items-center justify-content-center flex-column mt-3">
          <h1 className="mb-3 fw-bold">Page not found</h1>
          <Link to="/" className="btn btn-primary text-center fw-bold">Go back to Home page</Link>
        </div>
      </div>
    </>
  )
}

export default NotFound
