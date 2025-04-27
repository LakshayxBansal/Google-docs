"use client";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogFooter,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

import { Id } from "../../convex/_generated/dataModel";
import { useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import { useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { toast } from "sonner";

 
interface RenameDocumentDialogProps {
   documentId : Id<"documents">;
   intialTitle?: string;
   children: React.ReactNode; 
}
export const RenameDocumentDialog = ({documentId ,intialTitle, children} : RenameDocumentDialogProps) => {

    const update = useMutation(api.documents.updateById);
    const [isUpdating, setIsUpdating] = useState(false);
    const [title, setTitle] = useState(intialTitle);
    const [open, setOpen] = useState(false);

    const handleSubmit = (e: React.FormEvent <HTMLFormElement>) => {
        e.preventDefault();
        setIsUpdating(true);

        update({id : documentId, title : title?.trim() || "Untitled"})
            .then(() => {
                toast.success("Document renamed successfully");
                setOpen(false);
            })
            .catch((error) => {
                if (error.message.includes("You are not the owner of this document")) {
                    toast.error("Only admin can rename this document");
                } else {
                    toast.error("Something went wrong");
                }})
            .finally(() => {
                setIsUpdating(false);
            }
        )
    }
        return (
             <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                    {children}
                </DialogTrigger>
                <DialogContent onClick={(e) => e.stopPropagation()}>
                    <form onSubmit={handleSubmit}>
                        <DialogHeader>
                            <DialogTitle>Rename Document</DialogTitle>
                            <DialogDescription>
                                Enter the new name for the document.
                            </DialogDescription>
                        </DialogHeader>
                        <div className="my-4">
                            <Input
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            onClick={(e) => e.stopPropagation()}
                            placeholder="Document Title"
                            //disabled={isUpdating}
                            />
                        </div>
                        <DialogFooter>
                            <Button
                                variant="ghost"
                                type ="button"
                                disabled={isUpdating}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setOpen(false);
                                }}
                            >
                                Cancel 
                            </Button>
                            <Button
                            type="submit"
                            disabled={isUpdating}
                            onClick={(e) => e.stopPropagation()}
                            >
                                Save 
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
             </Dialog>
        )
}