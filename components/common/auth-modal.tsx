"use client"

import type React from "react"

import { useState } from "react"
import { X, Eye, EyeOff, Lock, Smartphone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { useAuth } from "@/lib/providers/auth-provider"
import Image from "next/image"

interface AuthModalProps {
  isOpen: boolean
  onClose: () => void
  type: "login" | "signup"
}

export default function AuthModal({ isOpen, onClose, type }: AuthModalProps) {
  const { switchToSignUp, switchToLogin } = useAuth()
  const [loginType, setLoginType] = useState<"password" | "otp">("password")
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    referralCode: "",
    agreeToTerms: false,
    agreeToMarketing: false,
  })

  if (!isOpen) return null

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission logic here
    console.log("Form submitted:", formData)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center animate-in fade-in-0 duration-500">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-sm animate-in fade-in-0 duration-700"
        onClick={onClose}
      />

      {/* Modal Content */}
      <div className="relative w-full max-w-3xl mx-4 bg-white rounded-2xl overflow-hidden shadow-2xl h-[600px] animate-in zoom-in-90 slide-in-from-bottom-8 duration-700 ease-out">
        <div className="flex h-full">
          {/* Left Side - Image */}
          <div className="hidden md:block md:w-1/2 relative animate-in slide-in-from-left-6 duration-800 delay-200">
            <div className="relative w-full h-full min-h-[480px] overflow-hidden">
              <Image
                src="/assets/images/login.png"
                alt="9jaPool promotional image"
                fill
                className="object-cover transition-transform duration-700 hover:scale-105"
              />
            </div>
          </div>

          {/* Right Side - Form */}
          <div className="w-full md:w-1/2 bg-[#111827] p-8 relative flex flex-col h-full animate-in slide-in-from-right-6 duration-800 delay-300">
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-white/70 hover:text-white transition-all hover:scale-125 hover:rotate-90 z-10 animate-in zoom-in-0 duration-500 delay-500 cursor-pointer"
            >
              <X size={24} />
            </button>

            {/* Form Header */}
            <div className="mb-6 flex-shrink-0">
              <h2 className="text-2xl font-extrabold text-white mb-4 tracking-wide animate-in slide-in-from-left-8 duration-600 delay-400">
                {type === 'login' ? 'Sign In' : 'Sign Up'}
              </h2>

              {/* Login Type Tabs (only for login) */}
              {type === 'login' && (
                <div className="flex space-x-2 mb-2 animate-in slide-in-from-left-6 duration-600 delay-500">
                  <button
                    onClick={() => setLoginType('password')}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 hover:scale-110 transform-gpu ${
                      loginType === 'password'
                        ? 'bg-[#232937] text-white shadow-lg scale-105'
                        : 'bg-[#111827]/30 text-white/70 hover:text-white border-[#1F2937] hover:bg-[#232937]/50'
                    }`}
                  >
                    <Lock
                      size={16}
                      className="transition-transform duration-300 group-hover:rotate-12"
                    />
                    <span>Password</span>
                  </button>
                  <button
                    onClick={() => setLoginType('otp')}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 hover:scale-110 transform-gpu ${
                      loginType === 'otp'
                        ? 'bg-[#232937] text-white shadow-lg scale-105'
                        : 'bg-[#111827]/30 border-[#1F2937] text-white/70 hover:text-white hover:bg-[#232937]/50'
                    }`}
                  >
                    <Smartphone
                      size={16}
                      className="transition-transform duration-300 group-hover:rotate-12"
                    />
                    <span>One-time Code</span>
                  </button>
                </div>
              )}
            </div>

            {/* Form */}
            <form
              onSubmit={handleSubmit}
              className="flex-1 flex flex-col justify-between"
            >
              <div className="space-y-4 mt-[-20px] animate-in slide-in-from-right-8 duration-700 delay-600">
                {/* Email/Phone Input */}
                <div className="animate-in slide-in-from-right-4 duration-500 delay-700">
                  <Input
                    type="text"
                    placeholder="Email/Phone Number"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="bg-[#232937] border-[#3a4553] text-white placeholder:text-[#9CA3AF] h-12 transition-all duration-300 focus:scale-105 focus:shadow-2xl focus:shadow-[#0FA958]/20 focus:border-[#0FA958] hover:border-[#3a4553]/80 hover:scale-[1.02] transform-gpu"
                  />
                </div>

                {/* Password Input (only for password login and signup) */}
                {(type === 'signup' || loginType === 'password') && (
                  <div className="relative animate-in slide-in-from-right-4 duration-500 delay-800">
                    <Input
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Password"
                      value={formData.password}
                      onChange={(e) =>
                        handleInputChange('password', e.target.value)
                      }
                      className="bg-[#232937] border-[#3a4553] text-white placeholder:text-white/50 h-12 pr-12 transition-all duration-300 focus:scale-105 focus:shadow-2xl focus:shadow-[#0FA958]/20 focus:border-[#0FA958] hover:border-[#3a4553]/80 hover:scale-[1.02] transform-gpu"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-white/50 hover:text-white transition-all duration-300 hover:scale-125 hover:rotate-12 transform-gpu"
                    >
                      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                )}

                {/* OTP Message (only for OTP login) */}
                {type === 'login' && loginType === 'otp' && (
                  <div className="h-16 flex items-center justify-center mt-[-20px] animate-in fade-in-0 slide-in-from-bottom-4 duration-500 delay-700">
                    <p className="text-white text-sm text-center">
                      We&apos;ll send a 6-digit code to your device
                    </p>
                  </div>
                )}

                {/* Referral Code (only for signup) */}
                {type === 'signup' && (
                  <div className="animate-in slide-in-from-right-4 duration-500 delay-900">
                    <details className="group">
                      <summary className="text-white/70 text-sm cursor-pointer hover:text-white transition-all duration-300 hover:translate-x-2 transform-gpu">
                        Enter Referral / Promo Code
                      </summary>
                      <div className="mt-2 animate-in slide-in-from-top-4 duration-400">
                        <Input
                          type="text"
                          placeholder="Referral/Promo Code"
                          value={formData.referralCode}
                          onChange={(e) =>
                            handleInputChange('referralCode', e.target.value)
                          }
                          className="bg-[#232937] border-[#3a4553] text-white placeholder:text-white/50 h-12 transition-all duration-300 focus:scale-105 focus:shadow-2xl focus:shadow-[#0FA958]/20 focus:border-[#0FA958] transform-gpu"
                        />
                      </div>
                    </details>
                  </div>
                )}

                {/* Checkboxes (only for signup) */}
                {type === 'signup' && (
                  <div className="space-y-2 mb-4 animate-in slide-in-from-right-4 duration-500 delay-1000">
                    <div className="flex items-start space-x-3 animate-in slide-in-from-left-2 duration-400 delay-1100">
                      <Checkbox
                        id="terms"
                        checked={formData.agreeToTerms}
                        onCheckedChange={(checked) =>
                          handleInputChange('agreeToTerms', checked as boolean)
                        }
                        className="mt-1 border-[#3a4553] data-[state=checked]:bg-[#0FA958] data-[state=checked]:border-[#0FA958] transition-all duration-300 hover:scale-125 transform-gpu"
                      />
                      <label
                        htmlFor="terms"
                        className="text-[12px] text-white leading-relaxed hover:text-white/80 transition-all duration-300 hover:translate-x-1 transform-gpu"
                      >
                        I agree to the{' '}
                        <a
                          href="#"
                          className="text-[#0FA958] hover:underline transition-all duration-300 hover:text-green-400 hover:scale-105 inline-block transform-gpu"
                        >
                          User Agreement
                        </a>{' '}
                        & confirm I am at least 18 years old
                      </label>
                    </div>
                    <div className="flex items-start space-x-3 animate-in slide-in-from-left-2 duration-400 delay-1200">
                      <Checkbox
                        id="marketing"
                        checked={formData.agreeToMarketing}
                        onCheckedChange={(checked) =>
                          handleInputChange(
                            'agreeToMarketing',
                            checked as boolean
                          )
                        }
                        className="mt-1 border-[#3a4553] data-[state=checked]:bg-[#0FA958] data-[state=checked]:border-[#0FA958] transition-all duration-300 hover:scale-125 transform-gpu"
                      />
                      <label
                        htmlFor="marketing"
                        className="text-[12px] text-white leading-relaxed hover:text-white/80 transition-all duration-300 hover:translate-x-1 transform-gpu"
                      >
                        I agree to receive marketing promotions from 9jaPool
                      </label>
                    </div>
                  </div>
                )}

                {/* Forgot Password (only for password login) */}
                {type === 'login' && loginType === 'password' && (
                  <div className="text-right animate-in slide-in-from-right-2 duration-400 delay-900">
                    <a
                      href="#"
                      className="text-white text-sm hover:text-white transition-all duration-300 hover:translate-x-2 inline-block transform-gpu hover:scale-105"
                    >
                      Forgot your Password?
                    </a>
                  </div>
                )}
              </div>

              {/* Bottom Section - Fixed at bottom */}
              <div className="space-y-2 animate-in slide-in-from-bottom-8 duration-700 delay-800">
                {/* Submit Button */}
                <Button
                  type="submit"
                  className="w-full bg-[#0FA958] hover:bg-green-600 text-white h-12 text-base font-medium transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-[#0FA958]/30 active:scale-95 transform-gpu animate-in zoom-in-95 duration-500 delay-1000"
                >
                  {type === 'login' ? 'Sign In' : 'Sign Up'}
                </Button>

                {/* Switch Auth Type */}
                <div className="text-left animate-in fade-in-0 duration-500 delay-1100">
                  <span className="text-white text-[12px] font-extrabold tracking-wide">
                    {type === 'login'
                      ? 'New to 9jaPool? '
                      : 'Already have an account? '}
                    <button
                      type="button"
                      onClick={
                        type === 'login' ? switchToSignUp : switchToLogin
                      }
                      className="text-[#0FA958] hover:underline transition-all duration-300 hover:text-green-400 hover:translate-x-2 inline-block transform-gpu hover:scale-105"
                    >
                      {type === 'login' ? 'Create account' : 'Sign In'}
                    </button>
                  </span>
                </div>

                {/* Divider */}
                <div className="relative my-6 animate-in fade-in-0 duration-500 delay-1200">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-[#3a4553]" />
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-[#1a1f2e] text-white/70">or</span>
                  </div>
                </div>

                {/* Google Sign In */}
                <Button
                  type="button"
                  variant="outline"
                  className="w-full bg-white hover:bg-gray-50 text-black border-gray-300 h-12 text-base font-extrabold transition-all duration-300 hover:scale-105 hover:shadow-2xl active:scale-95 transform-gpu animate-in zoom-in-95 duration-500 delay-1300"
                >
                  <img
                    src="/assets/images/google.png"
                    alt="Google"
                    className="w-5 h-5 mr-2"
                  />
                  Continue with Google
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
