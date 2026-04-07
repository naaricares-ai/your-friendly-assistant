import LegalPageLayout from '../components/LegalPageLayout';

export default function Terms() {
  return (
    <LegalPageLayout title="Terms of Service" lastUpdated="Last updated: April 6, 2025">
      <section>
        <h2 className="text-section text-xl md:text-2xl text-white mb-4">1. Acceptance of Terms</h2>
        <p>By accessing and using the ORYZE Technologies website and services, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service. If you do not agree, please discontinue use of our website.</p>
      </section>

      <section>
        <h2 className="text-section text-xl md:text-2xl text-white mb-4">2. Description of Services</h2>
        <p>ORYZE Technologies provides educational technology solutions including AI-powered learning tools, robotics kits, automation systems, and smart classroom solutions for schools and educational institutions.</p>
      </section>

      <section>
        <h2 className="text-section text-xl md:text-2xl text-white mb-4">3. User Responsibilities</h2>
        <ul className="list-disc list-inside space-y-2 ml-2">
          <li>Provide accurate and complete information when contacting us or using our services.</li>
          <li>Use our website and services only for lawful purposes.</li>
          <li>Not attempt to disrupt, compromise, or interfere with the operation of our website.</li>
          <li>Respect intellectual property rights of ORYZE Technologies and third parties.</li>
        </ul>
      </section>

      <section>
        <h2 className="text-section text-xl md:text-2xl text-white mb-4">4. Intellectual Property</h2>
        <p>All content on this website — including text, graphics, logos, icons, images, software, and code — is the property of ORYZE Technologies and is protected by applicable intellectual property laws. You may not reproduce, distribute, or create derivative works without our prior written consent.</p>
      </section>

      <section>
        <h2 className="text-section text-xl md:text-2xl text-white mb-4">5. Third-Party Links</h2>
        <p>Our website may contain links to third-party websites or services. We are not responsible for the content, privacy practices, or policies of any third-party sites. Accessing third-party links is at your own risk.</p>
      </section>

      <section>
        <h2 className="text-section text-xl md:text-2xl text-white mb-4">6. Limitation of Liability</h2>
        <p>ORYZE Technologies shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of our website or services. Our total liability shall not exceed the amount paid by you, if any, for accessing our services.</p>
      </section>

      <section>
        <h2 className="text-section text-xl md:text-2xl text-white mb-4">7. Indemnification</h2>
        <p>You agree to indemnify and hold harmless ORYZE Technologies, its officers, directors, employees, and agents from any claims, damages, losses, or expenses arising from your use of our website or violation of these terms.</p>
      </section>

      <section>
        <h2 className="text-section text-xl md:text-2xl text-white mb-4">8. Termination</h2>
        <p>We reserve the right to terminate or suspend access to our services at any time, without prior notice, for conduct that we believe violates these Terms or is harmful to other users or our business.</p>
      </section>

      <section>
        <h2 className="text-section text-xl md:text-2xl text-white mb-4">9. Governing Law</h2>
        <p>These Terms shall be governed by and construed in accordance with the laws of India. Any disputes arising from these terms shall be subject to the exclusive jurisdiction of the courts in Maharashtra, India.</p>
      </section>

      <section>
        <h2 className="text-section text-xl md:text-2xl text-white mb-4">10. Contact Us</h2>
        <p>For questions regarding these Terms of Service, please reach out to us at:</p>
        <p className="mt-2 text-white">Email: <a href="mailto:nprathamesh519@gmail.com" className="text-electric-blue hover:underline">nprathamesh519@gmail.com</a></p>
      </section>
    </LegalPageLayout>
  );
}
