import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { BannerSettings } from "@/lib/types";
import html2canvas from "html2canvas";

interface CodeTabProps {
  htmlCode: string;
  settings: BannerSettings;
}

export default function CodeTab({ htmlCode, settings }: CodeTabProps) {
  const { toast } = useToast();
  const [isCopied, setIsCopied] = useState(false);

  const handleCopyCode = () => {
    navigator.clipboard.writeText(htmlCode)
      .then(() => {
        setIsCopied(true);
        toast({
          title: "Copied!",
          description: "HTML code copied to clipboard",
        });
        setTimeout(() => setIsCopied(false), 2000);
      })
      .catch(err => {
        console.error('Failed to copy code:', err);
        toast({
          title: "Failed to copy",
          description: "Please try again",
          variant: "destructive"
        });
      });
  };

  const handleDownloadHTML = () => {
    const blob = new Blob([htmlCode], { type: 'text/html' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `banner-${settings.width}x${settings.height}.html`;
    link.click();
    URL.revokeObjectURL(link.href);
    
    toast({
      title: "HTML Downloaded",
      description: "Your banner HTML has been downloaded",
    });
  };

  const handleDownloadImage = () => {
    const bannerPreview = document.getElementById('banner-preview');
    if (bannerPreview) {
      html2canvas(bannerPreview, { 
        backgroundColor: null,
        scale: 2 // Higher quality
      }).then(canvas => {
        const link = document.createElement('a');
        link.download = `banner-${settings.width}x${settings.height}.png`;
        link.href = canvas.toDataURL('image/png');
        link.click();
        
        toast({
          title: "Image Downloaded",
          description: "Your banner has been downloaded as an image",
        });
      }).catch(err => {
        console.error('Error exporting banner:', err);
        toast({
          title: "Export failed",
          description: "Failed to export banner image. Please try again.",
          variant: "destructive"
        });
      });
    }
  };

  // Create line numbers for code display
  const lineCount = htmlCode.split('\n').length;
  const lineNumbers = Array.from({ length: lineCount }, (_, i) => i + 1);

  return (
    <div role="tabpanel" className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="font-medium text-neutral-900">Generated HTML Code</h3>
        <Button 
          variant={isCopied ? "default" : "default"}
          className={isCopied ? "bg-green-600 hover:bg-green-700" : "bg-primary hover:bg-blue-600"}
          onClick={handleCopyCode}
        >
          {isCopied ? (
            <>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 inline-block mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              Copied!
            </>
          ) : (
            <>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 inline-block mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" />
                <path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z" />
              </svg>
              Copy Code
            </>
          )}
        </Button>
      </div>
      
      <div className="code-editor rounded-md overflow-hidden bg-[#1F2937] text-[#E5E7EB] font-mono relative">
        <div className="code-line-numbers absolute left-0 top-0 bottom-0 w-8 p-4 pt-4 text-right text-[#6B7280] select-none">
          {lineNumbers.map(num => (
            <div key={num}>{num}</div>
          ))}
        </div>
        
        <pre className="ml-8 p-4 overflow-x-auto whitespace-pre-wrap">
          {htmlCode.split('\n').map((line, i) => {
            // Syntax highlighting
            return line
              .replace(/(&lt;[\/]?[a-zA-Z0-9-]+)/g, '<span class="text-[#F87171]">$1</span>')
              .replace(/([a-zA-Z-]+)=(&quot;|')[^"']*("|')/g, '<span class="text-[#FCD34D]">$1</span>=<span class="text-[#6EE7B7]">$2$3</span>')
              .replace(/(@keyframes|@import)/g, '<span class="text-[#93C5FD]">$1</span>');
          }).join('\n')}
        </pre>
      </div>
      
      <div className="space-y-3">
        <h3 className="font-medium text-neutral-900">Download Options</h3>
        <div className="flex space-x-3">
          <Button 
            variant="outline" 
            className="flex-1"
            onClick={handleDownloadHTML}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
            Download HTML
          </Button>
          <Button 
            variant="outline" 
            className="flex-1"
            onClick={handleDownloadImage}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
            </svg>
            Download Image
          </Button>
        </div>
      </div>
    </div>
  );
}
