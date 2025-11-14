"use client";

import { motion } from "framer-motion";
import { Copy, CheckCircle, CreditCard, Banknote } from "lucide-react";
import { useState } from "react";

export default function GivingForm() {
  const [amount, setAmount] = useState("");
  const [purpose, setPurpose] = useState("");
  const [copied, setCopied] = useState(false);

  const PAYSTACK_PUBLIC_KEY = process.env.NEXT_PUBLIC_PAYSTACK_KEY; 
  const API = process.env.NEXT_PUBLIC_API_BASE;

  const handlePaystack = () => {
    if (!amount || amount < 100) {
      alert("Please enter a valid amount (minimum ₦100)");
      return;
    }

    const handler = window.PaystackPop.setup({
      key: PAYSTACK_PUBLIC_KEY,
      email: "ezirimchukwuebuka24@gmail.com", 
      amount: amount * 100, 
      currency: "NGN",
      ref: "AULCHAPEL-" + Date.now(),
      metadata: {
        custom_fields: [
          {
            purpose: purpose || "Chapel Support",
          },
        ],
      },
      callback: function (response) {
        alert("Payment successful! Ref: " + response.reference);
      },
      onClose: function () {
        alert("Payment cancelled.");
      },
    });

    handler.openIframe();
  };

  const copyAccount = () => {
    navigator.clipboard.writeText("8145789624");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="w-full py-20 px-6 md:px-16 bg-white">
      <div className="max-w-5xl mx-auto">
       
        <h2 className="text-3xl md:text-4xl font-bold text-center text-[#1b2b48]">
          Give to Support God's Work
        </h2>
        <p className="text-center text-gray-600 max-w-2xl mx-auto mt-3">
          Whether it’s your offering, tithe, or support for chapel projects—your giving makes an eternal impact.
        </p>

        <div className="grid md:grid-cols-2 gap-10 mt-16">

          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="bg-white shadow-lg border border-gray-100 p-8 rounded-2xl"
          >
            <div className="flex items-center gap-3 mb-6">
              <CreditCard className="text-blue-600" size={26} />
              <h3 className="text-xl font-semibold text-gray-900">
                Give Online (Paystack)
              </h3>
            </div>

            <label className="text-gray-700 font-medium">Amount (₦)</label>
            <input
              type="number"
              className="w-full border rounded-lg p-3 mt-2 mb-5 text-black focus:ring-2 focus:ring-blue-500"
              placeholder="Enter amount e.g. 2000"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />

            <label className="text-gray-700 font-medium">Purpose</label>
            <select
              className="w-full border text-black rounded-lg p-3 mt-2 mb-6 focus:ring-2 focus:ring-blue-500"
              value={purpose}
              onChange={(e) => setPurpose(e.target.value)}
            >
              <option value="">Select purpose…</option>
              <option value="Offering">Offering</option>
              <option value="Tithe">Tithe</option>
              <option value="Project Support">Project Support</option>
              <option value="Thanksgiving Seed">Thanksgiving Seed</option>
              <option value="Welfare Support">Welfare Support</option>
            </select>

            <button
              onClick={handlePaystack}
              className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold transition"
            >
              Continue to Paystack
            </button>
          </motion.div>

          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="bg-gradient-to-br from-orange-50 to-orange-100 shadow-lg border border-orange-200 p-8 rounded-2xl"
          >
            <div className="flex items-center gap-3 mb-6">
              <Banknote className="text-orange-600" size={26} />
              <h3 className="text-xl font-semibold text-gray-900">
                Give via Bank Transfer
              </h3>
            </div>

            <p className="text-gray-700 mb-1 font-medium">Account Number</p>
            <div className="flex items-center gap-3 bg-white p-3 rounded-lg border">
              <span className="text-lg tracking-wider font-semibold text-gray-900">
                8145789624
              </span>
              <button
                onClick={copyAccount}
                className="ml-auto bg-gray-100 hover:bg-gray-200 p-2 rounded-lg transition"
              >
                {copied ? (
                  <CheckCircle className="text-green-600" size={20} />
                ) : (
                  <Copy className="text-gray-700" size={20} />
                )}
              </button>
            </div>

            <p className="mt-5 text-gray-700 font-medium">Bank Name</p>
            <p className="text-gray-900 text-lg font-semibold">Access Bank</p>

     <div className="mt-6">
  <div className="bg-white border rounded-xl p-4 shadow shadow-blue-100 flex items-center justify-center">
    <img
      src="/bank/accessbank.png"
      alt="Access Bank Logo"
      className="h-12 w-auto drop-shadow-md animate-fadeIn"
    />
  </div>
</div>


            <p className="text-gray-600 text-sm mt-6">
              After transferring, you may notify the chapel leadership for record purposes.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
