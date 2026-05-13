import { AlertCircle, RefreshCcw } from 'lucide-react'
import { Alert, AlertDescription, AlertTitle } from './alert'
import { Button } from './button'

interface ErrorCardProps {
  onClick: () => void;
  errorMessage: string;
  error: unknown;
  isRefetching: boolean;
}

const ErrorCard = ({ onClick, errorMessage, error, isRefetching }: ErrorCardProps) => {
  return (
    <Alert variant="destructive" className="my-8">
      <AlertCircle className="h-4 w-4" />
          <AlertTitle>{errorMessage}</AlertTitle>
          <AlertDescription className="mt-2 flex flex-col gap-4">
            <p>
              There was a problem fetching the data from the server. 
              {error instanceof Error ? ` Error details: ${error.message}` : ""}
            </p>
            <div>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={onClick}
                disabled={isRefetching}
                className="bg-destructive text-destructive-foreground hover:bg-destructive/90 hover:text-destructive-foreground border-transparent"
              >
                <RefreshCcw className={`mr-2 h-4 w-4 ${isRefetching ? 'animate-spin' : ''}`} />
                {isRefetching ? 'Retrying...' : 'Try Again'}
              </Button>
            </div>
          </AlertDescription>
        </Alert>
  )
}

export default ErrorCard