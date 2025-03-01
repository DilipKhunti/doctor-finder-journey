
import { Layout } from "@/components/Layout";

const Terms = () => {
  return (
    <Layout>
      <div className="container mx-auto py-10 px-4">
        <h1 className="text-3xl font-bold mb-8">Terms of Service</h1>
        
        <div className="prose prose-lg max-w-none">
          <p>Last updated: {new Date().toLocaleDateString()}</p>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">1. Introduction</h2>
          <p>
            Welcome to DocFinder. These Terms of Service govern your use of our website and services. 
            By accessing or using DocFinder, you agree to be bound by these Terms.
          </p>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">2. Definitions</h2>
          <p>
            <strong>"Service"</strong> refers to the DocFinder platform, accessible via web application.<br />
            <strong>"User"</strong> refers to individuals who access or use the Service, including both patients and healthcare providers.<br />
            <strong>"Healthcare Provider"</strong> refers to medical professionals who create profiles on our platform.
          </p>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">3. Use of the Service</h2>
          <p>
            Our Service allows patients to search for healthcare providers and book appointments. Healthcare Providers can create profiles 
            and manage their availability. All Users must comply with these Terms and any applicable laws and regulations.
          </p>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">4. User Accounts</h2>
          <p>
            When you create an account with us, you must provide accurate and complete information. You are responsible for safeguarding 
            your account and for any activities or actions under your account. We have the right to disable any user account at any time 
            if, in our opinion, you have violated any provisions of these Terms.
          </p>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">5. Healthcare Provider Verification</h2>
          <p>
            All Healthcare Providers must undergo verification to confirm their identity and credentials. We reserve the right to reject 
            or remove any Healthcare Provider profile that does not meet our verification standards or violates these Terms.
          </p>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">6. Appointments and Cancellations</h2>
          <p>
            Appointments booked through our Service are subject to the Healthcare Provider's availability. Users must follow the 
            cancellation policy specified by each Healthcare Provider. We are not responsible for any cancellations or changes made 
            by Healthcare Providers.
          </p>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">7. Limitation of Liability</h2>
          <p>
            DocFinder is a platform that connects patients with healthcare providers. We are not responsible for the quality of medical 
            services provided by Healthcare Providers. We do not provide medical advice, diagnosis, or treatment.
          </p>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">8. Changes to Terms</h2>
          <p>
            We reserve the right to modify these Terms at any time. We will provide notice of significant changes by posting an update 
            on our website. Your continued use of the Service after such modifications constitutes your acceptance of the new Terms.
          </p>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">9. Contact Us</h2>
          <p>
            If you have any questions about these Terms, please contact us at support@docfinder.com.
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default Terms;
