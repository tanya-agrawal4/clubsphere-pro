
import React, { useState } from 'react';

interface FooterProps {
  onSecretAdminTrigger?: () => void;
}

const Footer: React.FC<FooterProps> = ({ onSecretAdminTrigger }) => {
  const [logoClicks, setLogoClicks] = useState(0);

  const handleLogoClick = () => {
    const newCount = logoClicks + 1;
    setLogoClicks(newCount);
    if (newCount === 3) {
      onSecretAdminTrigger?.();
      setLogoClicks(0);
    }
    // Reset clicks after 3 seconds of inactivity
    setTimeout(() => setLogoClicks(0), 3000);
  };

  return (
    <footer className="bg-slate-950 border-t border-slate-900 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 md:col-span-2">
            <div 
              className="flex items-center space-x-2 mb-6 cursor-default select-none group"
              onClick={handleLogoClick}
            >
              <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center font-bold text-white group-active:scale-90 transition-transform">CS</div>
              <span className="text-xl font-bold text-white tracking-tight">ClubSphere</span>
            </div>
            <p className="text-slate-400 max-w-sm mb-6">
              Empowering NITA students to build connections, gain experience, and create lasting memories through vibrant club life.
            </p>
          </div>
          
          <div>
            <h4 className="text-white font-bold mb-6">Platform</h4>
            <ul className="space-y-4 text-slate-400">
              <li><button className="hover:text-indigo-400 transition-colors">Find Clubs</button></li>
              <li><button className="hover:text-indigo-400 transition-colors">Event Tracker</button></li>
              <li><button className="hover:text-indigo-400 transition-colors">Resources</button></li>
              <li><button className="hover:text-indigo-400 transition-colors">Recruitment</button></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-white font-bold mb-6">Support</h4>
            <ul className="space-y-4 text-slate-400">
              <li><button className="hover:text-indigo-400 transition-colors">Help Center</button></li>
              <li><button className="hover:text-indigo-400 transition-colors">For Club Admins</button></li>
              <li><button className="hover:text-indigo-400 transition-colors">Feedback</button></li>
              <li><button className="hover:text-indigo-400 transition-colors">Contact Us</button></li>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-slate-900 flex flex-col md:flex-row justify-between items-center text-sm text-slate-500">
          <p>© 2024 ClubSphere NITA. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <button className="hover:text-white transition-colors">Privacy Policy</button>
            <button className="hover:text-white transition-colors">Terms of Service</button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
