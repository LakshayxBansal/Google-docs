"use client";

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,  
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogHeader,
    AlertDialogFooter,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Id } from "../../convex/_generated/dataModel";
import { useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";


interface RemoveDocumentDialogProps {
   documentId : Id<"documents">;
   children: React.ReactNode;
}
export const RemoveDocumentDialog = ({documentId , children} : RemoveDocumentDialogProps) => {

    const remove = useMutation(api.documents.removeById);
    const [isRemoving, setIsRemoving] = useState(false);
    const router = useRouter();
        return (
            <AlertDialog>
                <AlertDialogTrigger asChild>
                    {children}
                </AlertDialogTrigger>
                <AlertDialogContent onClick={(e) => e.stopPropagation()}>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Are you sure you want to delete this document?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This action cannot be undone. All data associated with this document will be permanently deleted.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel onClick={(e) => e.stopPropagation()}>
                            Cancel
                        </AlertDialogCancel>
                        <AlertDialogAction
                            disabled={isRemoving}
                            onClick={(e)=>{
                                e.stopPropagation();
                                setIsRemoving(true);
                                remove({id : documentId})
                                .then(() => {
                                    toast.success("Document deleted successfully");
                                    router.push(`/`)
                                  })
                                .catch((error) => {
                                    if (error.message.includes("You are not the owner of this document")) {
                                      toast.error("Only admin can delete this document");
                                    } else {
                                      toast.error("Something went wrong");
                                    }
                                    return Promise.resolve();
                                  })
                                .finally(() => setIsRemoving(false));
                            }}
                        >
                            Delete
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        )
}