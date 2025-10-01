export default function SitemapPage(){
  return(
    <>
    
    {/* <!--SITEMAP CONTENT START--> */}
    <div className="page-container terms-content">
        <div className="page-container--inner">
            <div className="content">
                <h1>Sitemap</h1>
                <p className="last-updated">Last updated: January 2025</p>
                
                <div className="terms-section">
                    <h2>Main Pages</h2>
                    <ul>
                        <li><a href="./index.html">Home</a> - University student travel platform</li>
                        <li><a href="./search-results.html">Search Results</a> - Browse available accommodations</li>
                        <li><a href="./search-results-map-view.html">Search Results Map View</a> - View accommodations on map</li>
                        <li><a href="./room-teaser.html">Room Details</a> - Detailed room information</li>
                    </ul>
                </div>

                <div className="terms-section">
                    <h2>User Account</h2>
                    <ul>
                        <li><a href="./signin.html">Sign In</a> - Login to your account</li>
                        <li><a href="./signup.html">Sign Up</a> - Create a new account</li>
                        <li><a href="./signup-variation-2.html">Sign Up (Alternative)</a> - Alternative signup page</li>
                        <li><a href="./forgot-password.html">Forgot Password</a> - Reset your password</li>
                    </ul>
                </div>

                <div className="terms-section">
                    <h2>Booking & Payment</h2>
                    <ul>
                        <li><a href="./go-payment.html">Payment</a> - Complete your booking payment</li>
                        <li><a href="./go-payment-signed.html">Payment (Signed In)</a> - Payment page for logged-in users</li>
                    </ul>
                </div>

                <div className="terms-section">
                    <h2>Help & Support</h2>
                    <ul>
                        <li><a href="./faq.html">FAQ</a> - Frequently Asked Questions</li>
                    </ul>
                </div>

                <div className="terms-section">
                    <h2>Legal & Policies</h2>
                    <ul>
                        <li><a href="./terms-of-use.html">Terms of Use</a> - Terms and conditions for using Wudgo</li>
                        <li><a href="./privacy-policy.html">Privacy Policy</a> - How we collect and use your information</li>
                        <li><a href="./sitemap.html">Sitemap</a> - This page - complete list of all pages</li>
                    </ul>
                </div>

                <div className="terms-section">
                    <h2>About This Sitemap</h2>
                    <p>This sitemap provides a complete overview of all pages available on the Wudgo website. Our platform is designed specifically for university students to find affordable travel accommodations around the world.</p>
                    
                    <h3>Quick Navigation Tips:</h3>
                    <ul>
                        <li><strong>New Users:</strong> Start with <a href="./signup.html">Sign Up</a> to create your account</li>
                        <li><strong>Existing Users:</strong> Use <a href="./signin.html">Sign In</a> to access your account</li>
                        <li><strong>Browse Accommodations:</strong> Visit <a href="./search-results.html">Search Results</a> to see available options</li>
                        <li><strong>Need Help:</strong> Check our <a href="./faq.html">FAQ</a> for common questions</li>
                        <li><strong>Legal Information:</strong> Review our <a href="./terms-of-use.html">Terms of Use</a> and <a href="./privacy-policy.html">Privacy Policy</a></li>
                    </ul>
                </div>

                <div className="terms-section">
                    <h2>Contact Information</h2>
                    <p>If you can't find what you're looking for or need additional assistance, please contact us:</p>
                    <ul>
                        <li><strong>Email:</strong> info@wudgo.com</li>
                        <li><strong>Address:</strong> 592, 1007 N Orange St. 4th Floor, Wilmington, DE, New Castle, US, 19801</li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
    {/* <!--SITEMAP CONTENT END--> */}

    </>
  );
}