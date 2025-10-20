'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { AlertTriangle } from 'lucide-react'

interface ErrorScreenProps {
  message?: string
  onRetry?: () => void
}

export const ErrorScreen = ({ message, onRetry }: ErrorScreenProps) => {
  return (
    <div className="flex items-center justify-center h-full min-h-[200px]">
      <Card className="p-6 flex flex-col items-center justify-center gap-4">
        <AlertTriangle className="w-10 h-10 text-red-500" />
        <CardContent className="text-center text-gray-700 text-sm">
          {message || 'Something went wrong.'}
        </CardContent>
        {onRetry && (
          <Button onClick={onRetry} variant="default">
            Retry
          </Button>
        )}
      </Card>
    </div>
  )
}
