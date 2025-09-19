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
  age: string;
  
  // Step 2: Location & Market Context
  country: string;
  city: string;
  willingToRelocate: string;
  preferredWorkMode: string;
  
  // Step 3: Professional Experience
  employmentStatus: string;
  yearsOfExperience: string;
  currentJobTitle: string;
  previousIndustries: string;
  educationLevel: string;
  
  // Step 4: Career Goals & Aspirations
  desiredJobTitle: string;
  targetIndustry: string;
  careerGoals: string;
  timelineForJobSearch: string;
  
  // Step 5: Compensation & Benefits
  salaryExpectation: string;
  salaryPriority: string;
  benefitsPriorities: string;
  
  // Step 6: Skills & Development
  keySkills: string;
  skillsToImprove: string;
  certifications: string;
  languagesSpoken: string;
  
  // Step 7: Resume Upload
  resumeFile: File | null;
  
  // Step 8: Job Search Strategy
  careerChallenges: string;
  resumeTailoringFrequency: string;
  targetCompanies: string;
  jobSearchMethods: string;
  networkingEfforts: string;
}

const initialFormData: FormData = {
  fullName: "",
  email: "",
  phone: "",
  age: "",
  country: "",
  city: "",
  willingToRelocate: "",
  preferredWorkMode: "",
  employmentStatus: "",
  yearsOfExperience: "",
  currentJobTitle: "",
  previousIndustries: "",
  educationLevel: "",
  desiredJobTitle: "",
  targetIndustry: "",
  careerGoals: "",
  timelineForJobSearch: "",
  salaryExpectation: "",
  salaryPriority: "",
  benefitsPriorities: "",
  keySkills: "",
  skillsToImprove: "",
  certifications: "",
  languagesSpoken: "",
  resumeFile: null,
  careerChallenges: "",
  resumeTailoringFrequency: "",
  targetCompanies: "",
  jobSearchMethods: "",
  networkingEfforts: "",
};

