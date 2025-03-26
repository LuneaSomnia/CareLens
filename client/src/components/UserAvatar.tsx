import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Camera, Upload } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface UserAvatarProps {
  name: string;
  imageUrl?: string;
  size?: "sm" | "md" | "lg" | "xl";
  editable?: boolean;
}

export default function UserAvatar({ name, imageUrl, size = "md", editable = false }: UserAvatarProps) {
  const { toast } = useToast();
  const [avatarUrl, setAvatarUrl] = useState<string | undefined>(imageUrl);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Get initials from name
  const initials = name.split(" ")
    .map(part => part[0])
    .join("")
    .toUpperCase()
    .substring(0, 2);

  // Size mappings
  const sizeClasses = {
    sm: "h-8 w-8 text-xs",
    md: "h-12 w-12 text-sm",
    lg: "h-20 w-20 text-xl",
    xl: "h-32 w-32 text-4xl",
  };

  // Sample avatar options for mock data
  const sampleAvatars = [
    "/avatars/avatar-1.jpg",
    "/avatars/avatar-2.jpg",
    "/avatars/avatar-3.jpg",
    "/avatars/avatar-4.jpg",
    "/avatars/avatar-5.jpg",
    "/avatars/avatar-6.jpg",
  ];

  // Mock function to simulate upload
  const handleUpload = () => {
    toast({
      title: "Upload Successful",
      description: "Your profile picture has been updated.",
    });
    
    // Simulate a successful upload by setting a random avatar
    const randomAvatar = sampleAvatars[Math.floor(Math.random() * sampleAvatars.length)];
    setAvatarUrl(randomAvatar);
    setIsDialogOpen(false);
  };

  // Select sample avatar
  const selectAvatar = (url: string) => {
    setAvatarUrl(url);
    setIsDialogOpen(false);
    
    toast({
      title: "Avatar Changed",
      description: "Your profile picture has been updated.",
    });
  };

  if (!editable) {
    return (
      <Avatar className={sizeClasses[size]}>
        {avatarUrl ? (
          <AvatarImage src={avatarUrl} alt={name} />
        ) : null}
        <AvatarFallback className="bg-primary text-white">{initials}</AvatarFallback>
      </Avatar>
    );
  }

  return (
    <div className="relative">
      <Avatar className={sizeClasses[size]}>
        {avatarUrl ? (
          <AvatarImage src={avatarUrl} alt={name} />
        ) : null}
        <AvatarFallback className="bg-primary text-white">{initials}</AvatarFallback>
      </Avatar>
      
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger asChild>
          <button 
            className="absolute bottom-0 right-0 bg-white rounded-full p-1 shadow-md border border-neutral-200"
            aria-label="Change profile picture"
          >
            <Camera className="h-5 w-5 text-primary" />
          </button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Change Profile Picture</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="flex justify-center">
              <Avatar className="h-24 w-24">
                {avatarUrl ? (
                  <AvatarImage src={avatarUrl} alt={name} />
                ) : null}
                <AvatarFallback className="bg-primary text-white text-2xl">{initials}</AvatarFallback>
              </Avatar>
            </div>
            
            <div className="flex flex-wrap gap-2 justify-center">
              {sampleAvatars.map((url, index) => (
                <button 
                  key={index} 
                  onClick={() => selectAvatar(url)}
                  className="p-1 border-2 rounded-full hover:border-primary transition-colors"
                  style={{ borderColor: avatarUrl === url ? 'var(--primary)' : 'transparent' }}
                >
                  <Avatar className="h-16 w-16">
                    <AvatarImage src={url} alt={`Avatar option ${index + 1}`} />
                  </Avatar>
                </button>
              ))}
            </div>
            
            <div className="flex justify-center">
              <Button onClick={handleUpload} className="gap-2">
                <Upload className="h-4 w-4" />
                Upload New Image
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}