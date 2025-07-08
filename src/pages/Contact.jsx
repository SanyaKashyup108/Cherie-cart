import React from 'react';

const Contact = () => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-pink-100 via-pink-200 to-pink-300 flex items-center justify-center px-4 py-10">
      <div className="backdrop-blur-md bg-white/40 border border-white/30 rounded-2xl shadow-2xl p-10 w-full max-w-5xl">
        <h2 className="text-4xl font-bold text-pink-800 text-center mb-10">
          Get in Touch with <span className="text-pink-600">Cherie Cart</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Info Section */}
          <div className="text-pink-900 space-y-6">
            <div>
              <h3 className="text-2xl font-semibold">Contact Info</h3>
              <p className="text-pink-700">
                Have a question or need support? We're here to help you with your electronics journey.
              </p>
            </div>
            <div className="space-y-1">
              <p><strong>📍 Address:</strong> 123 Tech Lane, Kolkata, India</p>
              <p><strong>📧 Email:</strong> support@cheriecart.com</p>
              <p><strong>📞 Phone:</strong> +91 98765 43210</p>
            </div>
          </div>

          {/* Form Section */}
          <form className="space-y-6">
            <div>
              <label className="block text-pink-900 mb-1">Your Name</label>
              <input
                type="text"
                placeholder="John Doe"
                className="w-full px-4 py-2 bg-white border border-pink-200 text-pink-800 rounded-xl placeholder-pink-400 focus:outline-none focus:ring-2 focus:ring-pink-500"
              />
            </div>
            <div>
              <label className="block text-pink-900 mb-1">Email Address</label>
              <input
                type="email"
                placeholder="john@example.com"
                className="w-full px-4 py-2 bg-white border border-pink-200 text-pink-800 rounded-xl placeholder-pink-400 focus:outline-none focus:ring-2 focus:ring-pink-500"
              />
            </div>
            <div>
              <label className="block text-pink-900 mb-1">Your Message</label>
              <textarea
                rows="4"
                placeholder="Type your message..."
                className="w-full px-4 py-2 bg-white border border-pink-200 text-pink-800 rounded-xl placeholder-pink-400 focus:outline-none focus:ring-2 focus:ring-pink-500"
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-pink-500 to-pink-600 text-white font-semibold py-2 rounded-xl hover:opacity-90 transition-all duration-300"
            >
              Send Message 💌
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
