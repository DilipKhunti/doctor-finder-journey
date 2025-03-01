
import Layout from "@/components/Layout";

const Privacy = () => {
  return (
    <Layout>
      <div className="container mx-auto py-10 px-4">
        <h1 className="text-3xl font-bold mb-8">Privacy Policy</h1>
        
        <div className="prose prose-lg max-w-none">
          <p>Last updated: {new Date().toLocaleDateString()}</p>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">1. Introduction</h2>
          <p>
            At DocFinder, we respect your privacy and are committed to protecting your personal data. This Privacy Policy explains 
            how we collect, use, and safeguard your information when you use our service.
          </p>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">2. Information We Collect</h2>
          <p>
            We collect several types of information from and about users of our Service, including:
          </p>
          <ul className="list-disc pl-6 mt-2 mb-4">
            <li>Personal identifiers (e.g., name, email address, phone number)</li>
            <li>Health information (e.g., symptoms described in searches)</li>
            <li>Professional information (for Healthcare Providers)</li>
            <li>Usage data (e.g., how you interact with our Service)</li>
          </ul>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">3. How We Use Your Information</h2>
          <p>
            We use the information we collect to:
          </p>
          <ul className="list-disc pl-6 mt-2 mb-4">
            <li>Provide and maintain our Service</li>
            <li>Match patients with relevant Healthcare Providers</li>
            <li>Process appointment bookings</li>
            <li>Verify Healthcare Provider credentials</li>
            <li>Improve our Service</li>
            <li>Communicate with you</li>
          </ul>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">4. Data Security</h2>
          <p>
            We implement appropriate security measures to protect your personal information. However, no method of transmission 
            over the Internet or electronic storage is 100% secure, and we cannot guarantee absolute security.
          </p>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">5. Data Sharing and Disclosure</h2>
          <p>
            We may share your information with:
          </p>
          <ul className="list-disc pl-6 mt-2 mb-4">
            <li>Healthcare Providers (for appointment booking purposes)</li>
            <li>Service providers (e.g., hosting services)</li>
            <li>Legal authorities (when required by law)</li>
          </ul>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">6. Your Data Protection Rights</h2>
          <p>
            Depending on your location, you may have rights regarding your personal data, including:
          </p>
          <ul className="list-disc pl-6 mt-2 mb-4">
            <li>The right to access your personal data</li>
            <li>The right to rectification of inaccurate data</li>
            <li>The right to erasure of your personal data</li>
            <li>The right to restrict processing of your personal data</li>
            <li>The right to data portability</li>
            <li>The right to object to processing of your personal data</li>
          </ul>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">7. Cookies and Tracking Technologies</h2>
          <p>
            We use cookies and similar tracking technologies to track activity on our Service and hold certain information. 
            You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent.
          </p>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">8. Children's Privacy</h2>
          <p>
            Our Service is not intended for children under 13 years of age. We do not knowingly collect personal information from 
            children under 13. If you are a parent or guardian and you are aware that your child has provided us with personal 
            information, please contact us.
          </p>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">9. Changes to This Privacy Policy</h2>
          <p>
            We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy 
            on this page and updating the "Last updated" date.
          </p>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">10. Contact Us</h2>
          <p>
            If you have any questions about this Privacy Policy, please contact us at privacy@docfinder.com.
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default Privacy;
