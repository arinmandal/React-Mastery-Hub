// import { useState } from "react";
import { useState } from "react";
import Button from "../Button/Button";
import ContactFromStyle from "./Form.module.css";
import { BiMessageDetail } from "react-icons/bi";
import { IoCall } from "react-icons/io5";
import { MdOutlineAttachEmail } from "react-icons/md";
const ContactForm = () => {
  const [name, setName] = useState("Name");
  const [email, setEmail] = useState("Email");
  const [message, setMessage] = useState("Phone");
  function Hello(event) {
    event.preventDefault()
    setName(event.target[0].value);
    setEmail(event.target[1].value);
    setMessage(event.target[2].value);
}
  return (
    <div className={`${ContactFromStyle.ContactSection}`}>
      <section className={`${ContactFromStyle.formSection}`}>
        <section className={`${ContactFromStyle.top_button}`}>
          <Button
            icon={<BiMessageDetail fontSize='20px' />}
            name='VIA SUPPORT CHAT'
          />
          <Button icon={<IoCall fontSize='20px' />} name='VIA CALL' />
        </section>
        <Button
          isOutline={true}
          icon={<MdOutlineAttachEmail fontSize='20px' />}
          name='VIA EMAIL FORM'
        />
        <section className='input'>
          <form onSubmit={Hello} action=''>
            <div className={ContactFromStyle.form_elem}>
              <label htmlFor='Name'>Name</label>
              <input type='text' />
            </div>
            <div className={ContactFromStyle.form_elem}>
              <label htmlFor='Name'>Email</label>
              <input type='text' />
            </div>
            <div className={ContactFromStyle.form_elem}>
              <label htmlFor='Text'>Text</label>
              <textarea type='text'></textarea>
            </div>
            <section
              className='button'
              style={{
                display: "flex",
                justifyContent: "end",
                paddingTop: "5px",
              }}
            >
            
              <Button  type='submit' name='Submit' />
            </section>
            <div>
              {name}<br/>
              {email}<br/>
              {message}<br/>
            </div>
          </form>
        </section>
      </section>
      <section className={`${ContactFromStyle.contact_img}`}>
        <img src='src\assets\Service 24_7-pana 1.svg' alt='' />
      </section>
    </div>
  );
};

export default ContactForm;
