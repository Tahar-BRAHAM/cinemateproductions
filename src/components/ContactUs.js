import React, { useState } from "react";
import "../styles/ContactUs.css";

const ContactUs = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      name,
      email,
      message,
    };

    try {
      const response = await fetch("/api/contact/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const result = await response.json();
      console.log(result);
      if (result.success) {
        setStatus("SUCCESS");
        setName("");
        setEmail("");
        setMessage("");
      } else {
        setStatus("FAILED");
      }
    } catch (error) {
      console.error("Error sending email:", error);
      setStatus("FAILED");
    }
  };

  return (
    <div className="contact-us-container">
      <div className="contact-us-content">
        <h3 className="contact-us-title">CONTACT US</h3>
        {status === "SUCCESS" && (
          <p className="success">Message sent successfully!</p>
        )}
        {status === "FAILED" && (
          <p className="error">
            Failed to send message. Please try again later.
          </p>
        )}
        <form onSubmit={handleSubmit}>
          <div className="form-group-row">
            <div className="form-group">
              <label htmlFor="name">Name:</label>
              <input
                type="text"
                id="name"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="message">Message:</label>
            <textarea
              id="message"
              placeholder="Wanna work together? Contact us.."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
            ></textarea>
          </div>
          <button type="submit" className="submit-button">
            Submit
          </button>
        </form>

        <div className="contact-info">
          <p>
            <span className="icon email-icon"></span>Email:{" "}
            <a href="mailto:info@cinemate-productions.com">
              info@cinemate-productions.com
            </a>
          </p>
          <p>
            <span className="icon phone-icon"></span>Phone Number:{" "}
            <a href="tel:+4917669624139">+4917669624139</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
