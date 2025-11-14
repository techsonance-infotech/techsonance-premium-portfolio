"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Send, CheckCircle2, MessageCircle, AlertCircle } from "lucide-react";
import { toast } from "sonner";
import { getIcon } from "@/lib/icon-map";
import contactData from "@/data/contact.json";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validateField = (name: string, value: string): string => {
    switch (name) {
      case "name":
        if (!value.trim()) return "Name is required";
        if (value.trim().length < 2) return "Name must be at least 2 characters";
        return "";
      case "email":
        if (!value.trim()) return "Email is required";
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) return "Please enter a valid email address";
        return "";
      case "subject":
        if (!value.trim()) return "Subject is required";
        if (value.trim().length < 3) return "Subject must be at least 3 characters";
        return "";
      case "message":
        if (!value.trim()) return "Message is required";
        if (value.trim().length < 10) return "Message must be at least 10 characters";
        return "";
      default:
        return "";
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate all fields
    const newErrors: Record<string, string> = {};
    Object.keys(formData).forEach((key) => {
      if (key !== "company") {
        const error = validateField(key, formData[key as keyof typeof formData]);
        if (error) newErrors[key] = error;
      }
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      toast.error("Please fix the errors in the form");
      return;
    }

    setIsSubmitting(true);
    setErrors({});

    try {
      const response = await fetch("/api/send-contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        toast.error(data.error || "Failed to send message");
        setIsSubmitting(false);
        return;
      }

      setIsSubmitted(true);
      toast.success("Message sent successfully!", {
        description: "We've received your message and will get back to you soon."
      });

      // Reset form
      setTimeout(() => {
        setFormData({
          name: "",
          email: "",
          company: "",
          subject: "",
          message: "",
        });
        setIsSubmitted(false);
      }, 3000);
    } catch (error) {
      console.error("Form submission error:", error);
      toast.error("Failed to send message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: "",
      });
    }
  };

  const handleBlur = (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    const error = validateField(name, value);
    if (error) {
      setErrors({
        ...errors,
        [name]: error,
      });
    }
  };

  return (
    <main className="min-h-screen w-full overflow-hidden bg-[#0A1A2F] antialiased bg-grid-white/[0.02] relative">
      {/* Animated gradient orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-0 left-1/4 w-96 h-96 bg-[#00C2FF] rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-float"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.15, 0.1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#00C2FF] rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-float"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.15, 0.1, 0.15],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
        />
      </div>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <motion.h1 
              className="bg-gradient-to-r from-[#00C2FF] via-white to-[#00C2FF] bg-clip-text text-4xl font-bold text-transparent md:text-7xl animate-gradient"
              animate={{
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "linear",
              }}
            >
              {contactData.hero.title}
            </motion.h1>
            <motion.p 
              className="mx-auto mt-6 max-w-3xl text-lg text-neutral-300 md:text-xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              {contactData.hero.description}
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="relative py-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {contactData.contactInfo.map((info, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ 
                  y: -10,
                  transition: { duration: 0.3 }
                }}
              >
                <Card className="border-[#00C2FF]/20 bg-white/[0.03] text-white backdrop-blur-lg relative overflow-hidden group hover:border-[#00C2FF]/50 transition-all duration-300 hover:shadow-[0_0_30px_rgba(0,194,255,0.3)]">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#00C2FF]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  <CardHeader className="relative">
                    <motion.div
                      whileHover={{ rotate: 360, scale: 1.1 }}
                      transition={{ duration: 0.6 }}
                    >
                      {getIcon(info.icon, "mb-2 h-8 w-8 text-[#00C2FF] drop-shadow-[0_0_10px_rgba(0,194,255,0.5)]")}
                    </motion.div>
                    <CardTitle className="text-white">{info.title}</CardTitle>
                    <CardDescription className="text-neutral-400">
                      {info.value}
                    </CardDescription>
                  </CardHeader>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Quick WhatsApp Contact Section */}
      <section className="relative py-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.02, transition: { duration: 0.3 } }}
            className="rounded-3xl border-2 border-[#25D366]/30 bg-white/[0.03] p-8 backdrop-blur-lg hover:border-[#25D366]/60 hover:shadow-[0_0_40px_rgba(37,211,102,0.3)] transition-all duration-300 relative overflow-hidden group"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-[#25D366]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            
            <div className="flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
              <div className="flex items-start gap-4 text-center md:text-left">
                <motion.div
                  whileHover={{ rotate: 360, scale: 1.1 }}
                  transition={{ duration: 0.6 }}
                  className="flex-shrink-0"
                >
                  <MessageCircle className="h-12 w-12 text-[#25D366] drop-shadow-[0_0_10px_rgba(37,211,102,0.5)]" />
                </motion.div>
                <div>
                  <h3 className="text-2xl font-bold text-white mb-2">Quick WhatsApp Contact</h3>
                  <p className="text-neutral-300">
                    Need immediate assistance? Chat with us directly on WhatsApp for instant responses.
                  </p>
                </div>
              </div>
              
              <motion.a
                href="https://wa.me/919173101711"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex-shrink-0"
              >
                <Button className="bg-[#25D366] hover:bg-[#20BD5A] text-white font-semibold px-8 py-6 text-lg shadow-[0_0_20px_rgba(37,211,102,0.3)] hover:shadow-[0_0_30px_rgba(37,211,102,0.5)] transition-all duration-300">
                  <MessageCircle className="mr-2 h-5 w-5" />
                  Chat on WhatsApp
                </Button>
              </motion.a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact Form & Offices */}
      <section className="relative py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <Card className="border-[#00C2FF]/20 bg-white/[0.03] text-white backdrop-blur-lg hover:shadow-[0_0_40px_rgba(0,194,255,0.2)] transition-shadow duration-300">
                <CardHeader>
                  <CardTitle className="text-2xl text-white bg-gradient-to-r from-[#00C2FF] to-white bg-clip-text text-transparent">
                    {contactData.form.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="name" className="text-white">
                        {contactData.form.fields.name.label} <span className="text-red-400">*</span>
                      </Label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={`border-[#00C2FF]/20 bg-white/[0.05] text-white placeholder:text-neutral-500 focus:border-[#00C2FF] focus:ring-[#00C2FF]/50 transition-all duration-300 hover:border-[#00C2FF]/40 ${
                          errors.name ? "border-red-500 focus:border-red-500 focus:ring-red-500/50" : ""
                        }`}
                        placeholder={contactData.form.fields.name.placeholder}
                      />
                      {errors.name && (
                        <p className="text-red-400 text-sm flex items-center gap-1">
                          <AlertCircle className="h-3 w-3" />
                          {errors.name}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-white">
                        {contactData.form.fields.email.label} <span className="text-red-400">*</span>
                      </Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={`border-[#00C2FF]/20 bg-white/[0.05] text-white placeholder:text-neutral-500 focus:border-[#00C2FF] focus:ring-[#00C2FF]/50 transition-all duration-300 hover:border-[#00C2FF]/40 ${
                          errors.email ? "border-red-500 focus:border-red-500 focus:ring-red-500/50" : ""
                        }`}
                        placeholder={contactData.form.fields.email.placeholder}
                      />
                      {errors.email && (
                        <p className="text-red-400 text-sm flex items-center gap-1">
                          <AlertCircle className="h-3 w-3" />
                          {errors.email}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="company" className="text-white">
                        {contactData.form.fields.company.label}
                      </Label>
                      <Input
                        id="company"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        className="border-[#00C2FF]/20 bg-white/[0.05] text-white placeholder:text-neutral-500 focus:border-[#00C2FF] focus:ring-[#00C2FF]/50 transition-all duration-300 hover:border-[#00C2FF]/40"
                        placeholder={contactData.form.fields.company.placeholder}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="subject" className="text-white">
                        {contactData.form.fields.subject.label} <span className="text-red-400">*</span>
                      </Label>
                      <Input
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={`border-[#00C2FF]/20 bg-white/[0.05] text-white placeholder:text-neutral-500 focus:border-[#00C2FF] focus:ring-[#00C2FF]/50 transition-all duration-300 hover:border-[#00C2FF]/40 ${
                          errors.subject ? "border-red-500 focus:border-red-500 focus:ring-red-500/50" : ""
                        }`}
                        placeholder={contactData.form.fields.subject.placeholder}
                      />
                      {errors.subject && (
                        <p className="text-red-400 text-sm flex items-center gap-1">
                          <AlertCircle className="h-3 w-3" />
                          {errors.subject}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message" className="text-white">
                        {contactData.form.fields.message.label} <span className="text-red-400">*</span>
                      </Label>
                      <Textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        rows={6}
                        className={`border-[#00C2FF]/20 bg-white/[0.05] text-white placeholder:text-neutral-500 focus:border-[#00C2FF] focus:ring-[#00C2FF]/50 transition-all duration-300 hover:border-[#00C2FF]/40 resize-none ${
                          errors.message ? "border-red-500 focus:border-red-500 focus:ring-red-500/50" : ""
                        }`}
                        placeholder={contactData.form.fields.message.placeholder}
                      />
                      {errors.message && (
                        <p className="text-red-400 text-sm flex items-center gap-1">
                          <AlertCircle className="h-3 w-3" />
                          {errors.message}
                        </p>
                      )}
                    </div>

                    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                      <Button
                        type="submit"
                        disabled={isSubmitting || isSubmitted}
                        className="w-full bg-gradient-to-r from-[#00C2FF] to-[#0066FF] text-[#0A1A2F] hover:shadow-[0_0_30px_rgba(0,194,255,0.5)] transition-all duration-300 font-semibold disabled:opacity-50 relative overflow-hidden group"
                      >
                        <span className="relative z-10 flex items-center justify-center">
                          {isSubmitting ? (
                            <>
                              <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                className="mr-2 h-4 w-4 rounded-full border-2 border-[#0A1A2F] border-t-transparent"
                              />
                              Sending...
                            </>
                          ) : isSubmitted ? (
                            <>
                              <CheckCircle2 className="mr-2 h-4 w-4" />
                              Message Sent!
                            </>
                          ) : (
                            <>
                              <Send className="mr-2 h-4 w-4" />
                              {contactData.form.submitButton}
                            </>
                          )}
                        </span>
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                          animate={{
                            x: ["-100%", "200%"],
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "linear",
                          }}
                        />
                      </Button>
                    </motion.div>
                  </form>
                </CardContent>
              </Card>
            </motion.div>

            {/* Office Locations */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-6"
            >
              <div>
                <h2 className="mb-6 text-3xl font-bold text-white bg-gradient-to-r from-[#00C2FF] to-white bg-clip-text text-transparent">
                  Our Offices
                </h2>
                <div className="space-y-4">
                  {contactData.offices.map((office, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      whileHover={{ 
                        x: 10,
                        transition: { duration: 0.3 }
                      }}
                    >
                      <Card className="border-[#00C2FF]/20 bg-white/[0.03] text-white backdrop-blur-lg group hover:border-[#00C2FF]/50 transition-all duration-300 hover:shadow-[0_0_30px_rgba(0,194,255,0.3)] relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-br from-[#00C2FF]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        
                        <CardHeader className="relative">
                          <CardTitle className="text-white group-hover:text-[#00C2FF] transition-colors duration-300">
                            {office.title}
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2 relative">
                          <p className="text-sm text-neutral-300">{office.address}</p>
                          <p className="text-sm text-neutral-300">{office.city}</p>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="relative py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="overflow-hidden rounded-3xl border-2 border-[#00C2FF]/20 bg-white/[0.03] hover:border-[#00C2FF]/50 transition-all duration-300 hover:shadow-[0_0_40px_rgba(0,194,255,0.3)] group"
          >
            <div className="relative h-96 w-full">
              <iframe
                src={contactData.map.embed}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="grayscale group-hover:grayscale-0 transition-all duration-500"
              />
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}