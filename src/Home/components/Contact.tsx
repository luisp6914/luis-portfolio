import { useState } from "react";
import emailjs from "@emailjs/browser";

const Contact = () => {
    // Define the initial state
    const initialState = {
        name: "",
        email: "",
        subject: "",
        message: "",
    };

    // Use state for form data
    const [formData, setFormData] = useState(initialState);

    // Handle input changes
    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Handle form submission
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        emailjs
            .send(
                "service_l62yzzn",
                "template_qv46iaq",
                formData,
                "MYxNqyMrIQYxGJjSk"
            )
            .then((response) => {
                console.log("SUCCESS!", response.status, response.text);
                alert("Your message has been sent successfully!");
                setFormData(initialState); // Reset form data to initial state
            })
            .catch((err) => {
                console.log("FAILED...", err);
                alert("Failed to send the message, please try again.");
            });
    };

    return (
        <div className="container contact rounded">
            <div className="connectMe">
                <h2>Connect</h2>
                <p>Hello!</p>
                <p>
                    Thank you for visiting my portfolio. If you have any questions about
                    my skills or experience, or if you are interested in discussing
                    potential collaboration opportunities, I would love to hear from you.
                </p>
                <p>
                    Please don't hesitate to reach out—I am open to new projects and eager
                    to work with you to achieve your goals. Feel free to contact me using
                    the form and I'll get back to you as soon as possible.
                </p>
                <p>Looking forward to connecting with you!</p>
                <p>Best regards,</p>
                <p>Luis Perez</p>
            </div>

            <div className="messageMe">
                <h2>Message Me</h2>
                <form onSubmit={handleSubmit} className="formBox">
                    {/*Name label*/}
                    <div className="form-floating">
                        <input
                            type="text"
                            className="form-control"
                            id="name"
                            placeholder="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                        <label htmlFor="name">Name</label>
                    </div>
                    {/*email*/}
                    <div className="form-floating">
                        <input
                            type="email"
                            className="form-control"
                            id="email"
                            placeholder="name@example.com"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                        <label htmlFor="email">Email</label>
                    </div>
                    {/*Subject*/}
                    <div className="form-floating">
                        <input
                            type="text"
                            className="form-control"
                            id="subject"
                            placeholder="subject"
                            name="subject"
                            value={formData.subject}
                            onChange={handleChange}
                            required
                        />
                        <label htmlFor="subject">Subject</label>
                    </div>
                    {/*Message*/}
                    <div className="form-floating">
                        <textarea
                            className="form-control"
                            id="message"
                            name="message"
                            placeholder="message"
                            style={{ height: "200px" }}
                            rows={10}
                            value={formData.message}
                            onChange={handleChange}
                            required
                        ></textarea>
                        <label htmlFor="message">Message</label>
                    </div>

                    <button type="submit" className="btn btn-primary">
                        Submit
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Contact;