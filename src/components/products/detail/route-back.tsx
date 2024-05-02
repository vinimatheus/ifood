'use client'

import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'

export default function Routeback() {
  const router = useRouter()

  function handleBack() {
    router.back()
  }
  return (
    <div className="absolute left-4 top-4 rounded-full bg-white/70 p-1 text-xs text-white  shadow hover:bg-white">
      <Button
        onClick={handleBack}
        className="hover:bg-transparent"
        size="icon"
        variant="ghost"
      >
        <ArrowLeft color="#000" size={16} />
      </Button>
    </div>
  )
}
