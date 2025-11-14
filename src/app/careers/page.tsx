"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Briefcase, MapPin, Clock, DollarSign, Send, CheckCircle2, Loader2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import positionsData from "@/data/positions.json";

interface Position {
  id: number;
  title: string;
  department: string;
  location: string;
  employmentType: string;
  description: string;
  requirements: string[];
  responsibilities: string[];
  salaryRange: string | null;
  status: string;
  postedDate: string;
}

interface ApplicationForm {
  name: string;
  email: string;
  phone: string;
  experienceYears: string;
  linkedinUrl: string;
  coverLetter: string;
  resumeFile: File | null;
}

export default function CareersPage() {
  const [positions, setPositions] = useState<Position[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedPosition, setSelectedPosition] = useState<Position | null>(null);
  const [showApplicationDialog, setShowApplicationDialog] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<ApplicationForm>({
    name: "",
    email: "",
    phone: "",
    experienceYears: "",
    linkedinUrl: "",
    coverLetter: "",
    resumeFile: null,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    setLoading(true);
    try {
      const openPositions = positionsData.positions.filter(
        (pos) => pos.status.toLowerCase() === "open"
      );
      setPositions(openPositions);
    } catch (error) {
      console.error("Failed to load positions:", error);
      toast.error("Failed to load job positions");
    } finally {
      setLoading(false);
    }
  }, []);

  const handleApplyClick = (position: Position) => {
    setSelectedPosition(position);
    setShowApplicationDialog(true);
  };

  const validateField = (name: string, value: string): string => {
    switch (name) {
      case "name":
        if (!value.trim() || value.trim().length < 2) return "Name must be at least 2 characters";
        return "";
      case "email":
        if (!value.trim()) return "Email is required";
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) return "Please enter a valid email address";
        return "";
      case "phone":
        if (!value.trim() || value.trim().length < 10) return "Phone must be at least 10 digits";
        return "";
      default:
        return "";
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setErrors({ ...errors, resumeFile: "File size must be less than 5MB" });
        return;
      }
      const allowedTypes = ["application/pdf", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"];
      if (!allowedTypes.includes(file.type)) {
        setErrors({ ...errors, resumeFile: "Only PDF and Word documents are allowed" });
        return;
      }
      setFormData({ ...formData, resumeFile: file });
      setErrors({ ...errors, resumeFile: "" });
    }
  };

  const convertFileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors: Record<string, string> = {};
    newErrors.name = validateField("name", formData.name);
    newErrors.email = validateField("email", formData.email);
    newErrors.phone = validateField("phone", formData.phone);
    
    if (!formData.resumeFile) {
      newErrors.resumeFile = "Resume is required";
    }

    const hasErrors = Object.values(newErrors).some((error) => error !== "");
    if (hasErrors) {
      setErrors(newErrors);
      toast.error("Please fix the errors in the form");
      return;
    }

    setIsSubmitting(true);

    try {
      const resumeBase64 = await convertFileToBase64(formData.resumeFile!);

      // Send application email directly
      const response = await fetch("/api/send-application", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          positionId: selectedPosition!.id,
          positionTitle: selectedPosition!.title,
          name: formData.name.trim(),
          email: formData.email.trim(),
          phone: formData.phone.trim(),
          resumeBase64,
          resumeFileName: formData.resumeFile!.name,
          coverLetter: formData.coverLetter.trim() || null,
          linkedinUrl: formData.linkedinUrl.trim() || null,
          experienceYears: formData.experienceYears ? parseInt(formData.experienceYears) : null,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        toast.error(data.error || "Failed to submit application");
        return;
      }

      toast.success("Application submitted successfully!", {
        description: "We've received your application and will get back to you soon.",
      });

      setFormData({
        name: "",
        email: "",
        phone: "",
        experienceYears: "",
        linkedinUrl: "",
        coverLetter: "",
        resumeFile: null,
      });
      setShowApplicationDialog(false);
      setSelectedPosition(null);
    } catch (error) {
      console.error("Application submission error:", error);
      toast.error("Failed to submit application. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen w-full overflow-hidden bg-[#0A1A2F] antialiased bg-grid-white/[0.02] relative">
      {/* Animated gradient orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-0 left-1/4 w-96 h-96 bg-[#00C2FF] rounded-full mix-blend-multiply filter blur-3xl opacity-10"
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
          className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#00C2FF] rounded-full mix-blend-multiply filter blur-3xl opacity-10"
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
              className="bg-gradient-to-r from-[#00C2FF] via-white to-[#00C2FF] bg-clip-text text-4xl font-bold text-transparent md:text-7xl"
              animate={{
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "linear",
              }}
              style={{ backgroundSize: "200% 200%" }}
            >
              Join Our Team
            </motion.h1>
            <motion.p
              className="mx-auto mt-6 max-w-3xl text-lg text-neutral-300 md:text-xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              Be part of a dynamic team building cutting-edge technology solutions. 
              Explore exciting career opportunities and grow with us.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Job Positions Section */}
      <section className="relative py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <h2 className="text-3xl font-bold text-white mb-4 bg-gradient-to-r from-[#00C2FF] to-white bg-clip-text text-transparent">
              Open Positions
            </h2>
            <p className="text-neutral-300">
              {loading ? "Loading positions..." : `${positions.length} position${positions.length !== 1 ? 's' : ''} available`}
            </p>
          </motion.div>

          {loading ? (
            <div className="flex justify-center items-center py-20">
              <Loader2 className="h-8 w-8 text-[#00C2FF] animate-spin" />
            </div>
          ) : positions.length === 0 ? (
            <Card className="border-[#00C2FF]/20 bg-white/[0.03] text-white backdrop-blur-lg">
              <CardContent className="py-20 text-center">
                <p className="text-neutral-300 text-lg">
                  No open positions at the moment. Check back soon!
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 gap-6">
              {positions.map((position, index) => (
                <motion.div
                  key={position.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                >
                  <Card className="border-[#00C2FF]/20 bg-white/[0.03] text-white backdrop-blur-lg hover:border-[#00C2FF]/50 transition-all duration-300 hover:shadow-[0_0_30px_rgba(0,194,255,0.3)] group">
                    <CardHeader>
                      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                        <div className="flex-1">
                          <CardTitle className="text-2xl text-white group-hover:text-[#00C2FF] transition-colors duration-300">
                            {position.title}
                          </CardTitle>
                          <CardDescription className="mt-2 flex flex-wrap gap-3 text-neutral-400">
                            <span className="flex items-center gap-1">
                              <Briefcase className="h-4 w-4" />
                              {position.department}
                            </span>
                            <span className="flex items-center gap-1">
                              <MapPin className="h-4 w-4" />
                              {position.location}
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock className="h-4 w-4" />
                              {position.employmentType}
                            </span>
                            {position.salaryRange && (
                              <span className="flex items-center gap-1">
                                <DollarSign className="h-4 w-4" />
                                {position.salaryRange}
                              </span>
                            )}
                          </CardDescription>
                        </div>
                        <Badge className="bg-[#00C2FF]/20 text-[#00C2FF] hover:bg-[#00C2FF]/30 border-[#00C2FF]/30">
                          {position.status}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <p className="text-neutral-300 line-clamp-3">
                          {position.description}
                        </p>
                      </div>

                      <div className="space-y-2">
                        <h4 className="text-white font-semibold">Key Requirements:</h4>
                        <ul className="list-disc list-inside space-y-1 text-neutral-300 text-sm">
                          {position.requirements.slice(0, 3).map((req, idx) => (
                            <li key={idx}>{req}</li>
                          ))}
                        </ul>
                      </div>

                      <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                        <Button
                          onClick={() => handleApplyClick(position)}
                          className="w-full bg-gradient-to-r from-[#00C2FF] to-[#0066FF] text-[#0A1A2F] hover:shadow-[0_0_30px_rgba(0,194,255,0.5)] transition-all duration-300 font-semibold"
                        >
                          <Send className="mr-2 h-4 w-4" />
                          Apply Now
                        </Button>
                      </motion.div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Application Dialog */}
      <Dialog open={showApplicationDialog} onOpenChange={setShowApplicationDialog}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto border-[#00C2FF]/20 bg-[#0A1A2F] text-white">
          <DialogHeader>
            <DialogTitle className="text-2xl bg-gradient-to-r from-[#00C2FF] to-white bg-clip-text text-transparent">
              Apply for {selectedPosition?.title}
            </DialogTitle>
            <DialogDescription className="text-neutral-400">
              Fill in your details and upload your resume to apply for this position.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-4 mt-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-white">
                Full Name <span className="text-red-400">*</span>
              </Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className={`border-[#00C2FF]/20 bg-white/[0.05] text-white placeholder:text-neutral-500 focus:border-[#00C2FF] ${
                  errors.name ? "border-red-500" : ""
                }`}
                placeholder="John Doe"
              />
              {errors.name && <p className="text-red-400 text-sm">{errors.name}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-white">
                Email <span className="text-red-400">*</span>
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                className={`border-[#00C2FF]/20 bg-white/[0.05] text-white placeholder:text-neutral-500 focus:border-[#00C2FF] ${
                  errors.email ? "border-red-500" : ""
                }`}
                placeholder="john@example.com"
              />
              {errors.email && <p className="text-red-400 text-sm">{errors.email}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone" className="text-white">
                Phone Number <span className="text-red-400">*</span>
              </Label>
              <Input
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className={`border-[#00C2FF]/20 bg-white/[0.05] text-white placeholder:text-neutral-500 focus:border-[#00C2FF] ${
                  errors.phone ? "border-red-500" : ""
                }`}
                placeholder="+91 9876543210"
              />
              {errors.phone && <p className="text-red-400 text-sm">{errors.phone}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="experienceYears" className="text-white">
                Years of Experience
              </Label>
              <Input
                id="experienceYears"
                name="experienceYears"
                type="number"
                min="0"
                value={formData.experienceYears}
                onChange={handleInputChange}
                className="border-[#00C2FF]/20 bg-white/[0.05] text-white placeholder:text-neutral-500 focus:border-[#00C2FF]"
                placeholder="5"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="linkedinUrl" className="text-white">
                LinkedIn Profile URL
              </Label>
              <Input
                id="linkedinUrl"
                name="linkedinUrl"
                value={formData.linkedinUrl}
                onChange={handleInputChange}
                className="border-[#00C2FF]/20 bg-white/[0.05] text-white placeholder:text-neutral-500 focus:border-[#00C2FF]"
                placeholder="https://linkedin.com/in/yourprofile"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="resumeFile" className="text-white">
                Resume <span className="text-red-400">*</span>
              </Label>
              <div className="flex items-center gap-2">
                <Input
                  id="resumeFile"
                  name="resumeFile"
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={handleFileChange}
                  className={`border-[#00C2FF]/20 bg-white/[0.05] text-white file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-[#00C2FF] file:text-[#0A1A2F] hover:file:bg-[#00A8E6] ${
                    errors.resumeFile ? "border-red-500" : ""
                  }`}
                />
              </div>
              <p className="text-xs text-neutral-400">PDF or Word document (Max 5MB)</p>
              {formData.resumeFile && (
                <p className="text-sm text-[#00C2FF] flex items-center gap-1">
                  <CheckCircle2 className="h-4 w-4" />
                  {formData.resumeFile.name}
                </p>
              )}
              {errors.resumeFile && <p className="text-red-400 text-sm">{errors.resumeFile}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="coverLetter" className="text-white">
                Cover Letter
              </Label>
              <Textarea
                id="coverLetter"
                name="coverLetter"
                value={formData.coverLetter}
                onChange={handleInputChange}
                rows={4}
                className="border-[#00C2FF]/20 bg-white/[0.05] text-white placeholder:text-neutral-500 focus:border-[#00C2FF] resize-none"
                placeholder="Tell us why you're a great fit for this role..."
              />
            </div>

            <div className="flex gap-3 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => setShowApplicationDialog(false)}
                className="flex-1 border-[#00C2FF]/20 bg-transparent text-white hover:bg-white/[0.05]"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 bg-gradient-to-r from-[#00C2FF] to-[#0066FF] text-[#0A1A2F] hover:shadow-[0_0_30px_rgba(0,194,255,0.5)] transition-all duration-300 font-semibold"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  <>
                    <Send className="mr-2 h-4 w-4" />
                    Submit Application
                  </>
                )}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </main>
  );
}