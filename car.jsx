import React, { useState, useRef, useEffect } from "react";

export default function KYCPage({ userId }) {
  const [step, setStep] = useState(0);

  // Phone & OTP
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [phoneSent, setPhoneSent] = useState(false);
  const [phoneVerified, setPhoneVerified] = useState(false);

  // Profile info
  const [fullName, setFullName] = useState("");
  const [dob, setDob] = useState("");
  const [address, setAddress] = useState("");
  const [nextOfKin, setNextOfKin] = useState("");

  const [idType, setIdType] = useState("nin");

  // Images
  const [idFrontBlob, setIdFrontBlob] = useState(null);
  const [idBackBlob, setIdBackBlob] = useState(null);
  const [selfieBlob, setSelfieBlob] = useState(null);

  const [previewFront, setPreviewFront] = useState(null);
  const [previewBack, setPreviewBack] = useState(null);
  const [previewSelfie, setPreviewSelfie] = useState(null);

  // Camera
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [cameraOn, setCameraOn] = useState(false);
  const [stream, setStream] = useState(null);

  // Upload & KYC
  const [uploading, setUploading] = useState(false);
  const [kycProfileId, setKycProfileId] = useState(null);
  const [kycStatus, setKycStatus] = useState(null);
  const [error, setError] = useState(null);

  // Cleanup camera on unmount
  useEffect(() => {
    return () => stopCamera();
  }, []);

  // Start camera
  async function startCamera() {
    setError(null);

    try {
      if (!videoRef.current) return;

      const s = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "user" },
        audio: false,
      });

      videoRef.current.srcObject = s;
      await videoRef.current.play();

      setStream(s);
      setCameraOn(true);
    } catch (e) {
      console.error("Camera error:", e);
      setError("Unable to access camera. Please enable camera permissions.");
    }
  }

  // Stop camera
  function stopCamera() {
    try {
      if (stream) {
        stream.getTracks().forEach((t) => t.stop());
      }
      setStream(null);
      setCameraOn(false);
    } catch {}
  }

  // Capture an image from video
  function captureToBlob() {
    if (!videoRef.current || !canvasRef.current) return null;

    const video = videoRef.current;
    const canvas = canvasRef.current;

    const ctx = canvas.getContext("2d");

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    return new Promise((resolve) => {
      canvas.toBlob((blob) => resolve(blob), "image/jpeg", 0.85);
    });
  }

  // Handlers for capturing
  async function handleCaptureIdFront() {
    const blob = await captureToBlob();
    if (!blob) return;
    setIdFrontBlob(blob);
    setPreviewFront(URL.createObjectURL(blob));
    stopCamera();
  }

  async function handleCaptureIdBack() {
    const blob = await captureToBlob();
    if (!blob) return;
    setIdBackBlob(blob);
    setPreviewBack(URL.createObjectURL(blob));
    stopCamera();
  }

  async function handleCaptureSelfie() {
    const blob = await captureToBlob();
    if (!blob) return;
    setSelfieBlob(blob);
    setPreviewSelfie(URL.createObjectURL(blob));
    stopCamera();
  }

  // File upload (manual upload)
  function handleFileInput(e, target) {
    const file = e.target.files[0];
    if (!file) return;

    if (target === "front") {
      setIdFrontBlob(file);
      setPreviewFront(URL.createObjectURL(file));
    } else if (target === "back") {
      setIdBackBlob(file);
      setPreviewBack(URL.createObjectURL(file));
    } else if (target === "selfie") {
      setSelfieBlob(file);
      setPreviewSelfie(URL.createObjectURL(file));
    }
  }

  // OTP
  async function requestOtp() {
    setError(null);

    try {
      const res = await fetch("/api/v1/auth/request-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone }),
      });

      const j = await res.json();
      if (!res.ok) throw new Error(j.message || "Failed to send OTP");

      setPhoneSent(true);
    } catch (e) {
      setError(e.message);
    }
  }

  async function verifyOtp() {
    setError(null);

    try {
      const res = await fetch("/api/v1/auth/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone, otp }),
      });

      const j = await res.json();
      if (!res.ok) throw new Error(j.message || "Invalid OTP");

      setPhoneVerified(true);
    } catch (e) {
      setError(e.message);
    }
  }

  // Create a KYC profile
  async function createKycProfile() {
    setError(null);

    try {
      const res = await fetch("/api/v1/kyc/start", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName,
          dob,
          address,
          nextOfKin,
          phone,
        }),
      });

      const j = await res.json();
      if (!res.ok) throw new Error(j.message || "Failed to create KYC profile");

      setKycProfileId(j.kyc_profile_id || j.id);
      setStep(2);
    } catch (e) {
      setError(e.message);
    }
  }

  // Upload documents
  async function uploadDocument(documentType, blob) {
    const form = new FormData();
    form.append("file", blob, `${documentType}.jpg`);
    form.append("documentType", documentType);
    form.append("kycProfileId", kycProfileId);

    const res = await fetch("/api/v1/kyc/upload", {
      method: "POST",
      body: form,
    });

    const j = await res.json().catch(() => ({}));
    if (!res.ok) throw new Error(j.message || "Upload failed");

    return j;
  }

  // Submit KYC
  async function handleSubmitKyc() {
    setUploading(true);
    setError(null);

    try {
      if (!kycProfileId) {
        await createKycProfile();
        if (!kycProfileId) return;
      }

      if (idFrontBlob) await uploadDocument("id_front", idFrontBlob);
      if (idBackBlob) await uploadDocument("id_back", idBackBlob);
      if (selfieBlob) await uploadDocument("selfie", selfieBlob);

      const res = await fetch("/api/v1/kyc/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          kyc_profile_id: kycProfileId,
          id_type: idType,
        }),
      });

      const j = await res.json();
      if (!res.ok) throw new Error(j.message || "Submit failed");

      setKycStatus(j.status || "processing");
      setStep(3);

      pollKycStatus();
    } catch (e) {
      setError(e.message);
    } finally {
      setUploading(false);
    }
  }

  // Poll KYC Status
  function pollKycStatus() {
    if (!kycProfileId) return;

    const poll = async () => {
      const res = await fetch(`/api/v1/kyc/status?kycProfileId=${kycProfileId}`);
      if (!res.ok) return;

      const j = await res.json();
      setKycStatus(j.status);

      // Stop polling when result is final
      if (["verified", "failed", "manual_review"].includes(j.status)) return;

      setTimeout(poll, 2000);
    };

    poll();
  }

  // Step navigation items
  function StepNav() {
    const steps = ["OTP", "Profile", "Upload", "Status"];

    return (
      <div className="flex gap-2 mb-4">
        {steps.map((label, index) => (
          <div
            key={label}
            className={`px-3 py-1 rounded-full text-sm ${
              index === step ? "bg-blue-600 text-white" : "bg-gray-200"
            }`}
          >
            {label}
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-6">
      <StepNav />

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 p-3 rounded mb-4">
          {error}
        </div>
      )}

      {/* OTP STEP */}
      {step === 0 && (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Phone Verification</h2>

          <input
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="+2348012345678"
            className="w-full p-3 bg-gray-100 border rounded"
          />

          {!phoneSent ? (
            <button
              onClick={requestOtp}
              className="px-4 py-2 bg-blue-600 text-white rounded"
            >
              Send OTP
            </button>
          ) : (
            <>
              <input
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                placeholder="Enter OTP"
                className="w-full p-3 bg-gray-100 border rounded"
              />
              <div className="flex gap-2">
                <button
                  onClick={verifyOtp}
                  className="px-4 py-2 bg-green-600 text-white rounded"
                >
                  Verify OTP
                </button>

                <button
                  onClick={() => {
                    setPhoneSent(false);
                    setOtp("");
                  }}
                  className="px-4 py-2 bg-gray-200 rounded"
                >
                  Resend
                </button>
              </div>
            </>
          )}

          {phoneVerified && (
            <div>
              <p className="text-green-700 font-medium">Phone Verified ✔</p>
              <button
                onClick={() => setStep(1)}
                className="mt-2 px-4 py-2 bg-blue-600 text-white rounded"
              >
                Continue
              </button>
            </div>
          )}
        </div>
      )}

      {/* PROFILE STEP */}
      {step === 1 && (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Profile Details</h2>

          <input
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            placeholder="Full Name"
            className="w-full p-3 bg-gray-100 border rounded"
          />

          <input
            type="date"
            value={dob}
            onChange={(e) => setDob(e.target.value)}
            className="w-full p-3 bg-gray-100 border rounded"
          />

          <input
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Home Address"
            className="w-full p-3 bg-gray-100 border rounded"
          />

          <input
            value={nextOfKin}
            onChange={(e) => setNextOfKin(e.target.value)}
            placeholder="Next of Kin Phone"
            className="w-full p-3 bg-gray-100 border rounded"
          />

          <select
            value={idType}
            onChange={(e) => setIdType(e.target.value)}
            className="w-full p-3 bg-white border rounded"
          >
            <option value="nin">NIN</option>
            <option value="drivers_license">Driver's License</option>
            <option value="passport">International Passport</option>
            <option value="voters_card">Voter's Card</option>
          </select>

          <div className="flex gap-2">
            <button
              onClick={createKycProfile}
              className="px-4 py-2 bg-blue-600 text-white rounded"
            >
              Save & Continue
            </button>

            <button
              onClick={() => setStep(0)}
              className="px-4 py-2 bg-gray-300 rounded"
            >
              Back
            </button>
          </div>
        </div>
      )}

      {/* UPLOAD STEP */}
      {step === 2 && (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Upload ID + Selfie</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* ID FRONT */}
            <div className="p-4 border rounded">
              <h3 className="font-medium mb-2">ID Front</h3>

              {previewFront ? (
                <img src={previewFront} className="w-full h-48 object-contain" />
              ) : (
                <div className="w-full h-48 bg-gray-100 flex items-center justify-center text-gray-500">
                  No Image
                </div>
              )}

              <div className="mt-3 flex gap-2">
                {!cameraOn && (
                  <button
                    onClick={startCamera}
                    className="px-3 py-1 bg-blue-600 text-white rounded"
                  >
                    Start Camera
                  </button>
                )}

                {cameraOn && (
                  <button
                    onClick={handleCaptureIdFront}
                    className="px-3 py-1 bg-green-600 text-white rounded"
                  >
                    Capture
                  </button>
                )}

                <label className="px-3 py-1 bg-gray-200 rounded cursor-pointer">
                  Upload
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleFileInput(e, "front")}
                    className="hidden"
                  />
                </label>
              </div>
            </div>

            {/* ID BACK */}
            <div className="p-4 border rounded">
              <h3 className="font-medium mb-2">ID Back (Optional)</h3>

              {previewBack ? (
                <img src={previewBack} className="w-full h-48 object-contain" />
              ) : (
                <div className="w-full h-48 bg-gray-100 flex items-center justify-center text-gray-500">
                  No Image
                </div>
              )}

              <div className="mt-3 flex gap-2">
                {!cameraOn && (
                  <button
                    onClick={startCamera}
                    className="px-3 py-1 bg-blue-600 text-white rounded"
                  >
                    Start Camera
                  </button>
                )}

                {cameraOn && (
                  <button
                    onClick={handleCaptureIdBack}
                    className="px-3 py-1 bg-green-600 text-white rounded"
                  >
                    Capture
                  </button>
                )}

                <label className="px-3 py-1 bg-gray-200 rounded cursor-pointer">
                  Upload
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleFileInput(e, "back")}
                    className="hidden"
                  />
                </label>
              </div>
            </div>

            {/* SELFIE */}
            <div className="p-4 border rounded md:col-span-2">
              <h3 className="font-medium mb-2">Selfie (With ID)</h3>

              <div className="flex gap-4">
                <div className="flex-1">
                  {previewSelfie ? (
                    <img
                      src={previewSelfie}
                      className="w-full h-52 object-contain"
                    />
                  ) : (
                    <div className="w-full h-52 bg-gray-100 flex items-center justify-center text-gray-500">
                      No Selfie
                    </div>
                  )}
                </div>

                <div className="w-56">
                  <video
                    ref={videoRef}
                    className="w-full h-36 bg-black rounded"
                    autoPlay
                    muted
                    playsInline
                  />

                  <canvas ref={canvasRef} className="hidden" />

                  <div className="mt-2 flex gap-2">
                    {!cameraOn ? (
                      <button
                        onClick={startCamera}
                        className="px-3 py-1 bg-blue-600 text-white rounded"
                      >
                        Start
                      </button>
                    ) : (
                      <>
                        <button
                          onClick={handleCaptureSelfie}
                          className="px-3 py-1 bg-green-600 text-white rounded"
                        >
                          Capture
                        </button>
                        <button
                          onClick={stopCamera}
                          className="px-3 py-1 bg-gray-300 rounded"
                        >
                          Stop
                        </button>
                      </>
                    )}
                  </div>

                  <label className="mt-2 block px-3 py-1 bg-gray-200 rounded cursor-pointer">
                    Upload Selfie
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleFileInput(e, "selfie")}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>
            </div>
          </div>

          <button
            disabled={uploading}
            onClick={handleSubmitKyc}
            className="px-4 py-2 bg-blue-600 text-white rounded"
          >
            {uploading ? "Submitting..." : "Submit for Verification"}
          </button>

          <button
            onClick={() => setStep(1)}
            className="px-4 py-2 bg-gray-300 rounded ml-2"
          >
            Back
          </button>
        </div>
      )}

      {/* STATUS STEP */}
      {step === 3 && (
        <div>
          <h2 className="text-xl font-semibold">KYC Status</h2>

          <p className="mt-2">
            Status:{" "}
            <strong className="text-blue-700">
              {kycStatus || "Processing"}
            </strong>
          </p>

          {kycStatus === "verified" && (
            <div className="p-4 mt-3 bg-green-100 text-green-800 rounded">
              ✔ Your KYC has been verified!
            </div>
          )}

          {kycStatus === "failed" && (
            <div className="p-4 mt-3 bg-red-100 text-red-800 rounded">
              ❌ KYC verification failed. Try again.
            </div>
          )}

          {kycStatus === "manual_review" && (
            <div className="p-4 mt-3 bg-yellow-100 text-yellow-800 rounded">
              🔍 Your documents are under manual review.
            </div>
          )}

          <button
            onClick={() => setStep(2)}
            className="mt-4 px-4 py-2 bg-gray-300 rounded"
          >
            Retry
          </button>
        </div>
      )}
    </div>
  );
}
