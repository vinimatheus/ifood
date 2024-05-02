'use client'

import { Button } from '@/components/ui/button'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useState } from 'react'

export default function Quanty() {
  const [quanty, setQuanty] = useState(1)

  function handlePlus() {
    setQuanty(quanty + 1)
  }

  function handleMinus() {
    if (quanty > 1) {
      setQuanty(quanty - 1)
    }
  }

  return (
    <div className="flex items-center gap-2">
      <Button
        onClick={handleMinus}
        className="border border-muted-foreground"
        size="icon"
        variant="ghost"
      >
        <ChevronLeft color="#000" size={16} />
      </Button>
      <span className="w-4 text-sm">{quanty}</span>
      <Button
        onClick={handlePlus}
        className="bg-red-600 hover:bg-red-500"
        size="icon"
      >
        <ChevronRight color="#fff" size={16} />
      </Button>
    </div>
  )
}
