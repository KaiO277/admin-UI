import React from 'react'
import './Home.scss'

function Home() {
  return (
    <div className='container'>
      <div className="row g-4 mb-4">
      {/* Card 1 */}
      <div className="col-xxl-3 col-xl-4 col-sm-6">
        <div className="card bg-primary text-white">
          <div className="card-body pb-0 d-flex justify-content-between align-items-start">
            <div>
              <div className="fs-4 fw-semibold">26K</div>
              <div>Users</div>
            </div>
          </div>
        </div>
      </div>

      {/* Card 2 */}
      <div className="col-xxl-3 col-xl-4 col-sm-6">
        <div className="card bg-info text-white">
          <div className="card-body pb-0 d-flex justify-content-between align-items-start">
            <div>
              <div className="fs-4 fw-semibold">$6.200</div>
              <div>Income</div>
            </div>
          </div>
        </div>
      </div>

      {/* Card 3 */}
      <div className="col-xxl-3 col-xl-4 col-sm-6">
        <div className="card bg-warning text-white">
          <div className="card-body pb-0 d-flex justify-content-between align-items-start">
            <div>
              <div className="fs-4 fw-semibold">2.49%</div>
              <div>Conversion Rate</div>
            </div>
          </div>
        </div>
      </div>

      {/* Card 4 */}
      <div className="col-xxl-3 col-xl-4 col-sm-6">
        <div className="card bg-danger text-white">
          <div className="card-body pb-0 d-flex justify-content-between align-items-start">
            <div>
              <div className="fs-4 fw-semibold">3.200</div>
              <div>Revenue</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  )
}

export default Home
