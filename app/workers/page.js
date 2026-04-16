"use client";

import React from "react";
import { motion } from "framer-motion";
import { 
  HiDownload, 
  HiUserAdd, 
  HiLogin, 
  HiOutlineClipboardCheck, 
  HiOutlinePencilAlt,
  HiDesktopComputer 
} from "react-icons/hi";

const DownloadPage = () => {
  const steps = [
    {
      title: "Download & Install",
      description: "Get the latest version of Workers Accountable. Exclusively built for Windows PCs.",
      icon: <HiDownload className="w-6 h-6" />,
      tag: "Windows Only",
      color: "bg-blue-600"
    },
    {
      title: "Register Your Account",
      description: "Use your correct institutional details to create your profile within the app.",
      icon: <HiUserAdd className="w-6 h-6" />,
      color: "bg-indigo-600"
    },
    {
      title: "Secure Sign In",
      description: "Log in with your credentials to sync your data with the Chapel database.",
      icon: <HiLogin className="w-6 h-6" />,
      color: "bg-blue-700"
    },
    {
      title: "Daily Reflections",
      description: "Mark your activities completed and submit your daily spiritual reflections.",
      icon: <HiOutlinePencilAlt className="w-6 h-6" />,
      color: "bg-cyan-600"
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  return (
    
    <div className="min-h-screen bg-[#f8fafc] text-slate-900 font-sans selection:bg-blue-100 overflow-x-hidden">
      
     
       <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden py-24 lg:py-40">
        
      
        <div className="absolute inset-0 z-0">
          <img 
            src="/workersimage.jpg" 
            alt="Chapel Workers"
            className="w-full h-full object-cover brightness-[0.65]" 
          />
        </div>

        <div className="container mx-auto px-6 relative z-10 text-center">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="mb-8 inline-block"
          >
            <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-2xl mx-auto">
               <span className="text-blue-900 font-bold text-2xl tracking-tighter">AUC</span>
            </div>
          </motion.div>
          
          <motion.h1 
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-5xl md:text-7xl font-extrabold text-white mb-6 tracking-tight drop-shadow-lg"
          >
            Workers <span className="text-white">Accountable</span>
          </motion.h1>
          
          <motion.p 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-white/90 text-lg md:text-xl max-w-2xl mx-auto mb-12 leading-relaxed font-medium drop-shadow-md"
          >
            The official desktop app for Anchor University Chapel workers. 
            Track your activities and grow spiritually with ease.
          </motion.p>

          <motion.div 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <a 
              href="/WorkersAccountableSetup.exe" 
              className="inline-flex items-center px-10 py-5 bg-white text-blue-900 font-black rounded-full shadow-2xl hover:bg-slate-100 transition-all gap-3 group"
            >
              <HiDesktopComputer className="text-2xl group-hover:rotate-6 transition-transform" />
              DOWNLOAD FOR WINDOWS
            </a>
          </motion.div>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-6 text-white text-sm font-medium tracking-widest uppercase drop-shadow-sm"
          >
            v1.0.0 • Size: 15MB • Stable Build
          </motion.p>
        </div>
      </section>

      {/* Instructions Section */}
      <section className="py-24 bg-white relative z-10">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4 tracking-tight">How to Get Started</h2>
            <div className="w-16 h-1.5 bg-blue-600 mx-auto rounded-full"></div>
          </div>

          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {steps.map((step, index) => (
              <motion.div 
                key={index}
                variants={itemVariants}
                className="bg-white p-8 rounded-[2rem] shadow-[0_10px_40px_-15px_rgba(0,0,0,0.05)] border border-slate-100 hover:border-blue-200 hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-500 relative overflow-hidden group"
              >
                <div className={`w-16 h-16 ${step.color} text-white rounded-2xl flex items-center justify-center mb-8 shadow-xl group-hover:scale-110 group-hover:rotate-3 transition-all duration-500`}>
                  {step.icon}
                </div>
                <h3 className="text-xl font-bold mb-4 text-slate-900 tracking-tight">{step.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{step.description}</p>
                {step.tag && (
                  <span className="absolute top-6 right-6 bg-blue-50 text-blue-600 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-tighter">
                    {step.tag}
                  </span>
                )}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* App Preview Section */}
      <section className="bg-slate-50 py-24 border-y border-slate-100">
        <div className="container mx-auto px-6 flex flex-col lg:flex-row items-center gap-16">
          <div className="lg:w-1/2">
            <motion.div
               initial={{ opacity: 0, x: -20 }}
               whileInView={{ opacity: 1, x: 0 }}
               viewport={{ once: true }}
            >
              <h2 className="text-4xl lg:text-5xl font-extrabold mb-8 text-slate-900 leading-tight tracking-tight">
                Designed for the <br/>
                <span className="text-blue-600">Modern Chapel Worker</span>
              </h2>
              <div className="space-y-6">
                {[
                  { text: "Beautiful Dark & Light Mode Support", color: "text-blue-500" },
                  { text: "Real-time sync with Chapel Servers", color: "text-indigo-500" },
                  { text: "Detailed activity logging system", color: "text-cyan-500" },
                  { text: "Interactive Reflection Journal", color: "text-emerald-500" }
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-4 text-slate-700 font-medium">
                    <div className={`flex-shrink-0 w-6 h-6 rounded-full bg-white shadow flex items-center justify-center`}>
                       <HiOutlineClipboardCheck className={`${item.color} text-xl`} />
                    </div>
                    {item.text}
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
          
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            className="lg:w-1/2 relative p-4 lg:p-8"
          >
            {/* Decorative frame for the app screenshot */}
            <div className="absolute inset-0 bg-gradient-to-tr from-blue-600 to-cyan-400 rounded-[2.5rem] rotate-2 scale-105 opacity-10"></div>
            <div className="relative bg-white p-3 rounded-[2rem] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.15)] border border-slate-200">
                 <img 
                    src="/login.png" 
                    alt="App Preview" 
                    className="rounded-[1.5rem] w-full shadow-inner"
                 />
            </div>
          </motion.div>
        </div>
      </section>

    
    </div>
  );
};

export default DownloadPage;