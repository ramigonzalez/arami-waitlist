import React from 'react'
import { X, Twitter } from 'lucide-react'

interface SuccessModalProps {
  isOpen: boolean
  onClose: () => void
  email: string
  userId: number
  refCode: string
}

export const SuccessModal: React.FC<SuccessModalProps> = ({ isOpen, onClose, email, userId, refCode }) => {
  if (!isOpen) return null
  
  const tweetText = `Ever wish your thoughts had a patient listener? 

I just grabbed spot # ${userId} on the @aramiapp waitlist. An AI avatar that turns 3-min voice notes into clarity.🧘✨ Limited seats left.

Use my ref code: https://talkwitharami.xyz/?ref=${refCode}

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
          
          <p className="text-text-muted mb-6">
            Welcome to the waitlist! We'll notify you at <span className="text-accent-moss">{email}</span> when we're ready for you.
          </p>
          
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