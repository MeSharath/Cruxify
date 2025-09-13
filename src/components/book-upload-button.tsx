
"use client";

import { useState } from "react";
import { UploadCloud, BookUp, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { handleFileUpload } from "@/app/actions";

type BookUploadButtonProps = {
  onBookUploaded: (fileName: string) => void;
};

export function BookUploadButton({ onBookUploaded }: BookUploadButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);
  const { toast } = useToast();

  const onFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setFileName(file.name);
    } else {
      setFileName(null);
    }
  };

  const onFormAction = async (formData: FormData) => {
    const file = formData.get("epub-file") as File;
    
    // Get user's API key from local storage
    const userApiKey = localStorage.getItem("perplexity_api_key");
    if (userApiKey) {
      formData.append("user_api_key", userApiKey);
    }
    
    setIsUploading(true);
    // We can call the action but we don't need to wait for it.
    // The UI will update instantly.
    handleFileUpload(formData).then(result => {
        // We can log errors if we want, but the user experience is optimistic.
        if (!result.success) {
            console.error("Summarization failed:", result.error);
        }
    });

    toast({
        title: "Upload In Progress",
        description: `"${file.name}" has been added to your library and will be available within 24 hours.`,
    });

    onBookUploaded(file.name);
    setIsUploading(false);
    setIsOpen(false);
    setFileName(null);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button>
          <BookUp className="mr-2" />
          Upload Book
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Upload your EPUB</DialogTitle>
          <DialogDescription>
            Get a concise, actionable summary of your book.
          </DialogDescription>
        </DialogHeader>
        <form action={onFormAction} className="grid gap-4 py-4">
          <div className="flex flex-col items-center justify-center w-full">
            <label
              htmlFor="epub-file"
              className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed rounded-lg cursor-pointer bg-card hover:bg-secondary transition-colors"
            >
              <div className="flex flex-col items-center justify-center pt-5 pb-6 text-center">
                <UploadCloud className="w-10 h-10 mb-3 text-muted-foreground" />
                <p className="mb-2 text-sm text-muted-foreground">
                  <span className="font-semibold">Click to upload</span> or drag
                  and drop
                </p>
                <p className="text-xs text-muted-foreground">EPUB files only</p>
                {fileName && (
                  <p className="text-xs text-primary mt-2 px-2 truncate">
                    {fileName}
                  </p>
                )}
              </div>
              <input
                id="epub-file"
                name="epub-file"
                type="file"
                className="hidden"
                accept=".epub"
                onChange={onFileChange}
                required
              />
            </label>
          </div>
          <Button type="submit" disabled={isUploading} className="w-full">
            {isUploading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Uploading...
              </>
            ) : (
              "Upload"
            )}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
