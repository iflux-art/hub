"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { EditDialogProps } from "@/features/admin/types";
import { LinksForm } from "@/features/links/components";
import type { LinksFormData } from "@/features/links/types";

export const EditDialog = ({
  item,
  onOpenChange,
  onSuccess,
  onError,
}: EditDialogProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const handleSubmit = async (formData: LinksFormData) => {
    if (!item) return;

    setIsSubmitting(true);
    try {
      const response = await fetch(`/api/links?id=${item?.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData: { error?: string } = (await response.json()) as {
          error?: string;
        };
        throw new Error(errorData.error ?? "Failed to update item");
      }

      // 我们不需要使用 updatedItem 变量，只需要调用 onSuccess 回调
      await response.json();
      onSuccess();
      onOpenChange(false);
    } catch (error) {
      if (error instanceof Error) {
        onError(error.message);
      } else {
        onError("An unknown error occurred");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={!!item} onOpenChange={onOpenChange}>
      <DialogContent className="hide-scrollbar max-h-[90vh] max-w-4xl overflow-y-auto">
        <DialogHeader>
          <DialogTitle>编辑网址</DialogTitle>
        </DialogHeader>
        {item && (
          <LinksForm
            submitAction={handleSubmit}
            onCancel={() => onOpenChange(false)}
            initialData={{
              ...item,
              category: item.category as LinksFormData["category"],
            }}
            isLoading={isSubmitting}
          />
        )}
      </DialogContent>
    </Dialog>
  );
};
