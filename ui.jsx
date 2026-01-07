import React, { useState, useRef, useEffect } from "react";
import { 
  Camera, 
  Upload, 
  CheckCircle, 
  AlertCircle, 
  ArrowRight, 
  ArrowLeft, 
  Smartphone, 
  User, 
  FileText, 
  Loader2,
  Image as ImageIcon
} from "lucide-react";

/**
 * KYC Verification System - React Component
 * Features:
 * - Camera capture & Gallery extraction
 * - Simulated OCR/Data extraction from ID
 * - Minimalist "White & Ash" Aesthetic
 */

const App = () => {
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [extracting, setExtracting] = useState(false);
  const [error, setError] = useState(null);

  // --- State Data ---
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [isOtpSent, setIsOtpSent] = useState(false);

  const [profile, setProfile] = useState({
    fullName: "",
    dob: "",
    address: "",
    idType: "nin",
  });

  const [previews, setPreviews] = useState({
    idFront: null,
    idBack: null,
    selfie: null,
  });

  // --- Refs ---
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const fileInputRef = useRef(null);
  
  // --- Camera & Gallery Logic ---
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [activeCaptureMode, setActiveCaptureMode] = useState(null);

  const startCamera = async (mode) => {
    setActiveCaptureMode(mode);
    setIsCameraActive(true);
    setError(null);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: mode === 'selfie' ? 'user' : 'environment' } 
      });
      if (videoRef.current) videoRef.current.srcObject = stream;
    } catch (err) {
      setError("Camera access denied. Please try Gallery upload.");
      setIsCameraActive(false);
    }
  };

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const tracks = videoRef.current.srcObject.getTracks();
      tracks.forEach(track => track.stop());
    }
    setIsCameraActive(false);
  };

  const capturePhoto = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (video && canvas) {
      const context = canvas.getContext('2d');
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      context.drawImage(video, 0, 0, canvas.width, canvas.height);
      const dataUrl = canvas.toDataURL('image/jpeg');
      processImage(dataUrl, activeCaptureMode);
      stopCamera();
    }
  };

  const handleGalleryClick = (mode) => {
    setActiveCaptureMode(mode);
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        processImage(reader.result, activeCaptureMode);
      };
      reader.readAsDataURL(file);
    }
    e.target.value = null; // Reset for next selection
  };

  // --- Mock OCR Data Extraction ---
  const processImage = (dataUrl, mode) => {
    setPreviews(prev => ({ ...prev, [mode]: dataUrl }));
    
    // Simulate Data Extraction (OCR) if it's the ID Front
    if (mode === 'idFront') {
      setExtracting(true);
      setTimeout(() => {
        setProfile(prev => ({
          ...prev,
          fullName: "CHUKWUMA OKORIE", // Mock extracted data
          dob: "1992-05-14",
          address: "12 Independence Layout, Enugu State"
        }));
        setExtracting(false);
      }, 2000);
    }
  };

  // --- Workflow Handlers ---
  const handleSendOTP = () => {
    if (!phone) return setError("Please enter your phone number.");
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setIsOtpSent(true);
      setError(null);
    }, 1500);
  };

  const handleVerifyOTP = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setStep(1);
      setError(null);
    }, 1000);
  };

  const handleProfileSubmit = (e) => {
    e.preventDefault();
    setStep(2);
  };

  const handleSubmitFinal = () => {
    if (!previews.idFront || !previews.selfie) {
      return setError("ID Front and Selfie are required.");
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setStep(3);
    }, 2500);
  };

  // --- UI Components ---
  const StepIndicator = () => (
    <div className="flex items-center justify-between mb-8 px-2">
      {[0, 1, 2, 3].map((s) => (
        <div key={s} className="flex items-center">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${
            step >= s ? "bg-black text-white" : "bg-gray-200 text-gray-500"
          }`}>
            {step > s ? <CheckCircle size={16} /> : s + 1}
          </div>
          {s < 3 && <div className={`w-12 h-1 mx-2 rounded ${step > s ? "bg-black" : "bg-gray-200"}`} />}
        </div>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-[#F5F5F7] text-[#1D1D1F] font-sans p-4 md:p-8 flex items-center justify-center">
      <div className="w-full max-w-xl bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
        
        {/* Header */}
        <div className="p-8 pb-4">
          <h1 className="text-2xl font-bold tracking-tight">Identity Verification</h1>
          <p className="text-gray-400 text-sm mt-1">Extracting data from your ID for faster verification.</p>
        </div>

        <div className="p-8 pt-0">
          <StepIndicator />

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-100 rounded-2xl flex items-center gap-3 text-red-600 text-sm animate-pulse">
              <AlertCircle size={18} />
              {error}
            </div>
          )}

          {/* STEP 0: OTP */}
          {step === 0 && (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase text-gray-400 tracking-wider">Mobile Number</label>
                <div className="relative">
                  <Smartphone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                  <input 
                    type="tel"
                    placeholder="+234 800 000 0000"
                    className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:border-black transition-all"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>
              </div>

              {isOtpSent && (
                <div className="space-y-2 animate-in slide-in-from-top-2 duration-300">
                  <label className="text-xs font-bold uppercase text-gray-400 tracking-wider">OTP Code</label>
                  <input 
                    type="text"
                    maxLength={6}
                    placeholder="Enter 6-digit code"
                    className="w-full px-4 py-4 bg-gray-50 border border-gray-100 rounded-2xl text-center text-xl font-mono tracking-widest outline-none focus:border-black transition-all"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                  />
                </div>
              )}

              <button 
                onClick={isOtpSent ? handleVerifyOTP : handleSendOTP}
                disabled={loading}
                className="w-full py-4 bg-black text-white font-bold rounded-2xl hover:bg-gray-800 transition-all flex items-center justify-center gap-2 group"
              >
                {loading ? <Loader2 className="animate-spin" size={20} /> : (
                  <>
                    {isOtpSent ? "Verify Identity" : "Send Verification Code"}
                    <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>
            </div>
          )}

          {/* STEP 1: PROFILE / EXTRACTION RESULTS */}
          {step === 1 && (
            <form onSubmit={handleProfileSubmit} className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-500">
              <div className="bg-ash-50 p-4 rounded-2xl border border-gray-100 bg-gray-50 mb-2">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Extracted Profile</span>
                  <span className="text-[10px] font-bold text-green-600 uppercase bg-green-50 px-2 py-0.5 rounded">Auto-filled</span>
                </div>
                <p className="text-xs text-gray-500">Please confirm the data extracted from your ID matches your legal documents.</p>
              </div>

              <div className="grid grid-cols-1 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase text-gray-400">Full Name</label>
                  <input 
                    required
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl outline-none focus:border-black"
                    value={profile.fullName}
                    onChange={(e) => setProfile({...profile, fullName: e.target.value})}
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase text-gray-400">Date of Birth</label>
                  <input 
                    type="date"
                    required
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl outline-none focus:border-black"
                    value={profile.dob}
                    onChange={(e) => setProfile({...profile, dob: e.target.value})}
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase text-gray-400">Address</label>
                  <textarea 
                    required
                    rows={2}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl outline-none focus:border-black resize-none"
                    value={profile.address}
                    onChange={(e) => setProfile({...profile, address: e.target.value})}
                  />
                </div>
              </div>
              <button type="submit" className="w-full py-4 mt-4 bg-black text-white font-bold rounded-2xl flex items-center justify-center gap-2">
                Continue to Final Review <ArrowRight size={18} />
              </button>
            </form>
          )}

          {/* STEP 2: UPLOADS & GALLERY EXTRACTION */}
          {step === 2 && (
            <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
              <div className="grid grid-cols-2 gap-4">
                {/* ID FRONT CARD */}
                <div className="space-y-2">
                  <div 
                    className="group relative aspect-[3/2] border-2 border-dashed border-gray-200 rounded-2xl flex flex-col items-center justify-center bg-gray-50 overflow-hidden transition-all"
                  >
                    {extracting && activeCaptureMode === 'idFront' ? (
                      <div className="flex flex-col items-center">
                        <Loader2 className="animate-spin text-black mb-2" size={24} />
                        <span className="text-[10px] font-bold text-gray-400">Extracting ID...</span>
                      </div>
                    ) : previews.idFront ? (
                      <img src={previews.idFront} alt="ID Front" className="w-full h-full object-cover" />
                    ) : (
                      <div className="text-center">
                        <FileText className="text-gray-300 mx-auto mb-2" size={32} />
                        <span className="text-[10px] font-bold uppercase text-gray-400">ID Front</span>
                      </div>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => startCamera('idFront')} className="flex-1 py-2 bg-gray-100 rounded-lg flex items-center justify-center"><Camera size={14}/></button>
                    <button onClick={() => handleGalleryClick('idFront')} className="flex-1 py-2 bg-gray-100 rounded-lg flex items-center justify-center"><ImageIcon size={14}/></button>
                  </div>
                </div>

                {/* SELFIE CARD */}
                <div className="space-y-2">
                  <div 
                    className="group relative aspect-[3/2] border-2 border-dashed border-gray-200 rounded-2xl flex flex-col items-center justify-center bg-gray-50 overflow-hidden transition-all"
                  >
                    {previews.selfie ? (
                      <img src={previews.selfie} alt="Selfie" className="w-full h-full object-cover" />
                    ) : (
                      <div className="text-center">
                        <User className="text-gray-300 mx-auto mb-2" size={32} />
                        <span className="text-[10px] font-bold uppercase text-gray-400">Live Selfie</span>
                      </div>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => startCamera('selfie')} className="flex-1 py-2 bg-gray-100 rounded-lg flex items-center justify-center"><Camera size={14}/></button>
                    <button onClick={() => handleGalleryClick('selfie')} className="flex-1 py-2 bg-gray-100 rounded-lg flex items-center justify-center"><ImageIcon size={14}/></button>
                  </div>
                </div>
              </div>

              <div className="flex gap-4">
                <button onClick={() => setStep(1)} className="flex-1 py-4 bg-gray-100 text-gray-600 font-bold rounded-2xl">Back</button>
                <button 
                  onClick={handleSubmitFinal}
                  disabled={loading || extracting}
                  className="flex-[2] py-4 bg-black text-white font-bold rounded-2xl flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {loading ? <Loader2 className="animate-spin" size={20} /> : "Submit & Verify"}
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: STATUS */}
          {step === 3 && (
            <div className="py-12 text-center space-y-6 animate-in zoom-in-95 duration-700">
              <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mx-auto border-4 border-white shadow-lg relative">
                <Loader2 className="text-gray-200 animate-[spin_3s_linear_infinite]" size={64} />
                <FileText className="absolute text-black" size={32} />
              </div>
              <h2 className="text-2xl font-bold">Verification in Progress</h2>
              <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100 inline-block px-8">
                <span className="text-xs font-bold text-gray-400 uppercase tracking-widest block mb-1">Status</span>
                <span className="text-sm font-black text-gray-900">EXTRACTING & MATCHING</span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Hidden File Input for Gallery */}
      <input 
        type="file" 
        ref={fileInputRef} 
        className="hidden" 
        accept="image/*" 
        onChange={handleFileChange} 
      />

      {/* Camera Modal */}
      {isCameraActive && (
        <div className="fixed inset-0 z-50 bg-black flex flex-col items-center justify-center p-6">
          <div className="relative w-full max-w-lg aspect-[4/3] bg-black rounded-3xl overflow-hidden border border-white/10">
            <video ref={videoRef} autoPlay playsInline className={`w-full h-full object-cover ${activeCaptureMode === 'selfie' ? '-scale-x-100' : ''}`} />
            <div className="absolute inset-0 border-[30px] border-black/40 flex items-center justify-center">
              <div className={`border-2 border-white/50 border-dashed ${activeCaptureMode === 'selfie' ? 'w-48 h-64 rounded-full' : 'w-full h-full rounded-2xl'}`} />
            </div>
          </div>
          <div className="mt-8 flex gap-8 items-center">
            <button onClick={stopCamera} className="w-12 h-12 rounded-full bg-white/10 text-white flex items-center justify-center"><ArrowLeft /></button>
            <button onClick={capturePhoto} className="w-20 h-20 rounded-full bg-white flex items-center justify-center border-4 border-gray-400 shadow-xl"><Camera size={32}/></button>
            <div className="w-12" />
          </div>
        </div>
      )}

      <canvas ref={canvasRef} className="hidden" />
    </div>
  );
};

export default App;