"use client";

export default function ContactMe() {
  return (
    <section
      id="contact"
      className="relative w-full py-20 bg-neutral-950 text-white"
    >
      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12">
        {/* Left Side - Credentials */}
        <div className="space-y-6">
          <h2 className="text-4xl font-bold">Contact Me</h2>
          <p className="text-gray-400">
            Let’s get in touch! You can reach me anytime through my email or
            socials.
          </p>

          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold text-cyan-400">Email</h3>
              <p className="text-gray-300">bahaeddine.dridi@example.com</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-cyan-400">Location</h3>
              <p className="text-gray-300">Tunis, Tunisia</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-cyan-400">Links</h3>
              <ul className="text-gray-300 space-y-1">
                <li>
                  <a
                    href="https://github.com/yourusername"
                    target="_blank"
                    className="hover:text-cyan-400 transition"
                  >
                    GitHub
                  </a>
                </li>
                <li>
                  <a
                    href="https://linkedin.com/in/yourusername"
                    target="_blank"
                    className="hover:text-cyan-400 transition"
                  >
                    LinkedIn
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Right Side - Form */}
        <div className="bg-neutral-900 p-6 rounded-2xl shadow-lg border border-white/10">
          <form className="space-y-4">
            <div>
              <label htmlFor="name" className="block mb-1 text-gray-300">
                Name
              </label>
              <input
                id="name"
                type="text"
                placeholder="Your Name"
                className="w-full p-3 rounded-lg bg-neutral-800 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
              />
            </div>
            <div>
              <label htmlFor="email" className="block mb-1 text-gray-300">
                Email
              </label>
              <input
                id="email"
                type="email"
                placeholder="you@example.com"
                className="w-full p-3 rounded-lg bg-neutral-800 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
              />
            </div>
            <div>
              <label htmlFor="message" className="block mb-1 text-gray-300">
                Message
              </label>
              <textarea
                id="message"
                rows={5}
                placeholder="Write your message..."
                className="w-full p-3 rounded-lg bg-neutral-800 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
              ></textarea>
            </div>
            <button
              type="button"
              className="w-full py-3 px-6 rounded-lg bg-cyan-500 text-white font-semibold hover:bg-cyan-600 transition"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
