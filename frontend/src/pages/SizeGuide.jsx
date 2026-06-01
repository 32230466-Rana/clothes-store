import Footer from "../components/Footer";

function SizeGuide() {
  return (
    <div className="size-guide-page care-page">
      <section className="page-section">
        <div className="container">
          <div className="page-box care-box size-guide-page-box">
            <p className="care-kicker">Fit Check</p>

            <h1 className="size-guide-title">Size Guide</h1>

            <p className="care-intro">
              Compare your measurements before placing an order.
            </p>

            <div className="table-responsive size-guide-table-wrap">
              <table className="table table-bordered table-striped table-sm align-middle text-center mb-0 size-guide-table">
                <thead>
                  <tr>
                    <th scope="col">Size</th>
                    <th scope="col">Chest</th>
                    <th scope="col">Waist</th>
                    <th scope="col">Hip</th>
                  </tr>
                </thead>

                <tbody>
                  <tr>
                    <td>S</td>
                    <td>84 - 88 cm</td>
                    <td>66 - 70 cm</td>
                    <td>90 - 94 cm</td>
                  </tr>

                  <tr>
                    <td>M</td>
                    <td>89 - 93 cm</td>
                    <td>71 - 75 cm</td>
                    <td>95 - 99 cm</td>
                  </tr>

                  <tr>
                    <td>L</td>
                    <td>94 - 98 cm</td>
                    <td>76 - 80 cm</td>
                    <td>100 - 104 cm</td>
                  </tr>

                  <tr>
                    <td>XL</td>
                    <td>99 - 103 cm</td>
                    <td>81 - 85 cm</td>
                    <td>105 - 109 cm</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="row g-3 care-card-row">
              <div className="col-12 col-sm-4">
                <div className="care-mini-card h-100">
                  <span>1</span>
                  <h3>Measure</h3>
                  <p>Use a soft tape around chest, waist, and hip.</p>
                </div>
              </div>

              <div className="col-12 col-sm-4">
                <div className="care-mini-card h-100">
                  <span>2</span>
                  <h3>Compare</h3>
                  <p>Choose the closest size from the table above.</p>
                </div>
              </div>

              <div className="col-12 col-sm-4">
                <div className="care-mini-card h-100">
                  <span>3</span>
                  <h3>Ask</h3>
                  <p>Contact support when you are between two sizes.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default SizeGuide;
