import { useToast } from "@/components/ui/toast/use-toast";

export function useAppToast() {
  const { toast } = useToast();

  // Success
  const successToast = (title: string, description: string) => {
    toast({
      title,
      description,
      class: "bg-emerald-500 text-white border-emerald-600",
    });
  };

  // Error
  const errorToast = (title: string, description: string) => {
    toast({
      title,
      description,
      variant: "destructive",
    });
  };

  return { successToast, errorToast, toast };
}
