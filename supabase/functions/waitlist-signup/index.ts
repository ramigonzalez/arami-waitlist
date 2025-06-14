import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { corsHeaders } from "../_shared/cors.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.45.4'

// Email validation regex
const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { email, tier, ref_by } = await req.json()

    // Validate email format
    if (!EMAIL_REGEX.test(email)) {
      return new Response(
        JSON.stringify({ error: "Please enter a valid email address." }),
        { 
          status: 400,
          headers: { 
            ...corsHeaders,
            "Content-Type": "application/json" 
          } 
        }
      )
    }

    // Create Supabase client
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    // If ref_by is provided, verify it exists
    if (ref_by) {
      const { data: refData, error: refError } = await supabaseClient
        .from('waitlist_subscribers')
        .select('ref_code')
        .eq('ref_code', ref_by)
        .single()

      if (refError || !refData) {
        return new Response(
          JSON.stringify({ error: "Invalid referral code." }),
          { 
            status: 400,
            headers: { 
              ...corsHeaders,
              "Content-Type": "application/json" 
            } 
          }
        )
      }
    }

    // 1. Insert the subscriber (triggers will handle ref_code and early_bird)
    const { data: subscriber, error: insertError } = await supabaseClient
      .from('waitlist_subscribers')
      .insert([{ email, tier, ref_by }])
      .select(`
        id,
        email,
        tier,
        ref_code,
        referrals_count,
        early_bird
      `)
      .single()

    if (insertError) {
      if (insertError.code === '23505') { // Unique constraint violation
        return new Response(
          JSON.stringify({ error: "Looks like you're already on the list." }),
          { 
            status: 400,
            headers: { 
              ...corsHeaders,
              "Content-Type": "application/json" 
            } 
          }
        )
      }
      throw insertError
    }

    // 2. Send welcome email (you can implement this later)
    // await sendWelcomeEmail(subscriber)

    // 3. Track analytics
    console.log('New subscriber:', {
      id: subscriber.id,
      email: subscriber.email,
      tier: subscriber.tier,
      ref_code: subscriber.ref_code,
      early_bird: subscriber.early_bird,
    })

    return new Response(
      JSON.stringify(subscriber),
      { 
        headers: { 
          ...corsHeaders,
          "Content-Type": "application/json" 
        } 
      }
    )
  } catch (error) {
    console.error('Error processing request:', error)
    return new Response(
      JSON.stringify({ error: 'Internal Server Error' }),
      { 
        status: 500, 
        headers: { 
          ...corsHeaders,
          "Content-Type": "application/json" 
        } 
      }
    )
  }
}) 