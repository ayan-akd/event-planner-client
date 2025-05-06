"use client";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { changeRole } from "@/services/User";
import { IUser, TUserRole } from "@/types/user.types";
import { useState } from "react";
import { toast } from "sonner";

interface UpdateUserRoleProps {
  user: IUser;
  onSuccess?: () => void;
}

export default function UpdateUserRole({ user, onSuccess }: UpdateUserRoleProps) {
  const [role, setRole] = useState<TUserRole>(user.role);
  const [isLoading, setIsLoading] = useState(false);

  const handleRoleChange = async () => {
    if (role === user.role) {
      toast.info("No changes made");
      return;
    }

    setIsLoading(true);
    const updatingRole = toast.loading("Updating role...");
    
    try {
      const res = await changeRole(user.id, { role });
      if (res.success) {
        toast.success("Role updated successfully!", { id: updatingRole });
        if (onSuccess) onSuccess();
      } else {
        toast.error("Failed to update role", { id: updatingRole });
      }
    } catch {
      toast.error("Something went wrong!", { id: updatingRole });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="space-y-2">
        <p className="text-sm font-medium">Current Role: {user.role}</p>
        <Select value={role} onValueChange={(value) => setRole(value as TUserRole)}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select role" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="ADMIN">ADMIN</SelectItem>
            <SelectItem value="USER">USER</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <Button 
        onClick={handleRoleChange} 
        disabled={isLoading || role === user.role}
        className="w-full dark:text-white"
      >
        {isLoading ? "Updating..." : "Update Role"}
      </Button>
    </div>
  );
}
