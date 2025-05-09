import React, { useState } from "react";
import { motion } from "framer-motion";
import FormInput from "../UI/FormInput";
import Button from "../UI/Button";
import "./ContactForm.css";

const ContactForm = () => {
  const [errors, setErrors] = useState({});

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    const error = validateField(name, value);
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const validateForm = (data) => {
    const newErrors = {};
  
    if (!data.name.trim()) {
      newErrors.name = "Name is required";
    }
  
    if (!data.email.trim()) {
      newErrors.email = "Email is required";
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(data.email)) {
        newErrors.email = "Invalid email format";
      }
    }
  
    if (!data.subject.trim()) {
      newErrors.subject = "Subject is required";
    }
  
    // Message is optional, no error needed
  
    return newErrors;
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
  
    const formErrors = validateForm(formData);
  
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }
  
    setErrors({});
    setIsSubmitting(true);
  
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
  
      setTimeout(() => {
        setIsSubmitted(false);
        setFormData({
          name: "",
          email: "",
          subject: "",
          message: "",
        });
      }, 3000);
    }, 1500);
  };
  

  const formVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
      className="contact-form-container"
    >
      {isSubmitted ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="success-message"
        >
          <div className="success-icon">
            <svg
              className="checkmark"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h3 className="success-title">Thank you!</h3>
          <p className="success-text">
            Your message has been sent successfully. We'll get back to you shortly.
          </p>
        </motion.div>
      ) : (
        <motion.form
          variants={formVariants}
          initial="hidden"
          animate="visible"
          onSubmit={handleSubmit}
          className="contact-form"
        >
          <motion.div variants={itemVariants}>
            <FormInput
              label="Your name"
              id="name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              
              error={errors.name}
              placeholder="Enter your name"
            />
            {errors.name && <p className="error-message">{errors.name}</p>}
          </motion.div>

          <motion.div variants={itemVariants}>
            <FormInput
              label="Your email"
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              
              error={errors.email}
              placeholder="Enter your email"
            />
            {errors.email && <p className="error-message">{errors.email}</p>}
          </motion.div>

          <motion.div variants={itemVariants}>
            <FormInput
              label="Subject"
              id="subject"
              name="subject"
              type="text"
              value={formData.subject}
              onChange={handleChange}
              
              placeholder="Enter subject"
            />
            {errors.subject && <p className="error-message">{errors.subject}</p>}
          </motion.div>

          <motion.div variants={itemVariants} className="textarea-container">
            <label htmlFor="message" className="textarea-label">
              Your message (optional)
            </label>
            <textarea
              id="message"
              name="message"
              rows={4}
              value={formData.message}
              onChange={handleChange}
              className="textarea-field"
              placeholder="Enter your message"
            />
          </motion.div>

          <motion.div variants={itemVariants} className="form-button-container">
            <Button className="contact-submit-button" type="submit" isLoading={isSubmitting} fullWidth>
              Submit
            </Button>
          </motion.div>
        </motion.form>
      )}
    </motion.div>
  );
};

export default ContactForm;