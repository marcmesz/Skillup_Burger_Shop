import { MDBBtn, MDBIcon } from "mdb-react-ui-kit";

const SocialLogin = ({ type }) => {
    return (
        <div className="text-center mb-3">
            <p>Sign {type} with:</p>
            <div
                className="d-flex justify-content-between mx-auto"
                style={{ width: "40%" }}
            >
                <MDBBtn
                    tag="a"
                    color="none"
                    className="m-1"
                    style={{ color: "#1266f1" }}
                >
                    <MDBIcon fab icon="facebook-f" size="sm" />
                </MDBBtn>
                <MDBBtn
                    tag="a"
                    color="none"
                    className="m-1"
                    style={{ color: "#1266f1" }}
                >
                    <MDBIcon fab icon="twitter" size="sm" />
                </MDBBtn>
                <MDBBtn
                    tag="a"
                    color="none"
                    className="m-1"
                    style={{ color: "#1266f1" }}
                >
                    <MDBIcon fab icon="google" size="sm" />
                </MDBBtn>
                <MDBBtn
                    tag="a"
                    color="none"
                    className="m-1"
                    style={{ color: "#1266f1" }}
                >
                    <MDBIcon fab icon="github" size="sm" />
                </MDBBtn>
            </div>
            <p className="text-center mt-3">or:</p>
        </div>
    )
}

export default SocialLogin