import React from 'react';
import { MDBFooter, MDBContainer, MDBIcon } from 'mdb-react-ui-kit';

import './Footer.scss';

export function Footer() {
  return (
    <MDBFooter className="text-center text-white footer">
      <MDBContainer className="pb-2 pt-3 pb-0">
        <div className="footer__content d-flex justify-content-between">
          <div className="footer__content-rs">
            <a href="https://rs.school/react/" target="_blank" rel="noreferrer" className="rs-logo">
              Link
            </a>
          </div>
          <div className="footer__content-github d-flex">
            <a
              className="m-1 github-logo"
              href="https://github.com/Alexej-Ilyutik"
              target="_blank"
              rel="noreferrer"
              data-title="Alexej"
              role="button"
            >
              <MDBIcon fab icon="github" size="2x" />
            </a>
            <a
              className="m-1 github-logo"
              href="https://github.com/NewAnton"
              target="_blank"
              rel="noreferrer"
              data-title="Anton"
              role="button"
            >
              <MDBIcon fab icon="github" size="2x" />
            </a>
            <a
              className="m-1 github-logo"
              href="https://github.com/EJ252"
              target="_blank"
              rel="noreferrer"
              data-title="Vadzim"
              role="button"
            >
              <MDBIcon fab icon="github" size="2x" />
            </a>
          </div>
        </div>
      </MDBContainer>

      <div className="text-center p-2" style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>
        © 2022
      </div>
    </MDBFooter>
  );
}