export default function MultiStepForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const totalSteps = 9;
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
                placeholder="+234 (0) 123-456-789"
                className="h-12"
              />
            </div>
            <div className="space-y-4">
              <Label className="text-base font-medium">Age Range *</Label>
              <RadioGroup
                value={formData.age}
                onValueChange={(value) => updateFormData("age", value)}
                className="grid grid-cols-2 gap-4"
              >
                {["18-22", "23-26", "27-30", "31-34"].map((ageRange) => (
                  <div key={ageRange} className="flex items-center space-x-2">
                    <RadioGroupItem value={ageRange} id={ageRange} />
                    <Label htmlFor={ageRange} className="cursor-pointer">{ageRange}</Label>
                  </div>
                ))}
              </RadioGroup>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="country">Country *</Label>
              <Input
                id="country"
                value={formData.country}
                onChange={(e) => updateFormData("country", e.target.value)}
                placeholder="Nigeria"
                className="h-12"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="city">City *</Label>
              <Input
                id="city"
                value={formData.city}
                onChange={(e) => updateFormData("city", e.target.value)}
                placeholder="Lagos"
                className="h-12"
              />
            </div>
            <div className="space-y-4">
              <Label className="text-base font-medium">Willing to relocate for the right opportunity?</Label>
              <RadioGroup
                value={formData.willingToRelocate}
                onValueChange={(value) => updateFormData("willingToRelocate", value)}
                className="grid grid-cols-3 gap-4"
              >
                {["Yes", "No", "Maybe"].map((option) => (
                  <div key={option} className="flex items-center space-x-2">
                    <RadioGroupItem value={option} id={`relocate-${option}`} />
                    <Label htmlFor={`relocate-${option}`} className="cursor-pointer">{option}</Label>
                  </div>
                ))}
              </RadioGroup>
            </div>
            <div className="space-y-4">
              <Label className="text-base font-medium">Preferred work mode</Label>
              <RadioGroup
                value={formData.preferredWorkMode}
                onValueChange={(value) => updateFormData("preferredWorkMode", value)}
                className="grid grid-cols-1 gap-3"
              >
                {["Remote", "Hybrid", "On-site", "No preference"].map((mode) => (
                  <div key={mode} className="flex items-center space-x-2">
                    <RadioGroupItem value={mode} id={`work-${mode}`} />
                    <Label htmlFor={`work-${mode}`} className="cursor-pointer">{mode}</Label>
                  </div>
                ))}
              </RadioGroup>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="space-y-4">
              <Label className="text-base font-medium">Current Employment Status *</Label>
              <RadioGroup
                value={formData.employmentStatus}
                onValueChange={(value) => updateFormData("employmentStatus", value)}
                className="grid grid-cols-1 gap-3"
              >
                {[
                  "Employed full-time",
                  "Employed part-time",
                  "Unemployed (actively searching)",
                  "Unemployed (not actively searching)",
                  "Student",
                  "Recent graduate",
                  "Freelancer/Contractor",
                  "Career break/Gap year"
                ].map((status) => (
                  <div key={status} className="flex items-center space-x-2">
                    <RadioGroupItem value={status} id={status} />
                    <Label htmlFor={status} className="cursor-pointer">{status}</Label>
                  </div>
                ))}
              </RadioGroup>
            </div>
            <div className="space-y-4">
              <Label className="text-base font-medium">Years of professional experience</Label>
              <RadioGroup
                value={formData.yearsOfExperience}
                onValueChange={(value) => updateFormData("yearsOfExperience", value)}
                className="grid grid-cols-2 gap-4"
              >
                {["0-1 years", "2-3 years", "4-6 years", "7+ years"].map((years) => (
                  <div key={years} className="flex items-center space-x-2">
                    <RadioGroupItem value={years} id={years} />
                    <Label htmlFor={years} className="cursor-pointer">{years}</Label>
                  </div>
                ))}
              </RadioGroup>
            </div>
            <div className="space-y-2">
              <Label htmlFor="currentJobTitle">Current/Most Recent Job Title</Label>
              <Input
                id="currentJobTitle"
                value={formData.currentJobTitle}
                onChange={(e) => updateFormData("currentJobTitle", e.target.value)}
                placeholder="e.g., Junior Software Developer, Sales Associate"
                className="h-12"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="previousIndustries">Industries you've worked in</Label>
              <Input
                id="previousIndustries"
                value={formData.previousIndustries}
                onChange={(e) => updateFormData("previousIndustries", e.target.value)}
                placeholder="e.g., Technology, Banking, Retail, Healthcare"
                className="h-12"
              />
            </div>
            <div className="space-y-4">
              <Label className="text-base font-medium">Highest level of education</Label>
              <RadioGroup
                value={formData.educationLevel}
                onValueChange={(value) => updateFormData("educationLevel", value)}
                className="grid grid-cols-1 gap-3"
              >
                {[
                  "High school/Secondary school",
                  "Diploma/Certificate",
                  "Bachelor's degree",
                  "Master's degree",
                  "PhD/Doctorate",
                  "Other"
                ].map((education) => (
                  <div key={education} className="flex items-center space-x-2">
                    <RadioGroupItem value={education} id={education} />
                    <Label htmlFor={education} className="cursor-pointer">{education}</Label>
                  </div>
                ))}
              </RadioGroup>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="desiredJobTitle">Desired Job Title *</Label>
              <Input
                id="desiredJobTitle"
                value={formData.desiredJobTitle}
                onChange={(e) => updateFormData("desiredJobTitle", e.target.value)}
                placeholder="e.g., Software Engineer, Digital Marketing Manager"
                className="h-12"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="targetIndustry">Target Industry *</Label>
              <Input
                id="targetIndustry"
                value={formData.targetIndustry}
                onChange={(e) => updateFormData("targetIndustry", e.target.value)}
                placeholder="e.g., Fintech, E-commerce, Healthcare, Oil & Gas"
                className="h-12"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="careerGoals">What are your main career goals? *</Label>
              <Textarea
                id="careerGoals"
                value={formData.careerGoals}
                onChange={(e) => updateFormData("careerGoals", e.target.value)}
                placeholder="e.g., Lead a team, transition into tech, start my own business, work for a multinational company"
                className="h-24 resize-none"
              />
            </div>
            <div className="space-y-4">
              <Label className="text-base font-medium">Timeline for landing your next role</Label>
              <RadioGroup
                value={formData.timelineForJobSearch}
                onValueChange={(value) => updateFormData("timelineForJobSearch", value)}
                className="grid grid-cols-2 gap-4"
              >
                {["Immediately", "1-3 months", "3-6 months", "6+ months"].map((timeline) => (
                  <div key={timeline} className="flex items-center space-x-2">
                    <RadioGroupItem value={timeline} id={timeline} />
                    <Label htmlFor={timeline} className="cursor-pointer">{timeline}</Label>
                  </div>
                ))}
              </RadioGroup>
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="salaryExpectation">Salary Expectation (in local currency)</Label>
              <Input
                id="salaryExpectation"
                value={formData.salaryExpectation}
                onChange={(e) => updateFormData("salaryExpectation", e.target.value)}
                placeholder="e.g., ₦200,000 - ₦400,000 monthly"
                className="h-12"
              />
            </div>
            <div className="space-y-4">
              <Label className="text-base font-medium">What's most important to you in compensation?</Label>
              <RadioGroup
                value={formData.salaryPriority}
                onValueChange={(value) => updateFormData("salaryPriority", value)}
                className="grid grid-cols-1 gap-3"
              >
                {[
                  "High base salary",
                  "Performance bonuses",
                  "Benefits & perks",
                  "Work-life balance",
                  "Learning opportunities",
                  "Career growth potential"
                ].map((priority) => (
                  <div key={priority} className="flex items-center space-x-2">
                    <RadioGroupItem value={priority} id={priority} />
                    <Label htmlFor={priority} className="cursor-pointer">{priority}</Label>
                  </div>
                ))}
              </RadioGroup>
            </div>
            <div className="space-y-2">
              <Label htmlFor="benefitsPriorities">Most important benefits to you</Label>
              <Textarea
                id="benefitsPriorities"
                value={formData.benefitsPriorities}
                onChange={(e) => updateFormData("benefitsPriorities", e.target.value)}
                placeholder="e.g., Health insurance, remote work options, professional development budget, pension"
                className="h-20 resize-none"
              />
            </div>
          </div>
        );

      case 6:
        return (
          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="keySkills">Your key skills and strengths *</Label>
              <Textarea
                id="keySkills"
                value={formData.keySkills}
                onChange={(e) => updateFormData("keySkills", e.target.value)}
                placeholder="e.g., Python, Project Management, Digital Marketing, Financial Analysis, Customer Service"
                className="h-24 resize-none"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="skillsToImprove">Skills you want to develop or improve</Label>
              <Textarea
                id="skillsToImprove"
                value={formData.skillsToImprove}
                onChange={(e) => updateFormData("skillsToImprove", e.target.value)}
                placeholder="e.g., Data analysis, Public speaking, Leadership, Cloud computing"
                className="h-20 resize-none"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="certifications">Relevant certifications or courses completed</Label>
              <Input
                id="certifications"
                value={formData.certifications}
                onChange={(e) => updateFormData("certifications", e.target.value)}
                placeholder="e.g., Google Analytics, PMP, AWS, CPA"
                className="h-12"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="languagesSpoken">Languages you speak fluently</Label>
              <Input
                id="languagesSpoken"
                value={formData.languagesSpoken}
                onChange={(e) => updateFormData("languagesSpoken", e.target.value)}
                placeholder="e.g., English, Yoruba, French, Hausa"
                className="h-12"
              />
            </div>
          </div>
        );

      case 7:
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

      case 8:
        return (
          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="careerChallenges">What's your biggest career challenge right now?</Label>
              <Textarea
                id="careerChallenges"
                value={formData.careerChallenges}
                onChange={(e) => updateFormData("careerChallenges", e.target.value)}
                placeholder="e.g., Getting interviews, standing out from candidates, career transition, salary negotiation"
                className="h-24 resize-none"
              />
            </div>
            <div className="space-y-4">
              <Label className="text-base font-medium">How often do you tailor your resume for different jobs?</Label>
              <RadioGroup
                value={formData.resumeTailoringFrequency}
                onValueChange={(value) => updateFormData("resumeTailoringFrequency", value)}
                className="grid grid-cols-1 gap-3"
              >
                {[
                  "Never - I use the same resume for all applications",
                  "Sometimes - for jobs I really want",
                  "Always - I customize for each application"
                ].map((frequency) => (
                  <div key={frequency} className="flex items-center space-x-2">
                    <RadioGroupItem value={frequency} id={`freq-${frequency}`} />
                    <Label htmlFor={`freq-${frequency}`} className="cursor-pointer">{frequency}</Label>
                  </div>
                ))}
              </RadioGroup>
            </div>
            <div className="space-y-2">
              <Label htmlFor="targetCompanies">Dream companies or types of organizations</Label>
              <Input
                id="targetCompanies"
                value={formData.targetCompanies}
                onChange={(e) => updateFormData("targetCompanies", e.target.value)}
                placeholder="e.g., Flutterwave, MTN, International NGOs, Tech startups"
                className="h-12"
              />
            </div>
            <div className="space-y-4">
              <Label className="text-base font-medium">How do you typically search for jobs?</Label>
              <RadioGroup
                value={formData.jobSearchMethods}
                onValueChange={(value) => updateFormData("jobSearchMethods", value)}
                className="grid grid-cols-1 gap-3"
              >
                {[
                  "Online job boards (LinkedIn, Indeed, etc.)",
                  "Company websites directly",
                  "Recruitment agencies",
                  "Networking and referrals",
                  "Social media",
                  "Career fairs and events"
                ].map((method) => (
                  <div key={method} className="flex items-center space-x-2">
                    <RadioGroupItem value={method} id={method} />
                    <Label htmlFor={method} className="cursor-pointer">{method}</Label>
                  </div>
                ))}
              </RadioGroup>
            </div>
            <div className="space-y-2">
              <Label htmlFor="networkingEfforts">How do you network or build professional connections?</Label>
              <Textarea
                id="networkingEfforts"
                value={formData.networkingEfforts}
                onChange={(e) => updateFormData("networkingEfforts", e.target.value)}
                placeholder="e.g., LinkedIn engagement, industry events, alumni networks, professional associations"
                className="h-20 resize-none"
              />
            </div>
          </div>
        );

      case 9:
        return (
          <div className="text-center space-y-6">
            <div className="w-20 h-20 bg-gradient-brand rounded-full flex items-center justify-center mx-auto">
              <Sparkles className="w-10 h-10 text-white" />
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-2">🎉 Your Audit is Complete!</h3>
              <p className="text-muted-foreground mb-6">
                We've analyzed your profile and created a comprehensive improvement plan tailored to your career stage and goals.
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
                  Location-specific job market insights
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  Age and experience-tailored advice
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  Industry-specific keyword optimization
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  Professional formatting improvements
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  Career transition strategies (if applicable)
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
              <span>{Math.round((currentStep / (totalSteps - 1)) * 100)}% Complete</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        )}

        {/* Form Card */}
        <Card className="shadow-soft border-0">
          <CardHeader>
            <CardTitle className="text-xl">
              {currentStep === 1 && "Tell us about yourself"}
              {currentStep === 2 && "Location & work preferences"}
              {currentStep === 3 && "Professional background"}
              {currentStep === 4 && "Career aspirations"}
              {currentStep === 5 && "Compensation preferences"}
              {currentStep === 6 && "Skills & development"}
              {currentStep === 7 && "Upload your resume"}
              {currentStep === 8 && "Job search strategy"}
              {currentStep === 9 && "Your Results"}
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