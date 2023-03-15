import React from 'react'
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import Header from '../../components/header/Header';

const Contact = () => {
  return (
    <Header>
      <section className="mb-4">
        <h2 className="h1-responsive font-weight-bold text-center my-4">
          Contact us
        </h2>

        <p class="text-center w-responsive mx-auto mb-5">
          Do you have any questions? Please do not hesitate to contact us
          directly. Our team will reach out to you within a matter of hours to
          help.
        </p>

        <div className="row">
          <div className="col-md-9 mb-md-0 mb-5">
            <form>
              <div className="row">
                <div className="col-md-6">
                  <div className="md-form mb-0">
                    <input
                      type="text"
                      id="name"
                      name="name"
                      className="form-control"
                    />
                    <label htmlFor="name" className="">
                      Your name
                    </label>
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="md-form mb-0">
                    <input
                      type="text"
                      id="email"
                      name="email"
                      className="form-control"
                    />
                    <label htmlFor="email" className="">
                      Your email
                    </label>
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-md-12">
                  <div className="md-form mb-0">
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      className="form-control"
                    />
                    <label htmlFor="subject" className="">
                      Subject
                    </label>
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-md-12">
                  <div className="md-form">
                    <textarea
                      type="text"
                      id="message"
                      name="message"
                      rows="2"
                      className="form-control md-textarea"
                    ></textarea>
                    <label htmlFor="message">Your message</label>
                  </div>
                </div>
              </div>
            </form>

            <div className="text-center text-md-left">
              <a
                className="btn btn-primary"
                onclick="document.getElementById('contact-form').submit();"
              >
                Send
              </a>
            </div>
            <div className="status"></div>
          </div>

          <div className="col-md-3 text-center">
            <ul className="list-unstyled mb-0">
              <li>
                <i className="fas fa-map-marker-alt fa-2x"></i>
                <p>Wood Grove, Westlands, Nairobi, Kenya</p>
              </li>

              <li>
                <i className="fas fa-phone mt-4 fa-2x"></i>
                <p>+254 567 8905</p>
              </li>

              <li>
                <i className="fas fa-envelope mt-4 fa-2x"></i>
                <EmailOutlinedIcon />
                <p>info@estore.co.ke</p>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </Header>
  );
}

export default Contact
