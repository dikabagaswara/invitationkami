import { describe, it, expect } from 'vitest'
import { publicRsvpSchema, publicGuestMessageSchema } from '../schemas/guest.schema'

describe('Guest Schemas', () => {
  describe('publicRsvpSchema', () => {
    it('validates a correct RSVP', () => {
      const data = {
        name: 'John Doe',
        phone: '1234567890',
        rsvpStatus: 'ATTENDING',
        attendance: 2,
        message: 'Congrats!',
      }
      const result = publicRsvpSchema.safeParse(data)
      expect(result.success).toBe(true)
    })

    it('rejects short names', () => {
      const data = {
        name: 'J',
        rsvpStatus: 'ATTENDING',
        attendance: 1,
      }
      const result = publicRsvpSchema.safeParse(data)
      expect(result.success).toBe(false)
    })

    it('rejects invalid attendance (above max)', () => {
      const data = {
        name: 'John Doe',
        rsvpStatus: 'ATTENDING',
        attendance: 11, // Max is 10
      }
      const result = publicRsvpSchema.safeParse(data)
      expect(result.success).toBe(false)
    })
  })

  describe('publicGuestMessageSchema', () => {
    it('validates a correct guest message', () => {
      const data = {
        name: 'Jane Doe',
        message: 'Wishing you the best.',
      }
      const result = publicGuestMessageSchema.safeParse(data)
      expect(result.success).toBe(true)
    })

    it('rejects a message that is too long', () => {
      const data = {
        name: 'Jane Doe',
        message: 'A'.repeat(501),
      }
      const result = publicGuestMessageSchema.safeParse(data)
      expect(result.success).toBe(false)
    })
  })
})
