const Footer = () => {
  return (

    <footer className="d-flex flex-wrap justify-content-between align-items-center py-0 mt-5 border-top">
      <div className="col-md-4 d-flex align-items-center">
        <a
          href="/"
          className="mb-3 me-2 mb-md-0 text-muted text-decoration-none lh-1"
        >
          <img
            className="footer-img d-inline"
            src="images/footer.png"
            alt="logo"
          />
        </a>
        <span className="text-muted">{new Date().getFullYear()} &copy;</span>
      </div>

      <div>
        <a
          className="contactLink"
          href="mailto:unirexContact@gmail.com"
          target="_blank"
        >
          <i className="bi bi-envelope"></i> send email
        </a>
      </div>

      <ul className="nav col-md-4 justify-content-end list-unstyled d-flex me-3">
        <li className="ms-3">
          <a className="text-info" target="_blank" href="https://twitter.com/">
            <i className="bi bi-twitter"></i>
          </a>
        </li>
        <li className="ms-3">
          <a
            className="text-danger"
            target="_blank"
            href="https://www.instagram.com/"
          >
            <i className="bi bi-instagram"></i>
          </a>
        </li>
        <li className="ms-3">
          <a
            className="text-primary"
            target="_blank"
            href="https://www.facebook.com/"
          >
            <i className="bi bi-facebook"></i>
          </a>
        </li>
      </ul>
    </footer>
  );
};

export default Footer;
