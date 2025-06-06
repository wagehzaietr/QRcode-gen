import React, { useRef, useState } from "react";
import { QRCodeCanvas } from "qrcode.react";
import { toPng } from "html-to-image";
import { Download, Link2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import ScanMeBadge from "@/components/ScanMeBadge";
import { Helmet } from "react-helmet-async";

const CONTENT_TYPES = [
  { value: "url", label: "URL" },
  { value: "email", label: "Email" },
  { value: "phone", label: "Phone" },
  { value: "text", label: "Text/Notes" },
  { value: "location", label: "Location" },
  { value: "event", label: "Event" },
  { value: "wifi", label: "WiFi" },
];

export default function Generate({ darkMode }) {
  const [contentType, setContentType] = useState("url");
  const [fields, setFields] = useState({
    url: "",
    email: "",
    emailSubject: "",
    emailBody: "",
    phone: "",
    text: "",
    latitude: "",
    longitude: "",
    locationLabel: "",
    eventTitle: "",
    eventLocation: "",
    eventDescription: "",
    eventStart: "",
    eventEnd: "",
    wifiSSID: "",
    wifiPassword: "",
    wifiType: "WPA",
  });
  const [valid, setValid] = useState(false);
  const qrRef = useRef(null);

  // Generate QR value based on content type
  const getQRValue = () => {
    switch (contentType) {
      case "url":
        return fields.url.trim();
      case "email":
        if (!fields.email) return "";
        let mail = `mailto:${fields.email}`;
        const params = [];
        if (fields.emailSubject) params.push(`subject=${encodeURIComponent(fields.emailSubject)}`);
        if (fields.emailBody) params.push(`body=${encodeURIComponent(fields.emailBody)}`);
        if (params.length) mail += `?${params.join("&")}`;
        return mail;
      case "phone":
        return fields.phone ? `tel:${fields.phone}` : "";
      case "text":
        return fields.text;
      case "location":
        if (!fields.latitude || !fields.longitude) return "";
        return `geo:${fields.latitude},${fields.longitude}${fields.locationLabel ? `?q=${encodeURIComponent(fields.locationLabel)}` : ""}`;
      case "event":
        if (!fields.eventTitle || !fields.eventStart || !fields.eventEnd) return "";
        return `BEGIN:VCALENDAR\nVERSION:2.0\nBEGIN:VEVENT\nSUMMARY:${fields.eventTitle}\nDTSTART:${fields.eventStart.replace(/[-:]/g, "")}\nDTEND:${fields.eventEnd.replace(/[-:]/g, "")}\n${fields.eventLocation ? `LOCATION:${fields.eventLocation}\n` : ""}${fields.eventDescription ? `DESCRIPTION:${fields.eventDescription}\n` : ""}END:VEVENT\nEND:VCALENDAR`;
      case "wifi":
        if (!fields.wifiSSID) return "";
        return `WIFI:T:${fields.wifiType};S:${fields.wifiSSID};P:${fields.wifiPassword};${fields.wifiType === "nopass" ? "" : "H:false;"};`;
      default:
        return "";
    }
  };

  // Validation logic
  const validate = () => {
    switch (contentType) {
      case "url":
        try {
          new URL(fields.url.trim());
          return true;
        } catch {
          return false;
        }
      case "email":
        return !!fields.email;
      case "phone":
        return !!fields.phone;
      case "text":
        return !!fields.text;
      case "location":
        return !!fields.latitude && !!fields.longitude;
      case "event":
        return !!fields.eventTitle && !!fields.eventStart && !!fields.eventEnd;
      case "wifi":
        return !!fields.wifiSSID;
      default:
        return false;
    }
  };

  // Handle field changes
  const handleFieldChange = (e) => {
    const { name, value } = e.target;
    setFields((prev) => ({ ...prev, [name]: value }));
  };

  // Handle content type change
  const handleTypeChange = (e) => {
    setContentType(e.target.value);
    setValid(false);
  };

  React.useEffect(() => {
    setValid(validate());
    // eslint-disable-next-line
  }, [fields, contentType]);

  const downloadQR = async () => {
    if (!qrRef.current) return;
    try {
      const dataUrl = await toPng(qrRef.current, {
        cacheBust: true,
        backgroundColor: darkMode ? "#18181b" : "#ffffff",
      });
      const link = document.createElement("a");
      link.download = "qr-code.png";
      link.href = dataUrl;
      link.click();
    } catch (error) {
      console.error("QR download failed", error);
    }
  };

  // Dynamic form fields
  const renderFields = () => {
    switch (contentType) {
      case "url":
        return (
          <Input
            placeholder="Enter a valid URL"
            name="url"
            value={fields.url}
            onChange={handleFieldChange}
            className="text-lg mb-4"
          />
        );
      case "email":
        return (
          <div className="space-y-2 mb-4">
            <Input placeholder="Email address" name="email" value={fields.email} onChange={handleFieldChange} />
            <Input placeholder="Subject (optional)" name="emailSubject" value={fields.emailSubject} onChange={handleFieldChange} />
            <Input placeholder="Body (optional)" name="emailBody" value={fields.emailBody} onChange={handleFieldChange} />
          </div>
        );
      case "phone":
        return (
          <Input placeholder="Phone number" name="phone" value={fields.phone} onChange={handleFieldChange} className="text-lg mb-4" />
        );
      case "text":
        return (
          <textarea
            name="text"
            value={fields.text}
            onChange={handleFieldChange}
            placeholder="Enter your text or notes"
            className="w-full rounded-md border border-input bg-transparent px-3 py-2 text-base shadow-xs focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] mb-4 min-h-[80px] text-gray-900 dark:text-white dark:bg-zinc-800"
          />
        );
      case "location":
        return (
          <div className="space-y-2 mb-4">
            <Input placeholder="Latitude" name="latitude" value={fields.latitude} onChange={handleFieldChange} />
            <Input placeholder="Longitude" name="longitude" value={fields.longitude} onChange={handleFieldChange} />
            <Input placeholder="Label (optional)" name="locationLabel" value={fields.locationLabel} onChange={handleFieldChange} />
          </div>
        );
      case "event":
        return (
          <div className="space-y-2 mb-4">
            <Input placeholder="Event Title" name="eventTitle" value={fields.eventTitle} onChange={handleFieldChange} />
            <Input placeholder="Location (optional)" name="eventLocation" value={fields.eventLocation} onChange={handleFieldChange} />
            <Input placeholder="Description (optional)" name="eventDescription" value={fields.eventDescription} onChange={handleFieldChange} />
            <Input type="datetime-local" name="eventStart" value={fields.eventStart} onChange={handleFieldChange} />
            <Input type="datetime-local" name="eventEnd" value={fields.eventEnd} onChange={handleFieldChange} />
          </div>
        );
      case "wifi":
        return (
          <div className="space-y-2 mb-4">
            <Input placeholder="WiFi SSID" name="wifiSSID" value={fields.wifiSSID} onChange={handleFieldChange} />
            <Input placeholder="Password" name="wifiPassword" value={fields.wifiPassword} onChange={handleFieldChange} />
            <select
              name="wifiType"
              value={fields.wifiType}
              onChange={handleFieldChange}
              className="w-full rounded-md border border-input bg-transparent px-3 py-2 text-base shadow-xs focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] text-gray-900 dark:text-white dark:bg-zinc-800"
            >
              <option value="WPA">WPA/WPA2</option>
              <option value="WEP">WEP</option>
              <option value="nopass">No Password</option>
            </select>
          </div>
        );
      default:
        return null;
    }
  };

  const qrValue = getQRValue();

  return (
    <>
      <Helmet>
        <title>Generate QR Code for Any Content | RapidQR</title>
        <meta name="description" content="Generate a free QR code for any content: URL, email, phone, text, location, event, or WiFi. Download, customize, and share instantly. No sign-up required." />
        <meta property="og:title" content="Generate QR Code for Any Content | RapidQR" />
        <meta property="og:description" content="Generate a free QR code for any content: URL, email, phone, text, location, event, or WiFi. Download, customize, and share instantly. No sign-up required." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://yourdomain.com/generate" />
        <meta property="og:image" content="/logo1.jpg" />
      </Helmet>
      <section className="min-h-[80vh] flex flex-col items-center justify-center px-4 py-12">
        <div className="bg-white dark:bg-zinc-800 p-8 rounded-2xl shadow-2xl w-full max-w-xl transition-all duration-300">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-6 text-center">QR Code Generator</h1>
          <div className="mb-4">
            <label htmlFor="contentType" className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">Content Type</label>
            <select
              id="contentType"
              value={contentType}
              onChange={handleTypeChange}
              className="w-full rounded-md border border-input bg-transparent px-3 py-2 text-base shadow-xs focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] mb-2 text-gray-900 dark:text-white dark:bg-zinc-800"
            >
              {CONTENT_TYPES.map((type) => (
                <option key={type.value} value={type.value}>{type.label}</option>
              ))}
            </select>
          </div>
          {renderFields()}
          <AnimatePresence>
            {valid && qrValue && (
              <motion.div
                className="flex flex-col items-center space-y-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <div
                  ref={qrRef}
                  className="bg-white dark:bg-zinc-700 p-4 rounded-lg shadow relative"
                >
                  <QRCodeCanvas value={qrValue} size={200} />
                  <ScanMeBadge />
                </div>
                <div className="flex gap-4">
                  <Button onClick={downloadQR}>
                    <Download className="w-4 h-4 mr-2" /> Download
                  </Button>
                  <Button
                    variant="secondary"
                    onClick={() => navigator.clipboard.writeText(qrValue)}
                  >
                    <Link2 className="w-4 h-4 mr-2" /> Copy Content
                  </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          {!valid && qrValue && (
            <p className="text-red-500 mt-4 text-sm">Please fill all required fields for this content type.</p>
          )}
        </div>
      </section>
    </>
  );
} 