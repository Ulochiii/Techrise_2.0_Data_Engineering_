import React, { useState, useRef } from 'react';
import { 
  Upload, CheckCircle, XCircle, Loader2, Shield, 
  Camera, FileText, User, Phone, MapPin, Calendar, 
  ChevronRight, Lock, ArrowRight 
} from 'lucide-react';

export default function App() {
  // --- STATE MANAGEMENT ---
  const [step, setStep] = useState(1); // 1: Phone, 2: Profile, 3: Document

  // Step 1: Phone
  const [phoneNumber, setPhoneNumber] = useState('+234');
  const [otp, setOtp] = useState('');
  const [isOtpSent, setIsOtpSent] = useState(false);

  // Step 2: Profile
  const [fullName, setFullName] = useState('');
  const [dob, setDob] = useState('');
  const [address, setAddress] = useState('');

  // Step 3: Document
  const [idType, setIdType] = useState('nin');
  const [selectedImage, setSelectedImage] = useState(null);
  const [verificationStatus, setVerificationStatus] = useState('idle'); // idle, analyzing, success, error
  const [feedbackMessage, setFeedbackMessage] = useState('');
  
  const fileInputRef = useRef(null);

  // --- HANDLERS ---

  // STEP 1: Phone Verification Logic
  const handlePhoneSubmit = () => {
    // Simple validation for +234 followed by digits
    const phoneRegex = /^\+234\d{10}$/; // Expecting +234 followed by 10 digits (e.g. +2348012345678)
    
    if (!phoneNumber.startsWith('+234') || phoneNumber.length < 14) {
      // Allow a little flexibility for demo, but warn
      if(!window.confirm("Ensure number is in format +234XXXXXXXXXX. Continue for demo?")) return;
    }
    
    // Simulate API sending OTP
    setIsOtpSent(true);
  };

  const verifyOtp = () => {
    if (otp.length >= 6) {
      setStep(2); // Move to Profile
    } else {
      alert("Please enter the 6-digit OTP sent to your phone.");
    }
  };

  // STEP 2: Profile Logic
  const handleProfileSubmit = () => {
    if (fullName && dob && address) {
      setStep(3); // Move to Document Upload
    } else {
      alert("Please fill in all details.");
    }
  };

  // STEP 3: Image Upload & Mock Verification
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setSelectedImage(imageUrl);
      setVerificationStatus('idle');
      setFeedbackMessage('');
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  const handleVerify = () => {
    if (!selectedImage) {
      setFeedbackMessage("Please upload a document.");
      setVerificationStatus('error');
      return;
    }

    setVerificationStatus('analyzing');
    setFeedbackMessage("Extracting data from ID...");

    setTimeout(() => {
      // --- MOCK VERIFICATION LOGIC ---
      // We simulate scanning the ID.
      // If the user typed "Mismatch" as their name, we fail the verification.
      // Otherwise, we assume the OCR read the ID and it matched the Input Name.
      
      const simulatedOCRName = "John Doe"; 
      
      if (fullName.toLowerCase() === "mismatch") {
        // CASE: Mismatch
        setVerificationStatus('error');
        setFeedbackMessage(`The name on the ID (${simulatedOCRName}) does not match the profile name (${fullName}).`);
      } else {
        // CASE: Success
        setVerificationStatus('success');
        setFeedbackMessage(`Your identity has been verified. Name "${fullName}" matches the uploaded ${idType.toUpperCase()}.`);
      }
    }, 3000);
  };

  // --- RENDER HELPERS ---
  const getStepStatus = (s) => {
    if (step > s) return 'completed';
    if (step === s) return 'current';
    return 'pending';
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 font-sans selection:bg-gray-200">
      
      {/* Header */}
      <nav className="w-full bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center sticky top-0 z-10 shadow-sm">
        <div className="flex items-center gap-2">
          <div className="bg-gray-900 text-white p-2 rounded-lg">
            <Shield size={20} />
          </div>
          <span className="font-bold text-xl tracking-tight text-gray-900">SecureRent<span className="text-gray-400">KYC</span></span>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-8 md:py-12">
        
        {/* Progress Bar */}
        <div className="flex justify-between items-center max-w-lg mx-auto mb-10">
          {[1, 2, 3].map((s) => (
            <div key={s} className="flex flex-col items-center relative z-0">
              <div 
                className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 ${
                  getStepStatus(s) === 'completed' ? 'bg-green-500 text-white' : 
                  getStepStatus(s) === 'current' ? 'bg-gray-900 text-white ring-4 ring-gray-100' : 'bg-gray-200 text-gray-400'
                }`}
              >
                {getStepStatus(s) === 'completed' ? <CheckCircle size={18} /> : s}
              </div>
              <span className="text-xs font-medium mt-2 text-gray-500 uppercase tracking-wider">
                {s === 1 ? 'Phone' : s === 2 ? 'Details' : 'ID Scan'}
              </span>
            </div>
          ))}
          {/* Connecting Line */}
          <div className="absolute top-0 left-0 w-full h-full -z-10 hidden md:block"></div> 
        </div>

        <div className="grid md:grid-cols-2 gap-8 items-start">
          
          {/* LEFT COLUMN: The Form Wizard */}
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 transition-all duration-500">
            
            {/* STEP 1: PHONE VERIFICATION */}
            {step === 1 && (
              <div className="space-y-6 animate-in fade-in slide-in-from-left-4 duration-300">
                <h2 className="text-2xl font-bold text-gray-900">Verify Phone Number</h2>
                <p className="text-gray-500 text-sm">We need to verify your Nigerian mobile number to proceed.</p>
                
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Phone Number</label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-3.5 text-gray-400" size={18} />
                    <input 
                      type="tel"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900 font-mono tracking-wide"
                    />
                  </div>
                  <p className="text-xs text-gray-400 mt-2">Format: +23480...</p>
                </div>

                {isOtpSent && (
                  <div className="animate-in fade-in zoom-in duration-300 bg-blue-50 p-4 rounded-xl border border-blue-100">
                    <label className="block text-sm font-semibold text-blue-900 mb-2">Enter OTP</label>
                    <div className="flex gap-2">
                       <input 
                        type="text"
                        placeholder="1234"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        className="w-full px-4 py-3 bg-white border border-blue-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-center tracking-widest font-bold text-lg"
                        maxLength={6}
                      />
                    </div>
                    <p className="text-xs text-blue-600 mt-2">Use '1234' for demo.</p>
                  </div>
                )}

                <button 
                  onClick={isOtpSent ? verifyOtp : handlePhoneSubmit}
                  className="w-full py-4 bg-gray-900 text-white rounded-xl font-bold hover:bg-black transition-all flex items-center justify-center gap-2"
                >
                  {isOtpSent ? 'Verify OTP' : 'Send Verification Code'} <ChevronRight size={18} />
                </button>
              </div>
            )}

            {/* STEP 2: PROFILE DETAILS */}
            {step === 2 && (
              <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                <h2 className="text-2xl font-bold text-gray-900">Personal Details</h2>
                <p className="text-gray-500 text-sm">Ensure these details match your government ID exactly.</p>

                {/* Full Name */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Legal Full Name</label>
                  <div className="relative">
                    <User className="absolute left-3 top-3.5 text-gray-400" size={18} />
                    <input 
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="e.g. John Doe"
                      className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900"
                    />
                  </div>
                   <p className="text-xs text-gray-400 mt-1 ml-1">* Type "Mismatch" here to test failed verification.</p>
                </div>

                {/* DOB */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Date of Birth</label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-3.5 text-gray-400" size={18} />
                    <input 
                      type="date"
                      value={dob}
                      onChange={(e) => setDob(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900"
                    />
                  </div>
                </div>

                {/* Address */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Home Address</label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3.5 text-gray-400" size={18} />
                    <input 
                      type="text"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      placeholder="Street, City, State"
                      className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900"
                    />
                  </div>
                </div>

                <button 
                  onClick={handleProfileSubmit}
                  className="w-full py-4 bg-gray-900 text-white rounded-xl font-bold hover:bg-black transition-all flex items-center justify-center gap-2"
                >
                  Continue <ChevronRight size={18} />
                </button>
              </div>
            )}

            {/* STEP 3: ID UPLOAD */}
            {step === 3 && (
              <div className="space-y-6 animate-in fade-in zoom-in duration-300">
                <h2 className="text-2xl font-bold text-gray-900">Upload ID</h2>
                <p className="text-gray-500 text-sm">Upload a clear picture of your ID. We will match it against "{fullName}".</p>

                {/* ID Type Selector */}
                <div className="grid grid-cols-3 gap-2">
                  {['nin', 'driver_license', 'passport'].map((type) => (
                    <button
                      key={type}
                      onClick={() => setIdType(type)}
                      className={`py-2 px-2 rounded-lg text-xs font-bold border uppercase transition-all ${
                        idType === type 
                          ? 'bg-gray-900 text-white border-gray-900' 
                          : 'bg-white text-gray-500 border-gray-200 hover:bg-gray-50'
                      }`}
                    >
                      {type.replace('_', ' ')}
                    </button>
                  ))}
                </div>

                {/* Upload Area */}
                <div 
                  onClick={triggerFileInput}
                  className={`border-2 border-dashed rounded-xl p-6 flex flex-col items-center justify-center cursor-pointer transition-all group min-h-[160px] ${
                    selectedImage ? 'border-gray-300 bg-gray-50' : 'border-gray-300 hover:border-gray-500 hover:bg-gray-50'
                  }`}
                >
                  <input 
                    type="file" 
                    ref={fileInputRef} 
                    onChange={handleImageUpload} 
                    accept="image/*" 
                    className="hidden" 
                  />
                  
                  {selectedImage ? (
                    <div className="relative w-full h-40 rounded-lg overflow-hidden">
                      <img src={selectedImage} alt="Preview" className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <span className="bg-white text-xs font-bold px-2 py-1 rounded">Change</span>
                      </div>
                    </div>
                  ) : (
                    <>
                      <div className="bg-gray-100 p-3 rounded-full mb-2 group-hover:bg-gray-200">
                        <Camera className="text-gray-500" size={24} />
                      </div>
                      <p className="text-gray-600 text-sm font-medium">Tap to Open Gallery</p>
                    </>
                  )}
                </div>

                <button 
                  onClick={handleVerify}
                  disabled={verificationStatus === 'analyzing'}
                  className={`w-full py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all ${
                    verificationStatus === 'analyzing'
                      ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      : 'bg-gray-900 text-white hover:bg-black shadow-lg'
                  }`}
                >
                  {verificationStatus === 'analyzing' ? <Loader2 className="animate-spin" size={20} /> : <Lock size={18} />}
                  {verificationStatus === 'analyzing' ? 'Verifying...' : 'Verify Identity'}
                </button>
              </div>
            )}
          </div>

          {/* RIGHT COLUMN: STATUS VISUALIZATION */}
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 h-full flex flex-col justify-center items-center text-center relative overflow-hidden min-h-[400px]">
            {/* Background Blobs */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-gray-100 rounded-full blur-3xl -z-10 opacity-50"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-gray-200 rounded-full blur-2xl -z-10 opacity-50"></div>

            {verificationStatus === 'idle' && (
              <div className="space-y-4 opacity-50">
                <FileText size={64} className="mx-auto text-gray-300" />
                <h3 className="text-xl font-bold text-gray-400">Verification Status</h3>
                <p className="text-sm text-gray-400 px-6">
                  {step === 1 ? 'Waiting for phone verification...' : 
                   step === 2 ? 'Waiting for personal details...' : 
                   'Ready to scan document...'}
                </p>
              </div>
            )}

            {verificationStatus === 'analyzing' && (
              <div className="space-y-6 w-full animate-in fade-in duration-500">
                <div className="relative mx-auto w-24 h-24">
                  <div className="absolute inset-0 border-4 border-gray-100 rounded-full"></div>
                  <div className="absolute inset-0 border-4 border-gray-900 rounded-full border-t-transparent animate-spin"></div>
                  <Loader2 className="absolute inset-0 m-auto text-gray-900" size={32} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-800 animate-pulse">Running Checks...</h3>
                  <div className="text-left text-sm text-gray-500 mt-4 space-y-2 bg-gray-50 p-4 rounded-lg">
                     <p className="flex items-center gap-2">
                       <Loader2 size={12} className="animate-spin" /> Extracting text from image
                     </p>
                     <p className="flex items-center gap-2">
                       <Loader2 size={12} className="animate-spin delay-150" /> Comparing Name: <strong>{fullName}</strong>
                     </p>
                     <p className="flex items-center gap-2">
                       <Loader2 size={12} className="animate-spin delay-300" /> Verifying DOB: <strong>{dob}</strong>
                     </p>
                  </div>
                </div>
              </div>
            )}

            {verificationStatus === 'success' && (
              <div className="space-y-4 animate-in fade-in zoom-in duration-300">
                <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-2">
                  <CheckCircle size={40} />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">Successfully Created</h3>
                <p className="text-gray-500 text-sm px-4">{feedbackMessage}</p>
                
                <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 mt-4 w-full">
                  <h4 className="text-xs font-bold text-gray-400 uppercase mb-2 text-left">Account Ready</h4>
                  <button className="w-full py-3 bg-gray-900 text-white rounded-lg text-sm font-bold flex items-center justify-center gap-2 hover:bg-black transition-all">
                    Go to Dashboard <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            )}

            {verificationStatus === 'error' && (
              <div className="space-y-4 animate-in shake duration-300">
                <div className="w-20 h-20 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto mb-2">
                  <XCircle size={40} />
                </div>
                <h3 className="text-2xl font-bold text-red-600">Not Verified</h3>
                <p className="text-red-500 text-sm px-4 font-medium">{feedbackMessage}</p>
                <div className="bg-red-50 p-3 rounded-lg text-xs text-red-700 text-left mt-2">
                  <strong>Why?</strong> The system detected a mismatch between your profile name and the ID provided. Please try again with a matching document.
                </div>
                <button 
                  onClick={() => setVerificationStatus('idle')}
                  className="mt-4 text-gray-500 underline hover:text-gray-900 text-sm"
                >
                  Try Again
                </button>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}