import React, { useState } from 'react'
import { supabase } from './lib/supabase'
import { SuccessModal } from './components/SuccessModal'
import { Mail, Shield, Mic, Bot, Users } from 'lucide-react'

function App() {
  const [email, setEmail] = useState('')
  const [userId, setUserId] = useState(0)
  const [refCode, setRefCode] = useState('')
  const [earlyBird, setEarlyBird] = useState(false)
  const [position, setPosition] = useState<number | null>(null)
  const [incomingRefCode, setIncomingRefCode] = useState<string | null>(null)
  const [manualRefCode, setManualRefCode] = useState('')
  const [tier, setTier] = useState('free')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [showSuccess, setShowSuccess] = useState(false)

  // Check for referral code on component mount
  React.useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search)
    const refParam = searchParams.get('ref')
    if (refParam) {
      setIncomingRefCode(refParam)
    }
  }, [])

  // Analytics helper
  const trackEvent = (event: string, data?: any) => {
    if (typeof window !== 'undefined' && window.dataLayer) {
      window.dataLayer.push({ event, ...data })
    }
  }

  const handleTierChange = (newTier: string) => {
    setTier(newTier)
    trackEvent('tier_selected', { tier: newTier })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    try {
      const { data, error: functionError } = await supabase.functions.invoke('waitlist-signup', {
        body: {
          email: email.trim().toLowerCase(),
          tier,
          ref_by: incomingRefCode || (manualRefCode.trim() || null)
        }
      })
      
      if (functionError) {
        setError(functionError.message)
        return
      }

      if (data.error) {
        setError(data.error)
        return
      }

      setUserId(data.id)
      setRefCode(data.ref_code)
      setEarlyBird(data.early_bird)
      setPosition(data.position)

      // Track successful submission
      trackEvent('join_waitlist', { 
        tier,
        early_bird: data.early_bird,
        position: data.position
      })
      
      setShowSuccess(true)
      setEmail('')
      setManualRefCode('')
      setTier('free')
    } catch (err) {
      setError('Something went wrong. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const scrollToForm = () => {
    const formElement = document.getElementById('waitlist-form')
    if (formElement) {
      const elementPosition = formElement.offsetTop
      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
      })
    }
  }
  return (
    <div className="min-h-screen app-background font-body">
      {/* Bolt.new Badge */}
      <style dangerouslySetInnerHTML={{
        __html: `
          .bolt-badge {
            transition: all 0.3s ease;
          }
          @keyframes badgeIntro {
            0% { transform: scale(0); opacity: 0; }
            100% { transform: scale(1); opacity: 1; }
          }
          .bolt-badge-intro {
            animation: badgeIntro 0.5s ease-out 1s both;
          }
          .bolt-badge-intro.animated {
            animation: none;
          }
          @keyframes badgeHover {
            0% { transform: scale(1) rotate(0deg); }
            50% { transform: scale(1.1) rotate(22deg); filter: drop-shadow(0 8px 16px rgba(101, 86, 185, 0.4)); }
            100% { transform: scale(1) rotate(0deg); }
          }
          .bolt-badge:hover {
            animation: badgeHover 0.6s ease-in-out;
          }
          .bolt-badge img {
            box-shadow: 0 4px 20px rgba(101, 86, 185, 0.3);
          }
        `
      }} />
      <div className="fixed top-4 right-4 z-50">
        <a href="https://bolt.new/?rid=os72mi" target="_blank" rel="noopener noreferrer" 
           className="block transition-all duration-300 hover:shadow-2xl">
          <img src="https://storage.bolt.army/white_circle_360x360.png" 
               alt="Built with Bolt.new badge" 
               className="w-20 h-20 md:w-28 md:h-28 rounded-full shadow-lg bolt-badge bolt-badge-intro"
               onAnimationEnd={(e) => e.currentTarget.classList.add('animated')} />
        </a>
      </div>

      {/* Hero Section */}
      <section className="hero flex flex-col justify-center px-4 py-6">        
        <div className="max-w-5xl mx-auto text-center">          
          {/* Arami Logo */}
          <img 
            src="/arami-logo.png" 
            alt="Arami Logo" 
            className="h-48 mx-auto mb-12 drop-shadow-lg max-w-3xl"
          />
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold text-text-primary mt-16 mb-12 leading-tight">
            Speak your mind.<br />
            <span className="bg-gradient-pulse bg-clip-text text-transparent">
              Discover your truth.
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-text-muted mb-8 max-w-2xl mx-auto leading-relaxed">
            Daily three-minute voice ritual guided by an empathic AI avatar.
          </p>

          {/* Hero CTA Button */}
          <div className="mt-20 mb-20">
            <button
              onClick={scrollToForm}
              className="btn-primary bg-gradient-pulse text-white py-4 px-8 rounded-pill font-display font-bold text-lg hover:animate-pulse-btn transition-all duration-600 shadow-2xl hover:shadow-primary-base/25"
            >
              Join the Waitlist
            </button>
            <p className="text-text-muted text-sm mt-3">
              Get early access • No spam, ever
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6 mt-16 mb-16 max-w-3xl mx-auto">
            <div className="bg-bg-02/50 backdrop-blur-sm border border-primary-base/10 rounded-md p-6">
              <div className="w-12 h-12 bg-primary-base/20 rounded-full flex items-center justify-center mb-4 mx-auto">
                <Shield className="w-6 h-6 text-primary-base" />
              </div>
              <p className="text-text-primary font-medium">
                Private, encrypted, yours to delete anytime
              </p>
            </div>
            
            <div className="bg-bg-02/50 backdrop-blur-sm border border-primary-base/10 rounded-md p-6">
              <div className="w-12 h-12 bg-primary-base/20 rounded-full flex items-center justify-center mb-4 mx-auto">
                <Mic className="w-6 h-6 text-primary-base" />
              </div>
              <p className="text-text-primary font-medium">
                Speak your mind, not type
              </p>
            </div>
            
            <div className="bg-bg-02/50 backdrop-blur-sm border border-accent-300/10 rounded-md p-6">
              <div className="w-12 h-12 bg-accent-300/20 rounded-full flex items-center justify-center mb-4 mx-auto">
                <Bot className="w-6 h-6 text-accent-300" />
              </div>
              <p className="text-text-primary font-medium">
                Lifelike AI avatar for emotional connection
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* App Showcase Section */}
      <section className="app-showcase py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            {/* Left Column - Feature Information */}
            <div className="flex-1 space-y-6">
              <h2 className="text-3xl md:text-4xl font-display font-bold text-text-primary leading-tight">
                Experience the Future of 
                <span className="bg-gradient-pulse bg-clip-text text-transparent block">
                  Self-Discovery
                </span>
              </h2>
              
              <p className="text-lg text-text-muted leading-relaxed">
                Meet Imara, your empathic AI companion. Through natural conversation, 
                she helps you process thoughts, explore emotions, and discover insights 
                about yourself in a safe, judgment-free space.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-2 h-2 bg-primary-base rounded-full mt-3 flex-shrink-0"></div>
                  <div>
                    <h3 className="text-text-primary font-semibold mb-1">Natural Voice Conversations</h3>
                    <p className="text-text-muted text-sm">Speak naturally with Imara using advanced voice recognition and synthesis</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-2 h-2 bg-accent-300 rounded-full mt-3 flex-shrink-0"></div>
                  <div>
                    <h3 className="text-text-primary font-semibold mb-1">Personalized AI Avatar</h3>
                    <p className="text-text-muted text-sm">See and interact with your AI companion through lifelike expressions and gestures</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-2 h-2 bg-primary-base rounded-full mt-3 flex-shrink-0"></div>
                  <div>
                    <h3 className="text-text-primary font-semibold mb-1">Emotional Intelligence</h3>
                    <p className="text-text-muted text-sm">AI that understands context, tone, and emotional nuance in your conversations</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-2 h-2 bg-accent-300 rounded-full mt-3 flex-shrink-0"></div>
                  <div>
                    <h3 className="text-text-primary font-semibold mb-1">Complete Privacy</h3>
                    <p className="text-text-muted text-sm">Your conversations are encrypted and stored securely - delete anytime</p>
                  </div>
                </div>
              </div>
              
              <div className="pt-4">
                <button
                  onClick={scrollToForm}
                  className="bg-gradient-pulse text-white py-3 px-6 rounded-pill font-display font-semibold hover:animate-pulse-btn transition-all duration-600 shadow-lg hover:shadow-primary-base/25"
                >
                  Join the Waitlist
                </button>
              </div>
            </div>
            
            {/* Right Column - App Interface Image */}
            <div className="flex-1 max-w-lg">
              <div className="relative">
                <img 
                  src="/arami-app-1.png" 
                  alt="Arami App Interface - Chat with Imara" 
                  className="w-full h-auto rounded-2xl shadow-2xl border border-primary-base/20"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-bg-01/20 to-transparent rounded-2xl pointer-events-none"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section id="waitlist-form" className="form pb-16 px-4 scroll-mt-20">
        <div className="max-w-md mx-auto">
          <form onSubmit={handleSubmit} className="bg-bg-02/80 backdrop-blur-sm border border-primary-base/20 rounded-md p-8 shadow-2xl">
            {/* Referral Code Display */}
            {incomingRefCode && (
              <div className="mb-6 p-4 bg-accent-300/10 border border-accent-300/30 rounded-md">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-accent-300/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <Users className="w-4 h-4 text-accent-300" />
                  </div>
                  <div>
                    <p className="text-accent-300 font-medium text-sm">
                      You were referred by: <span className="font-bold">{incomingRefCode}</span>
                    </p>
                    <p className="text-text-muted text-xs mt-1">
                      You'll both get priority access when you join!
                    </p>
                  </div>
                </div>
              </div>
            )}

            <div className="mt-4 mb-4">
              <label htmlFor="email" className="block text-text-primary font-medium mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-muted w-5 h-5" />
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full pl-10 pr-4 py-3 bg-bg-01 border border-primary-base/30 rounded-pill text-text-primary placeholder-text-muted focus:outline-none focus:border-primary-base focus:ring-2 focus:ring-primary-base/20 transition-colors"
                  placeholder="your@email.com"
                />
              </div>
            </div>

            {/* Manual Referral Code Input - only show if no incoming ref code */}
            {!incomingRefCode && (
              <div className="mb-4">
                <label htmlFor="refCode" className="block text-text-primary font-medium mb-2">
                  Referral Code (Optional)
                </label>
                <div className="relative">
                  <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-muted w-5 h-5" />
                  <input
                    type="text"
                    id="refCode"
                    value={manualRefCode}
                    onChange={(e) => setManualRefCode(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-bg-01 border border-primary-base/30 rounded-pill text-text-primary placeholder-text-muted focus:outline-none focus:border-primary-base focus:ring-2 focus:ring-primary-base/20 transition-colors"
                    placeholder="Enter a friend's referral code"
                  />
                </div>
              </div>
            )}

            <div className="mb-6">
              <label className="block text-text-primary font-medium mb-3">
                Choose Your Experience
              </label>
              <div className="space-y-3">
                <label className="flex items-center p-3 bg-bg-01/50 rounded-md border border-transparent hover:border-primary-base/30 cursor-pointer transition-colors">
                  <input
                    type="radio"
                    name="tier"
                    value="free"
                    checked={tier === 'free'}
                    onChange={(e) => handleTierChange(e.target.value)}
                    className="text-primary-base focus:ring-primary-base/20"
                  />
                  <span className="ml-3 text-text-primary">
                    <span className="font-medium">Voice-Only</span>
                    <span className="text-accent-300 ml-2">(Free)</span>
                  </span>
                </label>
                
                <label className="flex items-center p-3 bg-bg-01/50 rounded-md border border-transparent hover:border-primary-base/30 cursor-pointer transition-colors">
                  <input
                    type="radio"
                    name="tier"
                    value="premium"
                    checked={tier === 'premium'}
                    onChange={(e) => handleTierChange(e.target.value)}
                    className="text-primary-base focus:ring-primary-base/20"
                  />
                  <span className="ml-3 text-text-primary flex-1">
                    <span className="font-medium">Full Avatar</span>
                    <span className="text-primary-base ml-2">(Premium)</span>
                  </span>
                  <div className="ml-3 bg-gradient-pulse text-white px-3 py-1 rounded-pill text-xs font-medium">
                    Aprox ≈ $25 /mo
                  </div>
                </label>
              </div>
            </div>

            {/* Pricing Disclaimer */}
            <div className="mb-6 text-center">
              <p className="text-xs text-text-muted">
                *introductory pricing, subject to change
              </p>
            </div>

            {error && (
              <div className="mb-6 p-3 bg-red-500/10 border border-red-500/30 rounded-md text-red-400 text-sm">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading || !email}
              className="btn-primary w-full bg-gradient-pulse text-white py-4 px-6 rounded-pill font-display font-bold text-lg hover:animate-pulse-btn disabled:opacity-50 disabled:cursor-not-allowed transition-opacity"
            >
              {isLoading ? 'Joining...' : 'Join the Waitlist'}
            </button>
          </form>
        </div>
      </section>

      {/* Social Proof Section */}
      <section className="social-proof py-4 px-4 text-center">
        <p className="text-text-muted">
          Trusted by <span className="text-accent-300 font-semibold">2k creatives</span> during private beta.
        </p>
      </section>

      {/* Footer Section */}
      <section className="footer py-8 px-4 text-center border-t border-primary-base/10">
        <p className="text-text-muted text-sm">
          HIPAA-grade encryption. Opt-out anytime. 
          <a href="/privacy" className="text-primary-base hover:text-primary-hover ml-1 transition-colors">
            Privacy Policy
          </a>
        </p>
      </section>

      {/* Success Modal */}
      <SuccessModal 
        isOpen={showSuccess} 
        onClose={() => setShowSuccess(false)} 
        email={email}
        userId={userId}
        refCode={refCode}
        earlyBird={earlyBird}
        position={position}
      />
    </div>
  )
}

export default App