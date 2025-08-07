import { useState } from 'react';
import styles from '@/styles/ContactPage.module.css';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    projectType: 'fixed'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setSubmitStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '', projectType: 'fixed' });
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setSubmitStatus('idle'), 3000);
    }
  };

  return (
    <div className={styles.layout}>
      <h1 className={styles.pageTitle}>Get In Touch</h1>
      <p className={styles.pageSubtitle}>
        Ready to bring your ideas to life? Whether it&apos;s a fixed-price project or ongoing collaboration,
        I&apos;m here to help you build something amazing. Let&apos;s discuss your vision!
      </p>

      <div className={styles.container}>
        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label htmlFor="name" className={styles.label}>Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={styles.input}
              required
              placeholder="Your full name"
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="email" className={styles.label}>Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={styles.input}
              required
              placeholder="your.email@example.com"
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="subject" className={styles.label}>Subject</label>
            <input
              type="text"
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              className={styles.input}
              required
              placeholder="What's this about?"
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="message" className={styles.label}>Message</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              className={styles.textarea}
              required
              placeholder="Tell me about your project or idea..."
              rows={6}
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Project Type</label>
            <div className={styles.tabContainer}>
              <button
                type="button"
                className={`${styles.tab} ${formData.projectType === 'fixed' ? styles.tabActive : ''}`}
                onClick={() => setFormData(prev => ({ ...prev, projectType: 'fixed' }))}
              >
                <div className={styles.tabIcon}>💼</div>
                <div className={styles.tabContent}>
                  <div className={styles.tabHeader}>
                    <div className={styles.tabTitle}>Fixed Price</div>
                    <div className={styles.tabPrice}>$5,000</div>
                  </div>
                  <div className={styles.tabDescription}>Complete project with defined scope and deliverables</div>
                </div>
              </button>

              <button
                type="button"
                className={`${styles.tab} ${formData.projectType === 'hourly' ? styles.tabActive : ''}`}
                onClick={() => setFormData(prev => ({ ...prev, projectType: 'hourly' }))}
              >
                <div className={styles.tabIcon}>⏰</div>
                <div className={styles.tabContent}>
                  <div className={styles.tabHeader}>
                    <div className={styles.tabTitle}>Hourly Rate</div>
                    <div className={styles.tabPrice}>$35<span className={styles.priceUnit}>/hr</span></div>
                  </div>
                  <div className={styles.tabDescription}>Flexible engagement for ongoing work and consultation</div>
                </div>
              </button>
            </div>
          </div>

          <button
            type="submit"
            className={`${styles.submitButton} ${isSubmitting ? styles.submitting : ''}`}
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Sending...' : 'Send Message'}
          </button>

          {submitStatus === 'success' && (
            <div className={styles.successMessage}>
              ✅ Message sent successfully! I'll get back to you soon.
            </div>
          )}

          {submitStatus === 'error' && (
            <div className={styles.errorMessage}>
              ❌ Something went wrong. Please try again.
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export async function getStaticProps() {
  return {
    props: { title: 'Contact' },
  };
}

export default ContactPage;
