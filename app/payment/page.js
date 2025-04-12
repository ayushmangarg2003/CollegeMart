"use client";

import React, { useState, useEffect } from 'react';
import { 
  CreditCard, 
  Calendar, 
  Lock, 
  ChevronLeft, 
  CheckCircle,
  Loader
} from 'lucide-react';
import Link from 'next/link';

const PaymentPage = () => {
  const [formData, setFormData] = useState({
    cardName: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    amount: '',
  });
  const [errors, setErrors] = useState({});
  const [isProcessing, setIsProcessing] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);

  // Format card number input with spaces
  const formatCardNumber = (value) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = matches && matches[0] || '';
    const parts = [];
    
    for (let i = 0; i < match.length; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    
    if (parts.length) {
      return parts.join(' ');
    } else {
      return value;
    }
  };

  // Format expiry date
  const formatExpiryDate = (value) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    
    if (v.length >= 2) {
      return `${v.substring(0, 2)}/${v.substring(2, 4)}`;
    }
    return v;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    let formattedValue = value;
    
    if (name === 'cardNumber') {
      formattedValue = formatCardNumber(value);
    } else if (name === 'expiryDate') {
      formattedValue = formatExpiryDate(value);
    } else if (name === 'amount') {
      // Only allow numbers and decimal point
      formattedValue = value.replace(/[^\d.]/g, '');
      // Ensure only one decimal point
      const parts = formattedValue.split('.');
      if (parts.length > 2) {
        formattedValue = `${parts[0]}.${parts.slice(1).join('')}`;
      }
    }
    
    setFormData({
      ...formData,
      [name]: formattedValue,
    });
    
    // Clear error when field is being edited
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: null
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.cardName.trim()) {
      newErrors.cardName = 'Name on card is required';
    }
    
    if (!formData.cardNumber.trim()) {
      newErrors.cardNumber = 'Card number is required';
    } else if (formData.cardNumber.replace(/\s/g, '').length !== 16) {
      newErrors.cardNumber = 'Card number must be 16 digits';
    }
    
    if (!formData.expiryDate.trim()) {
      newErrors.expiryDate = 'Expiry date is required';
    } else if (!/^\d{2}\/\d{2}$/.test(formData.expiryDate)) {
      newErrors.expiryDate = 'Invalid format (MM/YY)';
    }
    
    if (!formData.cvv.trim()) {
      newErrors.cvv = 'CVV is required';
    } else if (!/^\d{3,4}$/.test(formData.cvv)) {
      newErrors.cvv = 'CVV must be 3-4 digits';
    }
    
    if (!formData.amount.trim()) {
      newErrors.amount = 'Amount is required';
    } else if (isNaN(parseFloat(formData.amount)) || parseFloat(formData.amount) <= 0) {
      newErrors.amount = 'Please enter a valid amount';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      setIsProcessing(true);
      
      // Simulate payment processing
      setTimeout(() => {
        setIsProcessing(false);
        setIsConfirmed(true);
        
        // Reset form after confirmation
        setTimeout(() => {
          setFormData({
            cardName: '',
            cardNumber: '',
            expiryDate: '',
            cvv: '',
            amount: '',
          });
        }, 1000);
      }, 5000);
    }
  };

  return (
    <main className="min-h-screen bg-white px-4 md:px-8 lg:px-16 py-12">
      <div className="max-w-3xl mx-auto">
        {/* Breadcrumb */}
        <nav className="mb-8">
          <ol className="flex items-center space-x-2 text-sm text-neutral-600">
            <li>
              <Link href="/" className="hover:text-[#cc0000]">
                Home
              </Link>
            </li>
            <li>/</li>
            <li>
              <Link href="/marketplace" className="hover:text-[#cc0000]">
                Marketplace
              </Link>
            </li>
            <li>/</li>
            <li className="text-neutral-400">Payment</li>
          </ol>
        </nav>

        {/* Back button */}
        <Link 
          href="/marketplace"
          className="inline-flex items-center text-neutral-600 hover:text-[#cc0000] mb-8"
        >
          <ChevronLeft size={20} className="mr-1" />
          Back to Marketplace
        </Link>

        {/* Page title */}
        <h1 className="text-3xl font-bold text-[#4b4b4b] mb-8">Secure Payment</h1>

        {isConfirmed ? (
          // Confirmation screen
          <div className="bg-white shadow-lg border border-neutral-100 rounded-lg p-8 flex flex-col items-center text-center">
            <div className="w-20 h-20 mb-6 text-green-500 flex items-center justify-center">
              <CheckCircle size={80} />
            </div>
            <h2 className="text-2xl font-bold text-green-600 mb-4">Payment Successful!</h2>
            <p className="text-neutral-600 mb-8">
              Your payment has been processed successfully. 
              You will receive a confirmation email shortly.
            </p>
            <Link 
              href="/marketplace" 
              className="bg-[#cc0000] text-white py-3 px-8 rounded hover:bg-[#aa0000] transition-colors duration-200"
            >
              Return to Marketplace
            </Link>
          </div>
        ) : (
          // Payment form
          <div className="bg-white shadow-lg border border-neutral-100 rounded-lg overflow-hidden">
            <div className="bg-[#cc0000]/5 px-6 py-4 border-b border-neutral-100">
              <h2 className="text-xl font-semibold text-[#cc0000]">Payment Details</h2>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              {/* Card Name */}
              <div className="space-y-2">
                <label htmlFor="cardName" className="block text-neutral-700 font-medium">
                  Name on Card
                </label>
                <div className="relative">
                  <input
                    type="text"
                    id="cardName"
                    name="cardName"
                    value={formData.cardName}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border ${errors.cardName ? 'border-red-500' : 'border-neutral-300'} focus:outline-none focus:ring-2 focus:ring-[#cc0000]/20 focus:border-[#cc0000]`}
                    placeholder="John Smith"
                  />
                </div>
                {errors.cardName && (
                  <p className="text-red-500 text-sm">{errors.cardName}</p>
                )}
              </div>

              {/* Card Number */}
              <div className="space-y-2">
                <label htmlFor="cardNumber" className="block text-neutral-700 font-medium">
                  Card Number
                </label>
                <div className="relative">
                  <input
                    type="text"
                    id="cardNumber"
                    name="cardNumber"
                    value={formData.cardNumber}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border ${errors.cardNumber ? 'border-red-500' : 'border-neutral-300'} focus:outline-none focus:ring-2 focus:ring-[#cc0000]/20 focus:border-[#cc0000]`}
                    placeholder="1234 5678 9012 3456"
                    maxLength="19"
                  />
                  <CreditCard className="absolute right-4 top-1/2 transform -translate-y-1/2 text-neutral-400" size={20} />
                </div>
                {errors.cardNumber && (
                  <p className="text-red-500 text-sm">{errors.cardNumber}</p>
                )}
              </div>

              {/* Expiry and CVV */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="expiryDate" className="block text-neutral-700 font-medium">
                    Expiry Date
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      id="expiryDate"
                      name="expiryDate"
                      value={formData.expiryDate}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 border ${errors.expiryDate ? 'border-red-500' : 'border-neutral-300'} focus:outline-none focus:ring-2 focus:ring-[#cc0000]/20 focus:border-[#cc0000]`}
                      placeholder="MM/YY"
                      maxLength="5"
                    />
                    <Calendar className="absolute right-4 top-1/2 transform -translate-y-1/2 text-neutral-400" size={20} />
                  </div>
                  {errors.expiryDate && (
                    <p className="text-red-500 text-sm">{errors.expiryDate}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <label htmlFor="cvv" className="block text-neutral-700 font-medium">
                    CVV / CVC
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      id="cvv"
                      name="cvv"
                      value={formData.cvv}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 border ${errors.cvv ? 'border-red-500' : 'border-neutral-300'} focus:outline-none focus:ring-2 focus:ring-[#cc0000]/20 focus:border-[#cc0000]`}
                      placeholder="123"
                      maxLength="4"
                    />
                    <Lock className="absolute right-4 top-1/2 transform -translate-y-1/2 text-neutral-400" size={20} />
                  </div>
                  {errors.cvv && (
                    <p className="text-red-500 text-sm">{errors.cvv}</p>
                  )}
                </div>
              </div>

              {/* Amount */}
              <div className="space-y-2">
                <label htmlFor="amount" className="block text-neutral-700 font-medium">
                  Payment Amount ($)
                </label>
                <div className="relative">
                  <input
                    type="text"
                    id="amount"
                    name="amount"
                    value={formData.amount}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border ${errors.amount ? 'border-red-500' : 'border-neutral-300'} focus:outline-none focus:ring-2 focus:ring-[#cc0000]/20 focus:border-[#cc0000]`}
                    placeholder="0.00"
                  />
                  <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-neutral-400">$</span>
                </div>
                {errors.amount && (
                  <p className="text-red-500 text-sm">{errors.amount}</p>
                )}
              </div>

              {/* Security notice */}
              <div className="flex items-start space-x-3 text-sm text-neutral-500 bg-neutral-50 p-4 rounded-md">
                <Lock size={18} className="text-neutral-400 mt-0.5 flex-shrink-0" />
                <p>
                  Your payment information is encrypted and secure. We do not store your card details.
                </p>
              </div>

              {/* Submit button */}
              <button
                type="submit"
                disabled={isProcessing}
                className="w-full bg-[#cc0000] text-white text-lg font-medium py-4 flex items-center justify-center gap-3 hover:bg-[#aa0000] transition-colors duration-200 disabled:bg-neutral-300 disabled:cursor-not-allowed"
              >
                {isProcessing ? (
                  <>
                    <Loader className="w-5 h-5 animate-spin" />
                    Processing Payment...
                  </>
                ) : (
                  'Pay Now'
                )}
              </button>
            </form>
          </div>
        )}
      </div>
    </main>
  );
};

export default PaymentPage;