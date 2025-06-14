import React, { useState } from 'react'
import { X, Twitter, Copy, Check } from 'lucide-react'

interface SuccessModalProps {
  isOpen: boolean
  onClose: () => void
  email: string
  userId: number
  refCode: string
  earlyBird: boolean
  position: number | null
}

export const SuccessModal: React.FC<SuccessModalProps> = ({ 
  isOpen, 
  onClose, 
  email, 
  userId, 
  refCode, 
  earlyBird, 
  position 
}) => {
  const [copied, setCopied] = useState(false)
  
  if (!isOpen) return null
  
  const referralLink = `https://talkwitharami.xyz/?ref=${refCode}`
  
  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(referralLink)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }
  
  // Dynamic status message
  const getStatusMessage = () => {
    if (earlyBird) {
      return "You're an early bird! 🐦"
    } else if (position) {
      return `You're #${position} on the waitlist!`
    }
    return "Welcome to the waitlist!"
  }
  
  // Dynamic tweet text
  const tweetText = `Ever wish your thoughts had a patient listener? 

I just ${earlyBird ? 'secured early bird access' : position ? `grabbed spot #${position}` : 'joined'} on the @aramiapp waitlist. An AI avatar that turns 3-min voice notes into clarity.🧘✨

${earlyBird ? 'Early bird seats filling fast!' : 'Limited seats left!'} Use my ref code: ${referralLink}

#SelfDiscovery

Built-in @boltdotnew`;

  const tweetUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(tweetText)}`

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-bg-02 rounded-md max-w-md w-full p-6 relative border border-accent-lilac/20">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-text-muted hover:text-text-primary transition-colors"
        >
          <X size={20} />
        </button>
        
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-pulse rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          </div>
          
          <h2 className="text-2xl font-display font-bold text-text-primary mb-2">
            You're in!
          </h2>
          
          <div className="mb-4">
            <p className="text-lg font-medium text-accent-moss">
              {getStatusMessage()}
            </p>
          </div>
          
          <p className="text-text-muted mb-6">
            Welcome to the waitlist! We'll notify you at <span className="text-accent-moss">{email}</span> when we're ready for you.
          </p>
          
          {/* Referral Section - Show if position > 250 or always for engagement */}
          {(position && position > 250) || !earlyBird ? (
            <div className="bg-bg-01/50 rounded-md p-4 mb-6 border border-accent-lilac/20">
              <h3 className="text-text-primary font-semibold mb-2">
                {position && position > 250 ? "Share your link to move up:" : "Share your link to help friends join:"}
              </h3>
              <div className="bg-bg-01 rounded-pill p-3 mb-3 border border-accent-lilac/30">
                <code className="text-accent-lilac text-sm break-all">
                  {referralLink}
                </code>
              </div>
              <button
                onClick={copyToClipboard}
                className="w-full bg-accent-moss text-white py-2 px-4 rounded-pill font-medium hover:bg-opacity-90 transition-colors flex items-center justify-center gap-2"
              >
                {copied ? (
                  <>
                    <Check size={16} />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy size={16} />
                    Copy Link
                  </>
                )}
              </button>
            </div>
          ) : null}
          
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={onClose}
              className="flex-1 bg-bg-01 text-text-primary px-4 py-2 rounded-pill font-medium hover:bg-opacity-80 transition-colors"
            >
              Done
            </button>
            <a
              href={tweetUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 bg-accent-lilac text-white px-4 py-2 rounded-pill font-medium hover:bg-opacity-90 transition-colors flex items-center justify-center gap-2"
            >
              <Twitter size={16} />
              Share
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}