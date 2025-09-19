import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { ChevronLeft, ChevronRight, Upload, FileText, Sparkles } from "lucide-react";
import { Logo } from "@/components/ui/logo";
import { cn } from "@/lib/utils";

interface FormData {
  // Step 1: Personal Info
  fullName: string;
  email: string;
  phone: string;
  
  // Step 2: Current Situation
  employmentStatus: string;
  location: string;
  
  // Step 3: Career Goals
  desiredJobTitle: string;
  targetIndustry: string;
  salaryExpectation: string;
  
  // Step 4: Resume Upload
  resumeFile: File | null;
  
  // Step 5: Additional Info
  careerChallenges: string;
  resumeTailoringFrequency: string;
  targetCompanies: string;
}

const initialFormData: FormData = {
  fullName: "",
  email: "",
  phone: "",
  employmentStatus: "",
  location: "",
  desiredJobTitle: "",
  targetIndustry: "",
  salaryExpectation: "",
  resumeFile: null,
  careerChallenges: "",
  resumeTailoringFrequency: "",
  targetCompanies: "",
};

export default function MultiStepForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const totalSteps = 6;
  const progress = (currentStep / totalSteps) * 100;

  const updateFormData = (field: keyof FormData, value: string | File | null) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    setCurrentStep(totalSteps);
    setIsSubmitting(false);
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="fullName">Full Name *</Label>
              <Input
                id="fullName"
                value={formData.fullName}
                onChange={(e) => updateFormData("fullName", e.target.value)}
                placeholder="Enter your full name"
                className="h-12"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email Address *</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => updateFormData("email", e.target.value)}
                placeholder="your.email@example.com"
                className="h-12"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number *</Label>
              <Input
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={(e) => updateFormData("phone", e.target.value)}
                placeholder="+1 (555) 123-4567"
                className="h-12"
              />
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="space-y-4">
              <Label className="text-base font-medium">Employment Status</Label>
              <RadioGroup
                value={formData.employmentStatus}
                onValueChange={(value) => updateFormData("employmentStatus", value)}
                className="grid grid-cols-2 gap-4"
              >
                {["Employed", "Unemployed", "Student", "Other"].map((status) => (
                  <div key={status} className="flex items-center space-x-2">
                    <RadioGroupItem value={status} id={status} />
                    <Label htmlFor={status} className="cursor-pointer">{status}</Label>
                  </div>
                ))}
              </RadioGroup>
            </div>
            <div className="space-y-2">
              <Label htmlFor="location">Location (City, Country) *</Label>
              <Input
                id="location"
                value={formData.location}
                onChange={(e) => updateFormData("location", e.target.value)}
                placeholder="Lagos, Nigeria"
                className="h-12"
              />
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="desiredJobTitle">Desired Job Title *</Label>
              <Input
                id="desiredJobTitle"
                value={formData.desiredJobTitle}
                onChange={(e) => updateFormData("desiredJobTitle", e.target.value)}
                placeholder="e.g., Software Engineer, Marketing Manager"
                className="h-12"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="targetIndustry">Target Industry</Label>
              <Input
                id="targetIndustry"
                value={formData.targetIndustry}
                onChange={(e) => updateFormData("targetIndustry", e.target.value)}
                placeholder="e.g., Technology, Finance, Healthcare"
                className="h-12"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="salaryExpectation">Salary Expectation</Label>
              <Input
                id="salaryExpectation"
                value={formData.salaryExpectation}
                onChange={(e) => updateFormData("salaryExpectation", e.target.value)}
                placeholder="e.g., $50,000 - $70,000"
                className="h-12"
              />
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <Upload className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <Label className="text-base font-medium">Upload Your Current Resume</Label>
              <p className="text-muted-foreground mt-2">
                Upload your existing resume/CV in PDF, DOC, or DOCX format
              </p>
            </div>
            <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
              <input
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={(e) => {
                  const file = e.target.files?.[0] || null;
                  updateFormData("resumeFile", file);
                }}
                className="hidden"
                id="resume-upload"
              />
              <Label htmlFor="resume-upload" className="cursor-pointer">
                {formData.resumeFile ? (
                  <div className="space-y-2">
                    <FileText className="w-8 h-8 text-primary mx-auto" />
                    <p className="text-primary font-medium">{formData.resumeFile.name}</p>
                    <p className="text-muted-foreground text-sm">Click to change file</p>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <Upload className="w-8 h-8 text-muted-foreground mx-auto" />
                    <p className="font-medium">Click to upload or drag and drop</p>
                    <p className="text-muted-foreground text-sm">PDF, DOC, DOCX (max 10MB)</p>
                  </div>
                )}
              </Label>
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="careerChallenges">What's your biggest career challenge?</Label>
              <Textarea
                id="careerChallenges"
                value={formData.careerChallenges}
                onChange={(e) => updateFormData("careerChallenges", e.target.value)}
                placeholder="e.g., Getting interviews, standing out from other candidates, career transition..."
                className="h-24 resize-none"
              />
            </div>
            <div className="space-y-4">
              <Label className="text-base font-medium">How often do you tailor your resume?</Label>
              <RadioGroup
                value={formData.resumeTailoringFrequency}
                onValueChange={(value) => updateFormData("resumeTailoringFrequency", value)}
                className="grid grid-cols-1 gap-3"
              >
                {["Never", "Sometimes", "Always"].map((frequency) => (
                  <div key={frequency} className="flex items-center space-x-2">
                    <RadioGroupItem value={frequency} id={`freq-${frequency}`} />
                    <Label htmlFor={`freq-${frequency}`} className="cursor-pointer">{frequency}</Label>
                  </div>
                ))}
              </RadioGroup>
            </div>
            <div className="space-y-2">
              <Label htmlFor="targetCompanies">Target Companies (Optional)</Label>
              <Input
                id="targetCompanies"
                value={formData.targetCompanies}
                onChange={(e) => updateFormData("targetCompanies", e.target.value)}
                placeholder="e.g., Google, Microsoft, Startups in Lagos"
                className="h-12"
              />
            </div>
          </div>
        );

      case 6:
        return (
          <div className="text-center space-y-6">
            <div className="w-20 h-20 bg-gradient-brand rounded-full flex items-center justify-center mx-auto">
              <Sparkles className="w-10 h-10 text-white" />
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-2">🎉 Your Audit is Complete!</h3>
              <p className="text-muted-foreground mb-6">
                We've analyzed your resume and created a comprehensive improvement plan.
              </p>
            </div>
            <div className="bg-gradient-subtle rounded-lg p-6 text-left space-y-4">
              <h4 className="font-semibold text-lg">Your Personalized Resume Report</h4>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  ATS optimization score and recommendations
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  Keyword analysis for your target role
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  Professional formatting improvements
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  Content enhancement suggestions
                </li>
              </ul>
            </div>
            <Button className="w-full h-12 bg-gradient-brand hover:opacity-90">
              Download Your Improved Resume
            </Button>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-subtle p-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <Logo className="justify-center mb-6" />
          <h1 className="text-3xl font-bold mb-2">Get Your Free Resume Audit</h1>
          <p className="text-muted-foreground">
            Get AI-powered insights to make your resume stand out to recruiters
          </p>
        </div>

        {/* Progress Bar */}
        {currentStep < totalSteps && (
          <div className="mb-8">
            <div className="flex justify-between text-sm text-muted-foreground mb-2">
              <span>Step {currentStep} of {totalSteps - 1}</span>
              <span>{Math.round(progress)}% Complete</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        )}

        {/* Form Card */}
        <Card className="shadow-soft border-0">
          <CardHeader>
            <CardTitle className="text-xl">
              {currentStep === 1 && "Tell us about yourself"}
              {currentStep === 2 && "Your current situation"}
              {currentStep === 3 && "Your career goals"}
              {currentStep === 4 && "Upload your resume"}
              {currentStep === 5 && "Quick career assessment"}
              {currentStep === 6 && "Your Results"}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {renderStep()}

            {/* Navigation Buttons */}
            {currentStep < totalSteps && (
              <div className="flex justify-between pt-6">
                <Button
                  variant="outline"
                  onClick={prevStep}
                  disabled={currentStep === 1}
                  className="flex items-center gap-2"
                >
                  <ChevronLeft className="w-4 h-4" />
                  Back
                </Button>
                
                {currentStep === totalSteps - 1 ? (
                  <Button
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    className="flex items-center gap-2 bg-gradient-brand hover:opacity-90"
                  >
                    {isSubmitting ? "Analyzing..." : "Get My Audit"}
                    {!isSubmitting && <Sparkles className="w-4 h-4" />}
                  </Button>
                ) : (
                  <Button
                    onClick={nextStep}
                    className="flex items-center gap-2 bg-gradient-brand hover:opacity-90"
                  >
                    Next
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                )}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center mt-8 text-sm text-muted-foreground">
          © 2024 ResumeAudit. All rights reserved.
        </div>
      </div>
    </div>
  );
}