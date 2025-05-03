import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ReactNode } from "react";

interface IModalProps {
  children: ReactNode;
  modalTitle: string;
  isOpen: boolean;
  onClose: () => void;
}

export function MyModal({
  children,
  modalTitle,
  isOpen,
  onClose,
}: IModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{modalTitle}</DialogTitle>
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  );
}
