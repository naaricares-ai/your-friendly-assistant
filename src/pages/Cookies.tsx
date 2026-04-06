import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export default function Cookies() {
  return (
    <div className="min-h-screen bg-deep-space text-chrome-silver">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <Link to="/" className="inline-flex items-center gap-2 text-electric-blue hover:text-cyan-glow transition-colors mb-8 font-body text-sm">
          <ArrowLeft className="w-4 h-4" /> Back to Home
        </Link>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <h1 className="text-hero text-3xl md:text-5xl text-white mb-4">Cookie Policy</h1>
          <p className="text-label text-titanium/60 mb-12">Last updated: April 6, 2025</p>

          <div className="space-y-10 font-body text-base md:text-lg text-titanium/80 leading-relaxed">
            <section>
              <h2 className="text-section text-xl md:text-2xl text-white mb-4">1. What Are Cookies?</h2>
              <p>Cookies are small text files placed on your device when you visit a website. They help websites remember your preferences, understand how you use the site, and improve your overall experience.</p>
            </section>

            <section>
              <h2 className="text-section text-xl md:text-2xl text-white mb-4">2. How We Use Cookies</h2>
              <p className="mb-3">ORYZE Technologies uses cookies for the following purposes:</p>
              <ul className="list-disc list-inside space-y-2 ml-2">
                <li><strong className="text-white">Essential Cookies:</strong> Required for the website to function properly, including navigation, security, and accessibility features.</li>
                <li><strong className="text-white">Analytics Cookies:</strong> Help us understand how visitors interact with our website by collecting anonymous usage data (pages visited, time spent, traffic sources).</li>
                <li><strong className="text-white">Functional Cookies:</strong> Remember your preferences such as language settings and display options to provide a personalized experience.</li>
                <li><strong className="text-white">Performance Cookies:</strong> Monitor website performance and help us identify and fix issues to ensure a smooth user experience.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-section text-xl md:text-2xl text-white mb-4">3. Types of Cookies We Use</h2>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse mt-4">
                  <thead>
                    <tr className="border-b border-white/10">
                      <th className="text-left py-3 px-4 text-white font-medium">Cookie Type</th>
                      <th className="text-left py-3 px-4 text-white font-medium">Purpose</th>
                      <th className="text-left py-3 px-4 text-white font-medium">Duration</th>
                    </tr>
                  </thead>
                  <tbody className="text-sm">
                    <tr className="border-b border-white/5">
                      <td className="py-3 px-4">Session</td>
                      <td className="py-3 px-4">Maintain user session state</td>
                      <td className="py-3 px-4">Browser session</td>
                    </tr>
                    <tr className="border-b border-white/5">
                      <td className="py-3 px-4">Preferences</td>
                      <td className="py-3 px-4">Store user settings</td>
                      <td className="py-3 px-4">1 year</td>
                    </tr>
                    <tr className="border-b border-white/5">
                      <td className="py-3 px-4">Analytics</td>
                      <td className="py-3 px-4">Track anonymous usage data</td>
                      <td className="py-3 px-4">2 years</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            <section>
              <h2 className="text-section text-xl md:text-2xl text-white mb-4">4. Third-Party Cookies</h2>
              <p>Some cookies may be set by third-party services we use, such as analytics providers. These third parties have their own privacy policies governing the use of cookies. We do not control third-party cookies.</p>
            </section>

            <section>
              <h2 className="text-section text-xl md:text-2xl text-white mb-4">5. Managing Cookies</h2>
              <p className="mb-3">You can control and manage cookies through your browser settings. Most browsers allow you to:</p>
              <ul className="list-disc list-inside space-y-2 ml-2">
                <li>View and delete existing cookies.</li>
                <li>Block cookies from specific or all websites.</li>
                <li>Set preferences for certain types of cookies.</li>
              </ul>
              <p className="mt-3">Please note that disabling certain cookies may affect the functionality of our website.</p>
            </section>

            <section>
              <h2 className="text-section text-xl md:text-2xl text-white mb-4">6. Updates to This Policy</h2>
              <p>We may update this Cookie Policy from time to time to reflect changes in technology or legal requirements. Any updates will be posted on this page with a revised date.</p>
            </section>

            <section>
              <h2 className="text-section text-xl md:text-2xl text-white mb-4">7. Contact Us</h2>
              <p>If you have any questions about our use of cookies, please contact us at:</p>
              <p className="mt-2 text-white">Email: <a href="mailto:nprathamesh519@gmail.com" className="text-electric-blue hover:underline">nprathamesh519@gmail.com</a></p>
            </section>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
