import { Button } from "@/components/ui/button";

interface HeaderProps {
  onExport: () => void;
  onSave: () => void;
}

export default function Header({ onExport, onSave }: HeaderProps) {
  return (
    <header className="bg-white border-b border-neutral-200 shadow-sm">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm0 2h12v7H4V5zm0 9v1h12v-1H4z" clipRule="evenodd" />
          </svg>
          <h1 className="font-heading font-bold text-xl sm:text-2xl text-neutral-900">Banner Creator</h1>
        </div>
        <div className="flex items-center space-x-3">
          <Button 
            variant="outline" 
            className="hidden sm:flex items-center" 
            onClick={onSave}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M3 5a2 2 0 012-2h10a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V5zm2 1v8h10V6H5z" clipRule="evenodd" />
            </svg>
            Save
          </Button>
          <Button 
            className="flex items-center bg-primary hover:bg-blue-600" 
            onClick={onExport}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM6.293 6.707a1 1 0 010-1.414l3-3a1 1 0 011.414 0l3 3a1 1 0 01-1.414 1.414L11 5.414V13a1 1 0 11-2 0V5.414L7.707 6.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
            </svg>
            Export
          </Button>
        </div>
      </div>
    </header>
  );
}
