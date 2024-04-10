import React, { useState, useRef } from "react";

const QRScanner = () => {
  const [mediaStream, setMediaStream] = useState(null);
  const [capturedImage, setCapturedImage] = useState(null);
  const videoRef = useRef();
  const canvasRef = useRef();

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      videoRef.current.srcObject = stream;
      setMediaStream(stream);
    } catch (err) {
      console.error("Error accessing camera:", err);
    }
  };

  const captureImage = async () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;

    // Ensure that video is loaded
    if (!video.videoWidth || !video.videoHeight) {
      alert("Video is not loaded yet!");
      return;
    }

    // Set canvas dimensions to match video dimensions
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    // Draw the current frame from the video onto the canvas
    const context = canvas.getContext("2d");
    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    // Convert canvas content to Blob representing the image
    const blob = await new Promise((resolve) => {
      canvas.toBlob((blob) => {
        resolve(blob);
      }, "image/png");
    });

    setCapturedImage(blob);
    stopCamera();
  };

  const stopCamera = () => {
    if (mediaStream) {
      mediaStream.getTracks().forEach((track) => track.stop());
      setMediaStream(null);
    }
  };

  const verifyTicket = async () => {
    try {
      if (!capturedImage) {
        console.error("No captured image to verify.");
        return;
      }

      const formData = new FormData();
      formData.append("image", capturedImage, "captured_image.png");

      const response = await fetch("http://localhost:5000/api/v1/decode-qr", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data);
      } else {
        console.error("Failed to verify ticket:", response.statusText);
      }
    } catch (error) {
      console.error("Error verifying ticket:", error);
    }
  };

  const recaptureImage = () => {
    setCapturedImage(null);
    startCamera();
  };

  return (
    <div>
      {!capturedImage && (
        <>
          <button onClick={startCamera}>Start Camera</button>
          <br />
          <video
            ref={videoRef}
            autoPlay
            playsInline
            style={{ maxWidth: "100%" }}
          />
          <br />
          <button onClick={captureImage}>Capture</button>
        </>
      )}
      {capturedImage && (
        <>
          <img
            src={URL.createObjectURL(capturedImage)}
            alt="Captured"
            style={{ maxWidth: "100%" }}
          />
          <br />
          <button onClick={verifyTicket}>Verify Ticket</button>
          <button onClick={recaptureImage}>Recapture</button>
        </>
      )}
      <canvas ref={canvasRef} style={{ display: "none" }}></canvas>
    </div>
  );
};

export default QRScanner;