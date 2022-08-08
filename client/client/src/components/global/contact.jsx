import PageHeader from "../common/page-header";

const Contact = () => {
  return (
    <>
      <PageHeader
        title="Contact with us"
        description="if you have any questions or a problem, please contact us"
      ></PageHeader>

      <div className="contact mt-5">
        <div className="w-100 text-center">
          <a
            className="contactLink"
            href="mailto:unirexContact@gmail.com"
            target="_blank"
          >
            Click here to send an email to us
            <br />
            unirexcontactt@gmail.com
          </a>
        </div>
      </div>
    </>
  );
};

export default Contact;
