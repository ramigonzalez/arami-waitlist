import React, { useState } from 'react'
import { supabase, type WaitlistSubscriber } from './lib/supabase'
import { SuccessModal } from './components/SuccessModal'
import { Mail, Shield, Users } from 'lucide-react'

function App() {
  const [email, setEmail] = useState('')
  const [userId, setUserId] = useState(0)
  const [refCode, setRefCode] = useState('')
  const [tier, setTier] = useState('free')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [showSuccess, setShowSuccess] = useState(false)

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

    const searchParams = new URLSearchParams(window.location.search)

    try {
      const subscriberData: WaitlistSubscriber = {
        email: email.trim().toLowerCase(),
        tier,
        ref_by: searchParams.get('ref') ?? null
      }

      const { data, error: supabaseError } = await supabase
        .from('waitlist_subscribers')
        .insert([subscriberData])
        .select('id, ref_code, created_at')
        .single();  
      
      if (supabaseError) {
        if (supabaseError.code === '23505') { // Unique constraint violation
          setError("Looks like you're already on the list.")
        } else {
          setError('Something went wrong. Please try again.')
        }
        return
      } else {
        setUserId(data?.id)
        setRefCode(data?.ref_code)
      }

      // Track successful submission
      trackEvent('join_waitlist', { tier })
      
      setShowSuccess(true)
      setEmail('')
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
    <div className="min-h-screen bg-gradient-to-br from-bg-01 to-bg-02 font-body">
      {/* Hero Section */}
      <section className="hero flex flex-col justify-center px-4 py-6">        
        <div className="max-w-4xl mx-auto text-center">          
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
          <div className="mt-16 mb-8">
            <button
              onClick={scrollToForm}
              className="btn-primary bg-gradient-pulse text-white py-4 px-8 rounded-pill font-display font-bold text-lg hover:animate-pulse-btn transition-all duration-600 shadow-2xl hover:shadow-accent-lilac/25"
            >
              Join the Waitlist
            </button>
            <p className="text-text-muted text-sm mt-3">
              Get early access • No spam, ever
            </p>
          </div>
          
          {/* Video Section */}
          {/* <div className="mb-6">
            <div className="max-w-xl mx-auto">
              <div className="relative bg-bg-02/50 backdrop-blur-sm border border-accent-lilac/20 rounded-md overflow-hidden shadow-2xl">
                {/* Video Container with 16:9 Aspect Ratio 
                <div className="relative w-full pb-[56.25%] h-0">
                  {/* Replace this iframe src with your actual video embed URL 
                  <iframe
                    className="absolute inset-0 w-full h-full"
                    src="https://www.youtube.com/embed/dQw4w9WgXcQ?rel=0&modestbranding=1&showinfo=0"
                    title="Arami App Demo"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
                {/* Video Caption 
                <div className="p-4 bg-bg-02/80 backdrop-blur-sm">
                  <p className="text-text-muted text-sm text-center">
                    See how Arami transforms your daily voice ritual into meaningful self-discovery
                  </p>
                </div>
              </div>
            </div>
          </div> */}
          {/* Value Propositions */}
          <div className="grid md:grid-cols-3 gap-6 mt-16 mb-16 max-w-3xl mx-auto">
            <div className="bg-bg-02/50 backdrop-blur-sm border border-accent-lilac/10 rounded-md p-6">
              <div className="w-12 h-12 bg-accent-lilac/20 rounded-full flex items-center justify-center mb-4 mx-auto">
                <Users className="w-6 h-6 text-accent-lilac" />
              </div>
              <p className="text-text-primary font-medium">
                AI reflections tuned to your DISC & Enneagram
              </p>
            </div>
            
            <div className="bg-bg-02/50 backdrop-blur-sm border border-accent-moss/10 rounded-md p-6">
              <div className="w-12 h-12 bg-accent-moss/20 rounded-full flex items-center justify-center mb-4 mx-auto">
                <div className="w-6 h-6 bg-accent-moss rounded-full"></div>
              </div>
              <p className="text-text-primary font-medium">
                Symbolic virtue rewards instead of dopamine hits
              </p>
            </div>
            
            <div className="bg-bg-02/50 backdrop-blur-sm border border-accent-lilac/10 rounded-md p-6">
              <div className="w-12 h-12 bg-accent-lilac/20 rounded-full flex items-center justify-center mb-4 mx-auto">
                <Shield className="w-6 h-6 text-accent-lilac" />
              </div>
              <p className="text-text-primary font-medium">
                Private, encrypted, yours to delete anytime
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section id="waitlist-form" className="form pb-16 px-4 scroll-mt-20">
        <div className="max-w-md mx-auto">
          <form onSubmit={handleSubmit} className="bg-bg-02/80 backdrop-blur-sm border border-accent-lilac/20 rounded-md p-8 shadow-2xl">
            <div className="mb-6">
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
                  className="w-full pl-10 pr-4 py-3 bg-bg-01 border border-accent-lilac/30 rounded-pill text-text-primary placeholder-text-muted focus:outline-none focus:border-accent-lilac focus:ring-2 focus:ring-accent-lilac/20 transition-colors"
                  placeholder="your@email.com"
                />
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-text-primary font-medium mb-3">
                Choose Your Experience
              </label>
              <div className="space-y-3">
                <label className="flex items-center p-3 bg-bg-01/50 rounded-md border border-transparent hover:border-accent-lilac/30 cursor-pointer transition-colors">
                  <input
                    type="radio"
                    name="tier"
                    value="free"
                    checked={tier === 'free'}
                    onChange={(e) => handleTierChange(e.target.value)}
                    className="text-accent-lilac focus:ring-accent-lilac/20"
                  />
                  <span className="ml-3 text-text-primary">
                    <span className="font-medium">Voice-Only</span>
                    <span className="text-accent-moss ml-2">(Free)</span>
                  </span>
                </label>
                
                <label className="flex items-center p-3 bg-bg-01/50 rounded-md border border-transparent hover:border-accent-lilac/30 cursor-pointer transition-colors">
                  <input
                    type="radio"
                    name="tier"
                    value="premium"
                    checked={tier === 'premium'}
                    onChange={(e) => handleTierChange(e.target.value)}
                    className="text-accent-lilac focus:ring-accent-lilac/20"
                  />
                  <span className="ml-3 text-text-primary flex-1">
                    <span className="font-medium">Full Avatar</span>
                    <span className="text-accent-lilac ml-2">(Premium)</span>
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
      <section className="social-proof py-6 px-4 text-center">
        <p className="text-text-muted">
          Trusted by <span className="text-accent-moss font-semibold">2k creatives</span> during private beta.
        </p>
      </section>

      {/* Footer Section */}
      <section className="footer py-8 px-4 text-center border-t border-accent-lilac/10">
        <p className="text-text-muted text-sm">
          HIPAA-grade encryption. Opt-out anytime. 
          <a href="/privacy" className="text-accent-lilac hover:text-accent-lilac/80 ml-1 transition-colors">
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
      />
    </div>
  )
}

export default App