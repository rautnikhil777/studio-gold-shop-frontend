import { useNavigate } from "react-router-dom";

const Offers = () => {
  const navigate = useNavigate();

  return (
    <div className="container py-5">
      {/* Offer Banner */}
      <div className="row justify-content-center mb-4">
        <div className="col-md-8">
          <div className="alert alert-success text-center shadow-lg" role="alert">
            <h2 className="mb-2">🎉 Advance Order Par Special Discount! 🎉</h2>
            <p className="lead mb-1">
              Agar aap ek din pehle apna cake order karte hain,
              <b className="text-primary"> to aapko milega seedha 10% discount!</b>
            </p>
            <p className="mb-0 text-muted">
              Jaldi karein — yeh offer limited time ke liye hai!
            </p>
          </div>
        </div>
      </div>

      {/* Offer Details Card */}
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card border-primary shadow-sm">
            <div className="card-body">
              <h4 className="card-title text-primary mb-3">Kaise Paayein 10% Discount?</h4>
              <ul className="list-group list-group-flush mb-3">
                <li className="list-group-item">
                  1. Cake kam se kam ek din advance me order karein.
                </li>
                <li className="list-group-item">
                  2. Checkout par discount automatic apply ho jayega.
                </li>
                <li className="list-group-item">
                  3. Yeh offer custom cakes aur special orders par bhi valid hai!
                </li>
              </ul>
              <div className="alert alert-info mt-2" role="alert">
                Aaj hi order karein — party aur celebrations ke liye perfect cakes, ab extra savings ke saath!
              </div>
              <button
                className="btn btn-primary w-100 mt-3"
                onClick={() => navigate("/")}
              >
                Order Karein & Save 10%
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Offers;
