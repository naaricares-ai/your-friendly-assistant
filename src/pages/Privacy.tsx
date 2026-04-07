import LegalPageLayout from '../components/LegalPageLayout';

export default function Privacy() {
  return (
    <LegalPageLayout title="Privacy Policy" lastUpdated="Last updated: April 6, 2025">
      <section>
        <h2 className="text-section text-xl md:text-2xl text-white mb-4">1. Introduction</h2>
        <p>ORYZE Technologies ("we", "our", or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our services.</p>
      </section>

      <section>
        <h2 className="text-section text-xl md:text-2xl text-white mb-4">2. Information We Collect</h2>
        <p className="mb-3">We may collect the following types of information:</p>
        <ul className="list-disc list-inside space-y-2 ml-2">
          <li><strong className="text-white">Personal Information:</strong> Name, email address, school name, and phone number when you submit a contact form or inquiry.</li>
          <li><strong className="text-white">Usage Data:</strong> Browser type, device information, IP address, pages visited, and time spent on our website.</li>
          <li><strong className="text-white">Cookies & Tracking:</strong> We use cookies and similar technologies to enhance your experience and analyze site traffic.</li>
        </ul>
      </section>

      <section>
        <h2 className="text-section text-xl md:text-2xl text-white mb-4">3. How We Use Your Information</h2>
        <ul className="list-disc list-inside space-y-2 ml-2">
          <li>To respond to your inquiries and provide customer support.</li>
          <li>To improve our website, products, and services.</li>
          <li>To send periodic emails regarding updates or services you've expressed interest in.</li>
          <li>To monitor and analyze usage patterns and trends.</li>
          <li>To comply with legal obligations.</li>
        </ul>
      </section>

      <section>
        <h2 className="text-section text-xl md:text-2xl text-white mb-4">4. Data Sharing & Disclosure</h2>
        <p>We do not sell, trade, or rent your personal information to third parties. We may share information with trusted service providers who assist us in operating our website and conducting our business, provided they agree to keep your information confidential.</p>
      </section>

      <section>
        <h2 className="text-section text-xl md:text-2xl text-white mb-4">5. Data Security</h2>
        <p>We implement industry-standard security measures including SSL encryption, secure databases, and access controls to protect your personal information. However, no method of transmission over the Internet is 100% secure.</p>
      </section>

      <section>
        <h2 className="text-section text-xl md:text-2xl text-white mb-4">6. Your Rights</h2>
        <p>You have the right to access, correct, or delete your personal data. You may also opt out of receiving marketing communications at any time by contacting us at <a href="mailto:nprathamesh519@gmail.com" className="text-electric-blue hover:underline">nprathamesh519@gmail.com</a>.</p>
      </section>

      <section>
        <h2 className="text-section text-xl md:text-2xl text-white mb-4">7. Children's Privacy</h2>
        <p>Our services are designed for educational institutions. We do not knowingly collect personal information from children under 13 without verifiable parental consent. If you believe a child has provided us with personal data, please contact us immediately.</p>
      </section>

      <section>
        <h2 className="text-section text-xl md:text-2xl text-white mb-4">8. Changes to This Policy</h2>
        <p>We may update this Privacy Policy from time to time. Changes will be posted on this page with an updated revision date. We encourage you to review this policy periodically.</p>
      </section>

      <section>
        <h2 className="text-section text-xl md:text-2xl text-white mb-4">9. Contact Us</h2>
        <p>If you have questions about this Privacy Policy, please contact us at:</p>
        <p className="mt-2 text-white">Email: <a href="mailto:nprathamesh519@gmail.com" className="text-electric-blue hover:underline">nprathamesh519@gmail.com</a></p>
        <p className="text-white">WhatsApp: <a href="https://wa.me/918446692426" className="text-electric-blue hover:underline">+91 8446692426</a></p>
      </section>
    </LegalPageLayout>
  );
}
