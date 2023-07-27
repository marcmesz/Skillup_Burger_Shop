import { MDBBtn, MDBIcon } from "mdb-react-ui-kit";

const SocialLogin = ({ type }) => {
    return (
        <div className="text-center mb-3">
            <p>Sign {type} with:</p>
            <div
                className="d-flex justify-content-center mx-auto"
            >
                <MDBBtn
                    tag="a"
                    color="none"
                    className="btn btn-secondary btn-floating btn-social mx-2"
                    style={{ color: "#1266f1" }}
                >
                    <MDBIcon fab icon="facebook-f" size="lg" />
                </MDBBtn>
                <MDBBtn
                    tag="a"
                    color="none"
                    className="btn btn-secondary btn-floating btn-social mx-2"
                    style={{ color: "#1266f1" }}
                >
                    <MDBIcon fab icon="twitter" size="lg" />
                </MDBBtn>
                <MDBBtn
                    tag="a"
                    color="none"
                    className="btn btn-secondary btn-floating btn-social mx-2"
                    style={{ color: "#1266f1" }}
                >
                    <MDBIcon fab icon="google" size="lg" />
                </MDBBtn>
                <MDBBtn
                    tag="a"
                    color="none"
                    className="btn btn-secondary btn-floating btn-social mx-2"
                    style={{ color: "#1266f1" }}
                >
                    <MDBIcon fab icon="github" size="lg" />
                </MDBBtn>
            </div>
            <p className="text-center mt-3">or:</p>
        </div>
    )
}

export default SocialLogin